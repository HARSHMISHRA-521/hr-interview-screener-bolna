import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ApplyPage from './pages/ApplyPage';
import DashboardPage from './pages/DashboardPage';
import { Briefcase } from 'lucide-react';

const Navigation = () => {
    const location = useLocation();

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Briefcase className="h-8 w-8 text-indigo-600" />
                            <span className="ml-2 font-bold text-xl text-gray-900 tracking-tight">AI Recruiter</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`${location.pathname === '/'
                                        ? 'border-indigo-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Apply
                            </Link>
                            <Link
                                to="/dashboard"
                                className={`${location.pathname === '/dashboard'
                                        ? 'border-indigo-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navigation />
                <main>
                    <Routes>
                        <Route path="/" element={<ApplyPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
