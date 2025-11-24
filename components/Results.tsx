import React from 'react';
import { Results as ResultsType } from '@/types';

interface ResultsProps {
    results: ResultsType;
    onRequestReport: () => void;
}

export default function Results({ results, onRequestReport }: ResultsProps) {
    const currencyFormatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });

    return (
        <section id="phase-3" className="animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 mb-2 font-display">Phase 3: Your Automation Report</h2>
            <p className="text-base text-gray-600 mb-6">
                Here's the potential value locked inside your manual processes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {/* Total Annual Hours */}
                <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Time Reclaimed (Annual)</h3>
                    <p className="text-4xl font-bold my-1 text-brand-purple">{results.totalAnnualHours.toFixed(1)}</p>
                    <p className="text-sm text-gray-500">Hours / Year</p>
                </div>

                {/* Total Annual Savings */}
                <div className="bg-brand-purple text-white p-4 rounded-lg shadow border border-gray-100">
                    <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wide">Estimated Savings (Annual)</h3>
                    <p className="text-4xl font-bold my-1">{currencyFormatter.format(results.totalSavings)}</p>
                    <p className="text-sm text-white/80">Value / Year</p>
                </div>

                {/* Feasibility Score */}
                <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Automation Feasibility</h3>
                    <p className="text-4xl font-bold my-1 text-brand-pink">{results.feasibilityScore.toFixed(0)}%</p>
                    <p className="text-sm text-gray-500">Likely to Automate</p>
                </div>
            </div>

            {/* Profile Analysis */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-2">Primary Opportunity</h4>
                    <p className="text-lg text-brand-purple font-semibold">{results.primaryGoal}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-2">Recommended Solution</h4>
                    <p className="text-lg text-brand-pink font-semibold">{results.recommendedSolution}</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-lg text-gray-700">
                    Ready to reclaim this time and reinvest it in growing your business?
                </p>
                <button
                    onClick={onRequestReport}
                    className="mt-4 px-8 py-3 text-lg rounded-md font-semibold shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-brand-pink text-white hover:bg-brand-pink-dark focus:ring-brand-pink"
                >
                    Get Your Full Automation Report
                </button>
            </div>
        </section>
    );
}
