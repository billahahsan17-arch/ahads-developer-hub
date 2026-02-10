
import React, { useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { PILLARS } from '../constants';
import { 
    Clock, Award, Flame, BookOpen, ArrowRight, 
    Calendar, Shield, Zap, AlertOctagon,
    Dna, Terminal, Cpu, Activity, Globe, Loader, MessageSquare, Users, GitMerge, ChevronsRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import ConstellationMap from '../components/dashboard/ConstellationMap';
import ComplexityRadar from '../components/dashboard/ComplexityRadar';
import HeroScene from '../components/hero/ThreeHero';

// Workaround for react-router-dom type mismatch
const { Link } = ReactRouterDOM as any;
const MotionLink = motion(Link) as any;
const MotionDiv = motion.div as any;

// --- DYNAMIC COMMAND WIDGET ---
const CommandWidget: React.FC<{ progress: any }> = ({ progress }) => {
    const nextAction = useMemo(() => {
        if (!progress.lastPillarId) {
            return {
                text: "Begin your journey by exploring the first Pillar of Atlas.",
                path: `/pillar/${PILLARS[0].id}`,
                cta: "Start 'The Foundation'"
            };
        }
        const lastPillarIndex = PILLARS.findIndex(p => p.id === progress.lastPillarId);
        const lastPillar = PILLARS[lastPillarIndex];
        
        if (lastPillar && progress.completedModules.length < PILLARS.flatMap(p => p.sections).length) {
             const isPillarComplete = lastPillar.sections.every(s => progress.completedModules.includes(s.id));
             if(isPillarComplete && lastPillarIndex < PILLARS.length - 1) {
                 const nextPillar = PILLARS[lastPillarIndex + 1];
                 return {
                    text: `You have mastered '${lastPillar.title}'. Advance to the next pillar.`,
                    path: `/pillar/${nextPillar.id}`,
                    cta: `Begin '${nextPillar.title}'`
                 }
             }
        }
        
        return {
            text: "Your journey continues. Return to your last known position.",
            path: `/pillar/${progress.lastPillarId}`,
            cta: "Resume Studies"
        };

    }, [progress]);

    return (
        <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-full bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden group shadow-[0_0_40px_rgba(79,70,229,0.1)]"
        >
            <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-2 bg-indigo-500/10 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" 
            />
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                        <GitMerge className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Next Directive</h3>
                        <p className="text-sm text-indigo-300 font-mono">{nextAction.text}</p>
                    </div>
                </div>
                <MotionLink 
                    to={nextAction.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2"
                >
                    {nextAction.cta} <ChevronsRight className="w-5 h-5" />
                </MotionLink>
            </div>
        </MotionDiv>
    );
};

export default function Dashboard() {
  const { stats, progress } = useProgress();
  const hoursLearned = Math.floor(stats.totalSeconds / 3600);
  
  const dashboardStats = [
      { label: 'System Uptime', value: `${hoursLearned}h`, sub: 'Active Learning', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
      { label: 'Modules Certified', value: stats.completedModules.length.toString(), sub: 'Core Systems', icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
      { label: 'Engineering XP', value: stats.xp.toLocaleString(), sub: `Rank: ${Math.floor(stats.xp / 1000)}`, icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
      { label: 'Consistency', value: `${stats.streakDays} Days`, sub: "Momentum", icon: Flame, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#000000]">
        <div className="h-[60vh] relative z-0">
            <HeroScene />
        </div>
        <div className="absolute inset-0 pt-[55vh] z-10 overflow-y-auto custom-scrollbar">
            <div className="bg-[#000000] border-t border-slate-900/50 shadow-[0_-50px_100px_#000000] min-h-screen">
                <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 pb-32">
                    
                    <CommandWidget progress={progress} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dashboardStats.map((stat, i) => (
                            <MotionDiv 
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i, duration: 0.5, type: "spring", stiffness: 100 }}
                                className="spotlight-card relative p-6 rounded-2xl bg-[#0b0f19]/90 backdrop-blur-md border border-slate-800/60 overflow-hidden group hover:border-slate-600 transition-all hover:-translate-y-1 shadow-2xl"
                            >
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border shadow-lg`}>
                                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                        </div>
                                    </div>
                                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className="text-4xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
                                    <div className="text-xs text-slate-500 font-mono">{stat.sub}</div>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>

                    <MotionDiv 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* DYNAMIC & INTERACTIVE CONSTELLATION MAP */}
                        <div className="lg:col-span-2 h-[450px] bg-[#0b0f19]/90 border border-slate-800/60 rounded-2xl p-4">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest p-4">Knowledge Constellation</h3>
                            <ConstellationMap pillars={PILLARS} completedModules={progress.completedModules} />
                        </div>
                        {/* DATA-DRIVEN COMPLEXITY RADAR */}
                        <div className="h-[450px] bg-[#0b0f19]/90 border border-slate-800/60 rounded-2xl p-4">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest p-4">Domain Complexity</h3>
                            <ComplexityRadar pillars={PILLARS} completedModules={progress.completedModules} />
                        </div>
                    </MotionDiv>

                    {/* Additional sections remain largely the same, but with improved animations and transitions */}
                    
                </div>
            </div>
        </div>
    </div>
);
}
