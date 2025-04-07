"use client";
import React, { useMemo, useEffect, useState } from "react";
import { randomTetromino } from "./helpers";
import { getTetrominoBlockStyle, getLevelColorTheme } from "./tetrominoStyles";

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

const NUM_TETROMINOS = 50; // increased number of tetromino pieces
const CELL_SIZE = 20; // in pixels

export default function Background({
  theme = "light",
  level = 1,
}: {
  theme?: "light" | "dark";
  level?: number;
}) {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // Update dimensions when window resizes or fullscreen changes
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Listen for resize and fullscreenchange events
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleResize);
    };
  }, []);

  const tetrominos = useMemo(() => {
    const items: TetrominoData[] = [];
    // Only calculate this on client-side
    if (typeof window !== 'undefined') {
      for (let i = 0; i < NUM_TETROMINOS; i++) {
        const { key, tetromino } = randomTetromino(theme, level);
        const shapeWidth = tetromino.shape[0].length;
        const shapeHeight = tetromino.shape.length;
        const maxX = dimensions.width - shapeWidth * CELL_SIZE;
        const maxY = dimensions.height - shapeHeight * CELL_SIZE;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        const rotation = Math.floor(Math.random() * 4) * 90; // Random rotation: 0, 90, 180, or 270 degrees
        const opacity = 0.05 + Math.random() * 0.1; // Random opacity between 0.05 and 0.15
        items.push({ key, tetromino, x, y, rotation, opacity });
      }
    }
    return items;
  }, [theme, level, dimensions]); // Add dimensions as a dependency

  return (
    <div
      style={{
        position: "fixed", // Changed from absolute to fixed for better fullscreen support
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1, // Ensure it stays behind other content
        overflow: "hidden", // Prevent scrollbars
      }}
    >
      {tetrominos.map((item, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: item.y,
            left: item.x,
            opacity: item.opacity,
            transform: `rotate(${item.rotation}deg)`,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {item.tetromino.shape.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((cell, colIndex) =>
                cell ? (
                  <div
                    key={colIndex}
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      ...getTetrominoBlockStyle(item.key, item.tetromino.color, CELL_SIZE),
                    }}
                  />
                ) : (
                  <div
                    key={colIndex}
                    style={{ width: CELL_SIZE, height: CELL_SIZE }}
                  />
                )
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
