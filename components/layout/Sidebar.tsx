
import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Layout as LayoutIcon, BookOpen, PenTool, MessageSquare, 
    BarChart2, Settings, Layers, Globe, Sparkles, Search, X,
    Zap, Activity, Cpu, Command
} from 'lucide-react';
import { PILLARS } from '../../constants';
import AtlasLogo from '../AtlasLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../../context/ProgressContext';

const MotionDiv = motion.div as any;

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

interface NavItemProps {
    to: string;
    icon: any;
    label: string;
    currentPath: string;
    onNavigate: () => void;
    delay?: number;
    color?: string; // For the progress bar/active color
    progress?: number; // Real percentage (0-100)
    isSearchActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, currentPath, onNavigate, delay = 0, color = 'text-blue-500', progress = 0, isSearchActive }) => {
    const isActive = to === '/' ? currentPath === '/' : currentPath.startsWith(to);
    
    // Extract base color class for background/border (e.g., 'text-blue-500' -> 'blue-500')
    const colorBase = color.replace('text-', '');

    return (
        <MotionDiv
            initial={isSearchActive ? { opacity: 0, y: 5 } : { opacity: 0, x: -10 }}
            animate={isSearchActive ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
            transition={{ delay: isSearchActive ? 0 : delay, duration: 0.2 }}
            className="mb-1"
        >
            <Link 
                to={to} 
                onClick={onNavigate}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 border border-transparent overflow-hidden ${
                    isActive 
                    ? `bg-${colorBase}/10 border-${colorBase}/20` 
                    : 'hover:bg-slate-800/50 hover:border-slate-800'
                }`}
            >
                {/* Active Indicator Bar (Left) */}
                {isActive && (
                    <MotionDiv 
                        layoutId="activeNav"
                        className={`absolute left-0 top-0 bottom-0 w-1 bg-${colorBase}`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

                {/* Icon with Glow effect on active */}
                <div className={`relative z-10 p-1.5 rounded-lg transition-colors duration-300 ${
                    isActive ? `bg-${colorBase}/20 text-${colorBase}` : 'bg-slate-800/50 text-slate-500 group-hover:text-slate-300 group-hover:bg-slate-800'
                }`}>
                    <Icon className="w-4 h-4" />
                </div>

                <div className="relative z-10 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold tracking-wide truncate transition-colors ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}>
                            {label}
                        </span>
                        {progress > 0 && !isActive && (
                            <span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-500 transition-colors">
                                {Math.round(progress)}%
                            </span>
                        )}
                    </div>
                    
                    {/* Context-Aware Progress Bar (Under Title) */}
                    {progress > 0 && (
                        <div className="mt-1 h-0.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
                            <MotionDiv 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${color.replace('text-', 'bg-')}`}
                            />
                        </div>
                    )}
                </div>
                
                {/* Hover Glow Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300 bg-${colorBase}`} />
            </Link>
        </MotionDiv>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchQuery, setSearchQuery] = useState('');
  
  const onNavigate = () => {
      setIsMobileMenuOpen(false);
  };
  
  const { stats } = useProgress();

  // --- 1. CORE MENU CONFIG ---
  const CORE_MENU = [
      { id: 'home', to: "/", icon: LayoutIcon, label: "Mission Control", color: "text-blue-500" },
      { id: 'ai', to: "/ai-arsenal", icon: Sparkles, label: "AI Arsenal", color: "text-purple-500" },
      { id: 'lab', to: "/lab", icon: PenTool, label: "The Forge", color: "text-amber-500" },
      { id: 'chat', to: "/chat", icon: MessageSquare, label: "Atlas Neural Core", color: "text-pink-500" },
      { id: 'comm', to: "/community", icon: Globe, label: "Community Hub", color: "text-indigo-500" },
      { id: 'data', to: "/blackbox", icon: BarChart2, label: "Flight Recorder", color: "text-slate-500" },
  ];

  // --- 2. DYNAMIC PILLAR PROGRESS ---
  const pillarProgressMap = useMemo(() => {
      const map: Record<string, number> = {};
      PILLARS.forEach(pillar => {
          let totalModules = 0;
          let completedInPillar = 0;
          pillar.sections.forEach(section => {
              section.subSections.forEach(sub => {
                  sub.subSubSections.forEach(topic => {
                      totalModules++;
                      if (stats.completedModules.includes(topic.id)) completedInPillar++;
                  });
              });
          });
          map[pillar.id] = totalModules > 0 ? (completedInPillar / totalModules) * 100 : 0;
      });
      return map;
  }, [stats.completedModules]);

  // --- 3. FILTERING LOGIC ---
  const filteredMenu = useMemo(() => {
      if (!searchQuery) return { core: CORE_MENU, pillars: PILLARS };
      
      const lowerQ = searchQuery.toLowerCase();
      return {
          core: CORE_MENU.filter(m => m.label.toLowerCase().includes(lowerQ)),
          pillars: PILLARS.filter(p => 
              p.title.toLowerCase().includes(lowerQ) || 
              p.code.toLowerCase().includes(lowerQ) ||
              p.description.toLowerCase().includes(lowerQ)
          )
      };
  }, [searchQuery]);

  const isOpen = isMobileMenuOpen || isSidebarOpen;

  return (
    <>
        {/* Mobile Backdrop */}
        {isMobileMenuOpen && (
            <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
            />
        )}

        {/* --- MAIN SIDEBAR --- */}
        <aside className={`
            fixed inset-y-0 left-0 z-50
            w-72 bg-[#020617] border-r border-slate-800/60
            flex flex-col
            transform transition-transform duration-300 ease-in-out shadow-2xl
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            {/* 1. Header & Logo */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/60 bg-[#020617] relative z-10">
                <Link to="/" onClick={onNavigate} className="flex items-center gap-3 group">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <AtlasLogo className="w-7 h-7 text-blue-500 relative z-10" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-white tracking-wide group-hover:text-blue-400 transition-colors">AHAD<span className="text-slate-600">.DEV</span></h1>
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.25em]">Hub v4.0</span>
                    </div>
                </Link>
                {/* Mobile Close */}
                <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-500">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* 2. Search Bar */}
            <div className="px-4 py-4 bg-[#020617]">
                <div className="relative group">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                        type="text"
                        placeholder="Filter Modules..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all"
                    />
                </div>
            </div>

            {/* 3. Scrollable Nav Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pb-6 space-y-6">
                
                {/* Core Menu Section */}
                {(filteredMenu.core.length > 0 || !searchQuery) && (
                    <div className="space-y-1">
                        {!searchQuery && (
                            <div className="px-4 mb-2 mt-2 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Command className="w-3 h-3" /> Operations
                            </div>
                        )}
                        {filteredMenu.core.map((item, i) => (
                            <NavItem 
                                key={item.id}
                                {...item}
                                currentPath={currentPath}
                                onNavigate={onNavigate}
                                delay={i * 0.05}
                                isSearchActive={!!searchQuery}
                            />
                        ))}
                    </div>
                )}

                {/* Pillars Section */}
                {(filteredMenu.pillars.length > 0 || !searchQuery) && (
                    <div className="space-y-1">
                        {!searchQuery && (
                            <div className="px-4 mb-2 mt-4 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Layers className="w-3 h-3" /> Knowledge Graph
                            </div>
                        )}
                        <AnimatePresence>
                            {filteredMenu.pillars.map((p, i) => (
                                <NavItem 
                                    key={p.id} 
                                    to={`/pillar/${p.id}`} 
                                    icon={Layers} // Could be dynamic if icon stored as string is mapped
                                    label={`${p.code} // ${p.title.split(':')[0]}`}
                                    currentPath={currentPath} 
                                    onNavigate={onNavigate} 
                                    delay={0.1 + (i * 0.05)}
                                    color={p.color}
                                    progress={pillarProgressMap[p.id] || 0}
                                    isSearchActive={!!searchQuery}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty State */}
                {searchQuery && filteredMenu.core.length === 0 && filteredMenu.pillars.length === 0 && (
                    <div className="text-center py-12">
                        <Search className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                        <p className="text-xs text-slate-500 font-mono">No modules found.</p>
                    </div>
                )}
            </div>

            {/* 4. Footer & System Status */}
            <div className="p-4 border-t border-slate-800/60 bg-[#020617] space-y-3">
                
                {/* System Status Widget */}
                <div className="flex items-center justify-between px-2 py-2 bg-slate-900/50 rounded-lg border border-slate-800/50">
                    <div className="flex items-center gap-2">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Sys Online</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
                        <Activity className="w-3 h-3" />
                        <span>12ms</span>
                    </div>
                </div>

                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group">
                    <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                    <span className="text-xs font-bold">System Config</span>
                </button>
            </div>
        </aside>
    </>
  );
};

export default Sidebar;
