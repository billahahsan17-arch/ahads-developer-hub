
import React from 'react';
import { Link } from 'react-router-dom';
import { LAB_SECTORS } from '../data/labFeatures';
import type { LabFeature } from '../data/labFeatures';
import { Brain, Sparkles, Zap, Construction, ArrowRight, Icon } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionLink = motion(Link) as any;

// --- Optimized Data Processing & Component Encapsulation ---

interface SectorWithAI extends Omit<typeof LAB_SECTORS[0], 'features'> {
    features: LabFeature[];
}

// 1. More efficient data transformation using a single reduce pass.
const aiSectors = LAB_SECTORS.reduce<SectorWithAI[]>((acc, sector) => {
    const aiFeatures = sector.features.filter(f => f.isAI);
    if (aiFeatures.length > 0) {
        acc.push({ ...sector, features: aiFeatures });
    }
    return acc;
}, []);

// 2. Dynamic calculation of the total number of AI features.
const totalAIEngines = aiSectors.reduce((sum, sector) => sum + sector.features.length, 0);

// 3. Encapsulated card component for cleaner code and better maintainability.
const AIModuleCard: React.FC<{ feature: LabFeature }> = ({ feature }) => {
    const isAvailable = feature.status === 'AVAILABLE';

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    };

    return (
        <MotionLink
            variants={cardVariants}
            to={isAvailable ? feature.path : `/lab/${feature.id}`}
            className={`group relative flex flex-col p-5 rounded-xl border transition-all duration-300 h-full overflow-hidden ${
                isAvailable
                    ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-1'
                    : 'bg-slate-950 border-slate-900 opacity-60 hover:opacity-80 hover:border-slate-800'
            }`}
        >
            {isAvailable && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            <div className="flex justify-between items-start mb-3 z-10">
                <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    isAvailable ? 'bg-indigo-900/20 text-indigo-400 group-hover:text-white group-hover:bg-indigo-600' : 'bg-slate-800 text-slate-600'
                }`}>
                    <feature.icon className="w-5 h-5" />
                </div>
                {feature.elite && (
                    <span className="text-[9px] font-bold text-amber-500 bg-amber-900/20 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">ELITE</span>
                )}
            </div>

            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-indigo-200 transition-colors duration-200">
                {feature.title}
            </h3>
            
            <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">
                {feature.description}
            </p>

            <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-800/50">
                <span className={`text-[10px] font-bold uppercase flex items-center gap-1.5 ${
                    isAvailable ? 'text-emerald-500' : 'text-slate-600'
                }`}>
                    {isAvailable ? <><Zap className="w-3 h-3 fill-current" /> Online</> : <><Construction className="w-3 h-3" /> In Development</>}
                </span>
                {isAvailable && (
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform duration-200" />
                )}
            </div>
        </MotionLink>
    );
};


export default function AIArsenal() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    return (
        <div className="h-full bg-[#020617] text-slate-300 overflow-y-auto custom-scrollbar">
            <header className="relative border-b border-slate-800 bg-slate-950/50 pt-16 pb-12 px-6 md:px-12 overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Brain className="w-64 h-64 text-indigo-500" />
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                            <Sparkles className="w-10 h-10 text-indigo-400" />
                        </div>
                        <div>
                             {/* 4. Dynamically display the correct number of engines */}
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">The AI Arsenal</h1>
                            <p className="text-slate-400 font-mono text-sm tracking-widest mt-1">{totalAIEngines} Neural Engines // Engineering Intelligence</p>
                        </div>
                    </motion.div>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-2xl text-slate-400 leading-relaxed border-l-2 border-indigo-500/50 pl-6">
                        A curated collection of Generative AI tools designed specifically for software engineering mastery. 
                        From code auditing to career strategy, these engines augment your capability.
                    </motion.p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 md:p-12 pb-32 space-y-16">
                {aiSectors.map((sector) => (
                    <section key={sector.id}>
                        <motion.div initial={{ opacity: 0, y:10 }} whileInView={{ opacity: 1, y:0 }} viewport={{once: true}} transition={{duration: 0.5, delay: 0.3}} className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-2">
                            <h2 className="text-xl font-black text-indigo-400 uppercase tracking-widest">{sector.title}</h2>
                            <span className="text-xs font-mono text-slate-500">// {sector.features.length} Modules</span>
                        </motion.div>
                        
                        {/* 5. Superior stagger animation for the grid */}
                        <MotionDiv 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                        >
                            {sector.features.map((feature) => (
                                <AIModuleCard key={feature.id} feature={feature} />
                            ))}
                        </MotionDiv>
                    </section>
                ))}
            </main>
        </div>
    );
};
