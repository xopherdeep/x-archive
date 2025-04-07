"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Card types
type CardType = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

// Difficulty levels
type Difficulty = "easy" | "medium" | "hard";

// Game stats
type GameStats = {
  moves: number;
  matches: number;
  startTime: number | null;
  endTime: number | null;
  bestScores: {
    easy: number | null;
    medium: number | null;
    hard: number | null;
  };
};

// Emoji sets for different difficulties
const EMOJIS = {
  easy: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
  medium: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"],
  hard: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔"],
};

// Grid sizes for different difficulties
const GRID_SIZES = {
  easy: { cols: 4, rows: 4 },
  medium: { cols: 6, rows: 4 },
  hard: { cols: 8, rows: 4 },
};

export default function MemoryGamePage() {
  // Game state
  const [cards, setCards] = useState<CardType[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    moves: 0,
    matches: 0,
    startTime: null,
    endTime: null,
    bestScores: {
      easy: null,
      medium: null,
      hard: null,
    },
  });
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  // Load best scores from localStorage
  useEffect(() => {
    const savedBestScores = localStorage.getItem("memoryGameBestScores");
    if (savedBestScores) {
      setGameStats(prev => ({
        ...prev,
        bestScores: JSON.parse(savedBestScores),
      }));
    }
  }, []);

  // Save best scores to localStorage
  useEffect(() => {
    if (isGameOver && gameStats.endTime && gameStats.startTime) {
      const currentTime = gameStats.endTime - gameStats.startTime;
      const currentBestTime = gameStats.bestScores[difficulty];
      
      if (!currentBestTime || currentTime < currentBestTime) {
        const newBestScores = {
          ...gameStats.bestScores,
          [difficulty]: currentTime,
        };
        
        setGameStats(prev => ({
          ...prev,
          bestScores: newBestScores,
        }));
        
        localStorage.setItem("memoryGameBestScores", JSON.stringify(newBestScores));
      }
    }
  }, [isGameOver, gameStats.endTime]);

  // Initialize game with shuffled cards
  const initializeGame = () => {
    const emojisForDifficulty = EMOJIS[difficulty];
    const totalPairs = (GRID_SIZES[difficulty].cols * GRID_SIZES[difficulty].rows) / 2;
    const selectedEmojis = emojisForDifficulty.slice(0, totalPairs);
    
    // Create pairs of cards
    let cardPairs: CardType[] = [];
    selectedEmojis.forEach((emoji, index) => {
      // Create two cards with the same emoji
      cardPairs.push({
        id: index * 2,
        emoji,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        id: index * 2 + 1,
        emoji,
        isFlipped: false,
        isMatched: false,
      });
    });
    
    // Shuffle cards
    cardPairs = shuffleCards(cardPairs);
    
    setCards(cardPairs);
    setFlippedCards([]);
    setIsGameOver(false);
    setGameStats({
      ...gameStats,
      moves: 0,
      matches: 0,
      startTime: null,
      endTime: null,
    });
  };

  // Shuffle cards using Fisher-Yates algorithm
  const shuffleCards = (cards: CardType[]): CardType[] => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    // Start timer on first card click
    if (gameStats.startTime === null) {
      setGameStats(prev => ({
        ...prev,
        startTime: Date.now(),
      }));
    }
    
    // Don't allow clicks if two cards are already flipped or the clicked card is already flipped/matched
    if (flippedCards.length >= 2) return;
    
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;
    
    // Flip the card
    const updatedCards = cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setGameStats(prev => ({
        ...prev,
        moves: prev.moves + 1,
      }));
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = updatedCards.find(card => card.id === firstId);
      const secondCard = updatedCards.find(card => card.id === secondId);
      
      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          const matchedCards = updatedCards.map(card => 
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          );
          setCards(matchedCards);
          setFlippedCards([]);
          
          const newMatches = gameStats.matches + 1;
          setGameStats(prev => ({
            ...prev,
            matches: newMatches,
          }));
          
          // Check if game is over
          if (newMatches === updatedCards.length / 2) {
            setIsGameOver(true);
            setGameStats(prev => ({
              ...prev,
              endTime: Date.now(),
            }));
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetFlippedCards = updatedCards.map(card => 
            newFlippedCards.includes(card.id)
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetFlippedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Format time in seconds to mm:ss
  const formatTime = (timeInMs: number | null): string => {
    if (timeInMs === null) return "00:00";
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Get elapsed time
  const getElapsedTime = (): string => {
    if (!gameStats.startTime) return "00:00";
    const endTime = gameStats.endTime || Date.now();
    return formatTime(endTime - gameStats.startTime);
  };

  // Get grid columns class based on difficulty
  const getGridColumnsClass = (): string => {
    switch (difficulty) {
      case "easy": return "grid-cols-4";
      case "medium": return "grid-cols-6";
      case "hard": return "grid-cols-8";
      default: return "grid-cols-4";
    }
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Memory Match</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Test your memory by matching pairs of cards. Find all matches to win!
        </p>
      </header>

      <div className="flex flex-col items-center justify-center gap-8">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-6">
            {/* Game controls */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Difficulty:</span>
                <Select
                  value={difficulty}
                  onValueChange={(value: string) => setDifficulty(value as Difficulty)}
                  disabled={gameStats.moves > 0 && !isGameOver}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Moves</div>
                  <div className="text-xl font-bold">{gameStats.moves}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Matches</div>
                  <div className="text-xl font-bold">{gameStats.matches}/{cards.length / 2}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</div>
                  <div className="text-xl font-bold">{getElapsedTime()}</div>
                </div>
              </div>
              
              <Button onClick={initializeGame}>
                New Game
              </Button>
            </div>

            {/* Game board */}
            <div className={`grid ${getGridColumnsClass()} gap-2 mb-6`}>
              {cards.map(card => (
                <div
                  key={card.id}
                  className={`aspect-square rounded-md cursor-pointer transition-all duration-300 transform ${
                    card.isFlipped || card.isMatched
                      ? "rotate-y-180"
                      : ""
                  }`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className={`relative w-full h-full transition-all duration-300 transform-style-3d`}>
                    {/* Card back */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center bg-blue-500 dark:bg-blue-700 rounded-md backface-hidden ${
                        card.isFlipped || card.isMatched ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <span className="text-white text-2xl">?</span>
                    </div>
                    
                    {/* Card front */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-md backface-hidden rotate-y-180 ${
                        card.isMatched ? "bg-green-100 dark:bg-green-900" : ""
                      } ${
                        card.isFlipped || card.isMatched ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span className="text-4xl">{card.emoji}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Game over message */}
            {isGameOver && (
              <div className="text-center mb-6 p-4 bg-green-100 dark:bg-green-900 rounded-md">
                <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                <p className="mb-2">
                  You completed the game in {gameStats.moves} moves and {getElapsedTime()}.
                </p>
                {gameStats.endTime && gameStats.startTime && 
                  gameStats.bestScores[difficulty] === (gameStats.endTime - gameStats.startTime) && (
                  <p className="font-bold text-green-600 dark:text-green-400">
                    New best time for {difficulty} difficulty!
                  </p>
                )}
              </div>
            )}

            {/* Best scores */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                <div className="font-medium">Easy Best</div>
                <div>{formatTime(gameStats.bestScores.easy)}</div>
              </div>
              <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                <div className="font-medium">Medium Best</div>
                <div>{formatTime(gameStats.bestScores.medium)}</div>
              </div>
              <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                <div className="font-medium">Hard Best</div>
                <div>{formatTime(gameStats.bestScores.hard)}</div>
              </div>
            </div>

            {/* Back button */}
            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/games">Back to Games</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
