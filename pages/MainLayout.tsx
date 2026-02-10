
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    const handleSearch = (query: string) => {
        // Implement search functionality here
        console.log("Searching for:", query);
    };

    return (
        <div className="flex h-screen bg-slate-950 text-white">
            <Sidebar 
                isSidebarOpen={isSidebarOpen}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setMobileMenuOpen} 
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    toggleSidebar={toggleSidebar}
                    toggleMobileMenu={toggleMobileMenu}
                    onSearch={handleSearch}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
