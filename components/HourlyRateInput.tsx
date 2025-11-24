import React from 'react';

interface HourlyRateInputProps {
    hourlyRate: number;
    setHourlyRate: (rate: number) => void;
    onCalculate: () => void;
}

export default function HourlyRateInput({ hourlyRate, setHourlyRate, onCalculate }: HourlyRateInputProps) {
    return (
        <section id="phase-2">
            <h2 className="text-xl font-bold text-gray-900 mb-2 font-display">Phase 2: Calculate Your Opportunity</h2>
            <p className="text-base text-gray-600 mb-6">
                To understand the true cost, let's estimate what your time is worth.
            </p>
            <div className="max-w-xs">
                <label htmlFor="hourly-rate" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Estimated Hourly Rate (£)
                </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">£</span>
                    <input
                        type="number"
                        id="hourly-rate"
                        value={hourlyRate}
                        min="1"
                        onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                        className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                        placeholder="e.g., 30"
                    />
                </div>
            </div>

            <button
                onClick={onCalculate}
                className="w-full md:w-auto mt-6 px-6 py-3 rounded-md font-semibold shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-brand-pink text-white hover:bg-brand-pink-dark focus:ring-brand-pink"
            >
                Calculate My Automation Savings
            </button>
        </section>
    );
}
