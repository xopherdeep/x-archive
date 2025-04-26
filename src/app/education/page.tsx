import React from "react";
import Link from "next/link";

export default function EducationPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Learning Hub</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Educational resources that connect science with other subjects
        </p>
      </header>

      <div className="mb-10">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg shadow-md p-6 border border-purple-200 dark:border-purple-800 mb-6">
          <h2 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">STEM Connections: Where Science Meets Math</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Discover how scientists use math to explore the universe, conduct experiments, and make amazing discoveries!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-md">
              <h3 className="font-bold text-purple-700 dark:text-purple-400">Space Exploration</h3>
              <p className="text-sm">See how NASA uses math to calculate rocket trajectories and explore distant planets</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-md">
              <h3 className="font-bold text-purple-700 dark:text-purple-400">Animal Patterns</h3>
              <p className="text-sm">Discover the mathematical patterns in animal behaviors and natural structures</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-md">
              <h3 className="font-bold text-purple-700 dark:text-purple-400">Environmental Science</h3>
              <p className="text-sm">Learn how scientists use math to track climate change and protect our planet</p>
            </div>
          </div>
          <Link 
            href="/education/stem-connections" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Explore STEM Activities
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Grades 3-5</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Fun and interactive learning activities for elementary school students.
          </p>
          <ul className="list-disc ml-5 mb-4 text-gray-600 dark:text-gray-300">
            <li>Science-based math explorations</li>
            <li>Reading comprehension</li>
            <li>Hands-on science experiments</li>
            <li>Creative writing</li>
          </ul>
          <Link 
            href="/education/grade-3-5" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Explore
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Grades 6-8</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Engaging content for middle school students to build essential skills.
          </p>
          <ul className="list-disc ml-5 mb-4 text-gray-600 dark:text-gray-300">
            <li>Math in scientific discoveries</li>
            <li>Scientific method and data analysis</li>
            <li>History and geography</li>
            <li>Language arts</li>
          </ul>
          <Link 
            href="/education/grade-6-8" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Explore
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Grades 9-12</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Advanced learning resources for high school students.
          </p>
          <ul className="list-disc ml-5 mb-4 text-gray-600 dark:text-gray-300">
            <li>Mathematics in scientific research</li>
            <li>Physics and chemistry connections</li>
            <li>Literature analysis</li>
            <li>College preparation</li>
          </ul>
          <Link 
            href="/education/grade-9-12" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
