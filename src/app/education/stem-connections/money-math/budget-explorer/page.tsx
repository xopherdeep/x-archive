"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function BudgetExplorerPage() {
  // State for the budget allocation 
  const [budget, setBudget] = useState(100);
  const [needs, setNeeds] = useState(50);
  const [wants, setWants] = useState(30);
  const [savings, setSavings] = useState(20);

  // Data for budget allocation chart
  const budgetData = {
    labels: ["Needs", "Wants", "Savings"],
    datasets: [
      {
        label: "Budget Allocation",
        data: [needs, wants, savings],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Handle needs, wants, savings changes
  const handleAllocationChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    
    if (type === "needs") {
      setNeeds(numValue);
      // Ensure total equals 100%
      const remaining = 100 - numValue - wants;
      setSavings(remaining >= 0 ? remaining : 0);
    } else if (type === "wants") {
      setWants(numValue);
      // Ensure total equals 100%
      const remaining = 100 - needs - numValue;
      setSavings(remaining >= 0 ? remaining : 0);
    } else if (type === "savings") {
      setSavings(numValue);
      // Ensure total equals 100%
      const remaining = 100 - needs - numValue;
      setWants(remaining >= 0 ? remaining : 0);
    }
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Budget Explorer</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Learn how to allocate money using percentages
        </p>
      </header>

      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 rounded-lg shadow-md p-6 border border-purple-200 dark:border-purple-800 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-300">Smart Money Management</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          One of the most popular budget frameworks is the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. 
          Use this interactive tool to experiment with different budget allocations and see how they affect your financial plan.
        </p>
      </div>

      {/* Interactive Budget Explorer */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-12 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">📊 Budget Explorer</h2>
          <p>Learn how to allocate money using percentages and the 50/30/20 rule!</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Budget Amount ($)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <span>Needs (%)</span>
                    <span>${(budget * needs / 100).toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={needs}
                    onChange={(e) => handleAllocationChange("needs", e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Housing, utilities, groceries, transportation
                  </p>
                </div>
                
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <span>Wants (%)</span>
                    <span>${(budget * wants / 100).toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={wants}
                    onChange={(e) => handleAllocationChange("wants", e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Entertainment, dining out, hobbies, subscriptions
                  </p>
                </div>
                
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <span>Savings (%)</span>
                    <span>${(budget * savings / 100).toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={savings}
                    onChange={(e) => handleAllocationChange("savings", e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Emergency fund, investments, future goals
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Math Concepts Used:</h3>
                <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
                  <li>Percentages and proportions</li>
                  <li>Converting percentages to monetary values</li>
                  <li>Ensuring parts sum to whole (100%)</li>
                  <li>Balancing equations</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">Your Budget Allocation</h3>
              <div className="h-80">
                <Doughnut 
                  data={budgetData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            const dollars = (budget * value / 100).toFixed(2);
                            return `${context.label}: ${percentage}% ($${dollars})`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-6">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Needs</p>
                    <p className="font-bold">${(budget * needs / 100).toFixed(2)}</p>
                  </div>
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Wants</p>
                    <p className="font-bold">${(budget * wants / 100).toFixed(2)}</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Savings</p>
                    <p className="font-bold">${(budget * savings / 100).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Why Budgeting Matters</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Creating a budget helps you take control of your money and make intentional decisions about spending and saving.
          By using percentages rather than fixed amounts, your budget can scale as your income changes.
        </p>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-md">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            <strong>Budget Tip:</strong> Start by tracking your actual spending for a month, then compare it to these 
            categories to see where adjustments might help you reach your financial goals.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center space-x-4">
        <Link 
          href="/education/stem-connections/money-math" 
          className="inline-block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md"
        >
          Back to Money Math
        </Link>
      </div>
    </div>
  );
}