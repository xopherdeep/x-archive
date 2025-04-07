"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            X's Archive
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your gateway to interactive games, educational resources, and useful development tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Games</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Enjoy classic games like Snake, Tetris, Flappy Bird, and more. Perfect for a quick break or nostalgic fun.
              </p>
              <Link href="/games" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Play Now
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="h-48 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Learning Hub</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Educational resources for students of all ages. From elementary to high school, find materials to support learning.
              </p>
              <Link href="/education" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Start Learning
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Tool Shack</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A collection of useful components and tools for developers. Boost your productivity with our ready-to-use resources.
              </p>
              <Link href="/tools" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Explore Tools
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Featured Content</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/games/tetris" className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-800 dark:text-white">Tetris</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Classic block-stacking game</p>
            </Link>
            <Link href="/games/snake" className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-800 dark:text-white">Snake</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Grow your snake by eating food</p>
            </Link>
            <Link href="/education/grade-6-8" className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-800 dark:text-white">Middle School</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Resources for grades 6-8</p>
            </Link>
            <Link href="/education/grade-9-12" className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-800 dark:text-white">High School</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Resources for grades 9-12</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
