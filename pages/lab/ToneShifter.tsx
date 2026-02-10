
import React, { useState } from 'react';
import { MessageSquare, ArrowRight, Smile, Briefcase, Zap, Copy, Check, Sparkles } from 'lucide-react';
import { shiftTone } from '../../services/atlasService';

const ToneShifter: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [tone, setTone] = useState<'PROFESSIONAL' | 'EMPATHETIC' | 'EXECUTIVE'>('PROFESSIONAL');

    const handleShift = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setOutput('');

        try {
            // Uses Hybrid Service
            const result = await shiftTone(input, tone);
            setOutput(result);
        } catch (e) {
            setOutput("Error: Neural Link Interrupted.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-900/20 rounded-lg border border-pink-500/30">
                        <MessageSquare className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Tone Shifter</h1>
                        <p className="text-[10px] font-mono text-slate-500">Communication Refinement Engine</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8">
                
                {/* Tone Selector */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                        onClick={() => setTone('PROFESSIONAL')}
                        className={`p-4 rounded-xl border text-left transition-all ${tone === 'PROFESSIONAL' ? 'bg-blue-900/20 border-blue-500/50 ring-1 ring-blue-500/20' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                    >
                        <div className={`flex items-center gap-2 mb-2 font-bold ${tone === 'PROFESSIONAL' ? 'text-blue-400' : 'text-slate-400'}`}>
                            <Briefcase className="w-4 h-4" /> Professional
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                            Objective, clear, fact-based. Removes emotion and focuses on technical correctness.
                        </p>
                    </button>
                    <button 
                        onClick={() => setTone('EMPATHETIC')}
                        className={`p-4 rounded-xl border text-left transition-all ${tone === 'EMPATHETIC' ? 'bg-emerald-900/20 border-emerald-500/50 ring-1 ring-emerald-500/20' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                    >
                        <div className={`flex items-center gap-2 mb-2 font-bold ${tone === 'EMPATHETIC' ? 'text-emerald-400' : 'text-slate-400'}`}>
                            <Smile className="w-4 h-4" /> Empathetic
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                            Collaborative, understanding, human. Good for conflict resolution and feedback.
                        </p>
                    </button>
                    <button 
                        onClick={() => setTone('EXECUTIVE')}
                        className={`p-4 rounded-xl border text-left transition-all ${tone === 'EXECUTIVE' ? 'bg-purple-900/20 border-purple-500/50 ring-1 ring-purple-500/20' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                    >
                        <div className={`flex items-center gap-2 mb-2 font-bold ${tone === 'EXECUTIVE' ? 'text-purple-400' : 'text-slate-400'}`}>
                            <Zap className="w-4 h-4" /> Executive Brief
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                            Concise, impact-driven, ROI-focused. Removes fluff. Bottom line up front (BLUF).
                        </p>
                    </button>
                </div>

                {/* Editor Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
                    
                    {/* Input */}
                    <div className="flex flex-col space-y-4">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Draft Input (Raw)</label>
                        <textarea 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g., 'This code is garbage and breaks everything. Why did you merge this?'"
                            className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-6 font-sans text-sm text-slate-300 focus:outline-none focus:border-pink-500/50 resize-none custom-scrollbar transition-colors placeholder-slate-700"
                        />
                    </div>

                    {/* Output */}
                    <div className="flex flex-col space-y-4">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                            <span>Refined Output</span>
                            {output && (
                                <button onClick={copyToClipboard} className="flex items-center gap-1 text-pink-400 hover:text-white transition-colors">
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            )}
                        </label>
                        <div className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group">
                            {output ? (
                                <div className="prose prose-invert prose-sm max-w-none animate-fade-in">
                                    <p className="leading-relaxed whitespace-pre-wrap">{output}</p>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-700 opacity-50">
                                    <Sparkles className="w-12 h-12 mb-2" />
                                </div>
                            )}
                            
                            {loading && (
                                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping" />
                                        <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">Rewriting...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <button 
                    onClick={handleShift}
                    disabled={!input.trim() || loading}
                    className="w-full py-4 bg-pink-700 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-pink-900/20 flex items-center justify-center gap-3"
                >
                    Shift Tone <ArrowRight className="w-4 h-4" />
                </button>

            </div>
        </div>
    );
};

export default ToneShifter;
