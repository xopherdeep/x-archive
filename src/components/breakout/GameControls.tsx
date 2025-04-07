'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { GameState } from './helpers';

interface GameControlsProps {
  gameState: GameState;
  score: number;
  lives: number;
  level: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export default function GameControls({
  gameState,
  score,
  lives,
  level,
  onStart,
  onPause,
  onResume,
  onReset
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">Score</span>
          <span className="text-2xl font-bold">{score}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">Lives</span>
          <div className="flex">
            {Array.from({ length: lives }).map((_, i) => (
              <span key={i} className="text-red-500 text-xl mr-1">❤️</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">Level</span>
          <span className="text-2xl font-bold">{level}</span>
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        {gameState === 'READY' && (
          <Button onClick={onStart} className="w-full">
            Start Game
          </Button>
        )}
        
        {gameState === 'PLAYING' && (
          <Button onClick={onPause} variant="outline" className="w-full">
            Pause
          </Button>
        )}
        
        {gameState === 'PAUSED' && (
          <Button onClick={onResume} className="w-full">
            Resume
          </Button>
        )}
        
        {(gameState === 'PAUSED' || gameState === 'GAME_OVER') && (
          <Button onClick={onReset} variant="destructive" className="w-full">
            New Game
          </Button>
        )}
      </div>

      <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">How to Play</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-1">
          <li>Use the left and right arrow keys to move the paddle</li>
          <li>Press Space to launch the ball</li>
          <li>Break all the bricks to advance to the next level</li>
          <li>Don't let the ball fall off the bottom of the screen</li>
        </ul>
      </div>
    </div>
  );
}
