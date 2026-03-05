import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, PhoneCall, CheckCircle, Clock } from 'lucide-react';

const DashboardPage = () => {
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
        // Poll every 5 seconds to get updates from Bolna webhooks automatically
        const intervalId = setInterval(fetchCandidates, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'PENDING':
                return (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                        <Clock className="w-4 h-4 mr-1" /> Pending Call
                    </span>
                );
            case 'INTERVIEWED':
                return (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                        <CheckCircle className="w-4 h-4 mr-1" /> Interviewed
                    </span>
                );
            default:
                return (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold leading-tight text-gray-900 flex items-center">
                            <Users className="w-8 h-8 mr-3 text-indigo-600" />
                            Recruiter Dashboard
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Live view of candidate pipeline and Bolna AI screening results. List auto-refreshes.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex space-x-6 text-center">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total</p>
                            <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Interviewed</p>
                            <p className="text-2xl font-bold text-green-600">
                                {candidates.filter(c => c.status === 'INTERVIEWED').length}
                            </p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 p-4 rounded-md mb-6 border border-red-200">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                    {loading && candidates.length === 0 ? (
                        <div className="p-10 text-center text-gray-500">Loading candidates...</div>
                    ) : candidates.length === 0 ? (
                        <div className="p-10 text-center flex flex-col items-center border-t border-gray-200">
                            <Users className="w-12 h-12 text-gray-300 mb-3" />
                            <p className="text-gray-500 font-medium">No candidates have applied yet.</p>
                            <p className="text-sm text-gray-400 mt-1">Share the application link to get started.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {candidates.map((candidate) => (
                                <li key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">

                                        {/* Basic Info */}
                                        <div className="mb-4 md:mb-0 w-full md:w-1/3">
                                            <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
                                            <div className="mt-1 flex items-center text-sm text-gray-500">
                                                <PhoneCall className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                {candidate.phone}
                                            </div>
                                            <div className="mt-1 text-sm text-gray-500">
                                                Applied: {new Date(candidate.createdAt).toLocaleString()}
                                            </div>
                                            <div className="mt-3">
                                                {getStatusBadge(candidate.status)}
                                            </div>
                                        </div>

                                        {/* AI Screening Results section */}
                                        <div className="w-full md:w-2/3 md:pl-8 md:border-l md:border-gray-200">
                                            {candidate.status === 'INTERVIEWED' && candidate.interviewData ? (
                                                <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-3 border-b border-blue-200 pb-2">
                                                        Bolna AI Extraction
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {/* Dynamically render all keys extracted by Bolna */}
                                                        {Object.entries(candidate.interviewData).map(([key, value]) => (
                                                            <div key={key}>
                                                                <dt className="text-xs font-medium text-gray-500 uppercase">
                                                                    {key.replace(/_/g, ' ')}
                                                                </dt>
                                                                <dd className="mt-1 text-sm font-semibold text-gray-900">
                                                                    {value ? String(value) : 'Not provided'}
                                                                </dd>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-full flex flex-col justify-center items-center text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                                    <Clock className="h-8 w-8 text-gray-300 mb-2" />
                                                    <p className="text-sm text-gray-500">Waiting for candidate to complete</p>
                                                    <p className="text-sm text-gray-500">the AI phone screen...</p>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
