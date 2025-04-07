"use client";
import React, { useEffect, useRef } from "react";
import { randomTetromino } from "./helpers";
import { getTetrominoBlockStyle } from "./tetrominoStyles";
import { TETROMINOES } from "./constants";

// Constants
const NUM_TETROMINOS = 100; // More tetrominos for a wall-like effect
const BG_CELL_SIZE = 30; // in pixels - larger for better visibility

type TetrominoData = {
  key: string;
  tetromino: {
    shape: number[][];
    color: string;
  };
  x: number;
  y: number;
  opacity: number;
};

// Using canvas for better performance
const BackgroundCanvas = React.memo(function BackgroundCanvas({
  theme,
  level,
}: {
  theme: "light" | "dark";
  level: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tetrominos = useRef<TetrominoData[]>([]);
  
  // Generate tetrominos only once on mount
  useEffect(() => {
    const generateTetrominos = () => {
      const items: TetrominoData[] = [];
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Create a grid of tetrominos to fill the screen
      const cols = Math.ceil(width / (BG_CELL_SIZE * 4)) + 1; // +1 for overflow
      const rows = Math.ceil(height / (BG_CELL_SIZE * 4)) + 1; // +1 for overflow
      
      // Create a wall of tetrominos
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Get a random tetromino
          const { key, tetromino } = randomTetromino(theme, level);
          
          // Calculate position based on grid
          const x = col * (BG_CELL_SIZE * 4);
          const y = row * (BG_CELL_SIZE * 4);
          
          // Slightly higher opacity for better visibility
          const opacity = 0.08 + Math.random() * 0.07;
          
          items.push({ key, tetromino, x, y, opacity });
        }
      }
      
      tetrominos.current = items;
    };
    
    generateTetrominos();
    
    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        generateTetrominos();
        drawBackground();
      }
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleResize);
    };
  }, [theme, level]);
  
  // Draw the background
  const drawBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw each tetromino
    tetrominos.current.forEach(item => {
      ctx.save();
      
      // Set opacity
      ctx.globalAlpha = item.opacity;
      
      // Draw the tetromino
      item.tetromino.shape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell) {
            const style = getTetrominoBlockStyle(item.key, item.tetromino.color, BG_CELL_SIZE);
            
            // Draw the cell
            const x = item.x + colIndex * BG_CELL_SIZE;
            const y = item.y + rowIndex * BG_CELL_SIZE;
            
            // Background color
            ctx.fillStyle = style.backgroundColor || item.tetromino.color;
            ctx.fillRect(x, y, BG_CELL_SIZE, BG_CELL_SIZE);
            
            // Border
            if (style.border) {
              const borderWidth = parseInt(style.border.split(' ')[0]) || 2;
              ctx.strokeStyle = style.border.split(' ')[2] || '#000';
              ctx.lineWidth = borderWidth;
              ctx.strokeRect(x + borderWidth/2, y + borderWidth/2, 
                            BG_CELL_SIZE - borderWidth, BG_CELL_SIZE - borderWidth);
            }
          }
        });
      });
      
      ctx.restore();
    });
  };
  
  // Set up canvas and start animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    
    // Initial draw
    drawBackground();
    
    return () => {
      // No animation to clean up
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -10, // Lower z-index to ensure it stays behind everything
      }}
    />
  );
});

export default function Background({
  theme = "light",
  level = 1,
}: {
  theme?: "light" | "dark";
  level?: number;
}) {
  return <BackgroundCanvas theme={theme} level={level} />;
}
