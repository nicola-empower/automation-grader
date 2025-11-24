import React from 'react';
import { Task } from '@/types';

interface TaskInputProps {
    tasks: Task[];
    onAddTask: () => void;
    onRemoveTask: (id: string) => void;
    onUpdateTask: (id: string, field: keyof Task, value: string | number) => void;
}

export default function TaskInput({ tasks, onAddTask, onRemoveTask, onUpdateTask }: TaskInputProps) {
    return (
        <section id="phase-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2 font-display">Phase 1: Your Repetitive Tasks</h2>
            <p className="text-base text-gray-600 mb-6">
                List the manual tasks you do regularly. Don't worry about the "system" if you're unsure, just describe it (e.g., "my email," "Excel," "our CRM").
            </p>

            <div id="task-list" className="space-y-4 mb-6">
                {tasks.map((task) => (
                    <div key={task.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-10 gap-3">

                            <div className="md:col-span-3">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Task Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                                    placeholder="e.g., Create invoices"
                                    value={task.name}
                                    onChange={(e) => onUpdateTask(task.id, 'name', e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-600 mb-1">System Used</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                                    placeholder="e.g., Xero"
                                    value={task.system}
                                    onChange={(e) => onUpdateTask(task.id, 'system', e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Time Per Task</label>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                                        value={task.time}
                                        min="1"
                                        onChange={(e) => onUpdateTask(task.id, 'time', parseFloat(e.target.value) || 0)}
                                    />
                                    <span className="text-gray-500 ml-2">min</span>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Frequency</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                                    value={task.frequency}
                                    onChange={(e) => onUpdateTask(task.id, 'frequency', e.target.value)}
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                </select>
                            </div>

                            <div className="md:col-span-1 flex items-end justify-end">
                                <button
                                    onClick={() => onRemoveTask(task.id)}
                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full font-bold text-lg leading-none hover:bg-red-500 hover:text-white transition-colors"
                                    title="Remove task"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onAddTask}
                className="px-6 py-3 rounded-md font-semibold shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-brand-purple-light text-brand-purple hover:bg-brand-purple-dark hover:text-white focus:ring-brand-purple"
            >
                + Add Another Task
            </button>
        </section>
    );
}
