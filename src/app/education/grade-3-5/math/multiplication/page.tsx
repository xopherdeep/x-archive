"use client";

import React, { useState } from "react";
import Link from "next/link";
import InteractiveActivity from "@/components/education/InteractiveActivity";
import ResourceCard from "@/components/education/ResourceCard";

export default function MultiplicationPage() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showPractice, setShowPractice] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState({ num1: 0, num2: 0 });
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const generateQuestion = (table: number | null) => {
    const num1 = table || Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCurrentQuestion({ num1, num2 });
    setUserAnswer("");
    setFeedback(null);
  };

  const startPractice = (table: number | null) => {
    setSelectedTable(table);
    setShowPractice(true);
    setScore({ correct: 0, total: 0 });
    generateQuestion(table);
  };

  const checkAnswer = () => {
    const correctAnswer = currentQuestion.num1 * currentQuestion.num2;
    const isCorrect = parseInt(userAnswer) === correctAnswer;
    
    setFeedback({
      correct: isCorrect,
      message: isCorrect 
        ? "Great job! That's correct!" 
        : `Not quite. ${currentQuestion.num1} × ${currentQuestion.num2} = ${correctAnswer}`
    });
    
    setScore({
      correct: isCorrect ? score.correct + 1 : score.correct,
      total: score.total + 1
    });
    
    // Generate a new question after a short delay
    setTimeout(() => {
      generateQuestion(selectedTable);
    }, 2000);
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Link 
            href="/education/grade-3-5" 
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Grades 3-5
          </Link>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="text-gray-700 dark:text-gray-300">Multiplication Tables</span>
        </div>
        
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/60 dark:to-blue-900/60 rounded-lg p-6 border border-purple-200 dark:border-purple-800/60 mb-4">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center mr-4 text-white text-2xl">
              🚀
            </div>
            <div>
              <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300">Multiplication Tables</h1>
              <p className="text-gray-700 dark:text-gray-300">
                Learn and practice multiplication facts with space-themed activities
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 italic">
          Just like scientists need math to calculate spacecraft trajectories, you'll use multiplication to solve exciting challenges!
        </p>
      </header>

      {!showPractice ? (
        <>
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Choose a Table to Practice</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => startPractice(num)}
                  className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/40 dark:to-blue-800/40 border border-blue-200 dark:border-blue-700 rounded-lg p-6 text-center hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/50 dark:hover:to-indigo-900/50 transition-all shadow-sm hover:shadow-md"
                >
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">{num}</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">Times Table</p>
                </button>
              ))}
              <button
                onClick={() => startPractice(null)}
                className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-800/40 border border-purple-200 dark:border-purple-700 rounded-lg p-6 text-center hover:from-purple-100 hover:to-indigo-50 dark:hover:from-purple-800/50 dark:hover:to-indigo-900/50 transition-all shadow-sm hover:shadow-md"
              >
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">Mix</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">All Tables</p>
              </button>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Learning Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InteractiveActivity
                title="Space Mission Multiplication"
                description="Calculate fuel needs and distances for your space mission"
                difficulty="beginner"
                estimatedTime="5-10 min"
                onClick={() => startPractice(null)}
              />
              <InteractiveActivity
                title="Constellation Memory Match"
                description="Match star patterns with their multiplication values"
                difficulty="intermediate"
                estimatedTime="10-15 min"
              />
              <InteractiveActivity
                title="Planet Orbit Puzzle"
                description="Calculate orbital patterns using multiplication"
                difficulty="advanced"
                estimatedTime="15-20 min"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResourceCard
                title="Multiplication Tables Printable"
                type="download"
                description="Printable multiplication tables from 1 to 12"
                url="#"
              />
              <ResourceCard
                title="Multiplication in Science Video"
                type="video"
                description="See how scientists use multiplication in their work"
                url="#"
              />
              <ResourceCard
                title="Science Word Problems"
                type="worksheet"
                description="Practice multiplication with real science scenarios"
                url="#"
              />
              <ResourceCard
                title="Space Math Stories"
                type="reading"
                description="Adventures that teach multiplication through space exploration"
                url="#"
              />
            </div>
          </section>
        </>
      ) : (
        <section className="max-w-md mx-auto bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg shadow-md p-6 border border-blue-100 dark:border-blue-800/50">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {selectedTable ? `${selectedTable} Times Table` : "Mixed Tables"}
            </h2>
            <div className="text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full font-medium">
              Score: {score.correct}/{score.total}
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 mb-6 shadow-inner">
              <div className="text-4xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">
                {currentQuestion.num1} × {currentQuestion.num2} = ?
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {selectedTable ? `Practicing the ${selectedTable} times table` : "Mixed practice"}
              </div>
            </div>
            
            <div className="flex justify-center items-center">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                className="w-24 text-center text-2xl p-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                placeholder="?"
                autoFocus
              />
              
              <button
                onClick={checkAnswer}
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-r-md text-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!userAnswer}
              >
                Check
              </button>
            </div>
          </div>
          
          {feedback && (
            <div className={`p-4 mb-6 rounded-md ${feedback.correct ? 'bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-100'}`}>
              {feedback.message}
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              onClick={() => setShowPractice(false)}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
            >
              Back to Activities
            </button>
            <button
              onClick={() => generateQuestion(selectedTable)}
              className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-4 py-2 rounded-md transition-colors"
            >
              New Problem
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
