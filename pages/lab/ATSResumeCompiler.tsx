
import React, { useState } from 'react';
import { FileText, Wand2, Check, Download, AlertCircle, Loader } from 'lucide-react';
import { refineResume } from '../../services/atlasService';
import ReactMarkdown from 'react-markdown';

const ATSResumeCompiler: React.FC = () => {
    const [rawInput, setRawInput] = useState('');
    const [optimized, setOptimized] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOptimize = async () => {
        if (!rawInput.trim()) return;
        setLoading(true);
        const result = await refineResume(rawInput);
        setOptimized(result);
        setLoading(false);
    };

    return (
        <div className="h-full bg-slate-950 p-6 md:p-10 font-sans text-slate-300 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-900/20 rounded-xl border border-blue-500/20">
                            <FileText className="w-8 h-8 text-blue-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">ATS Resume Compiler</h1>
                            <p className="text-slate-500 font-mono text-sm">Keyword Optimization & Formatting Engine</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Input Panel */}
                    <div className="flex flex-col h-[600px]">
                        <div className="bg-slate-900 border border-slate-800 rounded-t-xl p-4 flex justify-between items-center">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Raw Experience Dump</h3>
                            <div className="flex items-center gap-2 text-[10px] text-amber-500 bg-amber-900/10 px-2 py-1 rounded border border-amber-900/30">
                                <AlertCircle className="w-3 h-3" /> Paste unformatted text
                            </div>
                        </div>
                        <textarea 
                            value={rawInput}
                            onChange={(e) => setRawInput(e.target.value)}
                            placeholder="Paste your job history, bullet points, and skills here. Don't worry about formatting..."
                            className="flex-1 bg-slate-950 border border-slate-800 border-t-0 p-6 font-mono text-sm text-slate-300 focus:outline-none resize-none custom-scrollbar rounded-b-xl focus:border-blue-500/50 transition-colors"
                        />
                        <button 
                            onClick={handleOptimize}
                            disabled={loading || !rawInput.trim()}
                            className="mt-4 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                            {loading ? 'Compiling...' : 'Optimize for ATS'}
                        </button>
                    </div>

                    {/* Output Panel */}
                    <div className="flex flex-col h-[600px]">
                        <div className="bg-slate-900 border border-slate-800 rounded-t-xl p-4 flex justify-between items-center">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Compiler Output</h3>
                            {optimized && (
                                <button className="text-xs font-bold text-emerald-400 hover:text-white flex items-center gap-1 transition-colors">
                                    <Download className="w-3 h-3" /> Export Markdown
                                </button>
                            )}
                        </div>
                        <div className="flex-1 bg-white text-slate-900 p-8 overflow-y-auto custom-scrollbar rounded-b-xl relative font-serif">
                            {optimized ? (
                                <div className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-800 prose-li:text-slate-800">
                                    <ReactMarkdown>{optimized}</ReactMarkdown>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                    <FileText className="w-16 h-16 mb-4 opacity-20" />
                                    <p className="font-sans text-xs uppercase tracking-widest font-bold opacity-50">Waiting for Input</p>
                                </div>
                            )}
                        </div>
                        {optimized && (
                            <div className="mt-4 p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                                <Check className="w-5 h-5 text-emerald-500" />
                                <div className="text-xs text-emerald-200/80">
                                    <strong>Optimization Complete:</strong> Strong verbs injected. Quantitative metrics highlighted. Layout simplified for parsers.
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ATSResumeCompiler;
