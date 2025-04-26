import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";

// Define types for our activity data
type Feature = {
  id: string;
  description: string;
  color: string;
};

type Activity = {
  id: string;
  title: string;
  slug: string;
  description: string;
  emoji: string;
  difficulty: string;
  gradientFrom: string;
  gradientTo: string;
  features: Feature[];
};

// This makes the page dynamic to ensure we always get fresh data
export const dynamic = 'force-dynamic';

async function getActivitiesByDifficulty() {
  try {
    // Get all activities from the database with their features
    const activities = await prisma.activity.findMany({
      where: { isPublished: true },
      include: { features: true },
      orderBy: { order: 'asc' }
    });

    // Group activities by difficulty
    const groupedActivities: Record<string, Activity[]> = {
      interactive: [],
      beginner: [],
      intermediate: [],
      advanced: [],
      game: []
    };

    activities.forEach((activity) => {
      if (groupedActivities[activity.difficulty]) {
        groupedActivities[activity.difficulty].push(activity as unknown as Activity);
      }
    });

    return groupedActivities;
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    // Return empty groups if there's an error
    return { 
      interactive: [],
      beginner: [],
      intermediate: [],
      advanced: [],
      game: []
    };
  }
}

export default async function MoneyMathPage() {
  const activitiesByDifficulty = await getActivitiesByDifficulty();

  // Render an activity card with all its details
  const ActivityCard = ({ activity }: { activity: Activity }) => {
    // Extract the base color from the first feature for the button
    const buttonColorBase = activity.features[0]?.color || 'bg-blue-500';
    const buttonColor = buttonColorBase;
    const hoverColor = buttonColorBase.replace('bg-', 'hover:bg-').replace('-500', '-600');
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className={`h-48 bg-gradient-to-r ${activity.gradientFrom} ${activity.gradientTo} flex items-center justify-center`}>
          <span className="text-6xl">{activity.emoji}</span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{activity.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {activity.description}
          </p>
          <div className="mb-4 space-y-2">
            {activity.features.map((feature) => (
              <div key={feature.id} className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${feature.color} mr-2`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</span>
              </div>
            ))}
          </div>
          <Link 
            href={`/education/stem-connections/money-math/${activity.slug}`}
            className={`inline-block ${buttonColor} ${hoverColor} text-white px-4 py-2 rounded-md`}
          >
            Start Activity
          </Link>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Money Math</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Interactive financial education through STEM activities
        </p>
      </header>

      <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg shadow-md p-6 border border-green-200 dark:border-green-800 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-300">Financial Literacy & Math</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Understanding money is an essential life skill that uses many math concepts. These interactive 
          activities will help you see how percentages, decimals, and calculations apply to real financial decisions.
        </p>
        <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-md mb-4">
          <p className="text-gray-700 dark:text-gray-300 italic">
            "It's not how much money you make, but how much money you keep." - Robert Kiyosaki
          </p>
        </div>
      </div>

      {/* Interactive Activities Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Interactive Money Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {activitiesByDifficulty.interactive.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      
      {/* Beginner Activities Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Beginner Money Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {activitiesByDifficulty.beginner.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {/* Intermediate Activities Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Intermediate Money Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {activitiesByDifficulty.intermediate.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {/* Advanced Activities Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Advanced Money Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {activitiesByDifficulty.advanced.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {/* Game Activities Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Interactive Money Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {activitiesByDifficulty.game.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">For Parents and Teachers</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Financial literacy is a critical skill for children to develop. These activities help students understand 
          key money concepts while practicing important math skills like percentages, decimals, and calculations.
        </p>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-md">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            <strong>Tip:</strong> Ask your child to apply these concepts to real-world situations, such as planning a small budget 
            for a special event or calculating how long it would take to save for something they want to buy.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link 
          href="/education/stem-connections" 
          className="inline-block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md"
        >
          Back to STEM Connections
        </Link>
      </div>
    </div>
  );
}