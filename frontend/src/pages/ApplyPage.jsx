import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Phone, ArrowRight, CheckCircle, Sparkles, ShieldCheck, UserCircle2 } from 'lucide-react';

const ApplyPage = ({ theme }) => {
    const isDark = theme === 'dark';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:3000/api/candidates/apply', formData);
            if (response.data.success) {
                setStatus('success');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage(
                error.response?.data?.error ||
                error.response?.data?.details?.[0]?.message ||
                'Failed to submit application. Please try again.'
            );
        }
    };

    if (status === 'success') {
        return (
            <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 py-8">
                <div className={`max-w-md w-full p-8 sm:p-10 rounded-2xl text-center border-t-4 transform transition-all hover:scale-[1.02] duration-300 relative overflow-hidden ${isDark ? 'glass-card-dark border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.15)]' : 'glass-card-light border-emerald-400 shadow-[0_10px_40px_-10px_rgba(52,211,153,0.3)]'}`}>
                    {isDark && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>}

                    <div className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 relative z-10 ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-100 shadow-inner'}`}>
                        <CheckCircle className={`h-8 w-8 sm:h-10 sm:w-10 ${isDark ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'text-emerald-500'}`} />
                    </div>

                    <h2 className={`text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-3 tracking-tight relative z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Application Sent!
                    </h2>

                    <p className={`mt-2 text-sm sm:text-base leading-relaxed relative z-10 px-2 sm:px-0 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                        Thank you, <span className={`font-semibold ${isDark ? 'text-white' : 'text-indigo-700'}`}>{formData.name}</span>.
                        <br />
                        Our <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-indigo-600'}`}>HMC Recruiter Agent</span> will call you shortly on:
                    </p>

                    <div className="my-5 sm:my-6 relative z-10">
                        <span className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-mono text-base sm:text-lg tracking-wider border transition-colors ${isDark ? 'bg-slate-800/80 text-cyan-400 border-slate-700 shadow-inner' : 'bg-indigo-50 text-indigo-800 border-indigo-100 shadow-sm'}`}>
                            {formData.phone}
                        </span>
                    </div>

                    <div className="mt-6 sm:mt-8 relative z-10">
                        <button
                            onClick={() => {
                                setStatus('idle');
                                setFormData({ name: '', email: '', phone: '' });
                            }}
                            className={`group text-sm sm:text-base font-bold tracking-wide transition-colors flex items-center justify-center w-full bg-transparent border-none ${isDark ? 'text-slate-400 hover:text-white' : 'text-indigo-500 hover:text-indigo-700'}`}
                        >
                            Submit another application
                            <ArrowRight className="ml-1.5 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 py-8 lg:py-10">
            <div className={`w-full max-w-md rounded-3xl overflow-hidden relative ${isDark ? 'glass-card-dark border border-slate-700/50 shadow-[0_0_50px_rgba(99,102,241,0.15)]' : 'glass-card-light border border-white/80 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.25)]'}`}>
                <div className="p-6 sm:p-8 relative">

                    {isDark ? (
                        <>
                            <div className="absolute -top-16 -left-16 sm:-top-20 sm:-left-20 w-32 h-32 sm:w-40 sm:h-40 bg-indigo-500/20 rounded-full blur-[40px] sm:blur-[50px] pointer-events-none w-full max-w-full"></div>
                            <div className="absolute -bottom-16 -right-16 sm:-bottom-20 sm:-right-20 w-32 h-32 sm:w-40 sm:h-40 bg-cyan-500/20 rounded-full blur-[40px] sm:blur-[50px] pointer-events-none"></div>
                        </>
                    ) : (
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>
                    )}

                    <div className="text-center mb-6 sm:mb-8 relative z-10 w-full">
                        <div className="flex justify-center mb-4">
                            <div className={`inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl border shadow-inner ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-indigo-50'}`}>
                                <UserCircle2 className={`h-8 w-8 sm:h-10 sm:w-10 ${isDark ? 'text-cyan-400' : 'text-indigo-500'}`} />
                                <Sparkles className={`absolute top-0 right-0 -mr-1 -mt-1 sm:-mr-2 sm:-mt-2 h-4 w-4 sm:h-5 sm:w-5 ${isDark ? 'text-indigo-400' : 'text-purple-400'}`} />
                            </div>
                        </div>

                        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Candidate Form
                        </h2>
                        <p className={`text-sm sm:text-base font-medium px-2 sm:px-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                            Enter details below to receive an instant screening call from our <strong className={isDark ? 'text-cyan-400 font-bold' : 'text-indigo-600 font-bold'}>HMC Recruiter</strong>.
                        </p>
                    </div>

                    <form className="space-y-5 relative z-10 w-full" onSubmit={handleSubmit}>
                        {status === 'error' && (
                            <div className={`border p-3 sm:p-4 rounded-xl flex items-start space-x-2 sm:space-x-3 ${isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200 shadow-sm'}`}>
                                <ShieldCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                                <p className={`text-sm font-medium ${isDark ? 'text-red-300' : 'text-red-700'}`}>{errorMessage}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className={`block text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 ml-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                        <User className={`h-5 w-5 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-cyan-400' : 'text-gray-400 group-focus-within:text-indigo-500'}`} />
                                    </div>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        className={`block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl transition-all shadow-inner outline-none focus:ring-2 ${isDark ? 'bg-[#0f1021]/60 border border-slate-700 text-white focus:ring-cyan-500/50 focus:border-cyan-500 placeholder-slate-600' : 'bg-gray-50/80 border border-gray-200 text-gray-900 focus:ring-indigo-500/30 focus:border-indigo-500 placeholder-gray-400 hover:bg-white'}`}
                                        placeholder="e.g. John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 ml-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                        <Mail className={`h-5 w-5 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-cyan-400' : 'text-gray-400 group-focus-within:text-indigo-500'}`} />
                                    </div>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className={`block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl transition-all shadow-inner outline-none focus:ring-2 ${isDark ? 'bg-[#0f1021]/60 border border-slate-700 text-white focus:ring-cyan-500/50 focus:border-cyan-500 placeholder-slate-600' : 'bg-gray-50/80 border border-gray-200 text-gray-900 focus:ring-indigo-500/30 focus:border-indigo-500 placeholder-gray-400 hover:bg-white'}`}
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-end mb-1.5 ml-1">
                                    <label className={`block text-[11px] sm:text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Phone Number</label>
                                    <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded border ${isDark ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>+ Country Code</span>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                        <Phone className={`h-5 w-5 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-cyan-400' : 'text-gray-400 group-focus-within:text-indigo-500'}`} />
                                    </div>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        className={`block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl transition-all shadow-inner outline-none font-mono tracking-wide focus:ring-2 ${isDark ? 'bg-[#0f1021]/60 border border-slate-700 text-white focus:ring-cyan-500/50 focus:border-cyan-500 placeholder-slate-600' : 'bg-gray-50/80 border border-gray-200 text-gray-900 focus:ring-indigo-500/30 focus:border-indigo-500 placeholder-gray-400 hover:bg-white'}`}
                                        placeholder="+1 234 567 8900"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm sm:text-base font-extrabold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 transition-all overflow-hidden ${isDark
                                    ? 'text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 focus:ring-cyan-500 focus:ring-offset-[#111324] shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]'
                                    : 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:ring-indigo-500 focus:ring-offset-white shadow-md shadow-indigo-200/50'
                                    }`}
                            >
                                <span className="relative z-10 flex items-center tracking-wide">
                                    {status === 'loading' ? 'Assigning Agent...' : 'Send to HMC Recruiter'}
                                    {!status === 'loading' && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyPage;
