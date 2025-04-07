"use client";
import React, { useEffect, useRef } from "react";
import { randomTetromino } from "./helpers";
import { getTetrominoBlockStyle } from "./tetrominoStyles";

// Constants
const NUM_TETROMINOS = 30; // Reduced for better performance
const BG_CELL_SIZE = 20; // in pixels

type TetrominoData = {
  key: string;
  tetromino: {
    shape: number[][];
    color: string;
  };
  x: number;
  y: number;
  rotation: number;
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
  const animationRef = useRef<number>(0);
  const tetrominos = useRef<TetrominoData[]>([]);
  
  // Generate tetrominos only once on mount
  useEffect(() => {
    const generateTetrominos = () => {
      const items: TetrominoData[] = [];
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Use a grid-based approach for better distribution
      const gridCellSize = 150;
      const gridCols = Math.ceil(width / gridCellSize);
      const gridRows = Math.ceil(height / gridCellSize);
      
      for (let i = 0; i < NUM_TETROMINOS; i++) {
        const { key, tetromino } = randomTetromino(theme, level);
        
        // Place in a random grid cell
        const gridCol = Math.floor(Math.random() * gridCols);
        const gridRow = Math.floor(Math.random() * gridRows);
        
        const cellX = gridCol * gridCellSize;
        const cellY = gridRow * gridCellSize;
        
        // Add some randomness within the cell
        const x = cellX + Math.random() * (gridCellSize - 100);
        const y = cellY + Math.random() * (gridCellSize - 100);
        
        const rotation = Math.floor(Math.random() * 4) * 90;
        const opacity = 0.03 + Math.random() * 0.07; // Lower opacity for better performance
        
        items.push({ key, tetromino, x, y, rotation, opacity });
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
      cancelAnimationFrame(animationRef.current);
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
      
      // Translate and rotate
      ctx.translate(item.x + (item.tetromino.shape[0].length * BG_CELL_SIZE) / 2, 
                   item.y + (item.tetromino.shape.length * BG_CELL_SIZE) / 2);
      ctx.rotate((item.rotation * Math.PI) / 180);
      ctx.translate(-(item.tetromino.shape[0].length * BG_CELL_SIZE) / 2, 
                   -(item.tetromino.shape.length * BG_CELL_SIZE) / 2);
      
      // Draw the tetromino
      item.tetromino.shape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell) {
            const style = getTetrominoBlockStyle(item.key, item.tetromino.color, BG_CELL_SIZE);
            
            // Draw the cell
            const x = colIndex * BG_CELL_SIZE;
            const y = rowIndex * BG_CELL_SIZE;
            
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
    
    // Subtle animation for visual interest
    const animate = () => {
      // Slowly rotate some tetrominos for subtle movement
      tetrominos.current.forEach((item, index) => {
        if (index % 5 === 0) { // Only animate every 5th tetromino
          item.rotation += 0.05;
        }
      });
      
      drawBackground();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
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
        zIndex: -1,
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
