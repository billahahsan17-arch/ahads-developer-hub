
import React from 'react';
import { Link } from 'react-router-dom';
import { LAB_SECTORS } from '../data/labFeatures';
import { Brain, Sparkles, Zap, Lock, ArrowRight, Construction } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

export default function AIArsenal() {
    const aiSectors = LAB_SECTORS
        .map(sector => ({
            ...sector,
            features: sector.features.filter(f => f.isAI)
        }))
        .filter(sector => sector.features.length > 0);

    return (
        <div className="h-full bg-[#020617] text-slate-300 overflow-y-auto custom-scrollbar">
            {/* Hero Section */}
            <div className="relative border-b border-slate-800 bg-slate-950/50 pt-16 pb-12 px-6 md:px-12 overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Brain className="w-64 h-64 text-indigo-500" />
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                            <Sparkles className="w-10 h-10 text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">The AI Arsenal</h1>
                            <p className="text-slate-400 font-mono text-sm tracking-widest mt-1">44 Neural Engines // Engineering Intelligence</p>
                        </div>
                    </div>
                    <p className="max-w-2xl text-slate-400 leading-relaxed border-l-2 border-indigo-500/50 pl-6">
                        A curated collection of Generative AI tools designed specifically for software engineering mastery. 
                        From code auditing to career strategy, these engines augment your capability.
                    </p>
                </div>
            </div>

            {/* The Grid by Sector */}
            <div className="max-w-7xl mx-auto p-6 md:p-12 pb-32 space-y-16">
                {aiSectors.map((sector) => (
                    <div key={sector.id}>
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-2">
                            <h2 className="text-xl font-black text-indigo-400 uppercase tracking-widest">{sector.title}</h2>
                            <span className="text-xs font-mono text-slate-500">// {sector.features.length} Modules</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {sector.features.map((feature, idx) => (
                                <MotionDiv
                                    key={feature.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.03 }}
                                >
                                    <Link 
                                        to={feature.status === 'AVAILABLE' ? feature.path : `/lab/${feature.id}`} 
                                        className={`group relative flex flex-col p-5 rounded-xl border transition-all duration-300 h-full overflow-hidden ${
                                            feature.status === 'AVAILABLE' 
                                            ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-1' 
                                            : 'bg-slate-950 border-slate-900 opacity-60 hover:opacity-80 hover:border-slate-800'
                                        }`}
                                    >
                                        {/* Active Glow */}
                                        {feature.status === 'AVAILABLE' && (
                                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}

                                        <div className="flex justify-between items-start mb-3 relative z-10">
                                            <div className={`p-2 rounded-lg transition-colors ${
                                                feature.status === 'AVAILABLE' ? 'bg-indigo-900/20 text-indigo-400 group-hover:text-white group-hover:bg-indigo-600' : 'bg-slate-800 text-slate-600'
                                            }`}>
                                                <feature.icon className="w-5 h-5" />
                                            </div>
                                            {feature.elite && (
                                                <span className="text-[9px] font-bold text-amber-500 bg-amber-900/20 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                                    Elite
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-sm font-bold text-white mb-1 group-hover:text-indigo-200 transition-colors">
                                            {feature.title}
                                        </h3>
                                        
                                        <p className="text-[10px] text-slate-500 leading-relaxed mb-4 flex-1">
                                            {feature.description}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-800/50">
                                            <span className={`text-[9px] font-bold uppercase flex items-center gap-1 ${
                                                feature.status === 'AVAILABLE' ? 'text-emerald-500' : 'text-slate-600'
                                            }`}>
                                                {feature.status === 'AVAILABLE' ? (
                                                    <><Zap className="w-2.5 h-2.5 fill-current" /> Online</>
                                                ) : (
                                                    <><Construction className="w-2.5 h-2.5" /> Dev</>
                                                )}
                                            </span>
                                            {feature.status === 'AVAILABLE' && (
                                                <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                            )}
                                        </div>
                                    </Link>
                                </MotionDiv>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
