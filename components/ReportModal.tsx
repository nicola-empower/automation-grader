'use client';

import React, { useState } from 'react';
import { Results as ResultsType } from '@/types';

interface ReportModalProps {
    results: ResultsType;
    onClose: () => void;
}

export default function ReportModal({ results, onClose }: ReportModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [consent, setConsent] = useState(false);
    const [sending, setSending] = useState(false);

    const currencyFormatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });

    const handleSendEmail = () => {
        if (!consent) {
            alert('Please agree to be contacted before sending your report.');
            return;
        }

        if (!name || !email) {
            alert('Please enter your name and email address.');
            return;
        }

        setSending(true);

        // Create email body with results
        const emailBody = `
Full Automation Report Request

Contact Details:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Automation Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Time Reclaimed (Annual): ${results.totalAnnualHours.toFixed(1)} hours/year
Estimated Savings (Annual): ${currencyFormatter.format(results.totalSavings)}
Automation Feasibility: ${results.feasibilityScore.toFixed(0)}%

Primary Opportunity: ${results.primaryGoal}
Recommended Solution: ${results.recommendedSolution}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The user has consented to be contacted regarding automation solutions.
    `.trim();

        const subject = 'Full Automation Report Request';
        const mailtoLink = `mailto:nicola@empowervaservices.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        // Open email client
        window.location.href = mailtoLink;

        setTimeout(() => {
            setSending(false);
            alert('Your email client should open shortly. If it doesn\'t, please contact us directly at nicola@empowervaservices.co.uk');
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-brand-purple text-white p-6 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold font-display">Your Full Automation Report</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 text-3xl leading-none"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4 font-display">Your Results Summary</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Time Reclaimed</p>
                            <p className="text-2xl font-bold text-brand-purple">{results.totalAnnualHours.toFixed(1)}</p>
                            <p className="text-xs text-gray-500">Hours / Year</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Annual Savings</p>
                            <p className="text-2xl font-bold text-brand-pink">{currencyFormatter.format(results.totalSavings)}</p>
                            <p className="text-xs text-gray-500">Value / Year</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Feasibility</p>
                            <p className="text-2xl font-bold text-brand-purple">{results.feasibilityScore.toFixed(0)}%</p>
                            <p className="text-xs text-gray-500">Likely to Automate</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Primary Opportunity</p>
                            <p className="text-sm font-semibold text-brand-purple">{results.primaryGoal}</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Recommended Solution</p>
                            <p className="text-sm font-semibold text-brand-pink">{results.recommendedSolution}</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4 font-display">Get Your Detailed Report</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Enter your details below and we'll send you a comprehensive automation strategy tailored to your business.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="modal-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                                placeholder="Your full name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="modal-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone (Optional)
                            </label>
                            <input
                                type="tel"
                                id="modal-phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                                placeholder="+44 7XXX XXXXXX"
                            />
                        </div>

                        {/* GDPR Consent */}
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <label className="flex items-start cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="mt-1 mr-3 h-4 w-4 text-brand-purple focus:ring-brand-purple border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">
                                    I consent to being contacted by Empower VA Services regarding automation solutions.
                                    Your data will be processed in accordance with GDPR regulations and our privacy policy.
                                    You can withdraw consent at any time. <span className="text-red-500">*</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button
                            onClick={handleSendEmail}
                            disabled={sending || !consent || !name || !email}
                            className="flex-1 px-6 py-3 rounded-md font-semibold shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-brand-pink text-white hover:bg-brand-pink-dark focus:ring-brand-pink disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sending ? 'Opening Email...' : 'Send Report Request'}
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-md font-semibold shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400"
                        >
                            Close
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                        By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                </div>
            </div>
        </div>
    );
}
