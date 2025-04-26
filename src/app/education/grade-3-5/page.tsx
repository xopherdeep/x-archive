import React from "react";
import Link from "next/link";
import SubjectCard from "@/components/education/SubjectCard";

export default function Grade3To5Page() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Grades 3-5 Learning</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fun and interactive learning activities that connect science and math
        </p>
      </header>

      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg shadow-md p-6 border border-purple-200 dark:border-purple-800 mb-10">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center mr-4">
            <span className="text-white text-2xl">🔬</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">Scientific Math Adventures</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Discover how math and science work together through fun explorations!
            </p>
          </div>
        </div>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Scientists use math every day to solve problems and make discoveries. These activities show how math helps us understand our world!
        </p>
        <Link 
          href="/education/stem-connections" 
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          Start Exploring
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <SubjectCard
          title="Math in Science"
          description="See how math helps scientists make amazing discoveries!"
          color="blue"
          topics={[
            {
              title: "Counting Animal Patterns",
              description: "Learn multiplication by studying animal stripes and spots"
            },
            {
              title: "Space Math: Distances and Scale",
              description: "Use fractions and decimals to understand our solar system"
            },
            {
              title: "Nature's Numbers",
              description: "Discover patterns and sequences in plants and animals"
            }
          ]}
          link={{
            href: "/education/stem-connections/math-in-science",
            text: "Explore Activities"
          }}
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
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Featured Activities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/education/stem-connections/space-math" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">🚀</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Space Math Adventure</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Learn multiplication while exploring the solar system
              </p>
            </div>
          </Link>
          
          <Link href="/education/stem-connections/animal-patterns" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 dark:text-purple-400 text-xl font-bold">🐆</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Animal Pattern Math</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Count patterns in nature to learn multiplication
              </p>
            </div>
          </Link>
          
          <Link href="/education/grade-3-5/science/experiments" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 dark:text-purple-400 text-xl font-bold">🔬</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Simple Experiments</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Easy science experiments you can do at home
              </p>
            </div>
          </Link>
          
          <Link href="/education/stem-connections/nature-numbers" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 dark:text-green-400 text-xl font-bold">🌿</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Nature's Numbers</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Find amazing math patterns in plants and flowers
              </p>
            </div>
          </Link>
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
