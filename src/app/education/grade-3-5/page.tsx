import React from "react";
import Link from "next/link";

export default function Grade3To5Page() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Grades 3-5 Learning</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fun and interactive learning activities for elementary school students
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Math Adventures</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Build essential math skills through interactive games and activities.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold">Multiplication Tables</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Practice multiplication facts with fun games</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold">Fractions and Decimals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual learning tools for understanding fractions</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold">Word Problems</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-world math applications</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Reading & Language Arts</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Develop reading comprehension and writing skills.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold">Vocabulary Building</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fun word games to expand vocabulary</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold">Reading Comprehension</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Interactive stories with questions</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold">Creative Writing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Story starters and writing prompts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">Science Explorers</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Discover the wonders of science through hands-on experiments.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold">Animal Habitats</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Learn about different ecosystems</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold">Simple Machines</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Explore physics with everyday objects</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold">Weather Patterns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Understand climate and weather systems</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-amber-600 dark:text-amber-400">Social Studies</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Learn about history, geography, and cultures around the world.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h3 className="font-semibold">Map Skills</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Interactive maps and geography games</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h3 className="font-semibold">Historical Figures</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Biographies of important people in history</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h3 className="font-semibold">Cultural Celebrations</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Traditions and holidays around the world</p>
            </div>
          </div>
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
