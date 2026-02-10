
import React, { useState } from 'react';
import { MessageSquare, AlertTriangle, ShieldAlert, Ghost, ThumbsDown, ThumbsUp, Send, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateCritique } from '../../services/atlasService';

const DevilsAdvocate: React.FC = () => {
    const [input, setInput] = useState('');
    const [critique, setCritique] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCritique = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setCritique(''); 

        try {
            // Now uses the Hybrid Service (Cloud -> Fallback to Local)
            const result = await generateCritique(input);
            setCritique(result);
        } catch (e) {
            setCritique("Error: The critic is currently out to lunch.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-900/20 rounded-lg border border-red-500/30">
                        <Ghost className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Devil's Advocate</h1>
                        <p className="text-[10px] font-mono text-slate-500">Architectural Critique Engine</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
                
                {/* Intro / Context */}
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex gap-4 items-start">
                    <div className="p-3 bg-slate-950 rounded-full border border-slate-800 shadow-inner shrink-0">
                        <ShieldAlert className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white mb-1">Why use this?</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Engineers often fall into "Happy Path" thinking. This tool simulates a cynical Senior Architect who looks for edge cases, scalability bottlenecks, and "resume-driven development" bias in your choices.
                        </p>
                    </div>
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Proposed Architecture / Stack</label>
                    <div className="relative">
                        <textarea 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g. 'I'm planning to use MongoDB for a high-frequency trading ledger because it's web-scale.'"
                            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-red-500/50 resize-none shadow-lg placeholder-slate-600"
                        />
                        <button 
                            onClick={handleCritique}
                            disabled={loading || !input.trim()}
                            className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/20"
                        >
                            {loading ? <Loader className="w-3 h-3 animate-spin" /> : <MessageSquare className="w-3 h-3" />}
                            {loading ? 'Analyzing Risks...' : 'Roast My Stack'}
                        </button>
                    </div>
                </div>

                {/* Output Area */}
                {critique && (
                    <div className="animate-slide-up">
                        <div className="flex items-center gap-2 mb-4 text-red-400">
                            <AlertTriangle className="w-5 h-5" />
                            <h3 className="font-bold uppercase tracking-widest text-sm">Critical Analysis</h3>
                        </div>
                        
                        <div className="bg-black/40 border border-red-500/20 rounded-xl p-8 relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                <ThumbsDown className="w-32 h-32 text-red-500" />
                            </div>

                            <div className="prose prose-invert prose-sm max-w-none relative z-10">
                                <ReactMarkdown>{critique}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Feedback Loop */}
                        <div className="flex justify-end gap-2 mt-4 opacity-50 hover:opacity-100 transition-opacity">
                            <span className="text-[10px] text-slate-500 font-mono uppercase self-center mr-2">Was this useful?</span>
                            <button className="p-2 bg-slate-900 border border-slate-800 rounded hover:border-emerald-500 hover:text-emerald-500 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-slate-900 border border-slate-800 rounded hover:border-red-500 hover:text-red-500 transition-colors">
                                <ThumbsDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default DevilsAdvocate;
