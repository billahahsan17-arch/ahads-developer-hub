
import React, { useReducer, useEffect, useCallback } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AtlasPanel from '../AtlasPanel';
import CommandCenter from '../CommandCenter';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import { useResizablePanel } from './hooks/useResizablePanel';
import { KnowledgeGraph } from '../../services/KnowledgeGraph'; // Assuming path
import ALogo from '../ALogo';

// --- STATE MANAGEMENT ---
type LayoutState = {
    isSidebarOpen: boolean;
    isAtlasOpen: boolean;
    isCommandCenterOpen: boolean;
    isMobileMenuOpen: boolean;
    initialCommandQuery: string;
};

type LayoutAction =
    | { type: 'TOGGLE_SIDEBAR' }
    | { type: 'TOGGLE_ATLAS' }
    | { type: 'OPEN_COMMAND_CENTER'; payload?: string }
    | { type: 'CLOSE_COMMAND_CENTER' }
    | { type: 'TOGGLE_MOBILE_MENU' }
    | { type: 'SET_MOBILE_MENU'; payload: boolean };

const initialState: LayoutState = {
    isSidebarOpen: false,
    isAtlasOpen: false,
    isCommandCenterOpen: false,
    isMobileMenuOpen: false,
    initialCommandQuery: '',
};

const layoutReducer = (state: LayoutState, action: LayoutAction): LayoutState => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return { ...state, isSidebarOpen: !state.isSidebarOpen, isAtlasOpen: state.isSidebarOpen ? state.isAtlasOpen : false };
        case 'TOGGLE_ATLAS':
            return { ...state, isAtlasOpen: !state.isAtlasOpen, isSidebarOpen: state.isAtlasOpen ? state.isSidebarOpen : false };
        case 'OPEN_COMMAND_CENTER':
            return { ...state, isCommandCenterOpen: true, initialCommandQuery: action.payload || '' };
        case 'CLOSE_COMMAND_CENTER':
            return { ...state, isCommandCenterOpen: false, initialCommandQuery: '' };
        case 'TOGGLE_MOBILE_MENU':
            return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
        case 'SET_MOBILE_MENU':
            return { ...state, isMobileMenuOpen: action.payload };
        default:
            return state;
    }
};

// --- HELPER FUNCTIONS ---
const getContextFromPath = (pathname: string): string => {
    if (pathname === '/') return 'Mission Control // System Overview';
    
    const pillarMatch = pathname.match(/\/pillar\/([^\/]+)/);
    if (pillarMatch) {
        const pillarId = pillarMatch[1];
        const node = KnowledgeGraph.getNode(pillarirId);
        return node ? `Pillar ${node.data.code}: ${node.data.title}` : 'Pillar View';
    }

    const labMatch = pathname.match(/\/lab\/([^\/]+)/);
    if (labMatch) {
        return `Engineering Lab // ${labMatch[1].replace(/-/g, ' ').toUpperCase()}`;
    }

    // Generic fallback
    const pageName = pathname.substring(1).replace(/-/g, ' ');
    return pageName ? `Section: ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}` : 'Engineering Hub';
};

// --- MAIN COMPONENT ---
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(layoutReducer, initialState);
    const location = useLocation();

    // Close mobile menu on navigation
    useEffect(() => {
        dispatch({ type: 'SET_MOBILE_MENU', payload: false });
    }, [location.pathname]);

    const { width: atlasWidth, isResizing, startResizing } = useResizablePanel({
        initialWidth: 350,
        minWidth: 300,
        maxWidth: 500,
        isPanelOpen: state.isAtlasOpen,
    });

    const handleSearch = useCallback((query: string) => {
        dispatch({ type: 'OPEN_COMMAND_CENTER', payload: query });
    }, []);

    const mainStyle = {
        marginLeft: state.isSidebarOpen && window.innerWidth >= 768 ? '18rem' : '0',
        marginRight: state.isAtlasOpen && window.innerWidth >= 768 ? `${atlasWidth}px` : '0',
        transition: isResizing ? 'none' : 'margin 500ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        willChange: 'margin-left, margin-right',
    };

    return (
        <div className="flex h-screen w-screen bg-slate-950 text-slate-300 font-sans overflow-hidden">
            {/* Background pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none ..." />

            <CommandCenter
                isOpen={state.isCommandCenterOpen}
                setIsOpen={(isOpen) => dispatch({ type: isOpen ? 'OPEN_COMMAND_CENTER' : 'CLOSE_COMMAND_CENTER' })}
                initialQuery={state.initialCommandQuery}
            />

            <Sidebar
                isSidebarOpen={state.isSidebarOpen}
                toggleSidebar={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                isMobileMenuOpen={state.isMobileMenuOpen}
                setIsMobileMenuOpen={(isOpen) => dispatch({ type: 'SET_MOBILE_MENU', payload: isOpen })}
            />

            <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden" style={mainStyle}>
                <Header
                    toggleMobileMenu={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
                    toggleSidebar={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                    isAtlasOpen={state.isAtlasOpen}
                    setIsAtlasOpen={() => dispatch({ type: 'TOGGLE_ATLAS' })}
                    onSearch={handleSearch}
                />

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <AtlasPanel
                    isOpen={state.isAtlasOpen}
                    onClose={() => dispatch({ type: 'TOGGLE_ATLAS' })}
                    context={getContextFromPath(location.pathname)}
                    width={atlasWidth}
                    isResizing={isResizing}
                    onResizeStart={startResizing}
                />
                
                {!state.isAtlasOpen && (
                    <motion.button /* Atlas open button */> 
                         <ALogo /> Atlas AI Online
                    </motion.button>
                )}
            </main>
        </div>
    );
};

export default Layout;
