import React from "react";
import Link from "next/link";

export default function Grade6To8Page() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Grades 6-8 Learning</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Engaging content for middle school students to build essential skills
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Mathematics</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Develop pre-algebra and algebra skills with interactive lessons.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold">Algebra Foundations</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Variables, expressions, and equations</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold">Geometry Concepts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Shapes, angles, and spatial reasoning</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold">Data Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Statistics and probability</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Language Arts</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Strengthen reading, writing, and critical thinking skills.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold">Literary Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Analyzing themes, characters, and plot</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold">Essay Writing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Structured writing and argumentation</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold">Grammar & Composition</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced grammar and writing techniques</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">Science</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Explore scientific concepts through experiments and interactive lessons.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold">Life Sciences</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cells, genetics, and ecosystems</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold">Physical Sciences</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Matter, energy, and forces</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold">Earth & Space</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Geology, astronomy, and climate</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 text-amber-600 dark:text-amber-400">Social Studies</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Discover world history, geography, and civics.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h3 className="font-semibold">World History</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ancient civilizations to modern times</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h3 className="font-semibold">Geography</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Physical and human geography</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h3 className="font-semibold">Civics & Government</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Government systems and citizenship</p>
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
