
import React from 'react';
import { Terminal } from 'lucide-react';

interface SystemStatusProps {
  activeModuleCount: number;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ activeModuleCount }) => {
  return (
    <div className="lg:col-span-3 bg-atlas-dark text-white rounded-2xl p-8 relative overflow-hidden shadow-xl shadow-slate-200 flex flex-col justify-between min-h-[300px]">
      <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 -mr-10 -mt-10"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-blue-400 mb-2 font-mono text-xs tracking-wider">
          <Terminal className="w-4 h-4" /> SYSTEM ONLINE // PROTOCOL: ELITE
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-2">ATLAS<span className="text-blue-500">_OS</span></h1>
        <p className="text-gray-400 max-w-xl">
          The polyglot engineering hub is active. 
          <br />
          <span className="text-blue-400/80 font-mono text-xs mt-2 block">
            Loaded: Rust, Zig, C++, Go, Elixir, Mojo, Ruby, PHP, WGSL, Swift
          </span>
        </p>
      </div>
      
      <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <div className="text-xs text-gray-400 uppercase">Latency</div>
          <div className="font-mono font-bold text-green-400">12ms</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <div className="text-xs text-gray-400 uppercase">Modules</div>
          <div className="font-mono font-bold text-blue-400">{activeModuleCount} Active</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <div className="text-xs text-gray-400 uppercase">Integrity</div>
          <div className="font-mono font-bold text-emerald-400">100%</div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
