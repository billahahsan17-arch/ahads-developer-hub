
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Code, Cpu, BookOpen, GitBranch, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
    isSidebarOpen: boolean;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const mainNavLinks = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
];

const devMainNavLinks = [
    { 
        label: "AI Lab", 
        icon: Zap, 
        subLinks: [
            { path: "/lab/assembly", icon: Cpu, label: "Assembly Dojo" },
            { path: "/lab/code-interpreter", icon: Code, label: "Code Interpreter" },
        ]
    },
    {
        label: "Learning Path",
        icon: GitBranch,
        subLinks: [
            { path: "/learn/frontend", icon: BookOpen, label: "Frontend" },
        ]
    }
];

const NavItem: React.FC<{ link: { path: string, icon: React.ElementType, label: string }, isSidebarOpen: boolean }> = ({ link, isSidebarOpen }) => {
    const { pathname } = useLocation();
    const isActive = pathname === link.path;

    return (
        <NavLink to={link.path} className="block">
            <motion.div 
                whileHover={{ backgroundColor: "#3e4a6b"}} 
                className={`flex items-center h-10 px-3 rounded-lg cursor-pointer ${isActive ? 'bg-indigo-600' : ''}`}>
                <link.icon className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {isSidebarOpen && <span className="text-sm font-medium">{link.label}</span>}
            </motion.div>
        </NavLink>
    );
};


const CollapsibleNavItem: React.FC<{ item: any, isSidebarOpen: boolean }> = ({ item, isSidebarOpen }) => {
    const { pathname } = useLocation();
    const isParentActive = item.subLinks.some((sl: any) => pathname.startsWith(sl.path));
    const [isSubmenuOpen, setSubmenuOpen] = useState(isParentActive);

    const toggleSubmenu = () => setSubmenuOpen(!isSubmenuOpen);

    return (
        <div>
            <div onClick={toggleSubmenu} className="flex items-center h-10 px-3 rounded-lg cursor-pointer hover:bg-slate-700">
                <item.icon className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {isSidebarOpen && <span className="flex-1 text-sm font-medium">{item.label}</span>}
                {isSidebarOpen && <ChevronDown className={`w-4 h-4 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`} />}
            </div>

            <AnimatePresence>
                {isSidebarOpen && isSubmenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-6"
                    >
                        <div className="pt-2 flex flex-col space-y-1 border-l border-slate-700 ml-2.5">
                             {item.subLinks.map((subLink: any) => (
                                <NavLink key={subLink.path} to={subLink.path} className={({ isActive }) => 
                                     `flex items-center h-8 px-4 text-sm rounded-md transition-colors ${isActive ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'}`
                                }>
                                   <subLink.icon className="w-4 h-4 mr-3" />
                                    {subLink.label}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};



const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const sidebarContent = (
        <div className="flex flex-col h-full bg-slate-900 text-slate-300 p-3">
            <div className="flex-1 space-y-2">
                {mainNavLinks.map(link => <NavItem key={link.path} link={link} isSidebarOpen={isSidebarOpen} />)}
                
                <div className="border-t border-slate-800 my-4"></div>

                {devMainNavLinks.map((item, index) => (
                   isSidebarOpen 
                        ? <CollapsibleNavItem key={index} item={item} isSidebarOpen={isSidebarOpen} />
                        : <div className="my-3"><item.icon className="w-5 h-5 mx-auto" /></div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.div
                animate={{ width: isSidebarOpen ? 240 : 68 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="hidden md:block h-screen bg-slate-900 border-r border-slate-800"
            >
                {sidebarContent}
            </motion.div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                        className="md:hidden fixed inset-0 z-40 w-64"
                    >
                        {sidebarContent}
                    </motion.div>
                )}
            </AnimatePresence>
             {isMobileMenuOpen && <div onClick={() => setIsMobileMenuOpen(false)} className="md:hidden fixed inset-0 bg-black/60 z-30"/>}
        </>
    );
};

export default Sidebar;
