"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface BoardProps {
  mergedBoard: (0 | string)[];
  current: { tetromino: { shape: number[][]; color: string } };
  quickDropping: boolean;
  ghostPosition: { x: number; y: number };
  gameOver: boolean;
  COLS: number;
  ROWS: number;
}

export default function Board({
  mergedBoard,
  current,
  quickDropping,
  ghostPosition,
  gameOver,
  COLS,
  ROWS,
}: BoardProps) {
  return (
    <Card className="w-fit">
      <CardContent>
        <div
          className={`relative grid grid-cols-10 ${
            quickDropping ? "transition-transform duration-300 transform translate-y-2" : ""
          }`}
          style={{
            width: COLS * 30 + "px",
            height: ROWS * 30 + "px",
            background: "url('/assets/retro-bg.png') repeat",
            backgroundSize: "auto",
          }}
        >
          {mergedBoard.map((cell, index) => (
            <div
              key={index}
              className="transition-all duration-300"
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: cell === 0 ? "transparent" : cell,
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
