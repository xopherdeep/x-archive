"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  tetrominoStyleMap, 
  BlockStyle, 
  getLevelColorTheme,
  getTetrominoBlockStyle
} from "./tetrominoStyles";

interface BoardProps {
  mergedBoard: (0 | string)[];
  current: { key: string; tetromino: { shape: number[][]; color: string } };
  quickDropping: boolean;
  ghostPosition: { x: number; y: number };
  gameOver: boolean;
  paused: boolean;
  COLS: number;
  ROWS: number;
  level: number;
}

export default function Board({
  mergedBoard,
  current,
  quickDropping,
  ghostPosition,
  gameOver,
  paused,
  COLS,
  ROWS,
  level,
}: BoardProps) {
  // Extract tetromino key and color information from the cell value
  // Format: "color:key" (e.g., "#00ffff:I")
  function getCellInfo(cell: 0 | string): { color: string; key: string } | null {
    if (cell === 0) return null;
    
    // If the cell contains key information (new format)
    if (typeof cell === 'string' && cell.includes(':')) {
      const [color, key] = cell.split(':');
      return { color, key };
    }
    
    // Legacy format (just color)
    return { color: cell, key: guessTetrominoKeyFromColor(cell) };
  }
  
  // Guess the tetromino key based on its color (for backward compatibility)
  function guessTetrominoKeyFromColor(color: string): string {
    // Since we now use the same color for all tetrominos at a given level,
    // we can't reliably guess the tetromino type from color alone.
    // We'll use a default distribution based on position in the board
    const keys = ["I", "O", "T", "S", "Z", "J", "L"];
    return keys[Math.floor(Math.random() * keys.length)];
  }
  
  function getCellStyle(cell: 0 | string, level: number): React.CSSProperties {
    if (cell === 0) {
      return { backgroundColor: "transparent" };
    }
    
    const cellInfo = getCellInfo(cell);
    if (!cellInfo) return { backgroundColor: "transparent" };
    
    const { color, key } = cellInfo;
    return getTetrominoBlockStyle(key, color);
  }
  return (
    <Card className="w-fit">
      <CardContent className="p-0 sm:p-6">
        <div className="relative grid grid-cols-10"
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
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          {mergedBoard.map((cell, index) => (
            <div
              key={index}
              style={{
                width: "30px",
                height: "30px",
                ...getCellStyle(cell, level),
                boxSizing: "border-box",
              }}
            />
          ))}
          {current.tetromino.shape.map((row, py) =>
            row.map((v, px) => {
              if (v) {
                const ghostX = ghostPosition.x + px;
                const ghostY = ghostPosition.y + py;
                
                // Get the style for the ghost piece
                const ghostCellInfo = { color: current.tetromino.color, key: current.key };
                
                let ghostStyle: React.CSSProperties = {
                  width: "30px",
                  height: "30px",
                  left: ghostX * 30 + "px",
                  top: ghostY * 30 + "px",
                  boxSizing: "border-box",
                  opacity: 0.3,
                };
                
                // Apply the ghost style
                ghostStyle = {
                  ...ghostStyle,
                  ...getTetrominoBlockStyle(ghostCellInfo.key, ghostCellInfo.color),
                  opacity: 0.3,
                };
                
                return (
                  <div
                    key={`ghost-${py}-${px}`}
                    className="absolute pointer-events-none"
                    style={ghostStyle}
                  />
                );
              }
              return null;
            })
          )}
          {(gameOver || paused) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-3xl font-bold">
                {gameOver ? "Game Over" : "Paused"}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
