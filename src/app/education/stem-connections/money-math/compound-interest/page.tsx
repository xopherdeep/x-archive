"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CompoundInterestPage() {
  // State for the savings calculator
  const [initialAmount, setInitialAmount] = useState(100);
  const [monthlyDeposit, setMonthlyDeposit] = useState(10);
  const [years, setYears] = useState(5);
  const [interestRate, setInterestRate] = useState(5);

  // Calculate compound interest for the savings visualization
  const calculateSavings = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;
    let total = initialAmount;
    const savingsData = [initialAmount];
    
    for (let i = 1; i <= totalMonths; i++) {
      total = total * (1 + monthlyRate) + monthlyDeposit;
      // Only record data points for each year to keep chart cleaner
      if (i % 12 === 0) {
        savingsData.push(Math.round(total));
      }
    }
    
    return savingsData;
  };

  // Data for savings growth chart
  const savingsData = {
    labels: Array.from({ length: years + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: "Savings Growth ($)",
        data: calculateSavings(),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Compound Interest Explorer</h1>
        <p className="text-gray-500 dark:text-gray-400">
          See how your money can grow over time!
        </p>
      </header>

      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg shadow-md p-6 border border-blue-200 dark:border-blue-800 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-300">The Magic of Compound Interest</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Albert Einstein once called compound interest the "eighth wonder of the world." Watch how your money can 
          grow exponentially over time, and see how small changes in your saving habits can make a big difference!
        </p>
      </div>

      {/* Interactive Compound Interest Simulator */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-12 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">💰 Compound Interest Explorer</h2>
          <p>See how your money can grow over time with the magic of compound interest!</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Starting Amount ($)
                </label>
                <input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Deposit ($)
                </label>
                <input
                  type="number"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interest Rate (% per year)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  min="0"
                  max="20"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Period (years)
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  min="1"
                  max="50"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Math Concepts Used:</h3>
                <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
                  <li>Percentages (interest rates)</li>
                  <li>Exponential growth</li>
                  <li>Compound interest formula: A = P(1 + r/n)^(nt)</li>
                  <li>Time value of money</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">Your Savings Growth</h3>
              <div className="h-80">
                <Bar 
                  data={savingsData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `$${value}`
                        }
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => `$${context.raw}`
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-6 text-center">
                <p className="font-bold text-lg text-gray-800 dark:text-gray-200">
                  Final Amount: ${calculateSavings()[calculateSavings().length - 1]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">How Compound Interest Works</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Compound interest is when you earn interest not just on your initial investment, but also on the interest 
          that has been added to it. This creates a snowball effect that accelerates your money's growth over time.
        </p>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            <strong>Key Insight:</strong> The longer you leave your money to grow, the more powerful the compounding 
            effect becomes. That's why starting to save early is so important, even if it's just a small amount!
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