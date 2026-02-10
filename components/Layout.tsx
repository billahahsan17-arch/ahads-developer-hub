
import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AtlasPanel from './AtlasPanel';
import CommandCenter from './CommandCenter';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import AtlasLogo from './AtlasLogo';
import { KnowledgeGraph } from '../services/KnowledgeGraph';
import { startGenesisProtocol } from '../services/genesisService'; // Import Genesis
import { motion, AnimatePresence } from 'framer-motion';

// Workaround for react-router-dom type mismatch in environment
const { useLocation } = ReactRouterDOM as any;

// Workaround for strict type mismatch in environment
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtlasOpen, setIsAtlasOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  
  // --- RESIZE LOGIC STATE ---
  const [atlasWidth, setAtlasWidth] = useState(333); // Default 333px
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
      setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // --- GENESIS PROTOCOL AUTO-START ---
  useEffect(() => {
      // Start the autonomous background worker immediately when the app layout loads.
      // It is a singleton service, so calling it multiple times is safe (it checks isActive internally).
      startGenesisProtocol();
  }, []);

  // --- MUTUALLY EXCLUSIVE TOGGLE LOGIC ---
  const toggleSidebar = () => {
      const nextState = !isSidebarOpen;
      if (nextState) {
          setIsAtlasOpen(false); 
      }
      setIsSidebarOpen(nextState);
  };

  const handleSetIsAtlasOpen = (isOpen: boolean) => {
      if (isOpen) {
          setIsSidebarOpen(false);
      }
      setIsAtlasOpen(isOpen);
  };

  // --- RESIZE HANDLERS (OPTIMIZED) ---
  const startResizing = useCallback(() => {
      setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
      setIsResizing(false);
  }, []);

  const resize = useCallback((mouseEvent: MouseEvent) => {
      if (isResizing) {
          const newWidth = window.innerWidth - mouseEvent.clientX;
          // Clamp between 300px and 400px
          if (newWidth >= 300 && newWidth <= 400) {
              setAtlasWidth(newWidth);
          }
      }
  }, [isResizing]);

  useEffect(() => {
      if (isResizing) {
          window.addEventListener("mousemove", resize);
          window.addEventListener("mouseup", stopResizing);
          document.body.style.cursor = "col-resize"; // Visual feedback
          document.body.style.userSelect = "none"; // Prevent text selection while dragging
      } else {
          window.removeEventListener("mousemove", resize);
          window.removeEventListener("mouseup", stopResizing);
          document.body.style.cursor = "default";
          document.body.style.userSelect = "auto";
      }
      return () => {
          window.removeEventListener("mousemove", resize);
          window.removeEventListener("mouseup", stopResizing);
      };
  }, [isResizing, resize, stopResizing]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearch = (query: string) => {
      setInitialSearchQuery(query);
      setIsCommandOpen(true);
  };

  const getContext = () => {
    const path = location.pathname;
    if (path === '/') return 'Mission Control // System Overview';
    
    const topicMatch = path.match(/\/topic\/([^\/]+)\/([^\/]+)/);
    if (topicMatch) {
        const [_, pId, tId] = topicMatch;
        const topicTitle = KnowledgeGraph.getTitle(tId) || tId;
        const pillarNode = KnowledgeGraph.getNode(pId);
        const pillarCode = pillarNode?.data && 'code' in pillarNode.data ? pillarNode.data.code : 'SYS';
        return `Deep Dive Mode: ${pillarCode} // ${topicTitle}`;
    }

    const pillarMatch = path.match(/\/pillar\/([^\/]+)/);
    if (pillarMatch) {
        const pillarId = pillarMatch[1];
        const node = KnowledgeGraph.getNode(pillarId);
        if (node && node.type === 'PILLAR') {
            const p = node.data as any; 
            return `Pillar ${p.code}: ${p.title}`;
        }
    }
    return 'Engineering Hub';
  };

  return (
    <div className="flex h-screen w-screen bg-[#020617] text-atlas-text font-sans overflow-hidden selection:bg-blue-500/30">
      
      {/* --- GLOBAL ATMOSPHERE --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
      </div>

      <CommandCenter 
        isOpen={isCommandOpen} 
        setIsOpen={setIsCommandOpen} 
        initialQuery={initialSearchQuery}
      />

      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* Main Content Area - Dynamic Resizing (The Squeeze) */}
      <main 
        className="flex-1 flex flex-col h-full min-h-0 relative z-10 overflow-hidden"
        style={{
            // Desktop: Apply margins to "squeeze" content when sidebars are open
            marginLeft: isSidebarOpen && window.innerWidth >= 768 ? '18rem' : '0', // 288px (w-72)
            marginRight: isAtlasOpen && window.innerWidth >= 768 ? `${atlasWidth}px` : '0', 
            
            // CRITICAL OPTIMIZATION: 
            // When resizing via drag, DISABLE transition to prevent "fighting" (jitter).
            // When just toggling open/close, ENABLE transition for smoothness.
            transitionProperty: 'margin-left, margin-right',
            transitionDuration: isResizing ? '0s' : '500ms', 
            transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            willChange: 'margin-left, margin-right'
        }}
      >
        <Header 
          toggleMobileMenu={toggleMobileMenu} 
          toggleSidebar={toggleSidebar}
          isAtlasOpen={isAtlasOpen} 
          setIsAtlasOpen={handleSetIsAtlasOpen} 
          onSearch={handleSearch}
        />

        <div className="flex-1 flex flex-col min-h-0 relative w-full overflow-hidden">
             <div className="flex-1 min-w-0 relative h-full">
                 <AnimatePresence mode="wait">
                    <MotionDiv
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }} 
                        className="h-full w-full relative"
                    >
                        {children}
                    </MotionDiv>
                 </AnimatePresence>
             </div>
        </div>
        
        {/* Pass resize props to AtlasPanel */}
        <AtlasPanel 
          isOpen={isAtlasOpen} 
          onClose={() => handleSetIsAtlasOpen(false)} 
          context={getContext()} 
          width={atlasWidth}
          isResizing={isResizing}
          onResizeStart={startResizing}
        />

        {/* Global Floating Atlas Button */}
        {!isAtlasOpen && (
            <MotionButton
                onClick={() => handleSetIsAtlasOpen(true)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-blue-500/50 px-4 py-3 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all group"
            >
                <div className="relative">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute opacity-75"></div>
                    <AtlasLogo className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" animated={false} />
                </div>
                <div className="text-[10px] font-mono text-blue-100 uppercase tracking-wider group-hover:text-white">
                    Atlas AI Online
                </div>
            </MotionButton>
        )}

      </main>
    </div>
  );
};

export default Layout;
