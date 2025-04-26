'use client';

import React, { useState, useEffect } from 'react';

type IngredientCosts = {
  lemonsCost: number;
  sugarCost: number;
  cupsCost: number;
  iceCost: number;
  standCost: number;
  marketingCost: number;
};

type Recipe = {
  lemonsPerPitcher: number;
  sugarPerPitcher: number;
  servingsPerPitcher: number;
  pitcherCount: number;
};

type TimeInvestment = {
  days: number;
  setupTime: number; // minutes per day
  sellingTime: number; // minutes per day
  cleanupTime: number; // minutes per day
};

export default function LemonadeStandCalculator() {
  // Costs state
  const [costs, setCosts] = useState<IngredientCosts>({
    lemonsCost: 3.00,
    sugarCost: 2.50,
    cupsCost: 4.00,
    iceCost: 2.00,
    standCost: 15.00,
    marketingCost: 5.00
  });
  
  // Price state
  const [pricePerCup, setPricePerCup] = useState<number>(1.50);
  
  // Recipe state
  const [recipe, setRecipe] = useState<Recipe>({
    lemonsPerPitcher: 6,
    sugarPerPitcher: 1,
    servingsPerPitcher: 8,
    pitcherCount: 4
  });
  
  // Time state
  const [time, setTime] = useState<TimeInvestment>({
    days: 2,
    setupTime: 30,
    sellingTime: 180, // 3 hours in minutes
    cleanupTime: 30
  });
  
  // Calculated values
  const [totalCups, setTotalCups] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);
  const [totalTimeHours, setTotalTimeHours] = useState<number>(0);
  const [hourlyEarnings, setHourlyEarnings] = useState<number>(0);
  
  // Calculate derived values whenever inputs change
  useEffect(() => {
    // Calculate total cups
    const cups = recipe.servingsPerPitcher * recipe.pitcherCount;
    setTotalCups(cups);
    
    // Calculate total cost
    const totalStartupCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
    setTotalCost(parseFloat(totalStartupCost.toFixed(2)));
    
    // Calculate revenue
    const revenue = cups * pricePerCup;
    setTotalRevenue(parseFloat(revenue.toFixed(2)));
    
    // Calculate profit
    const calculatedProfit = revenue - totalStartupCost;
    setProfit(parseFloat(calculatedProfit.toFixed(2)));
    
    // Calculate ROI percentage
    const calculatedRoi = (calculatedProfit / totalStartupCost) * 100;
    setRoi(parseFloat(calculatedRoi.toFixed(0)));
    
    // Calculate total time investment
    const timePerDay = time.setupTime + time.sellingTime + time.cleanupTime;
    const totalMinutes = timePerDay * time.days;
    const hours = totalMinutes / 60;
    setTotalTimeHours(parseFloat(hours.toFixed(1)));
    
    // Calculate hourly earnings
    const earnings = calculatedProfit / hours;
    setHourlyEarnings(parseFloat(earnings.toFixed(2)));
    
  }, [costs, pricePerCup, recipe, time]);
  
  // Handler for costs change
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCosts(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };
  
  // Handler for price change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPricePerCup(parseFloat(e.target.value));
  };
  
  // Handler for recipe change
  const handleRecipeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: parseInt(value, 10)
    }));
  };
  
  // Handler for days change
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(prev => ({
      ...prev,
      days: parseInt(e.target.value, 10)
    }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        name="lemonsCost"
                        className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                        value={costs.lemonsCost}
                        onChange={handleCostChange}
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Sugar (per pound):</label>
                      <input 
                        type="number" 
                        name="sugarCost"
                        className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                        value={costs.sugarCost}
                        onChange={handleCostChange}
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Cups (pack of 50):</label>
                      <input 
                        type="number" 
                        name="cupsCost"
                        className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                        value={costs.cupsCost}
                        onChange={handleCostChange}
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Ice (per bag):</label>
                      <input 
                        type="number" 
                        name="iceCost"
                        className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                        value={costs.iceCost}
                        onChange={handleCostChange}
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Stand/Table (one-time):</label>
                      <input 
                        type="number" 
                        name="standCost"
                        className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                        value={costs.standCost}
                        onChange={handleCostChange}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Signs/Marketing:</label>
                      <input 
                        type="number" 
                        name="marketingCost"
                        className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                        value={costs.marketingCost}
                        onChange={handleCostChange}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Startup Costs:</span>
                      <span className="text-yellow-600 dark:text-yellow-400">${totalCost.toFixed(2)}</span>
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
                        value={pricePerCup}
                        onChange={handlePriceChange}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-1 text-xs">
                        <span>$0.25</span>
                        <span>$1.50</span>
                        <span>$3.00</span>
                      </div>
                    </div>
                    <div className="text-center py-3">
                      <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">${pricePerCup.toFixed(2)}</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        name="lemonsPerPitcher"
                        className="w-16 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                        value={recipe.lemonsPerPitcher}
                        onChange={handleRecipeChange}
                        min="1"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Cups of sugar per pitcher:</label>
                      <input 
                        type="number" 
                        name="sugarPerPitcher"
                        className="w-16 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                        value={recipe.sugarPerPitcher}
                        onChange={handleRecipeChange}
                        min="0.25"
                        step="0.25"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Servings per pitcher:</label>
                      <input 
                        type="number" 
                        name="servingsPerPitcher"
                        className="w-16 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                        value={recipe.servingsPerPitcher}
                        onChange={handleRecipeChange}
                        min="1"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Number of pitchers:</label>
                      <input 
                        type="number" 
                        name="pitcherCount"
                        className="w-16 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
                        value={recipe.pitcherCount}
                        onChange={handleRecipeChange}
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Cups You Can Sell:</span>
                      <span className="text-orange-600 dark:text-orange-400">{totalCups}</span>
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
                        <p className="text-xl font-bold mt-1">${totalRevenue.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{totalCups} cups × ${pricePerCup.toFixed(2)}</p>
                      </div>
                      <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded">
                        <p className="text-sm font-medium">Total Cost</p>
                        <p className="text-xl font-bold mt-1">${totalCost.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">All supplies & ingredients</p>
                      </div>
                    </div>

                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Profit:</span>
                        <span className={`text-xl font-bold ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>${profit.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 mt-2 rounded-full overflow-hidden">
                        <div 
                          className={`${profit >= 0 ? 'bg-green-500' : 'bg-red-500'} h-full`} 
                          style={{ width: `${Math.min(Math.abs(roi), 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Return on investment: {roi}%
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
                value={time.days}
                onChange={handleDaysChange}
                className="w-full"
              />
              <div className="flex justify-between mt-1 text-xs">
                <span>1 day</span>
                <span>4 days</span>
                <span>7 days</span>
              </div>
              <div className="text-center py-3">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{time.days} {time.days === 1 ? 'day' : 'days'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Setup time each day:</span>
                <span>{time.setupTime} minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Selling time each day:</span>
                <span>{time.sellingTime / 60} hours</span>
              </div>
              <div className="flex justify-between">
                <span>Cleanup time each day:</span>
                <span>{time.cleanupTime} minutes</span>
              </div>
              <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
                <div className="flex justify-between font-bold">
                  <span>Total time investment:</span>
                  <span>{totalTimeHours} hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
            <p className="font-medium">Hourly earnings: ${hourlyEarnings.toFixed(2)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Based on your total profit of ${profit.toFixed(2)} divided by {totalTimeHours} total hours of work
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}