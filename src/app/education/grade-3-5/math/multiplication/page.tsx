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
            className="text-blue-500 hover:text-blue-700"
          >
            Grades 3-5
          </Link>
          <span className="text-gray-500">/</span>
          <span>Multiplication Tables</span>
        </div>
        <h1 className="text-3xl font-bold">Multiplication Tables</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Learn and practice multiplication facts with fun activities
        </p>
      </header>

      {!showPractice ? (
        <>
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Choose a Table to Practice</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => startPractice(num)}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{num}</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Times Table</p>
                </button>
              ))}
              <button
                onClick={() => startPractice(null)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">Mix</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">All Tables</p>
              </button>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Learning Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InteractiveActivity
                title="Multiplication Race"
                description="Race against the clock to solve multiplication problems"
                difficulty="beginner"
                estimatedTime="5-10 min"
                onClick={() => startPractice(null)}
              />
              <InteractiveActivity
                title="Multiplication Memory Match"
                description="Match problems with their answers in this memory game"
                difficulty="intermediate"
                estimatedTime="10-15 min"
              />
              <InteractiveActivity
                title="Multiplication Puzzle"
                description="Solve the puzzle by placing the correct answers"
                difficulty="advanced"
                estimatedTime="15-20 min"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResourceCard
                title="Multiplication Tables Printable"
                type="download"
                description="Printable multiplication tables from 1 to 12"
                url="#"
              />
              <ResourceCard
                title="Multiplication Strategies Video"
                type="video"
                description="Learn different strategies for remembering multiplication facts"
                url="#"
              />
              <ResourceCard
                title="Word Problems Worksheet"
                type="worksheet"
                description="Practice applying multiplication in real-world scenarios"
                url="#"
              />
              <ResourceCard
                title="Multiplication Stories"
                type="reading"
                description="Fun stories that teach multiplication concepts"
                url="#"
              />
            </div>
          </section>
        </>
      ) : (
        <section className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {selectedTable ? `${selectedTable} Times Table` : "Mixed Tables"}
            </h2>
            <div className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
              Score: {score.correct}/{score.total}
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div className="text-4xl font-bold mb-6">
              {currentQuestion.num1} × {currentQuestion.num2} = ?
            </div>
            
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              className="w-24 text-center text-2xl p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              placeholder="?"
              autoFocus
            />
            
            <button
              onClick={checkAnswer}
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              disabled={!userAnswer}
            >
              Check
            </button>
          </div>
          
          {feedback && (
            <div className={`p-4 mb-6 rounded-md ${feedback.correct ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
              {feedback.message}
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              onClick={() => setShowPractice(false)}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md"
            >
              Back to Activities
            </button>
            <button
              onClick={() => generateQuestion(selectedTable)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              New Problem
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
