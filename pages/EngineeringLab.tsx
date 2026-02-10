
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LAB_SECTORS, LabFeature } from '../data/labFeatures';
import { Wrench, ArrowRight, Lock, Zap, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionLink = motion(Link) as any;

// --- OPTIMIZED DATA PROCESSING & COMPONENT ENCAPSULATION ---

interface SectorWithForgeTools extends Omit<typeof LAB_SECTORS[0], 'features'> {
    features: LabFeature[];
}

// 1. More efficient data transformation using a single reduce pass.
const forgeSectors = LAB_SECTORS.reduce<SectorWithForgeTools[]>((acc, sector) => {
    const forgeFeatures = sector.features.filter(f => !f.isAI);
    if (forgeFeatures.length > 0) {
        acc.push({ ...sector, features: forgeFeatures });
    }
    return acc;
}, []);

// 2. Dynamic calculation of the total number of Forge simulators.
const totalForgeSimulators = forgeSectors.reduce((sum, sector) => sum + sector.features.length, 0);

// 3. Encapsulated card component for cleaner code and better maintainability.
const ForgeToolCard: React.FC<{ feature: LabFeature }> = ({ feature }) => {
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
                    ? 'bg-slate-900 border-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-1'
                    : 'bg-slate-950 border-slate-900 opacity-60 hover:opacity-80 hover:border-slate-800'
            }`}
        >
            {isAvailable && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            <div className="flex justify-between items-start mb-3 z-10">
                <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    isAvailable ? 'bg-amber-900/20 text-amber-400 group-hover:text-white group-hover:bg-amber-600' : 'bg-slate-800 text-slate-600'
                }`}>
                    <feature.icon className="w-5 h-5" />
                </div>
            </div>

            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-amber-200 transition-colors duration-200">
                {feature.title}
            </h3>
            
            <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">
                {feature.description}
            </p>

            <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-800/50">
                <span className={`text-[10px] font-bold uppercase flex items-center gap-1.5 ${
                    isAvailable ? 'text-emerald-500' : 'text-slate-600'
                }`}>
                    {isAvailable ? <><Zap className="w-3 h-3 fill-current" /> Active</> : <><Hammer className="w-3 h-3" /> In Development</>}
                </span>
                {isAvailable ? (
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform duration-200" />
                ) : (
                    <Lock className="w-3 h-3 text-slate-700" />
                )}
            </div>
        </MotionLink>
    );
};

export default function EngineeringLab() {
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
    <div className="h-full overflow-y-auto custom-scrollbar bg-[#020617] text-slate-300">
      <header className="relative border-b border-slate-800 bg-slate-950/50 pt-16 pb-12 px-6 md:px-12 overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Wrench className="w-64 h-64 text-amber-500" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}\n            className="relative z-10 max-w-7xl mx-auto"
          >
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                      <Wrench className="w-10 h-10 text-amber-400" />
                  </div>
                  <div>
                      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">The Forge</h1>
                      {/* 4. DYNAMICALLY DISPLAY THE CORRECT NUMBER OF SIMULATORS */}
                      <p className="text-slate-400 font-mono text-sm tracking-widest mt-1">{totalForgeSimulators} Deterministic Simulators // Manual Mastery</p>
                  </div>
              </div>
              <p className="max-w-2xl text-slate-400 leading-relaxed border-l-2 border-amber-500/50 pl-6">
                  No AI assistance. No shortcuts. Just pure engineering drills, deterministic logic, and manual debugging simulators to forge your raw skill.
              </p>
          </motion.div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-12 pb-32 space-y-16">
        {forgeSectors.map((sector) => (
            <section key={sector.id}>
                <motion.div initial={{ opacity: 0, y:10 }} whileInView={{ opacity: 1, y:0 }} viewport={{once: true}} transition={{duration: 0.5, delay: 0.3}} className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-2">
                    <h2 className="text-xl font-black text-amber-500 uppercase tracking-widest">{sector.title}</h2>
                    <span className="text-xs font-mono text-slate-500">// {sector.features.length} Simulators</span>
                </motion.div>

                {/* 5. SUPERIOR STAGGER ANIMATION FOR THE GRID */}
                <MotionDiv 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                    {sector.features.map((tool) => (
                        <ForgeToolCard key={tool.id} feature={tool} />
                    ))}
                </MotionDiv>
            </section>
        ))}
      </main>
    </div>
  );
};
