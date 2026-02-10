
import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Pillar } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { 
    Hexagon, Zap, Shield, Database, Cpu, Cloud, Layout, Globe, 
    Code2, Lock, Terminal, Activity 
} from 'lucide-react';

// Workaround for react-router-dom type mismatch
const { Link } = ReactRouterDOM as any;

const MotionCircle = motion.circle as any;
const MotionLine = motion.line as any;
const MotionText = motion.text as any;
const MotionG = motion.g as any;
const MotionDiv = motion.div as any;

interface ConstellationMapProps {
  pillars: Pillar[];
}

const ConstellationMap: React.FC<ConstellationMapProps> = ({ pillars }) => {
  const { stats } = useProgress();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // --- Configuration ---
  const WIDTH = 800;
  const HEIGHT = 450;
  const CENTER_X = WIDTH / 2;
  const CENTER_Y = HEIGHT / 2;
  const RADIUS_X = 300; 
  const RADIUS_Y = 160;

  // --- Color Mapping Engine ---
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

  // --- Icon Helper ---
  const getIcon = (code: string) => {
      switch(code) {
          case 'A': return Globe;
          case 'B': return Cpu;
          case 'C': return Zap;
          case 'D': return Layout;
          case 'E': return Activity;
          case 'F': return Shield;
          case 'G': return Database;
          case 'H': return Hexagon;
          case 'I': return Terminal;
          case 'J': return Lock;
          case 'K': return Cloud;
          case 'L': return Code2;
          default: return Hexagon;
      }
  };

  // --- Calculate Positions (Organic Constellation Layout) ---
  const nodes = useMemo(() => {
      // Manual offsets to break the perfect ellipse and create a constellation feel
      const offsets = [
          { x: 0, y: -20 }, { x: 30, y: -10 }, { x: 10, y: 20 }, 
          { x: -10, y: 30 }, { x: -40, y: 0 }, { x: -20, y: -20 },
          { x: 40, y: 10 }, { x: 10, y: 40 }, { x: -30, y: 10 },
          { x: -10, y: -40 }, { x: 20, y: -30 }, { x: -20, y: 20 }
      ];

      return pillars.map((pillar, index) => {
          const total = pillars.length;
          const angle = (index / total) * 2 * Math.PI - (Math.PI / 2); 
          const hex = getHexColor(pillar.color);
          const offset = offsets[index % offsets.length];
          
          return {
              ...pillar,
              x: CENTER_X + Math.cos(angle) * RADIUS_X + offset.x,
              y: CENTER_Y + Math.sin(angle) * RADIUS_Y + offset.y,
              hexColor: hex,
              icon: getIcon(pillar.code)
          };
      });
  }, [pillars]);

  // --- Progress Helper ---
  const getProgress = (pillarId: string) => {
      const pillar = pillars.find(p => p.id === pillarId);
      if (!pillar) return 0;
      let total = 0;
      let done = 0;
      pillar.sections.forEach(s => s.subSections.forEach(sub => sub.subSubSections.forEach(t => {
          total++;
          if (stats.completedModules.includes(t.id)) done++;
      })));
      return total > 0 ? (done / total) * 100 : 0;
  };

  const hoveredNode = nodes.find(n => n.id === hoveredId);

  // Generate background stars
  const stars = useMemo(() => {
      return Array.from({ length: 50 }).map((_, i) => ({
          x: Math.random() * WIDTH,
          y: Math.random() * HEIGHT,
          r: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          delay: Math.random() * 5
      }));
  }, []);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl flex flex-col h-full w-full relative overflow-hidden group select-none">
        
        {/* Deep Space Background */}
        <div className="absolute inset-0 bg-[#020617]" />
        <div className="absolute inset-0 opacity-30 pointer-events-none" 
             style={{ 
                 backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', 
                 backgroundSize: '30px 30px' 
             }} 
        />

        {/* Header HUD */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em]">
                    ATLAS STAR MAP
                </span>
            </div>
        </div>

        {/* MAIN VISUALIZATION LAYER */}
        <div className="flex-1 w-full h-full relative z-10">
            <svg 
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`} 
                className="w-full h-full"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <filter id="glow-core" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* 0. Background Stars */}
                {stars.map((star, i) => (
                    <MotionCircle 
                        key={`star-${i}`}
                        cx={star.x}
                        cy={star.y}
                        r={star.r}
                        fill="white"
                        initial={{ opacity: star.opacity }}
                        animate={{ opacity: [star.opacity, 0.8, star.opacity] }}
                        transition={{ duration: 3, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}

                {/* 1. Connections (Constellation Lines) */}
                {nodes.map((node) => {
                    const isHovered = hoveredId === node.id;
                    return (
                        <g key={`link-${node.id}`}>
                            <MotionLine 
                                x1={CENTER_X} 
                                y1={CENTER_Y} 
                                x2={node.x} 
                                y2={node.y} 
                                stroke={isHovered ? node.hexColor : '#1e293b'} 
                                strokeWidth={isHovered ? 2 : 1}
                                initial={{ opacity: 0.1 }}
                                animate={{ opacity: isHovered ? 0.6 : 0.15 }}
                                transition={{ duration: 0.3 }}
                            />
                        </g>
                    );
                })}

                {/* 2. Central Core (The Hub) */}
                <g filter="url(#glow-core)">
                    <circle cx={CENTER_X} cy={CENTER_Y} r={28} fill="#020617" stroke="#334155" strokeWidth="1" />
                    <circle cx={CENTER_X} cy={CENTER_Y} r={4} fill="#3b82f6" className="animate-pulse" />
                    
                    {/* Rotating Rings */}
                    <MotionCircle 
                        cx={CENTER_X} cy={CENTER_Y} r={38} 
                        fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="2 6" strokeOpacity="0.4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        style={{ originX: `${CENTER_X}px`, originY: `${CENTER_Y}px` }}
                    />
                </g>

                {/* 3. Pillar Nodes (Stars) */}
                {nodes.map((node, i) => {
                    const isHovered = hoveredId === node.id;
                    const progress = getProgress(node.id);
                    const floatingDelay = i * 0.2; 

                    return (
                        <Link to={`/pillar/${node.id}`} key={node.id}>
                            <MotionG
                                onMouseEnter={() => setHoveredId(node.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{ cursor: 'pointer' }}
                                animate={{ y: [0, -4, 0] }}
                                transition={{ 
                                    duration: 5, 
                                    repeat: Infinity, 
                                    ease: "easeInOut", 
                                    delay: floatingDelay 
                                }}
                            >
                                {/* MAGNET TOUCH TARGET */}
                                <circle cx={node.x} cy={node.y} r={40} fill="transparent" />

                                {/* Star Glow */}
                                <MotionCircle
                                    cx={node.x} cy={node.y} r={isHovered ? 20 : 4}
                                    fill={node.hexColor}
                                    filter="url(#glow-core)"
                                    opacity={isHovered ? 0.3 : 0.6}
                                    animate={{ scale: isHovered ? 1.5 : 1 }}
                                />

                                {/* Node Body */}
                                <MotionCircle 
                                    cx={node.x} cy={node.y} r={isHovered ? 8 : 4} 
                                    fill={isHovered ? node.hexColor : "#fff"}
                                    stroke={isHovered ? '#fff' : 'transparent'} 
                                    strokeWidth={1}
                                    animate={{ scale: isHovered ? 1.2 : 1 }}
                                />
                                
                                {/* Orbit Ring for Progress */}
                                {progress > 0 && (
                                    <circle 
                                        cx={node.x} cy={node.y} r={14}
                                        fill="none"
                                        stroke={node.hexColor}
                                        strokeWidth="2"
                                        strokeDasharray={`${(progress / 100) * (2 * Math.PI * 14)} ${2 * Math.PI * 14}`}
                                        transform={`rotate(-90 ${node.x} ${node.y})`}
                                        opacity={0.8}
                                    />
                                )}

                                {/* Letter Code (Only visible on hover or if progressed) */}
                                <MotionText 
                                    x={node.x} y={node.y + 24} 
                                    textAnchor="middle" 
                                    fill={isHovered ? node.hexColor : '#64748b'} 
                                    fontSize="10" 
                                    fontWeight="bold"
                                    fontFamily="JetBrains Mono"
                                    initial={{ opacity: 0.5 }}
                                    animate={{ opacity: isHovered ? 1 : 0.5, y: isHovered ? node.y + 24 : node.y + 15 }}
                                >
                                    {node.code}
                                </MotionText>
                            </MotionG>
                        </Link>
                    );
                })}
            </svg>

            {/* 4. Adaptive Tooltip */}
            <AnimatePresence>
                {hoveredNode && (
                    <MotionDiv
                        key="tooltip"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute pointer-events-none z-30 flex flex-col items-center"
                        style={{ 
                            left: `${(hoveredNode.x / WIDTH) * 100}%`,
                            top: `${(hoveredNode.y / HEIGHT) * 100}%`,
                            transform: 'translate(-50%, -100%)' 
                        }}
                    >
                        <div 
                            className="mb-4 bg-slate-900/95 backdrop-blur-xl border p-4 rounded-xl shadow-[0_0_30px_-5px_rgba(0,0,0,0.8)] min-w-[200px] text-center relative"
                            style={{ borderColor: hoveredNode.hexColor }}
                        >
                            <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: hoveredNode.hexColor }}>
                                Pillar {hoveredNode.code}
                            </div>
                            <h3 className="text-white font-bold text-sm mb-3">
                                {hoveredNode.title.split(':')[0]}
                            </h3>
                            
                            <div className="flex items-center justify-between text-[10px] font-mono bg-black/40 rounded px-2 py-1.5">
                                <span className="text-slate-400">Completion</span>
                                <span className="font-bold" style={{ color: hoveredNode.hexColor }}>
                                    {Math.round(getProgress(hoveredNode.id))}%
                                </span>
                            </div>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </div>
    </div>
  );
};

export default ConstellationMap;
