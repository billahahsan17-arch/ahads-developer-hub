
import React from 'react';
import { X } from 'lucide-react';
import AtlasRobot from '../AtlasRobot';

interface PanelHeaderProps {
  onClose: () => void;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ onClose }) => {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700 bg-slate-950/50 backdrop-blur-md flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-blue-500/10 rounded border border-blue-500/30">
           {/* Use Robot for the AI Panel interface */}
           <AtlasRobot className="w-5 h-5 text-blue-400" />
        </div>
        <div>
           <h2 className="text-sm font-bold text-gray-100 tracking-wider">ATLAS <span className="text-blue-500">NEURAL</span></h2>
           <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-green-500 uppercase">Polyglot Mode</span>
           </div>
        </div>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PanelHeader;
