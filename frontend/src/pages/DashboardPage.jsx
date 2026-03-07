import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, PhoneCall, CheckCircle, Clock, Zap } from 'lucide-react';

const DashboardPage = ({ theme }) => {
    const isDark = theme === 'dark';
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/candidates');
            if (response.data.success) {
                setCandidates(response.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch candidates:', err);
            setError('Could not load candidates. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
        const intervalId = setInterval(fetchCandidates, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'PENDING':
                return (
                    <span className={`px-2 py-0.5 sm:px-3 sm:py-1.5 inline-flex text-[10px] sm:text-xs leading-5 font-bold tracking-wider uppercase rounded-md shadow-sm backdrop-blur-sm ${isDark ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-yellow-100/80 text-yellow-800 border border-yellow-200'}`}>
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 my-auto" /> Pending Call
                    </span>
                );
            case 'INTERVIEWED':
                return (
                    <span className={`px-2 py-0.5 sm:px-3 sm:py-1.5 inline-flex text-[10px] sm:text-xs leading-5 font-bold tracking-wider uppercase rounded-md shadow-sm backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-green-100/80 text-green-800 border border-green-200'}`}>
                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 my-auto" /> Interviewed
                    </span>
                );
            default:
                return (
                    <span className={`px-2 py-0.5 sm:px-3 sm:py-1.5 inline-flex text-[10px] sm:text-xs leading-5 font-bold tracking-wider uppercase rounded-md shadow-sm backdrop-blur-sm ${isDark ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' : 'bg-gray-100/80 text-gray-800 border border-gray-200'}`}>
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className="flex-1 w-full flex flex-col p-4 sm:p-6 lg:p-8 h-full">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col h-full">

                {/* Header Block  */}
                <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 flex-shrink-0">
                    <div className="w-full md:w-auto text-center md:text-left">
                        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold flex items-center justify-center md:justify-start tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl border mr-3 sm:mr-4 md:mr-5 ${isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'bg-indigo-100 text-indigo-700 border-indigo-200 shadow-inner'}`}>
                                <Users className="w-8 h-8 md:w-10 md:h-10" />
                            </div>
                            Live Dashboard
                        </h1>
                        <p className={`mt-3 md:mt-4 text-sm md:text-base font-medium pl-1 max-w-2xl mx-auto md:mx-0 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                            Real-time candidate pipeline and AI extraction results.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="flex justify-center md:justify-end gap-3 sm:gap-4 w-full md:w-auto">
                        <div className={`p-4 md:p-5 rounded-xl md:rounded-2xl flex-1 max-w-[140px] md:flex-none md:min-w-[120px] text-center border-t ${isDark ? 'glass-card-dark border-slate-700/50' : 'glass-card-light border-indigo-200/50'}`}>
                            <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Total</p>
                            <p className={`text-3xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-800'}`}>{candidates.length}</p>
                        </div>
                        <div className={`p-4 md:p-5 rounded-xl md:rounded-2xl flex-1 max-w-[140px] md:flex-none md:min-w-[120px] text-center border-t relative overflow-hidden ${isDark ? 'glass-card-dark border-emerald-500/30 bg-emerald-500/5' : 'glass-card-light border-green-400/50 bg-green-50/50'}`}>
                            {isDark && <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-emerald-500/10 blur-xl rounded-full"></div>}
                            <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Completed</p>
                            <p className={`text-3xl md:text-4xl font-black ${isDark ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]' : 'text-emerald-600 drop-shadow-sm'}`}>
                                {candidates.filter(c => c.status === 'INTERVIEWED').length}
                            </p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className={`p-4 rounded-xl mb-6 border flex-shrink-0 ${isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
                        <p className={`text-sm font-semibold ${isDark ? 'text-red-400' : 'text-red-700'}`}>{error}</p>
                    </div>
                )}

                {/* List Container - Let it naturally expand down */}
                <div className={`rounded-2xl lg:rounded-3xl flex-1 flex flex-col shadow-xl md:shadow-2xl border mb-6 ${isDark ? 'glass-card-dark border-slate-700/50' : 'glass-card-light border-indigo-100/50'}`}>
                    {loading && candidates.length === 0 ? (
                        <div className="m-auto p-10 text-center font-semibold flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 text-slate-400">
                            <div className={`w-6 h-6 border-2 border-t-transparent rounded-full animate-spin ${isDark ? 'border-cyan-500' : 'border-indigo-600'}`}></div>
                            <span className={`text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Connecting to AI data stream...</span>
                        </div>
                    ) : candidates.length === 0 ? (
                        <div className="m-auto p-16 flex flex-col items-center">
                            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4 md:mb-6 border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-indigo-50 border-indigo-100'}`}>
                                <Users className={`w-10 h-10 md:w-12 md:h-12 ${isDark ? 'text-slate-500' : 'text-indigo-300'}`} />
                            </div>
                            <p className={`text-xl md:text-2xl font-bold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Your pipeline is empty</p>
                            <p className={`text-sm font-medium max-w-md text-center ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>No candidates have applied yet. Send out the application link to start gathering AI interviews.</p>
                        </div>
                    ) : (
                        <div className="flex-1 w-full p-3 sm:p-5">
                            <ul className="space-y-4">
                                {candidates.map((candidate) => (
                                    <li key={candidate.id} className={`rounded-xl border p-4 md:p-6 transition-all group ${isDark ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600/50' : 'bg-white/40 border-gray-100 shadow-sm hover:bg-white/80'}`}>
                                        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8">

                                            {/* Candidate Basic Info */}
                                            <div className="w-full md:w-[35%] flex flex-col justify-center">
                                                <div className="flex justify-between items-start mb-3 md:mb-0">
                                                    <h3 className={`text-xl md:text-2xl font-bold tracking-tight break-words ${isDark ? 'text-white' : 'text-gray-800'}`}>{candidate.name}</h3>
                                                    <div className="md:hidden mt-0.5">{getStatusBadge(candidate.status)}</div>
                                                </div>

                                                <div className={`mt-2 md:mt-3 flex items-center font-mono text-xs md:text-sm w-fit max-w-full px-3 md:px-3 py-1.5 rounded-lg border ${isDark ? 'text-slate-400 bg-[#0f1021]/60 border-slate-700' : 'text-gray-600 bg-gray-50 border-gray-100'}`}>
                                                    <PhoneCall className={`flex-shrink-0 mr-2 h-3.5 w-3.5 ${isDark ? 'text-cyan-500' : 'text-indigo-400'}`} />
                                                    <span className="truncate">{candidate.phone}</span>
                                                </div>

                                                <div className={`mt-3 text-[10px] md:text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                                                    Applied {new Date(candidate.createdAt).toLocaleDateString()} at {new Date(candidate.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>

                                                <div className="mt-5 hidden md:block w-fit max-w-full">
                                                    {getStatusBadge(candidate.status)}
                                                </div>
                                            </div>

                                            {/* AI Screening Data Box */}
                                            <div className="w-full md:w-[65%] flex-1">
                                                {candidate.status === 'INTERVIEWED' && candidate.interviewData ? (
                                                    <div className={`h-full rounded-xl md:rounded-2xl p-4 md:p-6 border relative overflow-hidden transition-colors ${isDark ? 'bg-gradient-to-br from-indigo-900/20 to-cyan-900/20 border-indigo-500/20 group-hover:border-indigo-500/40' : 'bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border-indigo-100 shadow-sm'}`}>
                                                        <div className={`absolute top-0 left-0 w-1 sm:w-1.5 h-full ${isDark ? 'bg-gradient-to-b from-cyan-400 to-indigo-500' : 'bg-gradient-to-b from-indigo-500 to-purple-500'}`}></div>

                                                        <h4 className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4 md:mb-5 flex items-center ${isDark ? 'text-cyan-400' : 'text-indigo-600'}`}>
                                                            <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" fill="currentColor" />
                                                            AI Extracted Intelligence
                                                        </h4>

                                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                                            {Object.entries(candidate.interviewData).map(([key, value]) => (
                                                                <div key={key} className={`flex flex-col p-3 md:p-4 rounded-xl border backdrop-blur-sm ${isDark ? 'bg-[#0b0c16]/60 border-slate-700/50' : 'bg-white/60 border-white shadow-sm'}`}>
                                                                    <dt className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] mb-1.5 line-clamp-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                                                                        {key.replace(/_/g, ' ')}
                                                                    </dt>
                                                                    <dd className={`text-sm md:text-base font-bold capitalize leading-snug break-words ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                                        {value && value !== 'NA' ? String(value) : (
                                                                            <span className={`italic font-medium ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>Unknown</span>
                                                                        )}
                                                                    </dd>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={`h-full min-h-[120px] md:min-h-[140px] flex flex-col justify-center items-center text-center p-6 rounded-xl md:rounded-2xl border border-dashed ${isDark ? 'bg-[#0f1021]/40 border-slate-700' : 'bg-gray-50/50 border-gray-300'}`}>
                                                        <div className="relative">
                                                            {isDark && <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>}
                                                            <Clock className={`h-8 w-8 md:h-10 md:w-10 mb-3 md:mb-4 relative z-10 ${isDark ? 'text-slate-600' : 'text-indigo-300 opacity-60'}`} />
                                                        </div>
                                                        <p className={`text-sm font-bold tracking-wide ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Interview Pending</p>
                                                        <p className={`text-xs font-medium mt-1.5 max-w-[200px] ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Waiting for AI module to complete screening call</p>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
