
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { PILLARS } from '../constants';
import { 
    Clock, Award, Flame, BookOpen, ArrowRight, 
    Calendar, Shield, Zap, AlertOctagon,
    Dna, Terminal, Cpu, Activity, Globe, Loader, MessageSquare, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import ConstellationMap from '../components/dashboard/ConstellationMap';
import ComplexityRadar from '../components/dashboard/ComplexityRadar';
import HeroScene from '../components/hero/ThreeHero';
import { startGenesisProtocol, stopGenesisProtocol, subscribeToGenesis, GenesisState } from '../services/genesisService';

// Workaround for react-router-dom type mismatch
const { Link } = ReactRouterDOM as any;

const MotionDiv = motion.div as any;

// --- GENESIS MONITOR WIDGET ---
const GenesisMonitor = () => {
    const [status, setStatus] = useState<GenesisState>({ 
        isActive: false, totalTopics: 0, completedTopics: 0, currentTopic: '', logs: [], startTime: 0 
    });

    useEffect(() => {
        // Auto-start the protocol when the dashboard mounts
        startGenesisProtocol();
        const unsubscribe = subscribeToGenesis(setStatus);
        return () => { unsubscribe(); };
    }, []);

    const progress = status.totalTopics > 0 ? (status.completedTopics / status.totalTopics) * 100 : 0;

    if (!status.isActive && status.completedTopics === 0) {
        return (
            <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden group"
            >
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                            <Cpu className="w-6 h-6 text-indigo-400 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Genesis Protocol</h3>
                            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono">
                                <Loader className="w-3 h-3 animate-spin" />
                                AUTO-INITIALIZING NEURAL UPLINK...
                            </div>
                        </div>
                    </div>
                </div>
            </MotionDiv>
        );
    }

    return (
        <MotionDiv 
            layout
            className="col-span-full bg-slate-950 border border-indigo-500 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.15)]"
        >
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(99,102,241,0.1)_50%)] bg-[length:100%_4px]" />
            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-indigo-400 animate-pulse" />
                            <h3 className="text-lg font-black text-white uppercase tracking-tight">Genesis Active</h3>
                        </div>
                        <button onClick={stopGenesisProtocol} className="text-xs text-red-400 hover:text-red-300 font-mono uppercase border border-red-900 bg-red-900/20 px-3 py-1 rounded">
                            Abort Sequence
                        </button>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-indigo-300 uppercase">
                            <span>System Integrity</span>
                            <span>{Math.round(progress)}% Complete</span>
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <MotionDiv 
                                className="h-full bg-indigo-500 relative"
                                style={{ width: `${progress}%` }}
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[4px]" />
                            </MotionDiv>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono text-right">
                            {status.completedTopics} / {status.totalTopics} Nodes Synthesized
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4 border border-indigo-500/20">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">Current Directive</div>
                        <div className="text-white font-mono text-sm truncate flex items-center gap-2">
                            <Globe className="w-4 h-4 text-indigo-400 animate-spin-slow" />
                            {status.currentTopic || "Initializing..."}
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-black rounded-lg border border-slate-800 p-4 font-mono text-xs h-48 overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900 border-b border-slate-800 flex items-center px-2 text-[9px] text-slate-500 uppercase tracking-widest">
                        Neural_Log_Stream_v4.0
                    </div>
                    <div className="mt-6 space-y-1 h-full overflow-y-auto custom-scrollbar flex flex-col-reverse">
                        {status.logs.map((log, i) => (
                            <MotionDiv 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                className={`truncate ${log.includes('[ERROR]') ? 'text-red-400' : log.includes('[SUCCESS]') ? 'text-emerald-400' : 'text-slate-400'}`}
                            >
                                <span className="opacity-30 mr-2">
                                    {new Date().toLocaleTimeString().split(' ')[0]}
                                </span>
                                {log}
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
};

export default function Dashboard() {
  const { stats } = useProgress();
  const hoursLearned = Math.floor(stats.totalSeconds / 3600);

  const realStats = [
      { label: 'System Uptime', value: `${hoursLearned}h`, sub: 'Active Learning', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
      { label: 'Modules Certified', value: stats.completedModules.length.toString(), sub: 'Core Systems', icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
      { label: 'Engineering XP', value: stats.xp.toLocaleString(), sub: 'Global Rank: Elite', icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
      { label: 'Consistency', value: `${stats.streakDays} Days`, sub: "Momentum", icon: Flame, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#020617]">
        
        {/* --- HERO SECTION --- */}
        <div className="h-[60vh] relative z-0">
            <HeroScene />
        </div>

        {/* --- MAIN CONTENT OVERLAY --- */}
        <div className="absolute inset-0 pt-[55vh] z-10 overflow-y-auto custom-scrollbar">
            
            {/* Dashboard Panels */}
            <div className="bg-[#020617] border-t border-slate-900/50 shadow-[0_-50px_100px_#020617] min-h-screen">
                <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 pb-32">
                    
                    <GenesisMonitor />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {realStats.map((stat, i) => (
                            <MotionDiv 
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.1 * i, duration: 0.5, type: "spring" }}
                                className="spotlight-card relative p-6 rounded-2xl bg-[#0b0f19]/90 backdrop-blur-md border border-slate-800/60 overflow-hidden group hover:border-slate-600 transition-all hover:-translate-y-1 shadow-2xl"
                            >
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border shadow-lg`}>
                                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                        </div>
                                        {i === 2 && <div className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded uppercase tracking-wider animate-pulse">Rank {Math.floor(stats.xp / 1000)}</div>}
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
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        <div className="lg:col-span-2 h-[450px] relative z-10">
                            <ConstellationMap pillars={PILLARS} />
                        </div>
                        <div className="h-[450px] relative z-10">
                            <ComplexityRadar pillars={PILLARS} />
                        </div>
                    </MotionDiv>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                                <h2 className="text-xl font-bold text-white tracking-tight uppercase">Active Sectors</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {PILLARS.map((pillar, i) => (
                                    <MotionDiv
                                        key={pillar.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link 
                                            to={`/pillar/${pillar.id}`}
                                            className="spotlight-card flex flex-col w-full relative bg-[#0b0f19] rounded-2xl border border-slate-800/60 overflow-hidden group hover:border-slate-600 transition-all duration-300 hover:shadow-2xl"
                                        >
                                            <div className="h-32 bg-slate-900/30 relative overflow-hidden flex-shrink-0">
                                                <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${pillar.color.replace('text-', 'bg-')}`}></div>
                                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                                <div className="absolute bottom-4 left-4 p-2 bg-[#0b0f19] rounded-lg border border-slate-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                    <Shield className={`w-5 h-5 ${pillar.color}`} />
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    <div className="px-2 py-1 bg-black/60 backdrop-blur rounded border border-white/5 text-[9px] font-bold uppercase tracking-wider text-white">
                                                        {pillar.code}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className={`text-xs font-bold ${pillar.color} mb-1 uppercase tracking-wider`}>
                                                        {pillar.title.split(':')[0]}
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-white mb-4 line-clamp-1 group-hover:text-blue-200 transition-colors">
                                                    {pillar.title.split(':')[1] || pillar.title}
                                                </h3>
                                                <div className="flex-1"></div>
                                                <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-800/50">
                                                    <div className="text-[10px] text-slate-500 font-mono">
                                                        {pillar.sections.length} Sections
                                                    </div>
                                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </MotionDiv>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <MotionDiv 
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-[#0b0f19] rounded-2xl border border-rose-500/20 p-6 relative overflow-hidden group hover:border-rose-500/40 transition-colors shadow-lg"
                            >
                                <div className="absolute inset-0 bg-rose-900/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex justify-between items-center mb-4 relative z-10">
                                    <div className="flex items-center gap-2 text-rose-500">
                                        <Dna className="w-5 h-5" />
                                        <h3 className="font-bold text-sm uppercase tracking-wider">Mistake Genome</h3>
                                    </div>
                                    <span className="text-2xl font-black text-white">{stats.mistakeCount}</span>
                                </div>
                                <div className="flex gap-1 h-8 mb-4 opacity-50 group-hover:opacity-100 transition-opacity relative z-10">
                                    {Array.from({length: 10}).map((_, i) => (
                                        <div key={i} className={`flex-1 rounded-sm transition-all duration-500 ${i < (stats.mistakeCount % 10) ? 'bg-rose-500 shadow-[0_0_5px_#f43f5e]' : 'bg-slate-800'}`} />
                                    ))}
                                </div>
                                <p className="text-xs text-slate-400 mb-4 relative z-10">
                                    Errors are data points. Analyze your failure patterns in the Lab to evolve.
                                </p>
                                <Link to="/lab/genome" className="relative z-10 w-full py-2 bg-rose-900/20 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                                    Analyze Pattern
                                </Link>
                            </MotionDiv>

                            <div className="flex items-center gap-3">
                                <div className="h-6 w-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"></div>
                                <h2 className="text-xl font-bold text-white tracking-tight uppercase">System Events</h2>
                            </div>
                            
                            <MotionDiv 
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-[#0b0f19] rounded-2xl border border-slate-800/60 p-6 space-y-6 relative overflow-hidden"
                            >
                                {[
                                    { day: '24', month: 'OCT', title: 'Live Mentorship', time: '10:00 AM', tag: 'Mentorship', icon: Zap },
                                    { day: '26', month: 'OCT', title: 'API Deadline', time: '11:59 PM', tag: 'Critical', color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: AlertOctagon },
                                    { day: '28', month: 'OCT', title: 'Code Review', time: '02:00 PM', tag: 'Review', icon: BookOpen },
                                ].map((event, i) => (
                                    <div key={i} className="flex gap-4 group cursor-pointer">
                                        <div className="flex flex-col items-center justify-center w-14 h-16 bg-slate-900 rounded-xl border border-slate-800 group-hover:border-slate-600 transition-all shadow-inner">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">{event.month}</span>
                                            <span className="text-xl font-black text-white">{event.day}</span>
                                        </div>
                                        <div className="flex-1 py-1">
                                            <h4 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">{event.title}</h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                                <Clock className="w-3 h-3" /> {event.time}
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${event.color || 'text-slate-400 bg-slate-900 border-slate-700'}`}>
                                                {event.tag}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    Full Calendar
                                </button>
                            </MotionDiv>
                        </div>
                    </div>

                    {/* --- NEW COMMUNITY SECTION --- */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-slate-900 to-indigo-950/30 rounded-2xl border border-slate-800 p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">The Community Codex</h2>
                                <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                                    A persistent repository of engineering wisdom. Rate the platform, share insights, or submit your own knowledge. 
                                    <br/><span className="text-indigo-400 font-bold">Atlas AI judges all submissions. Only the worthy survive.</span>
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Link 
                                    to="/community" 
                                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center gap-2"
                                >
                                    <Users className="w-4 h-4" /> Enter Hub
                                </Link>
                                <Link 
                                    to="/community" 
                                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase tracking-widest rounded-xl transition-all border border-slate-700 flex items-center gap-2"
                                >
                                    <MessageSquare className="w-4 h-4" /> Rate Us
                                </Link>
                            </div>
                        </div>
                    </MotionDiv>

                </div>
            </div>
        </div>
    );
};
