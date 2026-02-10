
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { MOCK_DEEP_GUIDE } from '../constants';
import { KnowledgeGraph } from '../services/KnowledgeGraph';
import { SubSubSection, Pillar } from '../types';
import { generateDeepGuide } from '../services/atlasService';
import { getGuideFromDB, saveGuideToDB } from '../services/database';
import ReactMarkdown from 'react-markdown';
import { Sparkles, ArrowLeft, ArrowRight, Network, Activity, Map, Flag, Layers, ChevronRight, Globe, ExternalLink, Database } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

// Workaround for react-router-dom type mismatch
const { useParams, Navigate, Link } = ReactRouterDOM as any;

const TopicView: React.FC = () => {
  const { pillarId, topicId } = useParams();
  const [content, setContent] = useState<string>('');
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [fromDB, setFromDB] = useState(false);

  // O(1) Lookups via Knowledge Graph
  const pillarNode = pillarId ? KnowledgeGraph.getNode(pillarId) : undefined;
  const pillar = pillarNode?.data as Pillar | undefined;
  
  const topicNode = topicId ? KnowledgeGraph.getNode(topicId) : undefined;
  const topicData = topicNode?.data as SubSubSection | undefined;

  // Retrieve Hierarchy (Breadcrumbs)
  const lineage = topicId ? KnowledgeGraph.getLineage(topicId) : [];

  // O(1) Navigation Lookups
  const { prev, next } = topicId ? KnowledgeGraph.getTopicNavigation(topicId) : { prev: undefined, next: undefined };

  // Resolve Related Topics
  const relatedTopics = topicData?.relatedIds 
    ? topicData.relatedIds.map(id => {
        const node = KnowledgeGraph.getNode(id);
        const pNode = node?.pillarId ? KnowledgeGraph.getNode(node.pillarId) : undefined;
        const pData = pNode?.data as Pillar;
        
        return node && pData ? {
            id: node.id,
            title: node.title,
            pillarId: pData.id,
            pillarCode: pData.code,
            pillarColor: pData.color
        } : null;
      }).filter(Boolean) as any[]
    : [];

  useEffect(() => {
    if (topicData) {
        // Attempt to load from DB first
        checkDatabaseForGuide(topicData.id);
        // Reset scroll position
        const scrollContainer = document.getElementById('topic-scroll-container');
        if (scrollContainer) scrollContainer.scrollTop = 0;
    }
  }, [topicData]);

  const checkDatabaseForGuide = async (id: string) => {
      try {
          const stored = await getGuideFromDB(id);
          if (stored) {
              setContent(stored.content);
              setSources(stored.sources || []);
              setGenerated(true);
              setFromDB(true);
          } else {
              setContent(MOCK_DEEP_GUIDE);
              setSources([]);
              setGenerated(false);
              setFromDB(false);
          }
      } catch (e) {
          console.warn("DB Read Error", e);
          setContent(MOCK_DEEP_GUIDE);
          setGenerated(false);
      }
  };

  const handleGenerateFresh = async () => {
    if (!topicData) return;
    setLoading(true);
    setFromDB(false);
    
    // Pass specific topic metadata for tailored generation with WEB SEARCH
    const result = await generateDeepGuide(
        topicData.title, 
        topicData.description, 
        topicData.contentPoints
    );
    
    // Save to DB for future speed
    if (pillarId) {
        saveGuideToDB({
            topicId: topicData.id,
            content: result.content,
            sources: result.sources,
            timestamp: Date.now(),
            title: topicData.title,
            pillarId: pillarId
        });
    }
    
    setContent(result.content);
    setSources(result.sources);
    setGenerated(true);
    setLoading(false);
  };

  if (!pillar || !topicData) return <Navigate to="/" />;

  const colorName = pillar.color.split('-')[1];
  const bgColorClass = pillar.color.replace('text-', 'bg-');
  
  // Dark mode background style
  const uniqueBackgroundStyle = {
    background: `
       radial-gradient(circle at 100% 0%, rgba(15, 23, 42, 1) 0%, transparent 30%),
       radial-gradient(circle at 0% 100%, rgba(2, 6, 23, 1) 0%, transparent 30%),
       linear-gradient(to bottom right, #020617, #0f172a)
    `
  };

  return (
    <div id="topic-scroll-container" className="h-full overflow-y-auto custom-scrollbar flex flex-col animate-fade-in font-sans transition-colors duration-500 text-slate-300" style={uniqueBackgroundStyle}>
      {/* Top Protocol Header (Breadcrumbs) */}
      <div className="bg-slate-950/80 text-white border-b border-slate-800 sticky top-0 z-30 shadow-2xl backdrop-blur-md flex-shrink-0">
         <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4 overflow-hidden">
                <Link to={`/pillar/${pillarId}`} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white flex-shrink-0">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                
                <div className="h-8 w-px bg-slate-800 mx-2 hidden md:block"></div>
                
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center text-xs md:text-sm whitespace-nowrap overflow-x-auto custom-scrollbar mask-gradient-right">
                    {lineage.map((node, index) => {
                        const isLast = index === lineage.length - 1;
                        
                        // Intelligent Path Construction
                        let path = '#';
                        if (node.type === 'PILLAR') {
                            path = `/pillar/${node.id}`;
                        } else if (node.type === 'SECTION' || node.type === 'SUBSECTION') {
                            // Link to the specific section/subsection on the pillar page via anchor hash
                            path = `/pillar/${pillarId}#${node.id}`;
                        }
                        
                        return (
                            <React.Fragment key={node.id}>
                                <Link 
                                    to={path}
                                    className={`flex items-center gap-1 px-1 py-1 rounded transition-colors ${
                                        isLast 
                                            ? 'font-bold text-white cursor-default pointer-events-none' 
                                            : `text-slate-500 hover:text-${colorName}-400 font-medium`
                                    }`}
                                >
                                    {node.type === 'PILLAR' && <span className={`${pillar.color} mr-1`}>{pillar.code}</span>}
                                    <span className="truncate max-w-[150px]">{node.title}</span>
                                </Link>
                                {!isLast && <ChevronRight className="w-3 h-3 text-slate-700 mx-1 flex-shrink-0" />}
                            </React.Fragment>
                        );
                    })}
                </nav>
            </div>
            
            <div className="flex items-center gap-3 pl-4 flex-shrink-0">
                <button 
                    onClick={handleGenerateFresh}
                    disabled={loading}
                    className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded border text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${loading ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-wait' : 'bg-white text-slate-950 hover:bg-slate-200 border-white hover:scale-105 active:scale-95'}`}
                >
                    {loading ? (
                        <>
                            <Globe className="w-3 h-3 animate-spin" />
                            <span className="animate-pulse">Browsing Web...</span>
                        </>
                    ) : (
                        <>
                            <Map className="w-3 h-3 md:w-4 md:h-4" /> 
                            <span className="hidden md:inline">Regenerate Guide</span>
                            <span className="md:hidden">Search</span>
                        </>
                    )}
                </button>
            </div>
         </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-12 pb-24">
        
        {/* Left: Technical Specification Sidebar */}
        <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 shadow-xl lg:sticky lg:top-8">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Activity className="w-3 h-3" />
                    Spec Sheet
                </div>
                
                <div className="space-y-6">
                    <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Sector</div>
                        <div className={`font-bold ${pillar.color}`}>{pillar.title}</div>
                    </div>
                    
                    {/* Dynamic Hierarchy Info */}
                    {lineage.length > 1 && (
                        <>
                            <div>
                                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Section</div>
                                <div className="font-semibold text-slate-300 text-sm">{lineage.find(n => n.type === 'SECTION')?.title || 'N/A'}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Sub-Section</div>
                                <div className="font-semibold text-slate-400 text-sm">{lineage.find(n => n.type === 'SUBSECTION')?.title || 'N/A'}</div>
                            </div>
                        </>
                    )}

                    <div className="pt-4 border-t border-slate-800">
                        <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Node ID</div>
                        <div className="font-mono text-sm font-bold text-slate-300">{pillar.code}-{topicData.id.split('-').pop()}</div>
                    </div>

                    <div className="pt-4">
                        <div className="text-[10px] font-mono text-slate-500 uppercase mb-3">Core Components</div>
                        <div className="flex flex-wrap gap-2">
                            {topicData.contentPoints.map((pt, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-bold text-slate-400 uppercase tracking-tight shadow-sm">
                                    {pt}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Nodes */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:sticky lg:top-[450px]">
                {prev && prev.pillarId && (
                     <Link to={`/topic/${prev.pillarId}/${prev.id}`} className="block p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 hover:bg-slate-800 transition-all group">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 group-hover:text-blue-400 flex items-center gap-1">
                            <ArrowLeft className="w-3 h-3"/> Prev
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-slate-400 group-hover:text-slate-200 truncate">{prev.title}</div>
                    </Link>
                )}
                {next && next.pillarId && (
                     <Link to={`/topic/${next.pillarId}/${next.id}`} className="block p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 hover:bg-slate-800 transition-all group text-right">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 group-hover:text-blue-400 flex items-center gap-1 justify-end">
                            Next <ArrowRight className="w-3 h-3"/>
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-slate-400 group-hover:text-slate-200 truncate">{next.title}</div>
                    </Link>
                )}
            </div>
        </div>

        {/* Center: Main Content (The Deep Guide) */}
        <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
                {/* Subtle Background Graphic */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-slate-800/20 to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none opacity-50"></div>
                
                {/* Genesis DB Badge */}
                {fromDB && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                        <Database className="w-3 h-3" />
                        Cached from Genesis
                    </div>
                )}

                <div className="relative z-10 mb-8 flex items-start gap-4">
                   <div className={`p-3 rounded-xl ${bgColorClass} bg-opacity-10 border border-white/5`}>
                      <Flag className={`w-8 h-8 ${pillar.color}`} />
                   </div>
                   <div>
                       <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
                            {topicData.title}
                       </h1>
                       <p className="text-lg text-slate-400 font-light leading-relaxed">
                            {topicData.description}
                       </p>
                   </div>
                </div>

                {/* Content Renderer */}
                <div className="prose prose-invert prose-lg max-w-none relative z-10">
                     {loading ? (
                         <div className="space-y-6 animate-pulse">
                             <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                             <div className="h-4 bg-slate-800 rounded w-full"></div>
                             <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                             <div className="h-32 bg-slate-800/50 rounded-lg border border-slate-800 mt-8"></div>
                             <div className="h-4 bg-slate-800 rounded w-1/2 mt-8"></div>
                             <div className="h-4 bg-slate-800 rounded w-full"></div>
                             <div className="flex items-center gap-2 text-slate-500 text-sm font-mono mt-4">
                                <Globe className="w-4 h-4 animate-spin" />
                                Atlas is researching live data on the web...
                             </div>
                         </div>
                     ) : (
                         <ReactMarkdown 
                            components={{
                              h3: ({node, ...props}) => <div className="mt-16 mb-6 pb-2 border-b border-slate-800"><h3 className="text-2xl font-bold text-white flex items-center gap-3" {...props} /></div>,
                              h4: ({node, ...props}) => <h4 className="text-lg font-bold mt-10 mb-4 text-slate-200 uppercase tracking-wide flex items-center gap-2" {...props} />,
                              code: ({node, className, children, ...props}) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return match ? (
                                        <CodeBlock className={className}>{String(children).replace(/\n$/, '')}</CodeBlock>
                                    ) : (
                                        <code className="bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-700" {...props}>{children}</code>
                                    )
                              },
                              li: ({node, ...props}) => <li className="ml-4 list-none relative pl-6 mb-3 text-slate-300" {...props}><span className={`absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full ${bgColorClass}`}></span>{props.children}</li>,
                              p: ({node, ...props}) => <p className="text-slate-300 leading-relaxed mb-4" {...props} />,
                              strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />
                            }}
                          >
                            {content}
                          </ReactMarkdown>
                     )}
                </div>

                {/* Verification Footer (Sources) */}
                {generated && !loading && sources.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-slate-800 animate-slide-up">
                        <div className="flex items-center gap-2 mb-4 text-emerald-500 font-mono text-xs uppercase tracking-widest">
                            <Globe className="w-3 h-3" /> Verified Live Sources
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {sources.slice(0, 4).map((source, idx) => (
                                <a 
                                    key={idx} 
                                    href={source} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/30 hover:bg-slate-800 transition-all group"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center text-slate-500 text-xs font-bold border border-slate-800">
                                            {idx + 1}
                                        </div>
                                        <span className="text-xs text-slate-400 truncate font-mono group-hover:text-emerald-400 transition-colors">
                                            {new URL(source).hostname}
                                        </span>
                                    </div>
                                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {generated && !loading && (
                   <div className="mt-8 p-6 bg-blue-900/10 border border-blue-500/20 rounded-xl flex items-start gap-4 animate-fade-in">
                       <Sparkles className="w-5 h-5 flex-shrink-0 text-blue-400 mt-0.5" />
                       <div className="space-y-1">
                           <p className="text-sm font-bold text-blue-400 uppercase tracking-wide">Guided Path Generated</p>
                           <p className="text-sm text-blue-300/80 leading-relaxed">
                               {fromDB 
                                ? "This guide was autonomously synthesized by the Genesis Protocol and retrieved from the Atlas Core Database."
                                : "Atlas has generated a structured learning path using live web data. It is now saved to the Core Database."}
                           </p>
                       </div>
                   </div>
               )}
            </div>

            {/* Related Connections Footer */}
            {relatedTopics.length > 0 && (
                <div className="mt-8">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <Network className="w-4 h-4 text-slate-500" />
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Connected Systems</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {relatedTopics.map(t => (
                            <Link 
                                key={t.id} 
                                to={`/topic/${t.pillarId}/${t.id}`} 
                                className="group bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 ${t.pillarColor}`}>{t.pillarCode}</span>
                                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div className="font-semibold text-slate-300 text-sm group-hover:text-white transition-colors">{t.title}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TopicView;
