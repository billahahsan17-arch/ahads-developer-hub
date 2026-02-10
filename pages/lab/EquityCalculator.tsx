
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, PieChart, Lock, Unlock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const EquityCalculator: React.FC = () => {
    const [grantSize, setGrantSize] = useState(10000);
    const [strikePrice, setStrikePrice] = useState(0.50);
    const [prefPrice, setPrefPrice] = useState(5.00); // Current/Exit price
    const [taxRate, setTaxRate] = useState(30);
    const [vestingMonths, setVestingMonths] = useState(48);
    const [cliffMonths, setCliffMonths] = useState(12);
    const [monthsServed, setMonthsServed] = useState(18);

    // Derived Metrics
    const grossValue = grantSize * (prefPrice - strikePrice);
    const taxLiability = (grossValue * taxRate) / 100;
    const netValue = grossValue - taxLiability;
    
    // Vesting Calculation
    const isCliffPassed = monthsServed >= cliffMonths;
    const vestedPercentage = isCliffPassed 
        ? Math.min(100, (monthsServed / vestingMonths) * 100) 
        : 0;
    
    const vestedShares = Math.floor(grantSize * (vestedPercentage / 100));
    const vestedValue = vestedShares * (prefPrice - strikePrice);

    return (
        <div className="h-full bg-slate-950 p-6 md:p-10 font-sans text-slate-300 overflow-y-auto custom-scrollbar">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-900/20 rounded-xl border border-emerald-500/20">
                            <DollarSign className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">Equity Engine</h1>
                            <p className="text-slate-500 font-mono text-sm">Startup Compensation & Vesting Simulator</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Inputs Panel */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Grant Parameters
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5">Total Options / RSUs</label>
                                    <input 
                                        type="number" 
                                        value={grantSize} 
                                        onChange={(e) => setGrantSize(Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-400 block mb-1.5">Strike Price ($)</label>
                                        <input 
                                            type="number" 
                                            step="0.01"
                                            value={strikePrice} 
                                            onChange={(e) => setStrikePrice(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-400 block mb-1.5">Exit Price ($)</label>
                                        <input 
                                            type="number" 
                                            step="0.10"
                                            value={prefPrice} 
                                            onChange={(e) => setPrefPrice(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5">Est. Tax Rate (%)</label>
                                    <input 
                                        type="number" 
                                        value={taxRate} 
                                        onChange={(e) => setTaxRate(Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Timeline
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <label className="text-slate-400">Time Served</label>
                                        <span className="text-white font-mono">{monthsServed} Months</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" max="60" 
                                        value={monthsServed} 
                                        onChange={(e) => setMonthsServed(Number(e.target.value))}
                                        className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-400 block mb-1.5">Vesting Period (Mo)</label>
                                        <input 
                                            type="number" 
                                            value={vestingMonths} 
                                            onChange={(e) => setVestingMonths(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-400 block mb-1.5">Cliff (Mo)</label>
                                        <input 
                                            type="number" 
                                            value={cliffMonths} 
                                            onChange={(e) => setCliffMonths(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Big Numbers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between relative overflow-hidden group">
                                <div className="absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Gross Value</div>
                                    <div className="text-3xl font-black text-white tracking-tight">
                                        ${grossValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                                    <span>If sold today</span>
                                </div>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between relative overflow-hidden group">
                                <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Net Vested Value</div>
                                    <div className="text-3xl font-black text-emerald-400 tracking-tight">
                                        ${vestedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                                    <Unlock className="w-3 h-3 text-blue-500" />
                                    <span>{vestedShares.toLocaleString()} shares unlocked</span>
                                </div>
                            </div>
                        </div>

                        {/* Vesting Visualizer */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 relative overflow-hidden">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Vesting Schedule Visualization</h3>
                            
                            <div className="relative h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                                {/* Vested Bar */}
                                <MotionDiv 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${vestedPercentage}%` }}
                                    className="h-full bg-emerald-500 relative"
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-px bg-white/50 shadow-[0_0_10px_white]" />
                                </MotionDiv>
                                {/* Cliff Marker */}
                                <div 
                                    className="absolute top-0 bottom-0 w-px bg-red-500/50 z-10" 
                                    style={{ left: `${(cliffMonths / vestingMonths) * 100}%` }}
                                    title="Cliff"
                                />
                            </div>
                            
                            <div className="flex justify-between mt-2 text-[10px] font-mono text-slate-500 uppercase">
                                <span>Day 0</span>
                                <span className="text-red-400" style={{ marginLeft: '-15%' }}>Cliff ({cliffMonths}m)</span>
                                <span>{vestingMonths} Months</span>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-8">
                                <div className="bg-black/20 p-4 rounded-lg border border-slate-800/50">
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>Cost to Exercise</span>
                                        <span>${(vestedShares * strikePrice).toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500" style={{ width: `${(strikePrice / prefPrice) * 100}%` }}></div>
                                    </div>
                                </div>
                                <div className="bg-black/20 p-4 rounded-lg border border-slate-800/50">
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>Tax Liability</span>
                                        <span>${((vestedValue * taxRate) / 100).toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500" style={{ width: `${taxRate}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Warning Box */}
                        <div className="bg-amber-900/10 border border-amber-500/20 p-4 rounded-xl flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <div className="text-xs text-amber-200/70 leading-relaxed">
                                <strong>Disclaimer:</strong> This is a simulation for educational purposes only. It uses simplified tax models and assumes liquid markets. Do not use this for actual financial or tax planning. Always consult a qualified CPA.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquityCalculator;
