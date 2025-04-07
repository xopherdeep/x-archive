"use client";
import React, { useMemo } from "react";
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
};

const NUM_TETROMINOS = 20; // adjust number of tetromino pieces
const CELL_SIZE = 20; // in pixels

export default function Background({
  theme = "light",
  level = 1,
}: {
  theme?: "light" | "dark";
  level?: number;
}) {
  const tetrominos = useMemo(() => {
    const items: TetrominoData[] = [];
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    for (let i = 0; i < NUM_TETROMINOS; i++) {
      const { key, tetromino } = randomTetromino(theme, level);
      const shapeWidth = tetromino.shape[0].length;
      const shapeHeight = tetromino.shape.length;
      const maxX = viewportWidth - shapeWidth * CELL_SIZE;
      const maxY = viewportHeight - shapeHeight * CELL_SIZE;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      items.push({ key, tetromino, x, y });
    }
    return items;
  }, [theme]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        // zIndex: -1,
      }}
    >
      {tetrominos.map((item, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: item.y,
            left: item.x,
            opacity: 0.1,
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
                      opacity: 0.1,
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
