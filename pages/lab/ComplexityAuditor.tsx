
import React, { useState } from 'react';
import { Activity, Zap, Box, Layers, Code, Loader } from 'lucide-react';
import { analyzeComplexity } from '../../services/atlasService';
import CodeBlock from '../../components/CodeBlock';

const ComplexityAuditor: React.FC = () => {
    const [code, setCode] = useState('');
    const [result, setResult] = useState<{ timeComplexity: string, spaceComplexity: string, explanation: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAudit = async () => {
        if (!code.trim()) return;
        setLoading(true);
        const data = await analyzeComplexity(code);
        setResult(data);
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-900/20 rounded-lg border border-purple-500/30">
                        <Activity className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Complexity Auditor</h1>
                        <p className="text-[10px] font-mono text-slate-500">Big O Analysis Engine</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
                
                {/* Input */}
                <div className="flex flex-col gap-4 h-full">
                    <div className="flex-1 bg-[#0d1117] border border-slate-800 rounded-xl overflow-hidden relative">
                        <textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="// Paste algorithm here..."
                            className="absolute inset-0 w-full h-full bg-transparent p-6 font-mono text-sm text-slate-300 resize-none outline-none custom-scrollbar"
                            spellCheck={false}
                        />
                    </div>
                    <button 
                        onClick={handleAudit}
                        disabled={loading || !code.trim()}
                        className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                        {loading ? 'Calculating Operations...' : 'Audit Complexity'}
                    </button>
                </div>

                {/* Output */}
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Layers className="w-4 h-4" /> Time Complexity
                            </h3>
                            <div className="text-4xl font-black text-white font-mono">
                                {result ? result.timeComplexity : '--'}
                            </div>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Box className="w-4 h-4" /> Space Complexity
                            </h3>
                            <div className="text-4xl font-black text-white font-mono">
                                {result ? result.spaceComplexity : '--'}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Neural Analysis</h3>
                        {result ? (
                            <div className="text-sm text-slate-300 leading-relaxed font-mono">
                                {result.explanation}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-50">
                                <Code className="w-12 h-12 mb-4" />
                                <p className="font-mono text-sm uppercase">Waiting for Source Code</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ComplexityAuditor;
