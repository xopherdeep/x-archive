import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import useSnake from './useSnake';
import Board from './Board';
import TouchControls from './TouchControls';
import { Play, Pause, RotateCcw, Moon, Sun } from 'lucide-react';

export default function SnakeGame() {
  const isMobile = useIsMobile();
  const {
    board,
    score,
    highScore,
    level,
    gameState,
    BOARD_WIDTH,
    BOARD_HEIGHT,
    startGame,
    pauseGame,
    resetGame,
    moveSnakeDirection,
    theme,
    setTheme
  } = useSnake('light');

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Update document class for dark mode
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Set initial theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Snake Game</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Score display */}
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
            <p className="text-xl font-bold">{score}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">High Score</p>
            <p className="text-xl font-bold">{highScore}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
            <p className="text-xl font-bold">{level}</p>
          </div>
        </div>
        
        {/* Game board */}
        <Board 
          board={board} 
          width={BOARD_WIDTH} 
          height={BOARD_HEIGHT} 
          gameState={gameState}
          level={level}
        />
        
        {/* Game controls */}
        {isMobile ? (
          <TouchControls 
            onMove={moveSnakeDirection}
            onStart={startGame}
            onPause={pauseGame}
            onReset={resetGame}
            isPaused={gameState === 'PAUSED' || gameState === 'READY'}
            isGameOver={gameState === 'GAME_OVER'}
          />
        ) : (
          <div className="flex justify-center gap-2 mt-4">
            {gameState === 'GAME_OVER' ? (
              <Button 
                onClick={resetGame}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Restart
              </Button>
            ) : gameState === 'PLAYING' ? (
              <Button 
                variant="outline" 
                onClick={pauseGame}
                className="flex items-center gap-2"
              >
                <Pause className="h-4 w-4" />
                Pause
              </Button>
            ) : (
              <Button 
                onClick={startGame}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                {gameState === 'READY' ? 'Start' : 'Resume'}
              </Button>
            )}
            
            {gameState !== 'GAME_OVER' && (
              <Button 
                variant="outline" 
                onClick={resetGame}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
        )}
        
        {/* Instructions */}
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          <p>Use arrow keys or WASD to move</p>
          <p>Space to pause/resume, R to restart</p>
        </div>
      </CardContent>
    </Card>
  );
}
