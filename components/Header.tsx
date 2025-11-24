import React from 'react';

export default function Header() {
    return (
        <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-purple mb-2 font-display">
                Automation Feasibility Grader
            </h1>
            <p className="text-lg text-gray-600">
                Turn your repetitive tasks into measurable opportunities.
            </p>
        </header>
    );
}
