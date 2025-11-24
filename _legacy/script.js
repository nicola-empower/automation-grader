// Wait for the DOM to be fully loaded before running any script
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Get Element References ---
    const taskList = document.getElementById("task-list");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskTemplate = document.getElementById("task-template");

    const calculateBtn = document.getElementById("calculate-btn");
    const hourlyRateInput = document.getElementById("hourly-rate");

    const resultsSection = document.getElementById("phase-3");
    const totalHoursEl = document.getElementById("total-hours");
    const totalSavingsEl = document.getElementById("total-savings");
    const feasibilityScoreEl = document.getElementById("feasibility-score");
    // --- NEW: Get references for profile elements ---
    const primaryOpportunityEl = document.getElementById("primary-opportunity");
    const recommendedSolutionEl = document.getElementById("recommended-solution");

    // --- 2. Core Functions ---

    /**
     * Adds a new task row to the list.
     * It clones the hidden template and adds event listeners.
     */
    function addNewTask() {
        // Clone the template's content
        const taskClone = taskTemplate.content.cloneNode(true);
        const taskRow = taskClone.querySelector(".task-row");

        // Find the remove button within the new clone and add its click listener
        const removeBtn = taskRow.querySelector(".remove-task-btn");
        removeBtn.addEventListener("click", () => {
            taskRow.remove();
        });

        // Add the new row to the list
        taskList.appendChild(taskRow);
    }

    /**
     * Calculates all results based on the task list and hourly rate.
     */
    function calculateResults() {
        let totalAnnualHours = 0;
        let totalFeasibility = 0;
        let taskCount = 0;

        // --- NEW: Profile analysis variables ---
        let goalTimeSaving = 0;
        let goalClientExperience = 0;
        let goalScalability = 0;
        let solutionSimple = 0;
        let solutionCustom = 0;

        // Get all task rows from the list
        const tasks = taskList.querySelectorAll(".task-row");
        const hourlyRate = parseFloat(hourlyRateInput.value) || 0;

        tasks.forEach(task => {
            // Get values from the inputs in this row
            const time = parseFloat(task.querySelector(".task-time").value) || 0;
            const frequency = task.querySelector(".task-frequency").value;
            // --- NEW: Get task name and system for analysis ---
            const taskName = task.querySelector(".task-name").value.toLowerCase();
            const system = task.querySelector(".task-system").value.toLowerCase();
            const fullTaskDesc = taskName + " " + system;
            
            if (time > 0) {
                taskCount++;
                
                // --- Calculate Annual Hours for this task ---
                let multiplier = 0;
                switch (frequency) {
                    case "daily":
                        multiplier = 260; // 5 days/week * 52 weeks
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
                // Convert minutes to hours and multiply by frequency
                const taskAnnualHours = (time / 60) * multiplier;
                totalAnnualHours += taskAnnualHours;

                // --- Calculate Feasibility Score (existing logic) ---
                // This is a simple logic based on your notes. You can make this
                // as complex as you want!
                let taskFeasibility = 50; // Base score
                if (['email', 'sheets', 'docs', 'xero', 'quickbooks', 'crm', 'zapier'].some(s => system.includes(s))) {
                    taskFeasibility += 40; // High feasibility for common tools
                }
                if (['bespoke', 'custom software', 'paper', 'filing'].some(s => system.includes(s))) {
                    taskFeasibility -= 20; // Lower feasibility
                }
                if (time > 30) {
                    taskFeasibility += 10; // High-time tasks are good candidates
                }
                // Ensure score is between 0 and 100
                totalFeasibility += Math.max(0, Math.min(100, taskFeasibility));

                // --- NEW: Calculate Automation Profile ---
                
                // 1. Goal Analysis (what people want)
                if (taskAnnualHours > 10) { // Significant time sinks
                    goalTimeSaving += 1;
                }
                if (['client', 'onboard', 'form', 'portal', 'booking', 'support', 'contact'].some(s => fullTaskDesc.includes(s))) {
                    goalClientExperience += 1;
                }
                if (['sale', 'invoice', 'ecommerce', 'report', 'scale', 'growth', 'data', 'marketing'].some(s => fullTaskDesc.includes(s))) {
                    goalScalability += 1;
                }

                // 2. Solution Analysis (automation options)
                if (['email', 'sheets', 'docs', 'xero', 'quickbooks', 'crm', 'zapier', 'make', 'airtable'].some(s => system.includes(s))) {
                    solutionSimple += 1;
                }
                if (['custom', 'bespoke', 'portal', 'wizard', 'dashboard', 'web app', 'website', 'next.js', 'wordpress'].some(s => fullTaskDesc.includes(s))) {
                    solutionCustom += 1;
                }
            }
        });

        // --- Calculate Final Metrics ---
        const totalSavings = totalAnnualHours * hourlyRate;
        const avgFeasibility = (taskCount > 0) ? (totalFeasibility / taskCount) : 0;

        // --- NEW: Determine Profile ---
        let primaryGoal = "Time & Cost Saving"; // Default
        if (goalClientExperience > goalTimeSaving && goalClientExperience >= goalScalability) {
            primaryGoal = "Improving Client Experience";
        } else if (goalScalability > goalTimeSaving && goalScalability > goalClientExperience) {
            primaryGoal = "Scalability & Growth";
        }

        let recommendedSolution = "Simple Automation (Scripts, Zapier)"; // Default
        if (solutionCustom > solutionSimple) {
            recommendedSolution = "Custom Application Development";
        } else if (solutionCustom > 0 && solutionSimple > 0) {
            recommendedSolution = "Hybrid Solution (Simple + Custom)";
        } else if (taskCount > 0 && solutionCustom === 0 && solutionSimple === 0 && (goalClientExperience > 0 || goalScalability > 0)) {
            recommendedSolution = "Process Review & Consultation"; // No clear tool, but complex goals
        }


        // --- 3. Display Results ---
        displayResults(totalAnnualHours, totalSavings, avgFeasibility, primaryGoal, recommendedSolution);
    }

    /**
     * Updates the DOM with the calculated results.
     */
    function displayResults(hours, savings, feasibility, primaryGoal, recommendedSolution) {
        // Format with commas and 2 decimal places
        const currencyFormatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        });
        
        totalHoursEl.textContent = hours.toFixed(1);
        totalSavingsEl.textContent = currencyFormatter.format(savings);
        feasibilityScoreEl.textContent = `${feasibility.toFixed(0)}%`;

        // --- NEW: Update Profile elements ---
        primaryOpportunityEl.textContent = primaryGoal;
        recommendedSolutionEl.textContent = recommendedSolution;

        // Show the results section
        resultsSection.classList.remove("hidden");
        
        // Scroll to the results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // --- 3. Event Listeners ---
    addTaskBtn.addEventListener("click", addNewTask);
    calculateBtn.addEventListener("click", calculateResults);

    // --- 4. Initial State ---
    // Add one task row by default so the list isn't empty
    addNewTask();
});