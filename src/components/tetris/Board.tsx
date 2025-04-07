"use client";
import React, { useMemo } from "react";
import { COLS, ROWS } from "./constants";
import {
  tetrominoStyleMap,
  BlockStyle,
  getLevelColorTheme,
  getTetrominoBlockStyle,
} from "./tetrominoStyles";

interface BoardProps {
  mergedBoard: (0 | string)[];
  current: { key: string; tetromino: { shape: number[][]; color: string } };
  quickDropping: boolean;
  ghostPosition: { x: number; y: number };
  gameOver: boolean;
  paused: boolean;
  level: number;
}

// Cell component to optimize rendering
const Cell = React.memo(function Cell({ 
  cell, 
  level, 
  size = 30 
}: { 
  cell: 0 | string; 
  level: number;
  size?: number;
}) {
  // Extract tetromino key and color information from the cell value
  // Format: "color:key" (e.g., "#00ffff:I")
  const getCellInfo = (cell: 0 | string): { color: string; key: string } | null => {
    if (cell === 0) return null;

    // If the cell contains key information (new format)
    if (typeof cell === "string" && cell.includes(":")) {
      const [color, key] = cell.split(":");
      return { color, key };
    }

    // Legacy format (just color)
    return { color: cell, key: "I" }; // Default to I for legacy support
  };

  const getCellStyle = (cell: 0 | string, level: number): React.CSSProperties => {
    if (cell === 0) {
      return { backgroundColor: "transparent" };
    }

    const cellInfo = getCellInfo(cell);
    if (!cellInfo) return { backgroundColor: "transparent" };

    const { color, key } = cellInfo;
    return getTetrominoBlockStyle(key, color);
  };

  return (
    <div
      style={{
        width: size + "px",
        height: size + "px",
        ...getCellStyle(cell, level),
        boxSizing: "border-box",
      }}
    />
  );
});

// Ghost cell component
const GhostCell = React.memo(function GhostCell({
  cellInfo,
  style
}: {
  cellInfo: { key: string; color: string };
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        ...style,
        ...getTetrominoBlockStyle(cellInfo.key, cellInfo.color),
        opacity: 0.3,
      }}
    />
  );
});

// Main Board component with memoization
const Board = React.memo(function Board({
  mergedBoard,
  current,
  quickDropping,
  ghostPosition,
  gameOver,
  paused,
  level,
}: BoardProps) {
  // Memoize ghost cells to prevent unnecessary re-renders
  const ghostCells = useMemo(() => {
    const cells: JSX.Element[] = [];
    
    current.tetromino.shape.forEach((row, py) => {
      row.forEach((v, px) => {
        if (v) {
          const ghostX = ghostPosition.x + px;
          const ghostY = ghostPosition.y + py;
          
          const ghostCellInfo = {
            color: current.tetromino.color,
            key: current.key,
          };
          
          const ghostStyle: React.CSSProperties = {
            width: "30px",
            height: "30px",
            left: ghostX * 30 + "px",
            top: ghostY * 30 + "px",
            boxSizing: "border-box",
          };
          
          cells.push(
            <GhostCell
              key={`ghost-${py}-${px}`}
              cellInfo={ghostCellInfo}
              style={ghostStyle}
            />
          );
        }
      });
    });
    
    return cells;
  }, [current.tetromino.shape, current.tetromino.color, current.key, ghostPosition]);

  return (
    <div
      className="relative grid grid-cols-10 w-full mx-auto my-4"
      style={{
        width: COLS * 30 + "px",
        height: ROWS * 30 + "px",
        background: "black",
        backgroundSize: "auto",
        maxWidth: "100vw",
        maxHeight: "70vh",
        overflow: "hidden",
      }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      
      {/* Board cells */}
      {mergedBoard.map((cell, index) => (
        <Cell key={index} cell={cell} level={level} />
      ))}
      
      {/* Ghost piece */}
      {ghostCells}
      
      {/* Game state overlay */}
      {(gameOver || paused) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white text-3xl font-bold">
            {gameOver ? "Game Over" : "Paused"}
          </span>
        </div>
      )}
    </div>
  );
});

export default Board;
