import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Phone, ArrowRight, CheckCircle } from 'lucide-react';

const ApplyPage = () => {
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
            // Assuming standard local port for backend is 3000
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center border-t-4 border-green-500">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-3xl font-extrabold text-gray-900">Application Submitted!</h2>
                    <p className="mt-2 text-md text-gray-600">
                        Thank you, {formData.name}. Our AI Recruiter will call you shortly at <strong>{formData.phone}</strong> for a brief screening interview.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={() => {
                                setStatus('idle');
                                setFormData({ name: '', email: '', phone: '' });
                            }}
                            className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            Submit another application
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border-t-4 border-indigo-600">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                        Join Our Team
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Apply below and complete an instant AI phone screen.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {status === 'error' && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md">
                            <p className="text-sm text-red-700">{errorMessage}</p>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (with Country Code)</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                                    placeholder="+1234567890"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Important: Must include country code for the AI to call you (e.g., +1).</p>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-colors"
                        >
                            {status === 'loading' ? 'Submitting...' : 'Apply Now'}
                            {!status === 'loading' && <ArrowRight className="ml-2 h-5 w-5" />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyPage;
