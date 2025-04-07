"use client";

import { useState } from "react";
import Link from "next/link";
import SurveyForm from "../components/day-survey/SurveyForm";
import DayAnalysis from "../components/day-survey/DayAnalysis";
import { SurveyResults } from "../components/day-survey/types";

export default function DayAlignmentSurveyPage() {
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [results, setResults] = useState<SurveyResults | null>(null);

  const handleSurveyComplete = (surveyResults: SurveyResults) => {
    setResults(surveyResults);
    setSurveyCompleted(true);
  };

  const handleReset = () => {
    setSurveyCompleted(false);
    setResults(null);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/tools" className="text-blue-600 dark:text-blue-400 mr-2">
            ← Back to Tools
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Day Alignment Survey</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover how your activities align with the cosmic energies of each day and find your personal "8th day" - 
          those special moments throughout the week when you're most in harmony with universal forces.
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        {!surveyCompleted ? (
          <SurveyForm onComplete={handleSurveyComplete} />
        ) : (
          <DayAnalysis results={results} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
