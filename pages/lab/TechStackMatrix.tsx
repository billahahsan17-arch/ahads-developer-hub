import React, { useState } from 'react';
import { Grid, Plus, Trash2, Calculator, Check, AlertTriangle, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Criteria {
    id: string;
    name: string;
    weight: number; // 1-5
}

interface Option {
    id: string;
    name: string;
    scores: Record<string, number>; // criteriaId -> score (1-10)
}

const TechStackMatrix: React.FC = () => {
    const [criteria, setCriteria] = useState<Criteria[]>([
        { id: 'c1', name: 'Developer Velocity', weight: 5 },
        { id: 'c2', name: 'Performance (Latency)', weight: 4 },
        { id: 'c3', name: 'Ecosystem / Hiring', weight: 3 },
        { id: 'c4', name: 'Maintainability', weight: 4 },
    ]);

    const [options, setOptions] = useState<Option[]>([
        { id: 'o1', name: 'Node.js (NestJS)', scores: { 'c1': 9, 'c2': 6, 'c3': 10, 'c4': 8 } },
        { id: 'o2', name: 'Go (Gin)', scores: { 'c1': 7, 'c2': 10, 'c3': 6, 'c4': 9 } },
        { id: 'o3', name: 'Rust (Axum)', scores: { 'c1': 5, 'c2': 10, 'c3': 4, 'c4': 8 } },
    ]);

    const [winner, setWinner] = useState<string | null>(null);

    const calculateScore = (option: Option) => {
        let total = 0;
        let maxTotal = 0;
        criteria.forEach(c => {
            const score = option.scores[c.id] || 0;
            total += score * c.weight;
            maxTotal += 10 * c.weight;
        });
        return { total, percent: (total / maxTotal) * 100 };
    };

    const addCriteria = () => {
        const id = Math.random().toString(36).substr(2, 5);
        setCriteria([...criteria, { id, name: 'New Criteria', weight: 3 }]);
    };

    const addOption = () => {
        const id = Math.random().toString(36).substr(2, 5);
        setOptions([...options, { id, name: 'New Option', scores: {} }]);
    };

    const updateScore = (optId: string, critId: string, val: number) => {
        const clamped = Math.min(10, Math.max(0, val));
        setOptions(options.map(o => 
            o.id === optId ? { ...o, scores: { ...o.scores, [critId]: clamped } } : o
        ));
    };

    const deleteCriteria = (id: string) => setCriteria(criteria.filter(c => c.id !== id));
    const deleteOption = (id: string) => setOptions(options.filter(o => o.id !== id));

    // Auto-calculate winner
    const sortedOptions = [...options].sort((a, b) => calculateScore(b).total - calculateScore(a).total);
    const topOption = sortedOptions[0];

    return (
        <div className="h-full bg-slate-950 p-6 md:p-10 font-sans text-slate-300 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-900/20 rounded-xl border border-indigo-500/30">
                            <Calculator className="w-8 h-8 text-indigo-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">Decision Matrix</h1>
                            <p className="text-slate-500 font-mono text-sm">Weighted Architectural Analysis Engine</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={addOption} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all text-xs font-bold uppercase tracking-wide">
                            <Plus className="w-4 h-4" /> Add Option
                        </button>
                        <button onClick={addCriteria} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all text-xs font-bold uppercase tracking-wide">
                            <Plus className="w-4 h-4" /> Add Criteria
                        </button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="overflow-x-auto">
                    <div className="min-w-[800px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                        {/* Table Header */}
                        <div className="grid bg-[#020617] border-b border-slate-800" style={{ gridTemplateColumns: `200px repeat(${criteria.length}, 1fr) 120px` }}>
                            <div className="p-4 flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest bg-[#0b0f19]">
                                Technology
                            </div>
                            {criteria.map(c => (
                                <div key={c.id} className="p-4 border-l border-slate-800 relative group">
                                    <div className="flex justify-between items-start mb-2">
                                        <input 
                                            value={c.name}
                                            onChange={(e) => setCriteria(criteria.map(x => x.id === c.id ? { ...x, name: e.target.value } : x))}
                                            className="bg-transparent text-xs font-bold text-indigo-300 uppercase tracking-wider w-full focus:outline-none"
                                        />
                                        <button onClick={() => deleteCriteria(c.id)} className="text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] text-slate-500 uppercase">Weight</span>
                                        <input 
                                            type="number" 
                                            min="1" max="5" 
                                            value={c.weight}
                                            onChange={(e) => setCriteria(criteria.map(x => x.id === c.id ? { ...x, weight: Number(e.target.value) } : x))}
                                            className="w-8 bg-slate-800 border border-slate-700 rounded text-center text-xs text-white"
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="p-4 border-l border-slate-800 bg-[#0b0f19] flex items-center justify-center text-xs font-bold text-emerald-500 uppercase tracking-widest">
                                Score
                            </div>
                        </div>

                        {/* Table Rows */}
                        <AnimatePresence>
                            {options.map(opt => {
                                const result = calculateScore(opt);
                                const isWinner = topOption.id === opt.id;

                                return (
                                    <MotionDiv 
                                        key={opt.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={`grid border-b border-slate-800 transition-colors ${isWinner ? 'bg-indigo-900/10' : 'hover:bg-slate-800/50'}`}
                                        style={{ gridTemplateColumns: `200px repeat(${criteria.length}, 1fr) 120px` }}
                                    >
                                        <div className="p-4 flex items-center justify-between group border-r border-slate-800">
                                            <div className="flex items-center gap-3">
                                                {isWinner && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                                                <input 
                                                    value={opt.name}
                                                    onChange={(e) => setOptions(options.map(x => x.id === opt.id ? { ...x, name: e.target.value } : x))}
                                                    className="bg-transparent font-bold text-sm text-white focus:outline-none w-full"
                                                />
                                            </div>
                                            <button onClick={() => deleteOption(opt.id)} className="text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {criteria.map(c => (
                                            <div key={c.id} className="p-4 border-r border-slate-800 flex items-center justify-center">
                                                <input 
                                                    type="number"
                                                    min="0" max="10"
                                                    value={opt.scores[c.id] || 0}
                                                    onChange={(e) => updateScore(opt.id, c.id, Number(e.target.value))}
                                                    className={`w-12 h-8 rounded text-center font-mono font-bold focus:outline-none transition-all ${
                                                        (opt.scores[c.id] || 0) >= 8 ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-500/30' :
                                                        (opt.scores[c.id] || 0) <= 4 ? 'bg-red-900/20 text-red-400 border border-red-500/30' :
                                                        'bg-slate-800 text-slate-300 border border-slate-700'
                                                    }`}
                                                />
                                            </div>
                                        ))}

                                        <div className="p-4 flex flex-col items-center justify-center">
                                            <span className={`text-xl font-black ${isWinner ? 'text-emerald-400' : 'text-slate-500'}`}>
                                                {result.total}
                                            </span>
                                            <span className="text-[9px] font-mono text-slate-600">{result.percent.toFixed(0)}%</span>
                                        </div>
                                    </MotionDiv>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Analysis Report */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                            <Check className="w-24 h-24 text-emerald-500" />
                        </div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Recommendation</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <span className="text-xl font-black text-white">#1</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white">{topOption.name}</h2>
                                <p className="text-sm text-emerald-400">Highest Weighted Score ({calculateScore(topOption).total})</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
                            Based on your weighted criteria, <strong>{topOption.name}</strong> is the mathematically optimal choice. 
                            Ensure that your weights (e.g., giving importance to {[...criteria].sort((a,b) => b.weight - a.weight)[0]?.name || 'Top Criteria'}) align with true business goals.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Trade-off Analysis
                        </h3>
                        <div className="space-y-4">
                            {options.map(opt => {
                                // Find weakest criteria for each option
                                const scores = Object.entries(opt.scores).map(([cid, score]) => ({
                                    name: criteria.find(c => c.id === cid)?.name,
                                    score: score as number
                                }));
                                const weak = scores.sort((a, b) => Number(a.score) - Number(b.score))[0];
                                
                                return (
                                    <div key={opt.id} className="flex justify-between items-center text-sm border-b border-slate-800 pb-2 last:border-0">
                                        <span className="font-bold text-slate-300">{opt.name}</span>
                                        <span className="text-xs text-red-400 font-mono">
                                            Weakest in: {weak?.name || 'N/A'} ({weak?.score || 0})
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TechStackMatrix;