
import React, { useState, useEffect } from 'react';
import { Code2, Layers, Cpu, Database, Sparkles, Shield, Zap, Cloud } from 'lucide-react';

const ModuleTicker: React.FC = () => {
  const [activeStackIndex, setActiveStackIndex] = useState(0);

  const stackRotation = [
      { label: 'SYS', val: 'Rust / C++ / Zig', icon: <Code2 className="w-3 h-3 text-orange-400" /> },
      { label: 'WEB', val: 'HTML / CSS / JS / TS', icon: <Layers className="w-3 h-3 text-blue-400" /> },
      { label: 'CLD', val: 'Go / Java / Elixir', icon: <Cpu className="w-3 h-3 text-amber-400" /> },
      { label: 'DAT', val: 'SQL / Python', icon: <Database className="w-3 h-3 text-emerald-400" /> },
      { label: 'AI',  val: 'Mojo / Python', icon: <Sparkles className="w-3 h-3 text-purple-400" /> },
      { label: 'SEC', val: 'Ruby / PHP / Shell', icon: <Shield className="w-3 h-3 text-red-400" /> },
      { label: 'GFX', val: 'WGSL / C#', icon: <Zap className="w-3 h-3 text-pink-400" /> },
      { label: 'OPS', val: 'Swift / Deploy', icon: <Cloud className="w-3 h-3 text-sky-400" /> },
  ];

  useEffect(() => {
      const interval = setInterval(() => {
          setActiveStackIndex(prev => (prev + 1) % stackRotation.length);
      }, 3000);
      return () => clearInterval(interval);
  }, []);

  const currentStack = stackRotation[activeStackIndex];

  return (
    <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
       <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <span>Module:</span>
          <div key={activeStackIndex} className="flex items-center gap-2 text-gray-300 animate-fade-in">
              {currentStack.icon}
              <span className="text-blue-400">{currentStack.label}</span>
              <span className="text-gray-500">//</span>
              <span>{currentStack.val}</span>
          </div>
       </div>
    </div>
  );
};

export default ModuleTicker;
