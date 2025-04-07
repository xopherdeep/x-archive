"use client";
import React, { useEffect, useRef } from "react";
import { TETROMINOES } from "./constants";

// Constants
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

// Get a random tetromino with color based on level
function getRandomTetromino(theme: "light" | "dark", level: number): { key: string; tetromino: { shape: number[][]; color: string } } {
  const keys = Object.keys(TETROMINOES);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  const tetromino = TETROMINOES[randKey];
  
  // Get color based on level
  const colors = [
    "#00ffff", // Level 1: Cyan
    "#ff8c00", // Level 2: Orange
    "#dda0dd", // Level 3: Purple
    "#7fff00", // Level 4: Green
    "#ff4500", // Level 5: Red
    "#1e90ff", // Level 6: Blue
    "#ffff00", // Level 7: Yellow
    "#ff69b4", // Level 8: Hot Pink
  ];
  
  const color = colors[(level - 1) % colors.length];
  
  return {
    key: randKey,
    tetromino: {
      ...tetromino,
      color: color,
    },
  };
}

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
  const animationRef = useRef<number | null>(null);
  
  // Generate tetrominos
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
        const { key, tetromino } = getRandomTetromino(theme, level);
        
        // Calculate position based on grid
        const x = col * (BG_CELL_SIZE * 4);
        const y = row * (BG_CELL_SIZE * 4);
        
        // Higher opacity for better visibility
        const opacity = 0.3 + Math.random() * 0.2;
        
        items.push({ key, tetromino, x, y, opacity });
      }
    }
    
    tetrominos.current = items;
  };
  
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
            // Draw the cell
            const x = item.x + colIndex * BG_CELL_SIZE;
            const y = item.y + rowIndex * BG_CELL_SIZE;
            
            // Fill with color
            ctx.fillStyle = item.tetromino.color;
            ctx.fillRect(x, y, BG_CELL_SIZE, BG_CELL_SIZE);
            
            // Add a border
            ctx.strokeStyle = theme === 'dark' ? '#000' : '#333';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, BG_CELL_SIZE, BG_CELL_SIZE);
            
            // Add a highlight effect
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + BG_CELL_SIZE, y);
            ctx.lineTo(x, y + BG_CELL_SIZE);
            ctx.closePath();
            ctx.fill();
          }
        });
      });
      
      ctx.restore();
    });
    
    // Subtle animation - slowly move tetrominos
    tetrominos.current = tetrominos.current.map(item => ({
      ...item,
      y: item.y + 0.05, // Very slow downward movement
    }));
    
    // Loop animation
    animationRef.current = requestAnimationFrame(drawBackground);
  };
  
  // Set up canvas and start animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Set canvas dimensions
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    
    // Generate tetrominos
    generateTetrominos();
    
    // Start animation
    animationRef.current = requestAnimationFrame(drawBackground);
    
    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        generateTetrominos();
      }
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    
    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleResize);
    };
  }, [theme, level]);
  
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
        zIndex: -1,
        opacity: 1, // Full opacity
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
