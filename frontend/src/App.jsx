import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ApplyPage from './pages/ApplyPage';
import DashboardPage from './pages/DashboardPage';
import { Briefcase, Menu, X, Sun, Moon } from 'lucide-react';

const Navigation = ({ theme, toggleTheme }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMenu = () => setIsMobileMenuOpen(false);
    const isDark = theme === 'dark';

    return (
        <nav className={`transition-colors duration-300 ${isDark ? 'bg-[#0f1021]/80 border-[#2d2f4d]/50 shadow-md' : 'bg-white/90 border-indigo-200/50 shadow-sm'} backdrop-blur-md border-b sticky top-0 z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 sm:h-20">

                    {/* Logo and Brand Name */}
                    <div className="flex items-center justify-between w-full sm:w-auto">
                        <div className="flex-shrink-0 flex items-center pr-2">
                            <div className={`p-2 sm:p-2.5 rounded-xl ${isDark ? 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md'}`}>
                                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            </div>
                            <div className="ml-3 flex flex-col justify-center">
                                <span className={`font-extrabold text-xl sm:text-2xl tracking-tight leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    HMC Recruiter
                                </span>
                                <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest mt-0.5 ${isDark ? 'text-cyan-400' : 'text-indigo-600'}`}>
                                    AI Screening Agent
                                </span>
                            </div>
                        </div>

                        {/* Mobile Actions */}
                        <div className="sm:hidden flex items-center space-x-1">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full ${isDark ? 'text-cyan-400 hover:bg-slate-800' : 'text-indigo-600 hover:bg-indigo-50'} transition-colors`}
                            >
                                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 focus:outline-none ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-indigo-600'}`}
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-4 md:space-x-8">
                        <Link
                            to="/"
                            className={`${location.pathname === '/'
                                ? isDark ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-indigo-600 border-b-2 border-indigo-600'
                                : isDark ? 'text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500 border-b-2 border-transparent' : 'text-gray-500 hover:text-gray-900 border-b-2 border-transparent'
                                } px-1 py-1.5 text-xs lg:text-sm font-bold transition-all uppercase tracking-wider`}
                        >
                            Apply Form
                        </Link>
                        <Link
                            to="/dashboard"
                            className={`${location.pathname === '/dashboard'
                                ? isDark ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-indigo-600 border-b-2 border-indigo-600'
                                : isDark ? 'text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500 border-b-2 border-transparent' : 'text-gray-500 hover:text-gray-900 border-b-2 border-transparent'
                                } px-1 py-1.5 text-xs lg:text-sm font-bold transition-all uppercase tracking-wider`}
                        >
                            Recruiter Dashboard
                        </Link>

                        {/* Desktop Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2.5 rounded-full ml-2 md:ml-4 transition-colors ${isDark ? 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800' : 'text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 bg-white border border-indigo-100 shadow-sm'}`}
                            title="Toggle Theme"
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu Dropdown */}
            <div className={`sm:hidden absolute w-full transition-all duration-300 ease-in-out ${isDark ? 'bg-[#15172b]/95 border-[#2d2f4d]/50 shadow-lg' : 'bg-white/95 border-indigo-100 shadow-md'} backdrop-blur-xl border-b ${isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-4 pt-2 pb-4 space-y-2">
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className={`${location.pathname === '/'
                            ? isDark ? 'bg-[#1e2038] text-cyan-400 border-l-4 border-cyan-400' : 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                            : isDark ? 'text-gray-300 hover:bg-[#1e2038] hover:text-white border-l-4 border-transparent' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                            } block px-3 py-3 rounded-md text-base font-medium transition-colors`}
                    >
                        Apply Form
                    </Link>
                    <Link
                        to="/dashboard"
                        onClick={closeMenu}
                        className={`${location.pathname === '/dashboard'
                            ? isDark ? 'bg-[#1e2038] text-cyan-400 border-l-4 border-cyan-400' : 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                            : isDark ? 'text-gray-300 hover:bg-[#1e2038] hover:text-white border-l-4 border-transparent' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                            } block px-3 py-3 rounded-md text-base font-medium transition-colors`}
                    >
                        Recruiter Dashboard
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const App = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme-active');
            document.body.classList.remove('light-theme-active');
            document.documentElement.style.backgroundColor = '#0b0c16'; // Synchronize HTML color exactly to avoid white bounce padding
        } else {
            document.body.classList.add('light-theme-active');
            document.body.classList.remove('dark-theme-active');
            document.documentElement.style.backgroundColor = '#f8fafc';
        }
    }, [theme]);

    const isDark = theme === 'dark';

    return (
        <Router>
            <div className="flex-1 w-full max-w-[100vw] min-h-screen flex flex-col font-sans transition-colors duration-500 overflow-x-hidden relative">
                <Navigation theme={theme} toggleTheme={toggleTheme} />

                {/* Main Content Area */}
                <main className="flex-1 w-full max-w-[100vw] flex flex-col relative pb-16 overflow-x-hidden">
                    <Routes>
                        <Route path="/" element={<ApplyPage theme={theme} />} />
                        <Route path="/dashboard" element={<DashboardPage theme={theme} />} />
                    </Routes>
                </main>

                {/* Global Watermark */}
                <div className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 text-[9px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors z-[100] backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:scale-105 transform duration-300 border shadow-lg ${isDark ? 'text-slate-400 border-slate-700/50 bg-[#0f1021]/80 hover:text-cyan-400' : 'text-gray-500 border-indigo-200/60 bg-white/90 hover:text-indigo-600'}`}>
                    Built by <span className={isDark ? 'text-white' : 'text-indigo-700'}>Harsh Mishra</span>
                </div>
            </div>
        </Router>
    );
};

export default App;
