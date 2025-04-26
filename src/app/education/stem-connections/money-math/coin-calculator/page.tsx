"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CoinCalculatorPage() {
  const [pennies, setPennies] = useState(0);
  const [nickels, setNickels] = useState(0);
  const [dimes, setDimes] = useState(0);
  const [quarters, setQuarters] = useState(0);
  
  // Calculate total value
  const totalValue = pennies * 1 + nickels * 5 + dimes * 10 + quarters * 25;
  
  // Format the total as dollars and cents
  const formattedTotal = (totalValue / 100).toFixed(2);

  // Add coin handlers
  const addCoin = (type) => {
    if (type === 'penny') setPennies(prev => prev + 1);
    if (type === 'nickel') setNickels(prev => prev + 1);
    if (type === 'dime') setDimes(prev => prev + 1);
    if (type === 'quarter') setQuarters(prev => prev + 1);
  };

  // Reset all coins
  const resetCoins = () => {
    setPennies(0);
    setNickels(0);
    setDimes(0);
    setQuarters(0);
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Coin Value Calculator</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Practice counting money and making change
        </p>
      </header>

      <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-lg shadow-md p-6 border border-amber-200 dark:border-amber-800 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-300">Counting Money</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Understanding the value of different coins is an important math skill. Click on the coins below to 
          add them to your total and see how different combinations can add up to the same amount.
        </p>
      </div>

      {/* Interactive Coin Calculator */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-12 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">🪙 Coin Value Calculator</h2>
          <p>Practice counting money and understanding different coin values!</p>
        </div>
        
        <div className="p-6">
          <div className="mb-8 flex justify-center items-center">
            <div className="bg-amber-50 dark:bg-amber-900/30 py-4 px-8 rounded-lg text-center shadow-md">
              <p className="text-lg font-semibold mb-1">Your Total:</p>
              <p className="text-4xl font-bold text-amber-600 dark:text-amber-400">${formattedTotal}</p>
              <div className="mt-3 flex justify-center gap-2">
                <button 
                  onClick={resetCoins}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-sm shadow-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-xl overflow-hidden shadow-md">
              <button 
                onClick={() => addCoin('penny')}
                className="w-full h-48 flex flex-col items-center justify-center hover:bg-yellow-200 dark:hover:bg-yellow-800/50 transition-colors"
              >
                <div className="text-5xl mb-2">💰</div>
                <p className="font-bold text-lg">Penny</p>
                <p className="text-md">1¢</p>
              </button>
              <div className="bg-white dark:bg-gray-800 p-3 text-center">
                <p className="font-semibold">Count: {pennies}</p>
                <p className="text-sm">Value: ${(pennies * 0.01).toFixed(2)}</p>
              </div>
            </div>
            
            <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md">
              <button 
                onClick={() => addCoin('nickel')}
                className="w-full h-48 flex flex-col items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600/50 transition-colors"
              >
                <div className="text-5xl mb-2">💰</div>
                <p className="font-bold text-lg">Nickel</p>
                <p className="text-md">5¢</p>
              </button>
              <div className="bg-white dark:bg-gray-800 p-3 text-center">
                <p className="font-semibold">Count: {nickels}</p>
                <p className="text-sm">Value: ${(nickels * 0.05).toFixed(2)}</p>
              </div>
            </div>
            
            <div className="bg-yellow-200 dark:bg-yellow-800/40 rounded-xl overflow-hidden shadow-md">
              <button 
                onClick={() => addCoin('dime')}
                className="w-full h-48 flex flex-col items-center justify-center hover:bg-yellow-300 dark:hover:bg-yellow-700/50 transition-colors"
              >
                <div className="text-5xl mb-2">💰</div>
                <p className="font-bold text-lg">Dime</p>
                <p className="text-md">10¢</p>
              </button>
              <div className="bg-white dark:bg-gray-800 p-3 text-center">
                <p className="font-semibold">Count: {dimes}</p>
                <p className="text-sm">Value: ${(dimes * 0.10).toFixed(2)}</p>
              </div>
            </div>
            
            <div className="bg-gray-300 dark:bg-gray-600 rounded-xl overflow-hidden shadow-md">
              <button 
                onClick={() => addCoin('quarter')}
                className="w-full h-48 flex flex-col items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-500/50 transition-colors"
              >
                <div className="text-5xl mb-2">💰</div>
                <p className="font-bold text-lg">Quarter</p>
                <p className="text-md">25¢</p>
              </button>
              <div className="bg-white dark:bg-gray-800 p-3 text-center">
                <p className="font-semibold">Count: {quarters}</p>
                <p className="text-sm">Value: ${(quarters * 0.25).toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Math Concepts Used:</h3>
            <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
              <li>Addition and counting by different values</li>
              <li>Equivalence (different combinations for the same amount)</li>
              <li>Decimal notation for money</li>
              <li>Making change (subtraction)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Money Math Activities</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Try these challenges to practice your money math skills:
        </p>
        <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
          <li>Make exactly $1.25 using the fewest possible coins</li>
          <li>Make $0.75 in at least three different ways</li>
          <li>If you have 2 quarters, 3 dimes, 1 nickel and 4 pennies, how much money do you have?</li>
          <li>If something costs $0.87, and you pay with $1.00, what coins would make the best change?</li>
        </ul>
        <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-md">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            <strong>Learning Tip:</strong> When you're shopping in stores, practice calculating how much change you should receive.
            This helps develop mental math skills and ensures you're getting the correct change back.
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