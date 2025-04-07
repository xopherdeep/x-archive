'use client';

import React, { useRef, useEffect } from 'react';
import { 
  Ball, 
  Brick, 
  GameState, 
  Paddle, 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT 
} from './helpers';

interface GameBoardProps {
  paddle: Paddle;
  ball: Ball;
  bricks: Brick[];
  gameState: GameState;
  backgroundColor: string;
  level: number;
}

export default function GameBoard({ 
  paddle, 
  ball, 
  bricks, 
  gameState,
  backgroundColor,
  level
}: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = backgroundColor || '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddle
    ctx.fillStyle = '#333';
    ctx.fillRect(
      paddle.position.x,
      paddle.position.y,
      paddle.size.width,
      paddle.size.height
    );

    // Draw ball
    ctx.beginPath();
    ctx.arc(
      ball.position.x,
      ball.position.y,
      ball.radius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();

    // Draw bricks
    bricks.forEach(brick => {
      if (!brick.broken) {
        ctx.fillStyle = brick.color;
        ctx.fillRect(
          brick.position.x,
          brick.position.y,
          brick.size.width,
          brick.size.height
        );

        // Draw brick border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          brick.position.x,
          brick.position.y,
          brick.size.width,
          brick.size.height
        );
      }
    });

    // Draw game state message
    if (gameState !== 'PLAYING') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      
      let message = '';
      switch (gameState) {
        case 'READY':
          message = 'Press Space to Start';
          break;
        case 'PAUSED':
          message = 'Game Paused';
          break;
        case 'GAME_OVER':
          message = 'Game Over';
          break;
      }
      
      ctx.fillText(message, canvas.width / 2, canvas.height / 2);
      
      // Add level info
      ctx.font = '20px Arial';
      ctx.fillText(`Level ${level}`, canvas.width / 2, canvas.height / 2 + 40);
    }

  }, [paddle, ball, bricks, gameState, backgroundColor, level]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="border border-gray-300 shadow-lg"
    />
  );
}
