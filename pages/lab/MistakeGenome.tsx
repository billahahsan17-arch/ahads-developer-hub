
import React, { useState } from 'react';
import { Dna, AlertTriangle, Activity, Brain, Target, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

// Mock Data
const MISTAKE_DATA = [
    { type: 'Conceptual', count: 12, color: 'text-red-500', bg: 'bg-red-500', desc: 'Misunderstanding the core model of a system. The most expensive error type.' },
    { type: 'Logic', count: 8, color: 'text-orange-500', bg: 'bg-orange-500', desc: 'Off-by-one errors, infinite loops, race conditions. Hard to debug.' },
    { type: 'Syntax', count: 4, color: 'text-blue-500', bg: 'bg-blue-500', desc: 'Typographical errors, missing semicolons. Caught by compilers.' },
    { type: 'Assumption', count: 15, color: 'text-purple-500', bg: 'bg-purple-500', desc: 'Assuming data format, API reliability, or user behavior. Silent killers.' },
    { type: 'Tooling', count: 3, color: 'text-gray-500', bg: 'bg-gray-500', desc: 'Git commands, Docker config, IDE setup. Environment issues.' },
];

const MistakeGenome: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    return (
        <div className="h-full bg-slate-950 p-6 md:p-10 font-sans text-slate-300 overflow-y-auto custom-scrollbar flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-12 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-900/20 rounded-xl border border-rose-500/20 shadow-[0_0_15px_rgba(225,29,72,0.2)]">
                        <Dna className="w-8 h-8 text-rose-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight uppercase">Mistake Genome</h1>
                        <p className="text-slate-500 font-mono text-sm">Error Pattern Analysis & DNA Sequencing</p>
                    </div>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-xs font-mono text-slate-500 uppercase mb-1">Total Errors Indexed</div>
                    <div className="text-2xl font-black text-rose-400">42</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1">
                
                {/* Left: DNA Helix Visualization */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px] shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/10 via-slate-900 to-slate-950 pointer-events-none"></div>
                    
                    <h3 className="absolute top-6 left-6 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Sequencing Active
                    </h3>

                    {/* Animated Helix Simulation */}
                    <div className="relative w-32 h-[400px] flex flex-col justify-between py-8">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div key={i} className="relative w-full h-2 flex items-center justify-center">
                                {/* Left Base */}
                                <MotionDiv 
                                    className="absolute left-0 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10"
                                    animate={{ x: [0, 100, 0], scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                                />
                                {/* Connector Line */}
                                <MotionDiv 
                                    className="absolute h-[1px] bg-slate-700"
                                    style={{ width: '100px' }}
                                    animate={{ rotateY: [0, 180, 360], opacity: [0.1, 0.5, 0.1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
                                />
                                {/* Right Base */}
                                <MotionDiv 
                                    className="absolute right-0 w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] z-10"
                                    animate={{ x: [0, -100, 0], scale: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                                />
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 text-center bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800">
                        <p className="text-xs font-mono text-slate-400">
                            Dominant Pattern: <span className="text-rose-400 font-bold">Assumption Bias (35%)</span>
                        </p>
                    </div>
                </div>

                {/* Right: Genome Analysis Breakdown */}
                <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        {MISTAKE_DATA.map((item) => (
                            <MotionButton
                                key={item.type}
                                whileHover={{ scale: 1.01, x: 4 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setSelectedType(item.type)}
                                className={`relative overflow-hidden p-4 rounded-xl border transition-all ${
                                    selectedType === item.type 
                                    ? 'bg-slate-800 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]' 
                                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                                }`}
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-8 rounded-full ${item.bg}`} />
                                        <div>
                                            <span className="font-bold text-slate-200 block text-sm">{item.type} Error</span>
                                            <span className="text-[10px] text-slate-500 font-mono uppercase">Frequency: High</span>
                                        </div>
                                    </div>
                                    <span className="font-black text-2xl text-slate-500 opacity-50">{item.count}</span>
                                </div>
                                {/* Progress Bar Background */}
                                <div className={`absolute bottom-0 left-0 h-full opacity-5 pointer-events-none transition-all duration-500 ${item.color}`} style={{ width: `${(item.count / 20) * 100}%`, backgroundColor: 'currentColor' }}></div>
                            </MotionButton>
                        ))}
                    </div>

                    {/* Context Panel */}
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                        {selectedType ? (
                            <MotionDiv 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={selectedType}
                                className="relative z-10"
                            >
                                <div className="flex items-center gap-2 mb-4 text-amber-500">
                                    <ShieldAlert className="w-5 h-5" /> 
                                    <h3 className="text-sm font-bold uppercase tracking-widest">Diagnostic Report</h3>
                                </div>
                                
                                <h2 className="text-2xl font-black text-white mb-2">{selectedType} Error</h2>
                                <p className="text-slate-400 mb-6 leading-relaxed border-l-2 border-slate-700 pl-4">
                                    {MISTAKE_DATA.find(m => m.type === selectedType)?.desc}
                                </p>
                                
                                <div className="p-5 bg-emerald-900/10 border border-emerald-500/20 rounded-lg">
                                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Target className="w-4 h-4" /> Correction Protocol
                                    </h4>
                                    <ul className="text-sm text-emerald-200/80 list-disc list-inside space-y-2 font-mono">
                                        <li>Analyze root cause using 5-Whys.</li>
                                        <li>Implement automated linting rules.</li>
                                        <li>Add unit test coverage for edge cases.</li>
                                    </ul>
                                </div>
                            </MotionDiv>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600">
                                <Brain className="w-16 h-16 mb-4 opacity-10" />
                                <p className="font-mono text-sm uppercase tracking-widest">Select a mutation to analyze</p>
                            </div>
                        )}
                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MistakeGenome;
