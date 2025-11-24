export interface Task {
    id: string;
    name: string;
    system: string;
    time: number;
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

export interface Results {
    totalAnnualHours: number;
    totalSavings: number;
    feasibilityScore: number;
    primaryGoal: string;
    recommendedSolution: string;
}
