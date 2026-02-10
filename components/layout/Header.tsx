
import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, Globe, Cpu, Sparkles, Database, Activity, Loader } from 'lucide-react';
import { subscribeToGenesis, GenesisState } from '../../services/genesisService';

interface HeaderProps {
  toggleMobileMenu: () => void;
  toggleSidebar: () => void;
  isAtlasOpen: boolean;
  setIsAtlasOpen: (isOpen: boolean) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu, toggleSidebar, setIsAtlasOpen, onSearch }) => {
  const [connectionMode, setConnectionMode] = useState<'CLOUD' | 'LOCAL'>('CLOUD');
  const [genesis, setGenesis] = useState<GenesisState>({ 
      isActive: false, totalTopics: 0, completedTopics: 0, currentTopic: '', logs: [], startTime: 0 
  });

  useEffect(() => {
    // Check if API Key is present
    const hasKey = process.env.API_KEY && !process.env.API_KEY.includes('PLACEHOLDER');
    setConnectionMode(hasKey ? 'CLOUD' : 'LOCAL');

    // Subscribe to Genesis Heartbeat
    const unsubscribe = subscribeToGenesis(setGenesis);
    return () => { unsubscribe(); };
  }, []);

  const handleMenuClick = () => {
      if (window.innerWidth >= 768) {
          toggleSidebar();
      } else {
          toggleMobileMenu();
      }
  };

  return (
    <header className="h-16 flex-shrink-0 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
      
      {/* Left: Menu Toggle */}
      <div className="flex items-center gap-4">
        <button 
            onClick={handleMenuClick}
            className="p-2 bg-slate-800/90 backdrop-blur rounded-lg shadow-lg border border-slate-700 text-slate-200 hover:bg-slate-700 transition-colors"
        >
            <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Center: Global Command & Genesis HUD */}
      <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8 gap-4">
        {/* Search Bar */}
        <button 
            onClick={() => onSearch('')}
            className="flex-1 flex items-center justify-between bg-slate-900/50 hover:bg-slate-900 border border-slate-700/50 hover:border-indigo-500/50 rounded-xl px-4 py-2 text-sm text-slate-400 transition-all group shadow-sm hover:shadow-indigo-500/10"
        >
            <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                <span className="font-medium truncate">Search tools, knowledge...</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono font-bold text-slate-500 group-hover:text-slate-300 group-hover:border-slate-600 transition-colors">
                <span className="text-xs">⌘</span>K
            </div>
        </button>

        {/* GENESIS HUD */}
        {genesis.completedTopics > 0 && (
            <div className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition-all duration-500 ${genesis.isActive ? 'bg-indigo-950/30 border-indigo-500/30' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center gap-2">
                    <Database className={`w-3 h-3 ${genesis.isActive ? 'text-indigo-400 animate-pulse' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-mono font-bold text-slate-300">
                        {genesis.completedTopics} <span className="text-slate-500">NODES</span>
                    </span>
                </div>
                {genesis.isActive && (
                    <>
                        <div className="h-3 w-px bg-slate-700"></div>
                        <div className="flex items-center gap-2 max-w-[150px]">
                            <Loader className="w-3 h-3 text-indigo-400 animate-spin" />
                            <span className="text-[9px] font-mono text-indigo-300 truncate uppercase">
                                {genesis.currentTopic}
                            </span>
                        </div>
                    </>
                )}
            </div>
        )}
      </div>

      {/* Center: Mobile Search Icon */}
      <div className="md:hidden flex items-center">
          <button 
            onClick={() => onSearch('')}
            className="p-2 text-slate-400 hover:text-white"
          >
              <Search className="w-5 h-5" />
          </button>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Connection Status Indicator */}
        <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
            connectionMode === 'CLOUD' 
            ? 'bg-blue-900/20 border-blue-500/30 text-blue-400' 
            : 'bg-amber-900/20 border-amber-500/30 text-amber-400'
        }`}>
            {connectionMode === 'CLOUD' ? <Globe className="w-3 h-3" /> : <Cpu className="w-3 h-3" />}
            {connectionMode === 'CLOUD' ? 'Cloud Uplink' : 'Local Core'}
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors group">
            <Bell className="w-5 h-5 group-hover:animate-swing" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617] animate-pulse"></span>
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-slate-800 hidden md:block"></div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
            <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Alex Morgan</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Level 4 Architect</div>
            </div>
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold text-white relative overflow-hidden">
                        <span className="relative z-10">AM</span>
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700"></div>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#020617] rounded-full"></div>
            </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
