
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Hexagon, Zap, ScanFace } from 'lucide-react';
import { Pillar } from '../../types';
import { useProgress } from '../../context/ProgressContext';

const MotionPolygon = motion.polygon as any;
const MotionCircle = motion.circle as any;
const MotionDiv = motion.div as any;

interface ComplexityRadarProps {
  pillars: Pillar[];
}

const ComplexityRadar: React.FC<ComplexityRadarProps> = ({ pillars }) => {
  const { stats } = useProgress();
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  // --- Configuration ---
  const SIZE = 400;
  const CENTER = SIZE / 2;
  const RADIUS = 120; // Radius of the chart
  
  // --- Data Processing ---
  const data = useMemo(() => {
      return pillars.map((p) => {
          let total = 0;
          let done = 0;
          // Calculate deep progress
          p.sections.forEach(s => s.subSections.forEach(sub => sub.subSubSections.forEach(t => {
              total++;
              if (stats.completedModules.includes(t.id)) done++;
          })));
          
          // Normalized value (min 10% to show point on graph even if 0 progress)
          const rawPercent = total > 0 ? (done / total) * 100 : 0;
          const displayPercent = Math.max(rawPercent, 10); 

          return {
              id: p.id,
              code: p.code,
              title: p.title.split(':')[0], // Short title
              fullTitle: p.title,
              rawPercent,
              displayPercent,
              color: p.color,
              twColor: p.color.replace('text-', '') // extract 'blue-500' etc
          };
      });
  }, [pillars, stats.completedModules]);

  // --- Geometry Helper ---
  const getPointOnCircle = (angle: number, distance: number) => {
      return {
          x: CENTER + Math.cos(angle) * distance,
          y: CENTER + Math.sin(angle) * distance
      };
  };

  // Generate Polygon Path for the Data Blob
  const dataPath = useMemo(() => {
      if (data.length === 0) return "";
      const points = data.map((d, i) => {
          const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
          // Map percentage to radius distance
          const distance = (d.displayPercent / 100) * RADIUS; 
          const point = getPointOnCircle(angle, distance);
          return `${point.x},${point.y}`;
      });
      return points.join(" ");
  }, [data]);

  const activePillarData = data.find(d => d.id === hoveredPillar);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl flex flex-col h-full w-full relative overflow-hidden">
        
        {/* Header */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
            <div className="flex items-center gap-2 mb-1 text-slate-400">
                <ScanFace className="w-4 h-4" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                    SKILL GENOME
                </span>
            </div>
        </div>

        {/* XP Counter (Top Right) */}
        <div className="absolute top-6 right-6 z-20 text-right pointer-events-none">
             <div className="text-2xl font-black text-white leading-none">{stats.xp.toLocaleString()}</div>
             <div className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest mt-1">Total System XP</div>
        </div>

        {/* --- RADAR CHART SVG --- */}
        <div className="flex-1 w-full h-full flex items-center justify-center relative z-10">
            <svg 
                width="100%" 
                height="100%" 
                viewBox={`0 0 ${SIZE} ${SIZE}`} 
                className="overflow-visible"
            >
                {/* 1. Grid Levels (Concentric Polygons) */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, idx) => (
                    <polygon
                        key={scale}
                        points={data.map((_, i) => {
                            const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
                            const point = getPointOnCircle(angle, RADIUS * scale);
                            return `${point.x},${point.y}`;
                        }).join(" ")}
                        fill="transparent"
                        stroke={idx === 4 ? "#334155" : "#1e293b"}
                        strokeWidth="1"
                        strokeDasharray={idx === 4 ? "0" : "4 4"}
                    />
                ))}

                {/* 2. Radial Axes */}
                {data.map((d, i) => {
                    const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
                    const start = getPointOnCircle(angle, 0);
                    const end = getPointOnCircle(angle, RADIUS);
                    const labelPoint = getPointOnCircle(angle, RADIUS + 25);

                    return (
                        <g key={`axis-${d.id}`}>
                            <line 
                                x1={start.x} y1={start.y} 
                                x2={end.x} y2={end.y} 
                                stroke="#1e293b" 
                                strokeWidth="1" 
                            />
                            {/* Axis Label (Code) */}
                            <text 
                                x={labelPoint.x} 
                                y={labelPoint.y} 
                                textAnchor="middle" 
                                dominantBaseline="middle"
                                className={`text-[10px] font-black uppercase fill-slate-500 ${hoveredPillar === d.id ? 'fill-white' : ''}`}
                                style={{ fontSize: '10px', fontFamily: 'JetBrains Mono' }}
                            >
                                {d.code}
                            </text>
                        </g>
                    );
                })}

                {/* 3. Data Blob (The Skill Shape) */}
                <MotionPolygon
                    points={dataPath}
                    fill="rgba(99, 102, 241, 0.2)" // Indigo-500 with low opacity
                    stroke="rgba(99, 102, 241, 0.8)"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0, transformOrigin: `${CENTER}px ${CENTER}px` }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
                />

                {/* 4. Interactive Data Points */}
                {data.map((d, i) => {
                    const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
                    const distance = (d.displayPercent / 100) * RADIUS;
                    const point = getPointOnCircle(angle, distance);
                    const isHovered = hoveredPillar === d.id;

                    return (
                        <g key={`point-${d.id}`} 
                           onMouseEnter={() => setHoveredPillar(d.id)}
                           onMouseLeave={() => setHoveredPillar(null)}
                           className="cursor-pointer"
                        >
                            {/* Hit Area */}
                            <circle cx={point.x} cy={point.y} r={15} fill="transparent" />
                            
                            {/* Visible Dot */}
                            <MotionCircle 
                                cx={point.x} cy={point.y} r={isHovered ? 6 : 3} 
                                className={d.color.replace('text-', 'fill-')} // Use Tailwind color map logic or simplistic fallback
                                fill={isHovered ? '#fff' : '#6366f1'} // Fallback fill
                                stroke="#0f172a" 
                                strokeWidth="2"
                                animate={{ scale: isHovered ? 1.5 : 1 }}
                            />
                            
                            {/* Pulse Effect for Active Nodes */}
                            {d.rawPercent > 0 && (
                                <MotionCircle 
                                    cx={point.x} cy={point.y} r={8} 
                                    fill="transparent"
                                    stroke={isHovered ? '#fff' : '#6366f1'}
                                    strokeWidth="1"
                                    opacity="0.5"
                                    animate={{ r: [8, 12, 8], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* 5. Central Hologram Overlay (Hover Tooltip) */}
            <AnimatePresence>
                {activePillarData && (
                    <MotionDiv 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none"
                    >
                        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl p-4 shadow-2xl flex items-center gap-4 min-w-[200px]">
                            <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800`}>
                                <Activity className={`w-5 h-5 ${activePillarData.color}`} />
                            </div>
                            <div>
                                <div className={`text-[10px] font-bold uppercase tracking-widest ${activePillarData.color}`}>
                                    Pillar {activePillarData.code}
                                </div>
                                <div className="text-sm font-bold text-white mb-0.5">
                                    {activePillarData.title}
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono">
                                    Proficiency: <span className="text-white font-bold">{Math.round(activePillarData.rawPercent)}%</span>
                                </div>
                            </div>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </div>
    </div>
  );
};

export default ComplexityRadar;
