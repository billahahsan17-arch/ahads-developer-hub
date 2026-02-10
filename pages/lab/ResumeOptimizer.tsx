
import React, { useState } from 'react';
import { FileText, Target, CheckCircle, XCircle, Search, Percent, RefreshCw } from 'lucide-react';

const ResumeOptimizer: React.FC = () => {
    const [resume, setResume] = useState('');
    const [jd, setJd] = useState('');
    const [results, setResults] = useState<{ score: number, found: string[], missing: string[] } | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const analyzeFit = () => {
        if (!resume.trim() || !jd.trim()) return;
        setIsAnalyzing(true);

        setTimeout(() => {
            // 1. Extract potential keywords from JD (naive approach: words > 4 chars, not common stop words)
            // In a real app, this uses NLP/TF-IDF. Here we simulate via frequency analysis.
            const stopWords = new Set(['and', 'the', 'with', 'for', 'that', 'this', 'from', 'have', 'will', 'skills', 'experience', 'work', 'team', 'ideal', 'candidate']);
            const jdWords = jd.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
            const wordFreq: Record<string, number> = {};
            
            jdWords.forEach(w => {
                if (w.length > 4 && !stopWords.has(w)) {
                    wordFreq[w] = (wordFreq[w] || 0) + 1;
                }
            });

            // Take top 20 distinct keywords by frequency
            const keywords = Object.entries(wordFreq)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 20)
                .map(pair => pair[0]);

            const resumeLower = resume.toLowerCase();
            const found: string[] = [];
            const missing: string[] = [];

            keywords.forEach(k => {
                if (resumeLower.includes(k)) found.push(k);
                else missing.push(k);
            });

            const score = Math.round((found.length / keywords.length) * 100);
            setResults({ score, found, missing });
            setIsAnalyzing(false);
        }, 1000);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Resume Optimizer</h1>
                        <p className="text-[10px] font-mono text-slate-500">Keyword Gap Analysis Engine</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-8 flex flex-col lg:flex-row gap-8 overflow-hidden">
                
                {/* Input Column */}
                <div className="flex-1 flex flex-col gap-6 h-full min-h-0">
                    <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                        <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/50 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <FileText className="w-3 h-3" /> Your Resume
                        </div>
                        <textarea 
                            value={resume}
                            onChange={(e) => setResume(e.target.value)}
                            placeholder="Paste resume text here..."
                            className="flex-1 w-full bg-slate-900 p-4 text-sm text-slate-300 resize-none outline-none custom-scrollbar"
                        />
                    </div>

                    <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                        <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/50 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Search className="w-3 h-3" /> Job Description
                        </div>
                        <textarea 
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                            placeholder="Paste job description here..."
                            className="flex-1 w-full bg-slate-900 p-4 text-sm text-slate-300 resize-none outline-none custom-scrollbar"
                        />
                    </div>

                    <button 
                        onClick={analyzeFit}
                        disabled={isAnalyzing || !resume.trim() || !jd.trim()}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                    >
                        {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Percent className="w-4 h-4" />}
                        {isAnalyzing ? 'Calculating Match...' : 'Analyze Keyword Fit'}
                    </button>
                </div>

                {/* Results Column */}
                <div className="w-full lg:w-96 bg-[#0d1117] border border-slate-800 rounded-xl flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-slate-800 bg-slate-950/30 text-center">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Match Score</div>
                        <div className={`text-5xl font-black ${
                            !results ? 'text-slate-700' :
                            results.score >= 80 ? 'text-emerald-400' :
                            results.score >= 50 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                            {results ? `${results.score}%` : '--'}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                        {!results ? (
                            <div className="text-center text-slate-600 py-12">
                                <Target className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p className="text-xs font-mono uppercase tracking-widest">Ready for analysis</p>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <XCircle className="w-3 h-3" /> Missing Keywords
                                    </h3>
                                    {results.missing.length === 0 ? (
                                        <p className="text-xs text-slate-500 italic">No major gaps found!</p>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {results.missing.map(k => (
                                                <span key={k} className="px-2 py-1 rounded bg-red-900/20 border border-red-900/30 text-red-300 text-xs font-mono">
                                                    {k}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="pt-6 border-t border-slate-800">
                                    <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-3 h-3" /> Matched Keywords
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {results.found.map(k => (
                                            <span key={k} className="px-2 py-1 rounded bg-emerald-900/20 border border-emerald-900/30 text-emerald-300 text-xs font-mono">
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResumeOptimizer;
