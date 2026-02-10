
import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { KnowledgeGraph } from '../services/KnowledgeGraph';
import { Pillar } from '../types';
import { 
    ChevronRight, Layers, List,
    Code, HardDrive, Zap, Cpu, Layout, Cloud, Brain, Database, Shield, Eye, Briefcase, Award 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Workaround for react-router-dom type mismatch
const { useParams, Link, Navigate, useLocation } = ReactRouterDOM as any;

const MotionDiv = motion.div as any;

const iconMap: Record<string, any> = {
    Code, HardDrive, Zap, Cpu, Layout, Cloud, Brain, Database, Shield, Eye, Briefcase, Award
};

const getHexColor = (twClass: string) => {
    if (twClass.includes('blue')) return '#3b82f6';
    if (twClass.includes('emerald')) return '#10b981';
    if (twClass.includes('indigo')) return '#6366f1';
    if (twClass.includes('amber')) return '#f59e0b';
    if (twClass.includes('purple')) return '#a855f7';
    if (twClass.includes('sky')) return '#0ea5e9';
    if (twClass.includes('cyan')) return '#06b6d4';
    if (twClass.includes('red')) return '#ef4444';
    if (twClass.includes('pink')) return '#ec4899';
    if (twClass.includes('teal')) return '#14b8a6';
    if (twClass.includes('orange')) return '#f97316';
    if (twClass.includes('slate')) return '#94a3b8';
    return '#64748b'; 
};

const PillarView: React.FC = () => {
  const { pillarId } = useParams();
  const location = useLocation();
  
  // O(1) Lookup
  const node = pillarId ? KnowledgeGraph.getNode(pillarId) : undefined;
  const pillar = (node?.type === 'PILLAR' ? node.data : undefined) as Pillar | undefined;

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  if (!pillar) return <Navigate to="/" />;

  const hexColor = getHexColor(pillar.color);
  const PillarIcon = iconMap[pillar.icon] || Layers;

  // Elite Background with Dynamic Gradient
  const uniqueBackgroundStyle = {
     background: `
        radial-gradient(circle at 100% 0%, ${hexColor}15 0%, transparent 60%),
        radial-gradient(circle at 0% 80%, ${hexColor}08 0%, transparent 50%),
        linear-gradient(to bottom, #020617, #020617, #0f172a)
     `
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
  };

  return (
    <MotionDiv 
        className="h-full overflow-y-auto custom-scrollbar font-sans transition-colors duration-700 text-slate-300" 
        style={uniqueBackgroundStyle}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
    >
      
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 bg-slate-900/20 backdrop-blur-3xl">
        {/* Animated Grid Texture */}
        <MotionDiv 
             className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ 
                 backgroundImage: `linear-gradient(${hexColor} 1px, transparent 1px), linear-gradient(90deg, ${hexColor} 1px, transparent 1px)`, 
                 backgroundSize: '40px 40px' 
             }} 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.05 }}
             transition={{ duration: 1.5 }}
        />
        
        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
              <MotionDiv className="flex-1 space-y-6" variants={itemVariants}>
                 <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-2 backdrop-blur-sm shadow-lg">
                        <span className={`w-2 h-2 rounded-full ${pillar.color.replace('text-', 'bg-')} animate-pulse shadow-[0_0_10px_currentColor]`}></span>
                        Pillar {pillar.code}
                    </div>
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                    {pillar.title}
                 </h1>
                 <p className="text-xl text-slate-400 max-w-2xl font-light border-l-2 pl-6 leading-relaxed" style={{ borderColor: hexColor }}>
                    {pillar.description}
                 </p>
              </MotionDiv>
              
              {/* Pulsating Icon & Visual Anchor */}
              <MotionDiv 
                className="relative group"
                variants={itemVariants}
              >
                 {/* Outer Glow Orb - Pulsating */}
                 <MotionDiv 
                    className="absolute inset-0 rounded-full blur-[60px] opacity-20"
                    style={{ backgroundColor: hexColor }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 />
                 
                 {/* Icon Container */}
                 <div className="relative w-40 h-40 bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:-translate-y-2 transition-transform duration-500 backdrop-blur-xl ring-1 ring-white/5">
                    {/* Inner Shine */}
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none"></div>
                    
                    <PillarIcon 
                        className="w-20 h-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" 
                        style={{ color: hexColor, filter: `drop-shadow(0 0 30px ${hexColor}50)` }} 
                    />
                 </div>
                 
                 {/* Background Typography */}
                 <div className="absolute -bottom-10 -right-10 text-[14rem] font-black opacity-[0.03] select-none pointer-events-none text-white leading-none z-0 mix-blend-overlay">
                    {pillar.code}
                 </div>
              </MotionDiv>
           </div>
        </div>
      </div>

      {/* Curriculum Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 pb-32">
         {pillar.sections.length === 0 ? (
            <MotionDiv variants={itemVariants} className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
               <Layers className="w-12 h-12 text-slate-600 mb-4" />
               <p className="text-slate-500 font-mono">Curriculum Loading...</p>
            </MotionDiv>
         ) : (
            <div className="relative ml-4 md:ml-8 space-y-24">
               {/* Continuous Vertical Line */}
               <MotionDiv 
                 initial={{ height: 0 }}
                 animate={{ height: '100%' }}
                 transition={{ duration: 1, delay: 0.5 }}
                 className="absolute left-0 top-4 bottom-0 w-px bg-gradient-to-b from-slate-800 via-slate-700 to-transparent" 
               />

               {pillar.sections.map((section, idx) => (
                  <MotionDiv 
                    key={section.id} 
                    id={section.id} 
                    className="relative pl-12 scroll-mt-32 group/section"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                     
                     {/* Timeline Node */}
                     <div 
                        className="absolute left-[-16px] top-1 w-8 h-8 rounded-full bg-[#020617] border-2 border-slate-800 flex items-center justify-center z-10 shadow-lg transition-all duration-300 group-hover/section:border-white/30 group-hover/section:scale-110 group-hover/section:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        style={{ boxShadow: `0 0 0 8px #020617` }} // Mask for the line behind
                     >
                        <span className="text-[10px] font-bold text-slate-500 font-mono group-hover/section:text-white transition-colors">{String(idx + 1).padStart(2, '0')}</span>
                     </div>

                     {/* Section Header */}
                     <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-3 flex items-center gap-3 tracking-tight">
                            {section.title}
                        </h2>
                        <div className="h-1 w-24 rounded-full overflow-hidden bg-slate-800/50">
                            <MotionDiv 
                                className="h-full w-full" 
                                style={{ backgroundColor: hexColor }}
                                initial={{ x: '-100%' }}
                                whileInView={{ x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        </div>
                     </div>

                     {/* Subsections List (Vertical Cards) */}
                     <div className="space-y-6">
                        {section.subSections.map((sub, sIdx) => (
                           <MotionDiv 
                              key={sub.id} 
                              className="group relative bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/60 hover:border-slate-600 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: sIdx * 0.05 }}
                           >
                              {/* Hover Glow Edge */}
                              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-transparent group-hover:bg-current transition-colors duration-300" style={{ color: hexColor }}></div>

                              <div className="p-6 md:p-8">
                                 <div className="flex items-start gap-6">
                                    <div className="mt-1 p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-white/10 transition-colors shrink-0">
                                       <List className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                       <h3 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors mb-3">
                                          {sub.title}
                                       </h3>
                                       <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-4xl">
                                          {sub.description}
                                       </p>

                                       {/* Topics List */}
                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          {sub.subSubSections.map((topic) => (
                                             <Link 
                                                key={topic.id}
                                                to={`/topic/${pillar.id}/${topic.id}`}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800/50 hover:border-slate-600 hover:bg-slate-800 transition-all group/topic"
                                             >
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover/topic:bg-white transition-colors"></div>
                                                <span className="text-sm font-medium text-slate-400 group-hover/topic:text-white truncate">
                                                   {topic.title}
                                                </span>
                                                <ChevronRight className="w-3 h-3 text-slate-600 ml-auto opacity-0 -translate-x-2 group-hover/topic:opacity-100 group-hover/topic:translate-x-0 transition-all" />
                                             </Link>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </MotionDiv>
                        ))}
                     </div>
                  </MotionDiv>
               ))}
            </div>
         )}
      </div>
    </MotionDiv>
  );
};

export default PillarView;
