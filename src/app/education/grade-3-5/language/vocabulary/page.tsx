"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ResourceCard from "@/components/education/ResourceCard";

// Sample vocabulary words for the game
const vocabularyWords = [
  { word: "adventure", definition: "An exciting or unusual experience" },
  { word: "brave", definition: "Ready to face and endure danger or pain; showing courage" },
  { word: "curious", definition: "Eager to know or learn something" },
  { word: "delicious", definition: "Highly pleasant to the taste" },
  { word: "enormous", definition: "Very large in size, quantity, or extent" },
  { word: "fantastic", definition: "Extraordinarily good or attractive" },
  { word: "generous", definition: "Ready to give more of something than is necessary or expected" },
  { word: "honest", definition: "Free of deceit; truthful and sincere" },
  { word: "imagine", definition: "Form a mental image or concept of something" },
  { word: "journey", definition: "An act of traveling from one place to another" },
  { word: "knowledge", definition: "Facts, information, and skills acquired through experience or education" },
  { word: "magnificent", definition: "Extremely beautiful, elaborate, or impressive" }
];

export default function VocabularyPage() {
  const [gameMode, setGameMode] = useState<"matching" | "flashcards" | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [matchingWords, setMatchingWords] = useState<Array<{ word: string; definition: string; id: number; matched: boolean }>>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [completedMatches, setCompletedMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Initialize matching game
  useEffect(() => {
    if (gameMode === "matching") {
      // Select 6 random words for the matching game
      const shuffledWords = [...vocabularyWords].sort(() => 0.5 - Math.random()).slice(0, 6);
      
      // Create an array with words and definitions as separate items
      const cards = [
        ...shuffledWords.map((item, index) => ({ word: item.word, definition: "", id: index, matched: false })),
        ...shuffledWords.map((item, index) => ({ word: "", definition: item.definition, id: index + 6, matched: false }))
      ];
      
      // Shuffle the cards
      setMatchingWords(cards.sort(() => 0.5 - Math.random()));
    }
  }, [gameMode]);

  const handleCardClick = (index: number) => {
    if (matchingWords[index].matched) return;
    
    if (selectedCard === null) {
      // First card selection
      setSelectedCard(index);
    } else {
      // Second card selection
      setAttempts(attempts + 1);
      
      const firstCard = matchingWords[selectedCard];
      const secondCard = matchingWords[index];
      
      // Check if it's a match (word from first half matches definition from second half)
      const isMatch = 
        (firstCard.id < 6 && secondCard.id >= 6 && 
         vocabularyWords[firstCard.id].word === firstCard.word && 
         vocabularyWords[firstCard.id].definition === secondCard.definition) ||
        (secondCard.id < 6 && firstCard.id >= 6 && 
         vocabularyWords[secondCard.id].word === secondCard.word && 
         vocabularyWords[secondCard.id].definition === firstCard.definition);
      
      if (isMatch) {
        // Mark both cards as matched
        const updatedCards = [...matchingWords];
        updatedCards[selectedCard].matched = true;
        updatedCards[index].matched = true;
        setMatchingWords(updatedCards);
        setCompletedMatches(completedMatches + 1);
      }
      
      // Reset selection
      setTimeout(() => {
        setSelectedCard(null);
      }, 1000);
    }
  };

  const resetGame = () => {
    setGameMode(null);
    setCurrentWordIndex(0);
    setShowDefinition(false);
    setSelectedCard(null);
    setCompletedMatches(0);
    setAttempts(0);
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
          <span>Vocabulary Building</span>
        </div>
        <h1 className="text-3xl font-bold">Vocabulary Challenge</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Expand your vocabulary with fun word games and activities
        </p>
      </header>

      {!gameMode ? (
        <>
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Choose an Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setGameMode("flashcards")}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 text-left hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-green-600 dark:text-green-400 text-xl font-bold">A</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Vocabulary Flashcards</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn new words with interactive flashcards
                </p>
              </button>
              
              <button
                onClick={() => setGameMode("matching")}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 text-left hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">≡</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Word Matching Game</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Match words with their definitions
                </p>
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Vocabulary Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResourceCard
                title="Weekly Vocabulary List"
                type="download"
                description="Printable list of vocabulary words with definitions"
                url="#"
              />
              <ResourceCard
                title="Vocabulary Building Strategies"
                type="video"
                description="Learn techniques to remember new words"
                url="#"
              />
              <ResourceCard
                title="Context Clues Worksheet"
                type="worksheet"
                description="Practice finding word meanings from context"
                url="#"
              />
              <ResourceCard
                title="Word Origins"
                type="reading"
                description="Explore the fascinating origins of common words"
                url="#"
              />
            </div>
          </section>
        </>
      ) : gameMode === "flashcards" ? (
        <section className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Card {currentWordIndex + 1} of {vocabularyWords.length}</span>
              <button 
                onClick={() => setShowDefinition(!showDefinition)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                {showDefinition ? "Show Word" : "Show Definition"}
              </button>
            </div>
            
            <div 
              className="h-48 flex items-center justify-center cursor-pointer"
              onClick={() => setShowDefinition(!showDefinition)}
            >
              <div className="text-center">
                {showDefinition ? (
                  <p className="text-xl">{vocabularyWords[currentWordIndex].definition}</p>
                ) : (
                  <h3 className="text-3xl font-bold">{vocabularyWords[currentWordIndex].word}</h3>
                )}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 text-center mt-2">
              Click the card to flip
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => {
                if (currentWordIndex > 0) {
                  setCurrentWordIndex(currentWordIndex - 1);
                  setShowDefinition(false);
                }
              }}
              disabled={currentWordIndex === 0}
              className={`px-4 py-2 rounded-md ${
                currentWordIndex === 0 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
            >
              Back to Activities
            </button>
            
            <button
              onClick={() => {
                if (currentWordIndex < vocabularyWords.length - 1) {
                  setCurrentWordIndex(currentWordIndex + 1);
                  setShowDefinition(false);
                }
              }}
              disabled={currentWordIndex === vocabularyWords.length - 1}
              className={`px-4 py-2 rounded-md ${
                currentWordIndex === vocabularyWords.length - 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Next
            </button>
          </div>
        </section>
      ) : (
        <section className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Word Matching Game</h2>
              <div className="text-sm">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full mr-2">
                  Matches: {completedMatches}/6
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                  Attempts: {attempts}
                </span>
              </div>
            </div>
            
            {completedMatches === 6 ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Congratulations!</h3>
                <p className="mb-4">You completed all matches in {attempts} attempts.</p>
                <button
                  onClick={() => {
                    setGameMode("matching");
                    setCompletedMatches(0);
                    setAttempts(0);
                  }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mr-4"
                >
                  Play Again
                </button>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
                >
                  Back to Activities
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {matchingWords.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => selectedCard !== index && handleCardClick(index)}
                    className={`h-32 flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      card.matched
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : selectedCard === index
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                    }`}
                  >
                    <div className="text-center">
                      {card.word && <p className="font-bold">{card.word}</p>}
                      {card.definition && <p className="text-sm">{card.definition}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {completedMatches < 6 && (
            <div className="text-center">
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
              >
                Back to Activities
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
