import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getActivityBySlug } from '@/lib/db';
import dynamic from 'next/dynamic';

// Dynamically import the calculator component with no SSR to avoid hydration issues
const LemonadeStandCalculator = dynamic(
  () => import('@/components/education/LemonadeStandCalculator'),
  { ssr: false }
);

export const dynamic = 'force-dynamic';

export default async function LemonadeStandActivity() {
  // Fetch the activity data from the database
  const activity = await getActivityBySlug('lemonade-stand');
  
  if (!activity) {
    notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${activity.gradientFrom} ${activity.gradientTo}`}>
            {activity.emoji}
          </div>
          <h1 className="text-3xl font-bold">{activity.title}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          {activity.description}
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Lemonade Stand Business Plan</h2>
        
        {/* Interactive Calculator Component */}
        <LemonadeStandCalculator />

        <div className="mt-8 bg-yellow-100 dark:bg-yellow-900/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Business Planning Insights</h3>
          <p className="mb-4">
            Running a lemonade stand teaches key business concepts like:
          </p>
          <ul className="space-y-2 ml-6 list-disc">
            <li>Initial investment and startup costs</li>
            <li>Pricing strategy and profit margins</li>
            <li>Supply chain and inventory management</li>
            <li>Time management and opportunity cost</li>
            <li>Customer service and marketing</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Link 
          href="/education/stem-connections/money-math"
          className="inline-block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md"
        >
          Back to Money Math
        </Link>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md font-medium">
          Save My Business Plan
        </button>
      </div>
    </div>
  );
}