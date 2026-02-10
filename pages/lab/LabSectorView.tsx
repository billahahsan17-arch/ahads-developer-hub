
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { LAB_SECTORS } from '../../data/labFeatures';
import { 
    ArrowLeft, Lock, ArrowRight, Star, Terminal, 
    Grid, Activity, Hexagon, Cpu, Network, X, Layout,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Workaround for react-router-dom type mismatch
const { useParams, Link, Navigate, useNavigate } = ReactRouterDOM as any;

const MotionDiv = motion.div as any;

const LabSectorView: React.FC = () => {
  const { sectorId } = useParams();
  const navigate = useNavigate();
  const [showMatrix, setShowMatrix] = useState(false);
  
  const sectorIndex = LAB_SECTORS.findIndex(s => s.id === sectorId);
  const rawSector = LAB_SECTORS[sectorIndex];

  if (!rawSector) {
      return <Navigate to="/lab" />;
  }

  // STRICT FILTER: Only show non-AI features in this view
  const sector = {
      ...rawSector,
      features: rawSector.features.filter(f => !f.isAI)
  };

  // If a sector has 0 non-AI features (like the AI Core sector), redirect back
  if (sector.features.length === 0) {
      return <Navigate to="/lab" />;
  }

  // Calculate connections for the Matrix Visualization (Only sectors with non-AI tools)
  const validSectors = LAB_SECTORS.filter(s => s.features.some(f => !f.isAI));

  return (
    <div className="flex flex-col h-full bg-[#020617] text-slate-300 relative overflow-hidden">
      
      {/* 1. TOP SYSTEM BAR (Fixed Navigation Hub) */}
      <div className="flex-shrink-0 h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 z-50">
          <div className="flex items-center gap-4">
              <Link to="/lab" className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="h-6 w-px bg-slate-800"></div>
              <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-500 bg-amber-950/30 border border-amber-500/30 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                      SECTOR {String(sectorIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-bold text-white hidden md:inline-block">
                      {sector.title.split(':')[1] || sector.title}
                  </span>
              </div>
          </div>

          <button 
            onClick={() => setShowMatrix(!showMatrix)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all ${
                showMatrix 
                ? 'bg-amber-600 text-white border-amber-500' 
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-amber-500/50 hover:text-white'
            }`}
          >
            {showMatrix ? <X className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            {showMatrix ? 'Close System Map' : 'System Map'}
          </button>
      </div>

      {/* 2. EXPANDABLE SECTOR MATRIX (The "Connection" Layer) */}
      <AnimatePresence>
        {showMatrix && (
            <MotionDiv 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-slate-950 border-b border-slate-800 overflow-hidden relative z-40 shadow-2xl"
            >
                <div className="max-w-7xl mx-auto p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                        {/* Connecting Lines (Visual Only) */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
                            <svg className="w-full h-full">
                                <path d="M 15% 50% L 85% 50%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
                                <path d="M 50% 20% L 50% 80%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
                            </svg>
                        </div>

                        {validSectors.map((s, idx) => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    navigate(`/lab/sector/${s.id}`);
                                    setShowMatrix(false);
                                }}
                                className={`relative p-4 rounded-xl border text-left group transition-all hover:-translate-y-1 ${
                                    s.id === sectorId 
                                    ? 'bg-amber-900/20 border-amber-500/50 ring-1 ring-amber-500/30' 
                                    : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-mono font-bold uppercase ${s.id === sectorId ? 'text-amber-400' : 'text-slate-500'}`}>
                                        SEC-{String(idx + 1).padStart(2, '0')}
                                    </span>
                                    {s.id === sectorId && <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
                                </div>
                                <div className={`font-bold text-sm leading-tight ${s.id === sectorId ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                    {s.title.split(':')[1]?.trim() || s.title}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </MotionDiv>
        )}
      </AnimatePresence>

      {/* 3. MAIN SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        
        {/* Background Ambient Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto p-6 md:p-10 pb-32 relative z-10 space-y-12">
            
            {/* Sector Dashboard Header */}
            <div className="flex flex-col lg:flex-row items-end gap-8 border-b border-slate-800 pb-12">
                <div className="flex-1">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase opacity-90">
                        {sector.title.split(':')[1] || sector.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-slate-400 max-w-2xl font-light border-l-2 border-amber-500/50 pl-4">
                        {sector.description}
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Simulators</div>
                        <div className="text-3xl font-black text-white">{sector.features.length}</div>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Elite Tools</div>
                        <div className="text-3xl font-black text-amber-500">{sector.features.filter(f => f.elite).length}</div>
                    </div>
                </div>
            </div>

            {/* Modules Grid */}
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Layout className="w-4 h-4" /> Operational Modules
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sector.features.map((feature) => (
                        <Link 
                            key={feature.id}
                            to={feature.status === 'AVAILABLE' ? feature.path : '#'}
                            className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${
                                feature.status === 'AVAILABLE' 
                                    ? 'bg-slate-900 border-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-1 cursor-pointer' 
                                    : 'bg-slate-950 border-slate-900 opacity-60 cursor-not-allowed'
                            }`}
                        >
                            {/* Card Content */}
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-xl ${feature.status === 'AVAILABLE' ? 'bg-slate-800 text-amber-400 group-hover:bg-amber-500 group-hover:text-white' : 'bg-slate-900 text-slate-700'} transition-colors`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                {feature.elite && (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                                        <Star className="w-3 h-3 fill-current" /> Elite
                                    </div>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-slate-200 group-hover:text-white mb-2 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed mb-8 flex-1">
                                {feature.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800/50">
                                <span className={`text-[10px] font-mono font-bold uppercase ${
                                    feature.status === 'AVAILABLE' ? 'text-emerald-500' : 'text-slate-600'
                                }`}>
                                    {feature.status === 'AVAILABLE' ? 'SYSTEM_ONLINE' : 'LOCKED'}
                                </span>
                                {feature.status === 'AVAILABLE' ? (
                                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                                ) : (
                                    <Lock className="w-3 h-3 text-slate-700" />
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom Connectivity Bar */}
            <div className="border-t border-slate-800 pt-12 mt-12">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-6">
                    <span>System Interconnect</span>
                    <span>Lat: 12ms</span>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default LabSectorView;
