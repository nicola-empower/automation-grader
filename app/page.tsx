'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import TaskInput from '@/components/TaskInput';
import HourlyRateInput from '@/components/HourlyRateInput';
import Results from '@/components/Results';
import { Task, Results as ResultsType } from '@/types';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: '', system: '', time: 10, frequency: 'weekly' }
  ]);
  const [hourlyRate, setHourlyRate] = useState<number>(30);
  const [results, setResults] = useState<ResultsType | null>(null);

  const addNewTask = () => {
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), name: '', system: '', time: 10, frequency: 'weekly' }
    ]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id: string, field: keyof Task, value: string | number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const calculateResults = () => {
    let totalAnnualHours = 0;
    let totalFeasibility = 0;
    let taskCount = 0;

    // Profile analysis variables
    let goalTimeSaving = 0;
    let goalClientExperience = 0;
    let goalScalability = 0;
    let solutionSimple = 0;
    let solutionCustom = 0;

    tasks.forEach(task => {
      const time = task.time || 0;
      const frequency = task.frequency;
      const taskName = task.name.toLowerCase();
      const system = task.system.toLowerCase();
      const fullTaskDesc = taskName + " " + system;

      if (time > 0) {
        taskCount++;

        // Calculate Annual Hours
        let multiplier = 0;
        switch (frequency) {
          case "daily":
            multiplier = 260;
            break;
          case "weekly":
            multiplier = 52;
            break;
          case "monthly":
            multiplier = 12;
            break;
          case "quarterly":
            multiplier = 4;
            break;
        }
        const taskAnnualHours = (time / 60) * multiplier;
        totalAnnualHours += taskAnnualHours;

        // Calculate Feasibility Score
        let taskFeasibility = 50; // Base score
        if (['email', 'sheets', 'docs', 'xero', 'quickbooks', 'crm', 'zapier'].some(s => system.includes(s))) {
          taskFeasibility += 40;
        }
        if (['bespoke', 'custom software', 'paper', 'filing'].some(s => system.includes(s))) {
          taskFeasibility -= 20;
        }
        if (time > 30) {
          taskFeasibility += 10;
        }
        totalFeasibility += Math.max(0, Math.min(100, taskFeasibility));

        // Calculate Automation Profile
        // 1. Goal Analysis
        if (taskAnnualHours > 10) {
          goalTimeSaving += 1;
        }
        if (['client', 'onboard', 'form', 'portal', 'booking', 'support', 'contact'].some(s => fullTaskDesc.includes(s))) {
          goalClientExperience += 1;
        }
        if (['sale', 'invoice', 'ecommerce', 'report', 'scale', 'growth', 'data', 'marketing'].some(s => fullTaskDesc.includes(s))) {
          goalScalability += 1;
        }

        // 2. Solution Analysis
        if (['email', 'sheets', 'docs', 'xero', 'quickbooks', 'crm', 'zapier', 'make', 'airtable'].some(s => system.includes(s))) {
          solutionSimple += 1;
        }
        if (['custom', 'bespoke', 'portal', 'wizard', 'dashboard', 'web app', 'website', 'next.js', 'wordpress'].some(s => fullTaskDesc.includes(s))) {
          solutionCustom += 1;
        }
      }
    });

    const totalSavings = totalAnnualHours * hourlyRate;
    const avgFeasibility = (taskCount > 0) ? (totalFeasibility / taskCount) : 0;

    // Determine Profile
    let primaryGoal = "Time & Cost Saving";
    if (goalClientExperience > goalTimeSaving && goalClientExperience >= goalScalability) {
      primaryGoal = "Improving Client Experience";
    } else if (goalScalability > goalTimeSaving && goalScalability > goalClientExperience) {
      primaryGoal = "Scalability & Growth";
    }

    let recommendedSolution = "Simple Automation (Scripts, Zapier)";
    if (solutionCustom > solutionSimple) {
      recommendedSolution = "Custom Application Development";
    } else if (solutionCustom > 0 && solutionSimple > 0) {
      recommendedSolution = "Hybrid Solution (Simple + Custom)";
    } else if (taskCount > 0 && solutionCustom === 0 && solutionSimple === 0 && (goalClientExperience > 0 || goalScalability > 0)) {
      recommendedSolution = "Process Review & Consultation";
    }

    setResults({
      totalAnnualHours,
      totalSavings,
      feasibilityScore: avgFeasibility,
      primaryGoal,
      recommendedSolution
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <Header />

      <main className="bg-white rounded-lg shadow-xl p-6 md:p-10">
        <TaskInput
          tasks={tasks}
          onAddTask={addNewTask}
          onRemoveTask={removeTask}
          onUpdateTask={updateTask}
        />

        <hr className="my-8 border-gray-200" />

        <HourlyRateInput
          hourlyRate={hourlyRate}
          setHourlyRate={setHourlyRate}
          onCalculate={calculateResults}
        />

        <hr className="my-8 border-gray-200" />

        {results && <Results results={results} />}
      </main>

      <footer className="text-center mt-8 text-gray-500 text-sm">
        &copy; 2025 Empower Digital Solutions
      </footer>
    </div>
  );
}
