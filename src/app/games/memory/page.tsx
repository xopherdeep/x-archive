"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";

// Import components
import { GameControls } from "./GameControls";
import { GameBoard } from "./GameBoard";
import { ScoreBoard } from "./ScoreBoard";
import { GameOverMessage } from "./GameOverMessage";

// Import types and utilities
import { 
  CardType, 
  Difficulty, 
  EMOJIS, 
  GRID_SIZES, 
  formatTime, 
  shuffleCards 
} from "./utils";

// Game stats type
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
  const [isNewBestTime, setIsNewBestTime] = useState<boolean>(false);

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
        setIsNewBestTime(true);
      } else {
        setIsNewBestTime(false);
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
    setIsNewBestTime(false);
    setGameStats({
      ...gameStats,
      moves: 0,
      matches: 0,
      startTime: null,
      endTime: null,
    });
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

  // Get elapsed time
  const getElapsedTime = (): string => {
    if (!gameStats.startTime) return "00:00";
    const endTime = gameStats.endTime || Date.now();
    return formatTime(endTime - gameStats.startTime);
  };

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
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
            <GameControls 
              difficulty={difficulty}
              onDifficultyChange={handleDifficultyChange}
              onNewGame={initializeGame}
              moves={gameStats.moves}
              matches={gameStats.matches}
              totalPairs={cards.length / 2}
              elapsedTime={getElapsedTime()}
              isGameInProgress={gameStats.moves > 0 && !isGameOver}
            />

            {/* Game board */}
            <div className="memory-game-board">
              <GameBoard 
                cards={cards}
                difficulty={difficulty}
                onCardClick={handleCardClick}
              />
            </div>

            {/* Game over message */}
            <GameOverMessage 
              isGameOver={isGameOver}
              moves={gameStats.moves}
              elapsedTime={getElapsedTime()}
              isNewBestTime={isNewBestTime}
              difficulty={difficulty}
            />

            {/* Best scores */}
            <ScoreBoard bestScores={gameStats.bestScores} />

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
