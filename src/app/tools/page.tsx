import Link from "next/link";

export default function ToolsPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Tools Shack</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Practical tools to enhance your daily life and understanding
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          href="/tools/day-alignment-survey"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Day Alignment Survey</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Discover which days of the week align with your activities and uncover the hidden 8th day
          </p>
          <div className="mt-4 text-blue-600 dark:text-blue-400">Try the survey →</div>
        </Link>
        
        {/* Additional tool cards will be added here */}
      </div>
    </div>
  );
}
