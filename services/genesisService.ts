
import { KnowledgeGraph } from './KnowledgeGraph';
import { generateDeepGuide, logToBlackBox } from './atlasService';
import { saveGuideToDB, getStoredTopicIds } from './database';
import { SubSubSection } from '../types';

export interface GenesisState {
    isActive: boolean;
    totalTopics: number;
    completedTopics: number;
    currentTopic: string;
    logs: string[];
    startTime: number;
}

// Singleton State for the background process
let state: GenesisState = {
    isActive: false,
    totalTopics: 0,
    completedTopics: 0,
    currentTopic: 'IDLE',
    logs: [],
    startTime: 0
};

let listeners: ((s: GenesisState) => void)[] = [];

const notify = () => listeners.forEach(l => l({ ...state }));

export const subscribeToGenesis = (cb: (s: GenesisState) => void) => {
    listeners.push(cb);
    cb({ ...state });
    return () => { listeners = listeners.filter(l => l !== cb); };
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const startGenesisProtocol = async () => {
    if (state.isActive) return;
    
    // 1. Initialize
    state.isActive = true;
    state.startTime = Date.now();
    state.logs = ['Genesis Protocol Initiated...', 'Scanning Knowledge Graph...'];
    notify();

    // 2. Map the Territory
    const allNodes = KnowledgeGraph.search('', 10000); // Get everything
    const topics: { id: string, title: string, data: SubSubSection }[] = [];
    
    allNodes.forEach(node => {
        if (node.type === 'TOPIC') {
            topics.push({ 
                id: node.id, 
                title: node.title,
                data: node.data as SubSubSection
            });
        }
    });

    state.totalTopics = topics.length;
    state.logs.push(`Identified ${topics.length} neural nodes.`);
    notify();

    // 3. Filter Existing
    const existingIds = await getStoredTopicIds();
    const pendingTopics = topics.filter(t => !existingIds.includes(t.id));
    state.completedTopics = existingIds.length;
    
    state.logs.push(`${existingIds.length} nodes already synchronized.`);
    state.logs.push(`${pendingTopics.length} nodes require synthesis.`);
    notify();

    // 4. Execution Loop
    for (const topic of pendingTopics) {
        if (!state.isActive) break; // Allow manual abort

        state.currentTopic = topic.title;
        notify();

        try {
            // Generate
            const result = await generateDeepGuide(
                topic.title,
                topic.data.description,
                topic.data.contentPoints
            );

            // Save
            const pillarId = KnowledgeGraph.getPillarIdForTopic(topic.id) || 'UNKNOWN';
            
            await saveGuideToDB({
                topicId: topic.id,
                content: result.content,
                sources: result.sources,
                timestamp: Date.now(),
                title: topic.title,
                pillarId: pillarId
            });

            // Update State
            state.completedTopics++;
            state.logs.unshift(`[SUCCESS] Synthesized: ${topic.title}`);
            if (state.logs.length > 50) state.logs.pop(); // Keep memory clean
            
            logToBlackBox(`Genesis: Built guide for ${topic.title}`, ['GENESIS', 'AUTO'], 'INFO');
            
            notify();

            // API Safety Delay (Critical to avoid 429s during mass generation)
            // 8 seconds delay ensures we stay well within rate limits
            await delay(8000); 

        } catch (e: any) {
            console.error(`Genesis Error on ${topic.title}:`, e);
            state.logs.unshift(`[ERROR] Failed: ${topic.title} - ${e.message}`);
            logToBlackBox(`Genesis Fail: ${topic.title}`, ['GENESIS', 'ERROR'], 'ERROR');
            await delay(10000); // Longer delay on error
        }
    }

    state.isActive = false;
    state.logs.unshift('Genesis Protocol Complete. System Synchronized.');
    notify();
};

export const stopGenesisProtocol = () => {
    state.isActive = false;
    state.logs.unshift('Genesis Protocol Aborted by User.');
    notify();
};
