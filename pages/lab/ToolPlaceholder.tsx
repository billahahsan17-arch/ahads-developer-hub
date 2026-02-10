
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Construction, ArrowLeft, Terminal, Lock } from 'lucide-react';
import { LAB_SECTORS } from '../../data/labFeatures';

// Workaround for react-router-dom type mismatch
const { useParams, Link } = ReactRouterDOM as any;

const ToolPlaceholder: React.FC = () => {
  const { toolId } = useParams();
  
  // Find feature details
  let feature = null;
  for (const sector of LAB_SECTORS) {
      const found = sector.features.find(f => f.id === toolId);
      if (found) feature = found;
  }

  if (!feature) {
      return (
          <div className="h-full flex items-center justify-center bg-slate-950 text-slate-500">
              Tool Not Found
          </div>
      );
  }

  const Icon = feature.icon;

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#020617] p-6 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="relative z-10 max-w-lg w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl text-center">
            <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-700 shadow-inner">
                <Icon className="w-10 h-10 text-blue-500" />
            </div>
            
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">{feature.title}</h1>
            <p className="text-slate-400 font-mono text-sm mb-8">{feature.description}</p>
            
            <div className="bg-amber-900/20 border border-amber-500/20 p-4 rounded-lg mb-8">
                <div className="flex items-center justify-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest mb-1">
                    <Construction className="w-4 h-4" /> Under Development
                </div>
                <p className="text-amber-200/60 text-xs">
                    This advanced module is currently being compiled by the Engineering Team.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <button disabled className="w-full py-3 bg-slate-800 text-slate-500 font-bold rounded-lg cursor-not-allowed flex items-center justify-center gap-2 border border-slate-700">
                    <Lock className="w-4 h-4" /> Launch Module
                </button>
                <Link to="/lab" className="w-full py-3 text-slate-400 hover:text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Return to Forge
                </Link>
            </div>
        </div>
        
        <div className="absolute bottom-8 font-mono text-[10px] text-slate-600 uppercase tracking-widest">
            Module ID: {feature.id.toUpperCase()} // Status: PENDING
        </div>
    </div>
  );
};

export default ToolPlaceholder;
