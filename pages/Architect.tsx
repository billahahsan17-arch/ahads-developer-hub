import React, { useState } from 'react';
import { Network, Layers, Share2, Loader, Map } from 'lucide-react';
import { generateSystemArchitecture } from '../services/atlasService';
import ReactMarkdown from 'react-markdown';
import MermaidBlock from '../components/MermaidBlock';

const Architect: React.FC = () => {
  const [requirements, setRequirements] = useState('');
  const [result, setResult] = useState<{diagram: string, explanation: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDesign = async () => {
    if (!requirements.trim()) return;
    setLoading(true);
    const data = await generateSystemArchitecture(requirements);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300">
       <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
             <div className="p-3 bg-indigo-900/20 rounded-xl border border-indigo-500/30">
                <Network className="w-8 h-8 text-indigo-500" />
            </div>
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">The Architect</h1>
                <p className="text-slate-500 font-mono text-sm">System Design & Visual Blueprint Engine</p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">
        
        {/* Input Panel */}
        <div className="lg:col-span-4 flex flex-col space-y-4 h-full">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex-1 flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4" /> System Requirements
                </label>
                <textarea
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Describe the system... e.g. 'A real-time ride sharing app backend with matchmaking, geo-hashing, and payment processing.'"
                    className="flex-1 w-full bg-slate-950/50 p-4 font-mono text-sm focus:outline-none resize-none custom-scrollbar text-slate-300 placeholder-slate-700 rounded-lg border border-slate-800 focus:border-indigo-500/50 transition-colors"
                />
            </div>
            <button
                onClick={handleDesign}
                disabled={loading || !requirements.trim()}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
            >
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Map className="w-5 h-5" />}
                {loading ? 'Architecting...' : 'Generate Blueprint'}
            </button>
        </div>

        {/* Blueprint Output */}
        <div className="lg:col-span-8 flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative shadow-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                {result ? (
                     <div className="space-y-8 relative z-10 animate-fade-in">
                        {/* Visual Diagram */}
                        {result.diagram && (
                            <div className="bg-slate-950/50 rounded-lg p-2 border border-slate-800 shadow-inner">
                                <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-2 px-2">Visual Topology</div>
                                <MermaidBlock chart={result.diagram} />
                            </div>
                        )}

                        {/* Text Explanation */}
                        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-indigo-200 prose-code:text-indigo-300">
                            <ReactMarkdown>{result.explanation}</ReactMarkdown>
                        </div>
                     </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-700">
                        <Share2 className="w-16 h-16 mb-6 opacity-20" />
                        <p className="font-mono text-sm text-slate-600 uppercase tracking-widest">Awaiting System Specifications</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Architect;