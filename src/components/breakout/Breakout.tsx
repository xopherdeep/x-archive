'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import { 
  createInitialGameState,
  updateBallPosition,
  handleWallCollision,
  handlePaddleCollision,
  handleBrickCollision,
  isBallOutOfBounds,
  resetBall,
  launchBall,
  areAllBricksBroken,
  createLevel,
  GameState
} from './helpers';

export default function Breakout() {
  const [gameState, setGameState] = useState<ReturnType<typeof createInitialGameState>>(
    createInitialGameState()
  );
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [bestScores, setBestScores] = useState<Record<number, number>>({});

  // Load best scores from localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem('breakout-best-scores');
    if (savedScores) {
      setBestScores(JSON.parse(savedScores));
    }
  }, []);

  // Save best scores to localStorage
  const saveBestScore = useCallback((level: number, score: number) => {
    setBestScores(prev => {
      const newScores = { 
        ...prev,
        [level]: Math.max(prev[level] || 0, score)
      };
      localStorage.setItem('breakout-best-scores', JSON.stringify(newScores));
      return newScores;
    });
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newKeys = new Set(prev);
        newKeys.add(e.key);
        return newKeys;
      });

      // Space to start/launch ball
      if (e.key === ' ' && gameState.gameState === 'READY') {
        startGame();
      } else if (e.key === ' ' && gameState.gameState === 'PLAYING' && 
                gameState.ball.velocity.dx === 0 && gameState.ball.velocity.dy === 0) {
        setGameState(prev => ({
          ...prev,
          ball: launchBall(prev.ball)
        }));
      }

      // P to pause/resume
      if (e.key === 'p' || e.key === 'P') {
        if (gameState.gameState === 'PLAYING') {
          pauseGame();
        } else if (gameState.gameState === 'PAUSED') {
          resumeGame();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key);
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.gameState, gameState.ball.velocity]);

  // Game loop
  useEffect(() => {
    if (gameState.gameState !== 'PLAYING') return;

    const gameLoop = () => {
      setGameState(prev => {
        // Move paddle based on keys pressed
        let newPaddleX = prev.paddle.position.x;
        if (keysPressed.has('ArrowLeft')) {
          newPaddleX = Math.max(0, prev.paddle.position.x - prev.paddle.speed);
        }
        if (keysPressed.has('ArrowRight')) {
          newPaddleX = Math.min(
            800 - prev.paddle.size.width,
            prev.paddle.position.x + prev.paddle.speed
          );
        }

        const newPaddle = {
          ...prev.paddle,
          position: {
            ...prev.paddle.position,
            x: newPaddleX
          }
        };

        // If ball is not moving, make it follow the paddle
        let newBall = { ...prev.ball };
        if (newBall.velocity.dx === 0 && newBall.velocity.dy === 0) {
          newBall = resetBall(newBall, newPaddle);
          return {
            ...prev,
            paddle: newPaddle,
            ball: newBall
          };
        }

        // Update ball position
        newBall = updateBallPosition(newBall);

        // Handle collisions
        newBall = handleWallCollision(newBall);
        newBall = handlePaddleCollision(newBall, newPaddle);
        
        const { ball: collidedBall, bricks: newBricks, score: newScore } = 
          handleBrickCollision(newBall, prev.bricks);
        
        newBall = collidedBall;
        
        // Check if ball is out of bounds
        if (isBallOutOfBounds(newBall)) {
          const newLives = prev.lives - 1;
          
          // Game over if no lives left
          if (newLives <= 0) {
            saveBestScore(prev.level, prev.score + newScore);
            return {
              ...prev,
              lives: 0,
              gameState: 'GAME_OVER' as GameState
            };
          }
          
          // Reset ball
          newBall = resetBall(newBall, newPaddle);
          
          return {
            ...prev,
            paddle: newPaddle,
            ball: newBall,
            bricks: newBricks,
            score: prev.score + newScore,
            lives: newLives
          };
        }
        
        // Check if all bricks are broken
        if (areAllBricksBroken(newBricks)) {
          saveBestScore(prev.level, prev.score + newScore);
          
          // Advance to next level
          const nextLevel = prev.level + 1;
          const gameLevel = createLevel(nextLevel);
          
          return {
            ...prev,
            paddle: newPaddle,
            ball: resetBall(newBall, newPaddle),
            bricks: gameLevel.bricks,
            score: prev.score + newScore,
            level: nextLevel,
            backgroundColor: gameLevel.backgroundColor
          };
        }
        
        return {
          ...prev,
          paddle: newPaddle,
          ball: newBall,
          bricks: newBricks,
          score: prev.score + newScore
        };
      });
    };

    const gameLoopId = setInterval(gameLoop, 1000 / 60); // 60 FPS

    return () => {
      clearInterval(gameLoopId);
    };
  }, [keysPressed, gameState.gameState, saveBestScore]);

  // Game control functions
  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameState: 'PLAYING' as GameState
    }));
  };

  const pauseGame = () => {
    setGameState(prev => ({
      ...prev,
      gameState: 'PAUSED' as GameState
    }));
  };

  const resumeGame = () => {
    setGameState(prev => ({
      ...prev,
      gameState: 'PLAYING' as GameState
    }));
  };

  const resetGame = () => {
    setGameState(createInitialGameState());
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
      <GameBoard
        paddle={gameState.paddle}
        ball={gameState.ball}
        bricks={gameState.bricks}
        gameState={gameState.gameState}
        backgroundColor={gameState.backgroundColor}
        level={gameState.level}
      />
      
      <GameControls
        gameState={gameState.gameState}
        score={gameState.score}
        lives={gameState.lives}
        level={gameState.level}
        onStart={startGame}
        onPause={pauseGame}
        onResume={resumeGame}
        onReset={resetGame}
      />
    </div>
  );
}
