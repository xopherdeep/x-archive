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
    const colorMap: Record<string, string> = {
      "#00ffff": "I", "#00cccc": "I", "#009999": "I", // Cyan variants
      "#ffff00": "O", "#cccc00": "O", "#999900": "O", // Yellow variants
      "#dda0dd": "T", "#ba8bb0": "T", "#a275a2": "T", // Purple variants
      "#7fff00": "S", "#6fbf00": "S", "#5fb000": "S", // Green variants
      "#ff4500": "Z", "#e03e00": "Z", "#c02e00": "Z", // Red variants
      "#1e90ff": "J", "#199ae6": "J", "#157bb8": "J", // Blue variants
      "#ff8c00": "L", "#e68a00": "L", "#cc7000": "L", // Orange variants
    };
    
    return colorMap[color] || "I"; // Default to I if unknown
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
      <CardContent>
        <div className="relative grid grid-cols-10"
          style={{
            width: COLS * 30 + "px",
            height: ROWS * 30 + "px",
            background: "url('/assets/retro-bg.png') repeat",
            backgroundSize: "auto",
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
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-3xl font-bold">Game Over</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
