import React from 'react';
import { GameState } from './helpers';

interface BoardProps {
  board: (0 | 'head' | 'body' | 'food')[];
  width: number;
  height: number;
  gameState: GameState;
  level: number;
}

export default function Board({ board, width, height, gameState, level }: BoardProps) {
  // Get color based on level
  const getSnakeColor = () => {
    const colors = [
      '#4CAF50', // Green
      '#2196F3', // Blue
      '#FFC107', // Yellow
      '#FF5722', // Orange
      '#9C27B0', // Purple
      '#E91E63', // Pink
      '#F44336', // Red
      '#009688', // Teal
      '#673AB7', // Deep Purple
      '#3F51B5', // Indigo
    ];
    
    return colors[(level - 1) % colors.length];
  };

  const snakeColor = getSnakeColor();
  const headColor = snakeColor;
  const bodyColor = snakeColor;
  const foodColor = '#FF5252';

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      {/* Game board */}
      <div 
        className="grid gap-px bg-gray-200 dark:bg-gray-800"
        style={{ 
          gridTemplateColumns: `repeat(${width}, 1fr)`,
          aspectRatio: `${width}/${height}`
        }}
      >
        {board.map((cell, index) => (
          <div 
            key={index}
            className={`
              ${cell === 0 ? 'bg-white dark:bg-gray-900' : ''}
              ${cell === 'head' ? 'rounded-sm' : ''}
              ${cell === 'body' ? 'rounded-sm' : ''}
              ${cell === 'food' ? 'rounded-full' : ''}
            `}
            style={{
              backgroundColor: 
                cell === 'head' ? headColor :
                cell === 'body' ? bodyColor :
                cell === 'food' ? foodColor :
                '',
              transition: 'background-color 0.1s'
            }}
          />
        ))}
      </div>

      {/* Overlay for game states */}
      {gameState !== 'PLAYING' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center text-white">
            {gameState === 'READY' && <p className="text-2xl font-bold">Press Space to Start</p>}
            {gameState === 'PAUSED' && <p className="text-2xl font-bold">Paused</p>}
            {gameState === 'GAME_OVER' && <p className="text-2xl font-bold">Game Over</p>}
            <p className="mt-2">
              {gameState === 'GAME_OVER' ? 'Press R to Restart' : 'Use arrow keys or WASD to move'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
