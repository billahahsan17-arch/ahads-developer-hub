
import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

interface HeaderProps {
    toggleSidebar: () => void;
    toggleMobileMenu: () => void;
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleMobileMenu, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <header className="flex-shrink-0 h-16 bg-slate-900/70 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-3">
                <button onClick={toggleSidebar} className="hidden md:block text-slate-400 hover:text-white transition-colors">
                    <Menu className="w-6 h-6" />
                </button>
                <button onClick={toggleMobileMenu} className="md:hidden text-slate-400 hover:text-white transition-colors">
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-semibold text-white">Developer Hub</h1>
            </div>

            <div className="flex-1 flex justify-center px-4">
                <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                </form>
            </div>

            <div className="flex items-center gap-4">
                {/* Placeholder for User Profile / Notifications */}
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
            </div>
        </header>
    );
};

export default Header;
