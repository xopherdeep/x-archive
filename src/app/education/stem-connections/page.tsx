import React from "react";
import Link from "next/link";

export default function StemConnectionsPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">STEM Connections</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Where Science and Math Work Together
        </p>
      </header>

      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg shadow-md p-6 border border-purple-200 dark:border-purple-800 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-300">Why Scientists Love Math</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Science and math go hand-in-hand! Scientists use math every day to measure, analyze data, and make predictions. 
          These activities show how math helps us understand our amazing world.
        </p>
        <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-md mb-4">
          <p className="text-gray-700 dark:text-gray-300 italic">
            "Math is the language in which the universe is written." - Galileo Galilei
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Interactive STEM Activities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
            <span className="text-6xl">💰</span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Money Math</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn financial literacy through interactive math activities - see how math helps us manage money!
            </p>
            <div className="mb-4 space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Visualize compound interest and savings growth</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Budget with percentages and the 50/30/20 rule</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Practice counting money and making change</span>
              </div>
            </div>
            <Link 
              href="/education/stem-connections/money-math" 
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Explore Money Math
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-6xl">🚀</span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Space Math Adventure</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Take a journey through our solar system while practicing multiplication, division, and scale!
            </p>
            <div className="mb-4 space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Calculate distances between planets</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Compare planet sizes using fractions</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Plan a space mission using math</span>
              </div>
            </div>
            <Link 
              href="/education/stem-connections/space-math" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Start Adventure
            </Link>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-6xl">🐆</span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Animal Pattern Math</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explore how animals use math patterns in nature - from leopard spots to zebra stripes!
            </p>
            <div className="mb-4 space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Count and multiply animal patterns</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Learn how patterns help animals survive</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Create your own animal pattern math</span>
              </div>
            </div>
            <Link 
              href="/education/stem-connections/animal-patterns" 
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md"
            >
              Explore Patterns
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
            <span className="text-6xl">🌿</span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Nature's Numbers</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover the amazing Fibonacci sequence and other math patterns found in plants and flowers.
            </p>
            <div className="mb-4 space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Count flower petals to find number patterns</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Measure and compare plant growth using math</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Create art based on nature's mathematical patterns</span>
              </div>
            </div>
            <Link 
              href="/education/stem-connections/nature-numbers" 
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Discover Patterns
            </Link>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-cyan-400 to-teal-500 flex items-center justify-center">
            <span className="text-6xl">🔬</span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Science Lab Math</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Become a scientist and use math in fun experiments that you can do at home!
            </p>
            <div className="mb-4 space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-cyan-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Measure and mix to create reactions</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-cyan-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Record data and create charts like a scientist</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-cyan-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Use math to predict experiment outcomes</span>
              </div>
            </div>
            <Link 
              href="/education/stem-connections/science-lab" 
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md"
            >
              Start Experimenting
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">For Parents and Teachers</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          These activities are designed to help children see the connections between math and science. By presenting math 
          concepts in the context of engaging science topics, students often find math more approachable and relevant to their interests.
        </p>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            <strong>Tip:</strong> Ask your child to explain how the math helped them understand the science concept. This reinforces both 
            the math skills and the connection between subjects!
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link 
          href="/education" 
          className="inline-block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md"
        >
          Back to Learning Hub
        </Link>
      </div>
    </div>
  );
}