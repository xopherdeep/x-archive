import React from "react";

interface GameOverMessageProps {
  isGameOver: boolean;
  moves: number;
  elapsedTime: string;
  isNewBestTime: boolean;
  difficulty: "easy" | "medium" | "hard";
}

export function GameOverMessage({ 
  isGameOver, 
  moves, 
  elapsedTime, 
  isNewBestTime,
  difficulty
}: GameOverMessageProps) {
  if (!isGameOver) return null;
  
  return (
    <div className="text-center mb-6 p-4 bg-green-100 dark:bg-green-900 rounded-md">
      <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
      <p className="mb-2">
        You completed the game in {moves} moves and {elapsedTime}.
      </p>
      {isNewBestTime && (
        <p className="font-bold text-green-600 dark:text-green-400">
          New best time for {difficulty} difficulty!
        </p>
      )}
    </div>
  );
}
