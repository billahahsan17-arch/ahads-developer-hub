
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Zap, Server, Database, Layers } from 'lucide-react';

const BigOPlotter: React.FC = () => {
    const [range, setRange] = useState(20);
    const [showConstant, setShowConstant] = useState(true);
    const [showLog, setShowLog] = useState(true);
    const [showLinear, setShowLinear] = useState(true);
    const [showLinearithmic, setShowLinearithmic] = useState(true);
    const [showQuadratic, setShowQuadratic] = useState(true);
    const [showExponential, setShowExponential] = useState(false); // Default off as it scales too fast

    const generateData = () => {
        const data = [];
        for (let n = 1; n <= range; n++) {
            data.push({
                n: n,
                O1: 1,
                OlogN: Math.log2(n),
                On: n,
                OnLogN: n * Math.log2(n),
                On2: n * n,
                O2n: Math.pow(2, n)
            });
        }
        return data;
    };

    const data = generateData();

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300 overflow-hidden">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-900/20 rounded-lg border border-purple-500/30">
                        <Activity className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Big-O Visualizer</h1>
                        <p className="text-[10px] font-mono text-slate-500">Algorithmic Complexity Plotter</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Input Size (N)</span>
                        <input 
                            type="range" 
                            min="5" max="50" 
                            value={range} 
                            onChange={(e) => setRange(Number(e.target.value))}
                            className="w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                        <span className="text-xs font-mono text-white w-6 text-right">{range}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                
                {/* Controls Sidebar */}
                <div className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-6 overflow-y-auto">
                    <div className="space-y-4">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Complexity Classes</div>
                        
                        <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors">
                            <input type="checkbox" checked={showConstant} onChange={() => setShowConstant(!showConstant)} className="accent-emerald-500" />
                            <div className="flex-1">
                                <div className="text-xs font-bold text-emerald-400">O(1)</div>
                                <div className="text-[10px] text-slate-500">Constant</div>
                            </div>
                            <Zap className="w-4 h-4 text-slate-600" />
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors">
                            <input type="checkbox" checked={showLog} onChange={() => setShowLog(!showLog)} className="accent-blue-500" />
                            <div className="flex-1">
                                <div className="text-xs font-bold text-blue-400">O(log n)</div>
                                <div className="text-[10px] text-slate-500">Logarithmic</div>
                            </div>
                            <Database className="w-4 h-4 text-slate-600" />
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors">
                            <input type="checkbox" checked={showLinear} onChange={() => setShowLinear(!showLinear)} className="accent-yellow-500" />
                            <div className="flex-1">
                                <div className="text-xs font-bold text-yellow-400">O(n)</div>
                                <div className="text-[10px] text-slate-500">Linear</div>
                            </div>
                            <Layers className="w-4 h-4 text-slate-600" />
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors">
                            <input type="checkbox" checked={showLinearithmic} onChange={() => setShowLinearithmic(!showLinearithmic)} className="accent-orange-500" />
                            <div className="flex-1">
                                <div className="text-xs font-bold text-orange-400">O(n log n)</div>
                                <div className="text-[10px] text-slate-500">Linearithmic</div>
                            </div>
                            <Activity className="w-4 h-4 text-slate-600" />
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors">
                            <input type="checkbox" checked={showQuadratic} onChange={() => setShowQuadratic(!showQuadratic)} className="accent-red-500" />
                            <div className="flex-1">
                                <div className="text-xs font-bold text-red-400">O(n²)</div>
                                <div className="text-[10px] text-slate-500">Quadratic</div>
                            </div>
                            <Server className="w-4 h-4 text-slate-600" />
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors">
                            <input type="checkbox" checked={showExponential} onChange={() => setShowExponential(!showExponential)} className="accent-purple-500" />
                            <div className="flex-1">
                                <div className="text-xs font-bold text-purple-400">O(2ⁿ)</div>
                                <div className="text-[10px] text-slate-500">Exponential</div>
                            </div>
                            <Activity className="w-4 h-4 text-slate-600" />
                        </label>
                    </div>

                    <div className="mt-auto p-4 bg-slate-950 rounded-lg border border-slate-800 text-[10px] text-slate-500 leading-relaxed font-mono">
                        <span className="text-purple-500 font-bold block mb-1">TIP:</span>
                        Scalability is about how execution time grows relative to input size. O(n²) algorithms (like Bubble Sort) collapse under heavy load.
                    </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 p-6 relative overflow-hidden bg-[#020617]">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                    
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="n" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} label={{ value: 'Elements (n)', position: 'insideBottomRight', offset: -10, fill: '#64748b', fontSize: 10 }} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} label={{ value: 'Operations (N)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '12px' }}
                                itemStyle={{ color: '#e2e8f0' }}
                                labelStyle={{ color: '#94a3b8', marginBottom: '5px' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            
                            {showConstant && <Line type="monotone" dataKey="O1" stroke="#10b981" strokeWidth={3} dot={false} name="O(1)" />}
                            {showLog && <Line type="monotone" dataKey="OlogN" stroke="#3b82f6" strokeWidth={3} dot={false} name="O(log n)" />}
                            {showLinear && <Line type="monotone" dataKey="On" stroke="#eab308" strokeWidth={3} dot={false} name="O(n)" />}
                            {showLinearithmic && <Line type="monotone" dataKey="OnLogN" stroke="#f97316" strokeWidth={3} dot={false} name="O(n log n)" />}
                            {showQuadratic && <Line type="monotone" dataKey="On2" stroke="#ef4444" strokeWidth={3} dot={false} name="O(n²)" />}
                            {showExponential && <Line type="monotone" dataKey="O2n" stroke="#a855f7" strokeWidth={3} dot={false} name="O(2ⁿ)" />}
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default BigOPlotter;
