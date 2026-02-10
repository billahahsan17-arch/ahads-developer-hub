
import { PILLARS } from '../constants';
import { Pillar, Section, SubSection, SubSubSection, KnowledgeNode } from '../types';

/**
 * KnowledgeGraph Service (Resilient Core)
 * 
 * Transforms the nested Pillar tree into a flat, indexed graph.
 * Updated to LAZY LOAD to prevent circular dependency crashes on app startup.
 */
class KnowledgeGraphService {
  private static instance: KnowledgeGraphService;
  
  // O(1) Lookup Maps
  private nodeMap: Map<string, KnowledgeNode> = new Map();
  private topicToPillarMap: Map<string, string> = new Map();
  
  // Ordered list for Linear Navigation (Next/Prev)
  private flatTopics: KnowledgeNode[] = [];
  
  private initialized: boolean = false;

  private constructor() {
    // Do not initialize immediately in constructor to avoid import-time race conditions.
  }

  public static getInstance(): KnowledgeGraphService {
    if (!KnowledgeGraphService.instance) {
      KnowledgeGraphService.instance = new KnowledgeGraphService();
    }
    return KnowledgeGraphService.instance;
  }

  private ensureInitialized() {
    if (this.initialized) return;

    try {
        // Defensive check: Ensure PILLARS exists before iterating
        if (!PILLARS || !Array.isArray(PILLARS)) {
            console.warn("[Atlas Graph] PILLARS data not yet available. Skipping index.");
            return;
        }

        const start = performance.now();

        PILLARS.forEach(pillar => {
          // Index Pillar
          this.addToIndex(pillar.id, 'PILLAR', pillar.title, pillar, undefined, pillar.id, pillar.title);

          if (pillar.sections && Array.isArray(pillar.sections)) {
              pillar.sections.forEach(section => {
                // Index Section
                this.addToIndex(section.id, 'SECTION', section.title, section, pillar.id, pillar.id, `${pillar.title} > ${section.title}`);

                if (section.subSections && Array.isArray(section.subSections)) {
                    section.subSections.forEach(sub => {
                      // Index SubSection
                      this.addToIndex(sub.id, 'SUBSECTION', sub.title, sub, section.id, pillar.id, `${pillar.title} > ${section.title} > ${sub.title}`);

                      if (sub.subSubSections && Array.isArray(sub.subSubSections)) {
                          sub.subSubSections.forEach(topic => {
                            // Index Topic (SubSubSection)
                            const node = this.addToIndex(topic.id, 'TOPIC', topic.title, topic, sub.id, pillar.id, `${pillar.title} > ... > ${topic.title}`);
                            this.topicToPillarMap.set(topic.id, pillar.id);
                            this.flatTopics.push(node);
                          });
                      }
                    });
                }
              });
          }
        });

        this.initialized = true;
        console.debug(`[Atlas Graph] Indexed ${this.nodeMap.size} nodes & ${this.flatTopics.length} topics in ${(performance.now() - start).toFixed(2)}ms`);
    } catch (error) {
        console.error("[Atlas Graph] CRITICAL INDEXING FAILURE:", error);
        // We do not throw here, to allow the app to render in a degraded state rather than white-screening.
    }
  }

  private addToIndex(
    id: string, 
    type: KnowledgeNode['type'], 
    title: string, 
    data: any, 
    parentId: string | undefined, 
    pillarId: string,
    path: string
  ): KnowledgeNode {
    // Ensure we don't crash on duplicate IDs, just warn
    if (this.nodeMap.has(id)) {
      // console.warn(`[Atlas Graph] Duplicate ID detected: ${id}`);
    }
    const node: KnowledgeNode = { id, type, title, data, parentId, pillarId, path };
    this.nodeMap.set(id, node);
    return node;
  }

  /**
   * Get a node by ID in O(1) time.
   */
  public getNode(id: string): KnowledgeNode | undefined {
    this.ensureInitialized();
    return this.nodeMap.get(id);
  }

  /**
   * Get the full lineage of a node (Ancestors -> Node)
   * Useful for breadcrumbs: Pillar -> Section -> SubSection -> Topic
   */
  public getLineage(nodeId: string): KnowledgeNode[] {
    this.ensureInitialized();
    const lineage: KnowledgeNode[] = [];
    let current: KnowledgeNode | undefined = this.nodeMap.get(nodeId);

    while (current) {
        lineage.unshift(current); // Add to front of array
        if (!current.parentId) break;
        current = this.nodeMap.get(current.parentId);
    }
    
    return lineage;
  }

  /**
   * Get the Pillar ID for a specific Topic ID in O(1) time.
   */
  public getPillarIdForTopic(topicId: string): string | undefined {
    this.ensureInitialized();
    return this.topicToPillarMap.get(topicId);
  }

  /**
   * Returns the full Pillar object for a given Topic ID.
   */
  public getPillarForTopic(topicId: string): Pillar | undefined {
    this.ensureInitialized();
    const pillarId = this.topicToPillarMap.get(topicId);
    if (!pillarId) return undefined;
    const node = this.nodeMap.get(pillarId);
    return node?.type === 'PILLAR' ? (node.data as Pillar) : undefined;
  }

  /**
   * Find a specific Topic object by ID.
   */
  public getTopic(topicId: string): SubSubSection | undefined {
    this.ensureInitialized();
    const node = this.nodeMap.get(topicId);
    return node?.type === 'TOPIC' ? (node.data as SubSubSection) : undefined;
  }

  /**
   * Get Next and Previous topics for linear navigation (O(1) after index).
   */
  public getTopicNavigation(currentTopicId: string): { prev?: KnowledgeNode, next?: KnowledgeNode } {
    this.ensureInitialized();
    const index = this.flatTopics.findIndex(n => n.id === currentTopicId);
    if (index === -1) return {};
    
    return {
      prev: index > 0 ? this.flatTopics[index - 1] : undefined,
      next: index < this.flatTopics.length - 1 ? this.flatTopics[index + 1] : undefined
    };
  }

  /**
   * Optimized Search across the entire graph.
   */
  public search(query: string, limit: number = 10): KnowledgeNode[] {
    this.ensureInitialized();
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results: KnowledgeNode[] = [];
    for (const node of this.nodeMap.values()) {
      if (results.length >= limit) break;
      
      const titleMatch = node.title.toLowerCase().includes(q);
      const codeMatch = node.type === 'PILLAR' && (node.data as any).code.toLowerCase().includes(q);
      
      if (titleMatch || codeMatch) {
        results.push(node);
      }
    }
    return results;
  }

  /**
   * Get formatted title for breadcrumbs.
   */
  public getTitle(id: string): string | null {
    this.ensureInitialized();
    return this.nodeMap.get(id)?.title || null;
  }
}

export const KnowledgeGraph = KnowledgeGraphService.getInstance();
