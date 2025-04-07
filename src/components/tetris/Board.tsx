"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { generateSVGPattern } from "../tetris/helpers";

interface BoardProps {
  mergedBoard: (0 | string)[];
  current: { tetromino: { shape: number[][]; color: string } };
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
  function getCellStyle(cell: 0 | string, level: number): React.CSSProperties {
    if (cell === 0) {
      return { backgroundColor: "transparent" };
    }
    const patternSize = Math.max(3, 10 - level);
    switch (cell) {
      case "#00ffff":
        return { backgroundImage: generateSVGPattern(cell, "#ffffff", 30) };
      case "#ffff00":
        return { backgroundImage: generateSVGPattern(cell, "#ffffff", 30) };
      case "#dda0dd":
        return { backgroundImage: generateSVGPattern(cell, "#ffffff", 30) };
      case "#7fff00":
        return {
          backgroundImage: `repeating-linear-gradient(135deg, ${cell}, ${cell} ${patternSize}px, rgba(0,0,0,0.1) ${patternSize}px, rgba(0,0,0,0.1) ${
            patternSize * 2
          }px)`,
        };
      case "#ff4500":
        return {
          backgroundImage: `repeating-linear-gradient(45deg, ${cell}, ${cell} ${patternSize}px, rgba(0,0,0,0.2) ${patternSize}px, rgba(0,0,0,0.2) ${
            patternSize * 2
          }px)`,
        };
      case "#1e90ff":
        return {
          backgroundImage: `repeating-linear-gradient(135deg, ${cell}, ${cell} ${patternSize}px, rgba(0,0,0,0.1) ${patternSize}px, rgba(0,0,0,0.1) ${
            patternSize * 2
          }px)`,
        };
      case "#ff8c00":
        return {
          backgroundImage: `repeating-linear-gradient(45deg, ${cell}, ${cell} ${patternSize}px, rgba(0,0,0,0.2) ${patternSize}px, rgba(0,0,0,0.2) ${
            patternSize * 2
          }px)`,
        };
      default:
        return { backgroundColor: cell };
    }
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
                border: "1px solid #999",
              }}
            />
          ))}
          {current.tetromino.shape.map((row, py) =>
            row.map((v, px) => {
              if (v) {
                const ghostX = ghostPosition.x + px;
                const ghostY = ghostPosition.y + py;
                return (
                  <div
                    key={`ghost-${py}-${px}`}
                    className="absolute pointer-events-none opacity-50"
                    style={{
                      width: "30px",
                      height: "30px",
                      left: ghostX * 30 + "px",
                      top: ghostY * 30 + "px",
                      backgroundColor: current.tetromino.color,
                      boxSizing: "border-box",
                      border: "1px solid #999",
                    }}
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
