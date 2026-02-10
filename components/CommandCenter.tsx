
import React, { useState, useEffect, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { 
    Search, Command, ArrowRight, Activity, Terminal, Brain, 
    Wrench, Globe, Database, MessageSquare, Video, Image, 
    FileText, Layers, PenTool, Hash, Shield, Zap, Layout, 
    Box, Monitor, Play, Eye
} from 'lucide-react';
import { KnowledgeGraph } from '../services/KnowledgeGraph';
import { LAB_SECTORS } from '../data/labFeatures';

// Workaround for react-router-dom type mismatch
const { useNavigate } = ReactRouterDOM as any;

interface SearchResult {
  id: string;
  type: 'CORE' | 'TOOL' | 'KNOWLEDGE' | 'AI';
  title: string;
  subtitle?: string;
  path: string;
  icon: React.ReactNode;
  tags?: string[];
}

interface CommandCenterProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    initialQuery: string;
}

const CommandCenter: React.FC<CommandCenterProps> = ({ isOpen, setIsOpen, initialQuery }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Reset query when opened
  useEffect(() => {
      if (isOpen) {
          setQuery(initialQuery || '');
          setSelectedIndex(0);
      }
  }, [isOpen, initialQuery]);

  // --- BUILD INDEX ---
  const index = useMemo(() => {
      const results: SearchResult[] = [];

      // 1. Core Pages
      results.push(
          { id: 'home', type: 'CORE', title: 'Mission Control', subtitle: 'Dashboard', path: '/', icon: <Terminal className="w-4 h-4" /> },
          { id: 'arsenal', type: 'CORE', title: 'AI Arsenal', subtitle: 'Generative Tools', path: '/ai-arsenal', icon: <Brain className="w-4 h-4" /> },
          { id: 'lab', type: 'CORE', title: 'The Forge', subtitle: 'Engineering Simulators', path: '/lab', icon: <Wrench className="w-4 h-4" /> },
          { id: 'community', type: 'CORE', title: 'Community Hub', subtitle: 'Codex & Reviews', path: '/community', icon: <Globe className="w-4 h-4" /> },
          { id: 'blackbox', type: 'CORE', title: 'Black Box', subtitle: 'Flight Recorder', path: '/blackbox', icon: <Database className="w-4 h-4" /> },
      );

      // 2. AI Studios
      results.push(
          { id: 'chat', type: 'AI', title: 'Atlas Chat', subtitle: 'Neural Core', path: '/chat', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'veo', type: 'AI', title: 'Veo Studio', subtitle: 'Video Generation', path: '/veo', icon: <Video className="w-4 h-4" /> },
          { id: 'imagine', type: 'AI', title: 'Imagine Studio', subtitle: 'Image Generation', path: '/imagine', icon: <Image className="w-4 h-4" /> },
          { id: 'calibration', type: 'AI', title: 'Calibration', subtitle: 'Interview Sim', path: '/calibration', icon: <Activity className="w-4 h-4" /> },
          { id: 'oculus', type: 'AI', title: 'Oculus', subtitle: 'Visual Analysis', path: '/oculus', icon: <Eye className="w-4 h-4" /> },
      );

      // 3. Lab Tools (The 88)
      LAB_SECTORS.forEach(sector => {
          sector.features.forEach(feature => {
              results.push({
                  id: feature.id,
                  type: 'TOOL',
                  title: feature.title,
                  subtitle: sector.title, // Sector name as subtitle
                  path: feature.status === 'AVAILABLE' ? feature.path : '#',
                  icon: <feature.icon className="w-4 h-4" />,
                  tags: [feature.elite ? 'elite' : '', feature.isAI ? 'ai' : 'manual']
              });
          });
      });

      return results;
  }, []);

  // --- SEARCH LOGIC ---
  const filteredResults = useMemo(() => {
      const q = query.toLowerCase().trim();
      let res: SearchResult[] = [];

      // 1. Direct Static Matches
      if (!q) {
          res = index.slice(0, 8); // Show top 8 default
      } else {
          // Filter Index
          const staticMatches = index.filter(item => 
              item.title.toLowerCase().includes(q) || 
              item.subtitle?.toLowerCase().includes(q)
          );
          res = [...staticMatches];

          // 2. Knowledge Graph Matches (Dynamic)
          const graphMatches = KnowledgeGraph.search(q, 5).map(node => {
                let icon = <ArrowRight className="w-4 h-4" />;
                let path = '#';
                let subtitle = 'Knowledge Base';

                if (node.type === 'PILLAR') {
                    icon = <Layers className="w-4 h-4" />;
                    subtitle = `Pillar ${(node.data as any).code}`;
                    path = `/pillar/${node.id}`;
                } else if (node.type === 'TOPIC') {
                    const pillar = KnowledgeGraph.getPillarForTopic(node.id);
                    icon = <FileText className="w-4 h-4" />;
                    subtitle = pillar ? `Pillar ${pillar.code} // Topic` : 'Topic';
                    path = pillar ? `/topic/${pillar.id}/${node.id}` : '#';
                }

                return {
                    id: node.id,
                    type: 'KNOWLEDGE' as const,
                    title: node.title,
                    subtitle,
                    path,
                    icon
                };
          });

          res = [...res, ...graphMatches];
      }

      // Add "Ask AI" option if query exists
      if (q) {
          res.unshift({
              id: 'ask-ai',
              type: 'AI',
              title: `Ask Atlas: "${query}"`,
              subtitle: 'Send to Neural Core',
              path: '/chat', // We can handle passing state later
              icon: <Brain className="w-4 h-4 text-purple-400" />
          });
      }

      return res.slice(0, 12); // Limit total results
  }, [query, index]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % filteredResults.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const selected = filteredResults[selectedIndex];
            if (selected) {
                if (selected.id === 'ask-ai') {
                    // Navigate to chat (ideally passing query)
                    navigate('/chat'); 
                } else {
                    navigate(selected.path);
                }
                setIsOpen(false);
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, navigate, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 flex flex-col">
        
        {/* Input Area */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-800 bg-slate-900/50">
           <Search className="w-5 h-5 text-indigo-400" />
           <input 
             autoFocus
             type="text" 
             placeholder="Search tools, topics, or ask AI..." 
             className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 font-medium text-lg h-8"
             value={query}
             onChange={(e) => {
                 setQuery(e.target.value);
                 setSelectedIndex(0);
             }}
           />
           <div className="flex gap-1.5">
              <kbd 
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-slate-700 bg-slate-800 text-[10px] font-mono text-slate-400 cursor-pointer hover:bg-slate-700 hover:text-white transition-colors"
              >
                  <span className="text-xs">ESC</span>
              </kbd>
           </div>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto py-2 bg-[#0f172a]">
            {filteredResults.length === 0 ? (
                <div className="px-4 py-12 text-center text-slate-500 text-sm font-mono">
                    No matching protocols found.
                </div>
            ) : (
                filteredResults.map((result, idx) => (
                    <div 
                        key={`${result.id}-${idx}`}
                        onClick={() => {
                            if (result.id === 'ask-ai') {
                                navigate('/chat');
                            } else {
                                navigate(result.path);
                            }
                            setIsOpen(false);
                        }}
                        className={`px-4 py-3 mx-2 rounded-xl cursor-pointer flex items-center justify-between group transition-all duration-150 ${
                            idx === selectedIndex 
                            ? 'bg-blue-600/10 border border-blue-500/20 shadow-lg shadow-blue-900/10' 
                            : 'hover:bg-slate-800/50 border border-transparent'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg transition-colors ${
                                idx === selectedIndex 
                                ? 'bg-blue-500/20 text-blue-300' 
                                : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                            }`}>
                                {result.icon}
                            </div>
                            <div>
                                <div className={`text-sm font-bold ${idx === selectedIndex ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                    {result.title}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 rounded ${
                                        result.type === 'AI' ? 'text-purple-400 bg-purple-900/20' :
                                        result.type === 'TOOL' ? 'text-amber-400 bg-amber-900/20' :
                                        result.type === 'KNOWLEDGE' ? 'text-emerald-400 bg-emerald-900/20' :
                                        'text-blue-400 bg-blue-900/20'
                                    }`}>
                                        {result.type}
                                    </span>
                                    {result.subtitle && (
                                        <span className={`text-[10px] font-mono ${idx === selectedIndex ? 'text-blue-300' : 'text-slate-500'}`}>
                                            {result.subtitle}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        {idx === selectedIndex && (
                            <ArrowRight className="w-4 h-4 text-blue-400 animate-slide-in-right" />
                        )}
                    </div>
                ))
            )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex justify-between items-center">
            <span className="opacity-70">ATLAS COMMAND v4.0</span>
            <div className="flex gap-4 opacity-70">
                <span className="flex items-center gap-1"><Command className="w-3 h-3" /> Select</span>
                <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Execute</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
