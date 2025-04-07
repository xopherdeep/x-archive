"use client";

import { useState } from "react";
import { activityQuestions, daysData } from "./DayData";
import { SurveyFormData, SurveyResults, DayName, ActivityType, DayPreference, ActivityPreference } from "./types";

interface SurveyFormProps {
  onComplete: (results: SurveyResults) => void;
}

export default function SurveyForm({ onComplete }: SurveyFormProps) {
  const [formData, setFormData] = useState<SurveyFormData>({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = Math.ceil(activityQuestions.length / 3);

  const handleChange = (questionId: string, value: DayName) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateResults = (): SurveyResults => {
    const dayScores: Record<DayName, number> = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0
    };

    const activityScores: Record<ActivityType, number> = {
      creative: 0,
      analytical: 0,
      communicative: 0,
      leadership: 0,
      love: 0,
      reflective: 0,
      spiritual: 0
    };

    Object.entries(formData).forEach(([questionId, day]) => {
      dayScores[day]++;
      
      const question = activityQuestions.find(q => q.id === questionId);
      if (question) {
        activityScores[question.activityType]++;
      }
    });

    const dayPreferences: DayPreference[] = Object.entries(dayScores)
      .map(([day, score]) => ({ day: day as DayName, score }))
      .sort((a, b) => b.score - a.score);

    const activityPreferences: ActivityPreference[] = Object.entries(activityScores)
      .map(([type, score]) => ({ type: type as ActivityType, score }))
      .sort((a, b) => b.score - a.score);

    const topDays = dayPreferences.slice(0, 2).map(dp => 
      daysData.find(d => d.name === dp.day)?.displayName || dp.day
    );
    
    const topActivities = activityPreferences.slice(0, 2).map(ap => ap.type);

    const eighthDayMoments = [
      `The transition between ${topDays[0]} and ${topDays[1]} when cosmic energies align with your ${topActivities[0]} nature`,
      `The first hour after waking on ${topDays[0]} when your ${topActivities[0]} abilities are heightened`,
      `The 20 minutes before sunset on ${topDays[1]} when universal forces shift in your favor`,
      `Those brief moments on ${topDays[0]} afternoons when you feel most in tune with your ${topActivities[1]} side`,
      `The quiet time on ${topDays[1]} mornings when you can tap into hidden potential`
    ];

    return {
      dayPreferences,
      activityPreferences,
      eighthDayMoments
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      return;
    }
    
    const results = calculateResults();
    onComplete(results);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const currentQuestions = activityQuestions.slice(
    (currentStep - 1) * 3,
    currentStep * 3
  );

  const isStepComplete = currentQuestions.every(q => formData[q.id]);
  const isLastStep = currentStep === totalSteps;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Day Alignment Survey</h2>
          <span className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        {currentQuestions.map(question => (
          <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="font-medium mb-3">{question.text}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {daysData.map(day => (
                <label 
                  key={`${question.id}-${day.name}`}
                  className={`
                    flex items-center p-3 rounded-md border cursor-pointer transition-colors
                    ${formData[question.id] === day.name 
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400' 
                      : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'}
                  `}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={day.name}
                    checked={formData[question.id] === day.name}
                    onChange={() => handleChange(question.id, day.name)}
                    className="sr-only"
                  />
                  <span className="ml-2">{day.displayName}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}
        <button
          type="submit"
          disabled={!isStepComplete}
          className={`px-4 py-2 rounded-md ${
            isStepComplete
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLastStep ? 'See Results' : 'Continue'}
        </button>
      </div>
    </form>
  );
}
