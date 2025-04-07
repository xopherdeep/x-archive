import React from "react";
import Link from "next/link";

export default function EducationPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Learning Hub</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Educational resources for students of all ages
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3">Grades 3-5</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Fun and interactive learning activities for elementary school students.
          </p>
          <ul className="list-disc ml-5 mb-4 text-gray-600 dark:text-gray-300">
            <li>Basic math concepts</li>
            <li>Reading comprehension</li>
            <li>Science experiments</li>
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
          <h2 className="text-xl font-bold mb-3">Grades 6-8</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Engaging content for middle school students to build essential skills.
          </p>
          <ul className="list-disc ml-5 mb-4 text-gray-600 dark:text-gray-300">
            <li>Algebra fundamentals</li>
            <li>Scientific method</li>
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
          <h2 className="text-xl font-bold mb-3">Grades 9-12</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Advanced learning resources for high school students.
          </p>
          <ul className="list-disc ml-5 mb-4 text-gray-600 dark:text-gray-300">
            <li>Advanced mathematics</li>
            <li>Physics and chemistry</li>
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
