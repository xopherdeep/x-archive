import React from "react";
import Link from "next/link";
import SubjectCard from "@/components/education/SubjectCard";

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
        <SubjectCard
          title="Math Adventures"
          description="Build essential math skills through interactive games and activities."
          color="blue"
          topics={[
            {
              title: "Multiplication Tables",
              description: "Practice multiplication facts with fun games"
            },
            {
              title: "Fractions and Decimals",
              description: "Visual learning tools for understanding fractions"
            },
            {
              title: "Word Problems",
              description: "Real-world math applications"
            }
          ]}
        />

        <SubjectCard
          title="Reading & Language Arts"
          description="Develop reading comprehension and writing skills."
          color="green"
          topics={[
            {
              title: "Vocabulary Building",
              description: "Fun word games to expand vocabulary"
            },
            {
              title: "Reading Comprehension",
              description: "Interactive stories with questions"
            },
            {
              title: "Creative Writing",
              description: "Story starters and writing prompts"
            }
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SubjectCard
          title="Science Explorers"
          description="Discover the wonders of science through hands-on experiments."
          color="purple"
          topics={[
            {
              title: "Animal Habitats",
              description: "Learn about different ecosystems"
            },
            {
              title: "Simple Machines",
              description: "Explore physics with everyday objects"
            },
            {
              title: "Weather Patterns",
              description: "Understand climate and weather systems"
            }
          ]}
        />

        <SubjectCard
          title="Social Studies"
          description="Learn about history, geography, and cultures around the world."
          color="amber"
          topics={[
            {
              title: "Map Skills",
              description: "Interactive maps and geography games"
            },
            {
              title: "Historical Figures",
              description: "Biographies of important people in history"
            },
            {
              title: "Cultural Celebrations",
              description: "Traditions and holidays around the world"
            }
          ]}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Featured Activities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/education/grade-3-5/math/multiplication" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">×</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Multiplication Tables</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Interactive practice with times tables from 1-10
              </p>
            </div>
          </Link>
          
          <Link href="/education/grade-3-5/language/vocabulary" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 dark:text-green-400 text-xl font-bold">A</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Vocabulary Challenge</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Expand your vocabulary with fun word games
              </p>
            </div>
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-purple-600 dark:text-purple-400 text-xl font-bold">🔬</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Simple Experiments</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Easy science experiments you can do at home
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-amber-600 dark:text-amber-400 text-xl font-bold">🌎</span>
            </div>
            <h3 className="font-bold text-lg mb-2">World Explorer</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Interactive maps and geography games
            </p>
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
