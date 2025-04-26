import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getActivityBySlug } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function LemonadeStandActivity() {
  // Fetch the activity data from the database
  const activity = await getActivityBySlug('lemonade-stand');
  
  if (!activity) {
    notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${activity.gradientFrom} ${activity.gradientTo}`}>
            {activity.emoji}
          </div>
          <h1 className="text-3xl font-bold">{activity.title}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          {activity.description}
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Lemonade Stand Business Plan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Business Planning Section */}
          <div className="border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 bg-yellow-50 dark:bg-yellow-900/20">
            <h3 className="text-xl font-bold mb-4 text-yellow-800 dark:text-yellow-400">Step 1: Plan Your Business</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-full w-7 h-7 flex items-center justify-center font-bold mr-3 mt-0.5">1</span>
                <div>
                  <strong className="block text-lg">Determine your costs</strong>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Calculate how much it will cost for ingredients and supplies.
                  </p>
                  <div className="mt-3 bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="font-medium">Lemons (per dozen):</label>
                        <input 
                          type="number" 
                          className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                          defaultValue="3.00"
                          min="0.01"
                          step="0.01"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="font-medium">Sugar (per pound):</label>
                        <input 
                          type="number" 
                          className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                          defaultValue="2.50"
                          min="0.01"
                          step="0.01"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="font-medium">Cups (pack of 50):</label>
                        <input 
                          type="number" 
                          className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                          defaultValue="4.00"
                          min="0.01"
                          step="0.01"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="font-medium">Ice (per bag):</label>
                        <input 
                          type="number" 
                          className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                          defaultValue="2.00"
                          min="0.01"
                          step="0.01"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="font-medium">Stand/Table (one-time):</label>
                        <input 
                          type="number" 
                          className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                          defaultValue="15.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="font-medium">Signs/Marketing:</label>
                        <input 
                          type="number" 
                          className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                          defaultValue="5.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center font-bold">
                        <span>Total Startup Costs:</span>
                        <span className="text-yellow-600 dark:text-yellow-400">$31.50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Pricing Strategy Section */}
          <div className="border border-amber-200 dark:border-amber-800 rounded-lg p-6 bg-amber-50 dark:bg-amber-900/20">
            <h3 className="text-xl font-bold mb-4 text-amber-800 dark:text-amber-400">Step 2: Set Your Price</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full w-7 h-7 flex items-center justify-center font-bold mr-3 mt-0.5">2</span>
                <div>
                  <strong className="block text-lg">Determine your selling price</strong>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    How much will you charge per cup of lemonade?
                  </p>
                  <div className="mt-3 bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      <div>
                        <label className="font-medium block mb-2">Price per cup:</label>
                        <input 
                          type="range" 
                          min="0.25" 
                          max="3" 
                          step="0.25" 
                          defaultValue="1.50"
                          className="w-full"
                        />
                        <div className="flex justify-between mt-1 text-xs">
                          <span>$0.25</span>
                          <span>$1.50</span>
                          <span>$3.00</span>
                        </div>
                      </div>
                      <div className="text-center py-3">
                        <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">$1.50</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">per cup</p>
                      </div>
                      <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                        <p className="text-sm">
                          <span className="font-bold">Pricing Strategy:</span> If your price is too high, fewer people will buy. If it's too low, you might not cover costs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Recipe Planning Section */}
          <div className="border border-orange-200 dark:border-orange-800 rounded-lg p-6 bg-orange-50 dark:bg-orange-900/20">
            <h3 className="text-xl font-bold mb-4 text-orange-800 dark:text-orange-400">Step 3: Plan Your Recipe</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full w-7 h-7 flex items-center justify-center font-bold mr-3 mt-0.5">3</span>
                <div>
                  <strong className="block text-lg">How many cups can you make?</strong>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Calculate your ingredients needed and total output.
                  </p>
                  <div className="mt-3 bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="font-medium">Lemons needed per pitcher:</label>
                        <input 
                          type="number" 
                          className="w-16 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                          defaultValue="6"
                          min="1"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="font-medium">Cups of sugar per pitcher:</label>
                        <input 
                          type="number" 
                          className="w-16 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                          defaultValue="1"
                          min="0.25"
                          step="0.25"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="font-medium">Servings per pitcher:</label>
                        <input 
                          type="number" 
                          className="w-16 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                          defaultValue="8"
                          min="1"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="font-medium">Number of pitchers:</label>
                        <input 
                          type="number" 
                          className="w-16 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                          defaultValue="4"
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center font-bold">
                        <span>Total Cups You Can Sell:</span>
                        <span className="text-orange-600 dark:text-orange-400">32</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Profit Calculation Section */}
          <div className="border border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-xl font-bold mb-4 text-green-800 dark:text-green-400">Step 4: Calculate Your Profit</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full w-7 h-7 flex items-center justify-center font-bold mr-3 mt-0.5">4</span>
                <div>
                  <strong className="block text-lg">Forecast your profits</strong>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    See how much money you could make!
                  </p>
                  <div className="mt-3 bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded">
                          <p className="text-sm font-medium">Total Revenue</p>
                          <p className="text-xl font-bold mt-1">$48.00</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">32 cups × $1.50</p>
                        </div>
                        <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded">
                          <p className="text-sm font-medium">Total Cost</p>
                          <p className="text-xl font-bold mt-1">$31.50</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">All supplies & ingredients</p>
                        </div>
                      </div>

                      <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg mt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">Profit:</span>
                          <span className="text-xl font-bold text-green-600 dark:text-green-400">$16.50</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 mt-2 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: '34%' }}></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Return on investment: 52%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Time Planning</h3>
          <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-6 bg-blue-50 dark:bg-blue-900/20">
            <p className="mb-4">
              How many days do you want to run your lemonade stand? Each day requires time for setup, selling, and cleanup.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium block mb-2">Number of days:</label>
                <input 
                  type="range" 
                  min="1" 
                  max="7" 
                  step="1" 
                  defaultValue="2"
                  className="w-full"
                />
                <div className="flex justify-between mt-1 text-xs">
                  <span>1 day</span>
                  <span>4 days</span>
                  <span>7 days</span>
                </div>
                <div className="text-center py-3">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2 days</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Setup time each day:</span>
                  <span>30 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Selling time each day:</span>
                  <span>3 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleanup time each day:</span>
                  <span>30 minutes</span>
                </div>
                <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
                  <div className="flex justify-between font-bold">
                    <span>Total time investment:</span>
                    <span>8 hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <p className="font-medium">Hourly earnings: $2.06</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Based on your total profit of $16.50 divided by 8 total hours of work
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-100 dark:bg-yellow-900/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Business Planning Insights</h3>
          <p className="mb-4">
            Running a lemonade stand teaches key business concepts like:
          </p>
          <ul className="space-y-2 ml-6 list-disc">
            <li>Initial investment and startup costs</li>
            <li>Pricing strategy and profit margins</li>
            <li>Supply chain and inventory management</li>
            <li>Time management and opportunity cost</li>
            <li>Customer service and marketing</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Link 
          href="/education/stem-connections/money-math"
          className="inline-block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md"
        >
          Back to Money Math
        </Link>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md font-medium">
          Save My Business Plan
        </button>
      </div>
    </div>
  );
}