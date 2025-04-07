"use client";

import { useState } from "react";
import { daysData } from "./DayData";
import { SurveyResults, DayName, ActivityType } from "./types";

interface DayAnalysisProps {
  results: SurveyResults | null;
  onReset: () => void;
}

export default function DayAnalysis({ results, onReset }: DayAnalysisProps) {
  const [activeTab, setActiveTab] = useState<'days' | 'activities' | 'eighth'>('days');

  if (!results) {
    return <div>No results to display</div>;
  }

  const { dayPreferences, activityPreferences, eighthDayMoments } = results;
  
  const topDay = dayPreferences[0];
  const topDayInfo = daysData.find(d => d.name === topDay.day);
  
  const getDayColor = (day: DayName): string => {
    const colors: Record<DayName, string> = {
      monday: "bg-gray-200 dark:bg-gray-700",
      tuesday: "bg-red-100 dark:bg-red-900/30",
      wednesday: "bg-purple-100 dark:bg-purple-900/30",
      thursday: "bg-blue-100 dark:bg-blue-900/30",
      friday: "bg-green-100 dark:bg-green-900/30",
      saturday: "bg-gray-100 dark:bg-gray-800",
      sunday: "bg-yellow-100 dark:bg-yellow-900/30"
    };
    return colors[day] || "bg-gray-100 dark:bg-gray-800";
  };

  const getActivityColor = (activity: ActivityType): string => {
    const colors: Record<ActivityType, string> = {
      creative: "bg-pink-100 dark:bg-pink-900/30",
      analytical: "bg-blue-100 dark:bg-blue-900/30",
      communicative: "bg-purple-100 dark:bg-purple-900/30",
      leadership: "bg-yellow-100 dark:bg-yellow-900/30",
      love: "bg-red-100 dark:bg-red-900/30",
      reflective: "bg-indigo-100 dark:bg-indigo-900/30",
      spiritual: "bg-teal-100 dark:bg-teal-900/30"
    };
    return colors[activity] || "bg-gray-100 dark:bg-gray-800";
  };

  const getActivityName = (activity: ActivityType): string => {
    const names: Record<ActivityType, string> = {
      creative: "Creative Work",
      analytical: "Analytical Thinking",
      communicative: "Communication",
      leadership: "Leadership",
      love: "Relationships",
      reflective: "Reflection",
      spiritual: "Spiritual Practice"
    };
    return names[activity] || activity;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Day Alignment Results</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Discover how your activities align with cosmic day energies
        </p>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab('days')}
          className={`py-2 px-4 font-medium ${
            activeTab === 'days'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Day Alignment
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={`py-2 px-4 font-medium ${
            activeTab === 'activities'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Activity Preferences
        </button>
        <button
          onClick={() => setActiveTab('eighth')}
          className={`py-2 px-4 font-medium ${
            activeTab === 'eighth'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          The 8th Day
        </button>
      </div>

      {activeTab === 'days' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold mb-4">Your Primary Day: {topDayInfo?.displayName}</h3>
            {topDayInfo && (
              <div className="space-y-4">
                <p>{topDayInfo.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                    <span className="font-medium">Ruling Deity:</span> {topDayInfo.deity}
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                    <span className="font-medium">Element:</span> {topDayInfo.element}
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                    <span className="font-medium">Energy Type:</span> {topDayInfo.energy}
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                    <span className="font-medium">Associated Color:</span> {topDayInfo.color}
                  </div>
                </div>
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold">Your Day Alignment Scores</h3>
          <div className="space-y-3">
            {dayPreferences.map(({ day, score }) => {
              const dayInfo = daysData.find(d => d.name === day);
              return (
                <div key={day} className="flex items-center">
                  <div className="w-32 font-medium">{dayInfo?.displayName}</div>
                  <div className="flex-1 ml-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className={`${getDayColor(day)} h-4 rounded-full`}
                        style={{ width: `${(score / activityQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 w-8 text-right">{score}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'activities' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold mb-4">Your Activity Preferences</h3>
            <p className="mb-4">
              Based on your responses, these are the types of activities you tend to prioritize:
            </p>
            <div className="space-y-3">
              {activityPreferences.map(({ type, score }) => (
                <div key={type} className="flex items-center">
                  <div className="w-40 font-medium">{getActivityName(type)}</div>
                  <div className="flex-1 ml-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className={`${getActivityColor(type)} h-4 rounded-full`}
                        style={{ width: `${(score / activityQuestions.filter(q => q.activityType === type).length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 w-8 text-right">{score}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold mb-4">Optimal Day-Activity Pairings</h3>
            <p className="mb-4">
              These combinations align your preferred activities with their cosmically optimal days:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activityPreferences.slice(0, 4).map(({ type }) => {
                const idealDays = daysData.filter(day => day.idealActivities.includes(type));
                return (
                  <div key={type} className={`${getActivityColor(type)} rounded-lg p-4`}>
                    <h4 className="font-medium mb-2">{getActivityName(type)}</h4>
                    <p className="text-sm">Best days: {idealDays.map(d => d.displayName).join(', ')}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'eighth' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold mb-4">The 8th Day Concept</h3>
            <p className="mb-4">
              The 8th day isn't a literal day, but rather special moments throughout the week when cosmic 
              energies align perfectly with your personal rhythms. These are times when you can access 
              heightened states of productivity, creativity, or spiritual connection.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold mb-4">Your 8th Day Moments</h3>
            <p className="mb-4">
              Based on your survey responses, these are your potential 8th day moments:
            </p>
            <ul className="space-y-3">
              {eighthDayMoments.map((moment, index) => (
                <li key={index} className="flex">
                  <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
                  <span>{moment}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm">
                To access your 8th day moments, pay special attention to how you feel during these times. 
                When you notice heightened awareness, energy, or flow states, you've likely found one of your 
                8th day moments. Use these times for your most important work or deepest practices.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center pt-6">
        <button
          onClick={onReset}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Take Survey Again
        </button>
      </div>
    </div>
  );
}
