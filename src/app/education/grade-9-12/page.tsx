import React from "react";
import Link from "next/link";

export default function Grade9To12Page() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Grades 9-12 Learning</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Advanced learning resources for high school students
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Advanced Mathematics</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Master advanced math concepts for college preparation.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold">Algebra II & Trigonometry</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced algebraic concepts and trigonometric functions</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold">Pre-Calculus</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Functions, limits, and analytical geometry</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold">Calculus</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Derivatives, integrals, and applications</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Language & Literature</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Develop advanced reading, writing, and analytical skills.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold">Literary Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Critical analysis of classic and contemporary literature</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold">Composition & Rhetoric</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced essay writing and argumentation</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold">Research Writing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Academic research methods and citation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">Sciences</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Explore advanced scientific concepts and prepare for college-level courses.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold">Physics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mechanics, electricity, and modern physics</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold">Chemistry</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Atomic structure, chemical reactions, and organic chemistry</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold">Biology</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Molecular biology, genetics, and ecology</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-amber-600 dark:text-amber-400">College & Career Prep</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Prepare for college applications and future careers.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h3 className="font-semibold">SAT/ACT Preparation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Test strategies and practice materials</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h3 className="font-semibold">College Applications</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Essay writing and application strategies</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h3 className="font-semibold">Career Exploration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Discover potential career paths and requirements</p>
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
