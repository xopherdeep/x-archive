"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Controls from "./Controls";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Board from "./Board";

const LIGHT_THEME = {
  I: "cyan",
  O: "yellow",
  T: "purple",
  S: "green",
  Z: "red",
  J: "blue",
  L: "orange",
};

const NES_LOW_LEVEL = {
  I: "#00ffff",
  O: "#ffff00",
  T: "#dda0dd",
  S: "#7fff00",
  Z: "#ff4500",
  J: "#1e90ff",
  L: "#ff8c00",
};
const NES_MID_LEVEL = {
  I: "#00cccc",
  O: "#cccc00",
  T: "#ba8bb0",
  S: "#6fbf00",
  Z: "#e03e00",
  J: "#199ae6",
  L: "#e68a00",
};
const NES_HIGH_LEVEL = {
  I: "#009999",
  O: "#999900",
  T: "#a275a2",
  S: "#5fb000",
  Z: "#c02e00",
  J: "#157bb8",
  L: "#cc7000",
};

const DARK_THEME = {
  I: "#00ffff",
  O: "#ffff00",
  T: "#dda0dd",
  S: "#7fff00",
  Z: "#ff4500",
  J: "#1e90ff",
  L: "#ff8c00",
};

type Theme = "light" | "dark";

type Cell = 0 | string;
const COLS = 10;
const ROWS = 20;

type Tetromino = {
  shape: number[][];
  color: string;
};

const TETROMINOES: { [key: string]: Tetromino } = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "cyan",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "yellow",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "purple",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "green",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "red",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "blue",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "orange",
  },
};

type Position = {
  x: number;
  y: number;
};

function randomTetromino(
  theme: Theme,
  level: number
): { key: string; tetromino: Tetromino } {
  const keys = Object.keys(TETROMINOES);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  const tetromino = TETROMINOES[randKey];
  let palette;
  if (level < 5) {
    palette = NES_LOW_LEVEL;
  } else if (level < 10) {
    palette = NES_MID_LEVEL;
  } else {
    palette = NES_HIGH_LEVEL;
  }
  return {
    key: randKey,
    tetromino: {
      ...tetromino,
      color: palette[randKey] || tetromino.color,
    },
  };
}

function rotate(matrix: number[][]): number[][] {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());
}

function mergeBoard(
  board: Cell[][],
  tetromino: Tetromino,
  pos: Position
): Cell[][] {
  const newBoard = board.map((row) => row.slice());
  tetromino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        if (
          newBoard[y + pos.y] &&
          newBoard[y + pos.y][x + pos.x] !== undefined
        ) {
          newBoard[y + pos.y][x + pos.x] = tetromino.color;
        }
      }
    });
  });
  return newBoard;
}

function checkCollision(
  board: Cell[][],
  tetromino: Tetromino,
  pos: Position
): boolean {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        const boardY = y + pos.y;
        const boardX = x + pos.x;
        if (
          boardX < 0 ||
          boardX >= COLS ||
          boardY >= ROWS ||
          (boardY >= 0 && board[boardY][boardX])
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function clearLines(board: Cell[][]): { board: Cell[][]; cleared: number } {
  let cleared = 0;
  const newBoard = board.filter((row) => {
    if (row.every((cell) => cell !== 0)) {
      cleared++;
      return false;
    }
    return true;
  });
  while (newBoard.length < ROWS) {
    newBoard.unshift(new Array(COLS).fill(0));
  }
  return { board: newBoard, cleared };
}

import useTetris from "./useTetris";

export default function Tetris() {
  const {
    mergedBoard,
    ghostPosition,
    handleKeyDown,
    score,
    level,
    gameOver,
    dropStats,
    current,
    next,
    hold,
    quickDropping,
    setBoard,
    setTheme,
    theme,
    setCurrent,
    setNext,
    setPosition,
    setScore,
    setGameOver,
    setDropStats,
    drop,
    move,
    rotatePiece,
    quickDrop,
    holdPiece,
    COLS,
    ROWS,
  } = useTetris("light");

  // Helper functions to normalize tetromino shape for preview display
  const cropShape = (shape: number[][]) => {
    const croppedRows = shape.filter((row) => row.some((cell) => cell));
    if (croppedRows.length === 0) return croppedRows;
    const colCount = croppedRows[0].length;
    let firstNonZeroCol = colCount;
    let lastNonZeroCol = -1;
    for (let col = 0; col < colCount; col++) {
      for (let row of croppedRows) {
        if (row[col]) {
          firstNonZeroCol = Math.min(firstNonZeroCol, col);
          lastNonZeroCol = Math.max(lastNonZeroCol, col);
        }
      }
    }
    return croppedRows.map((row) =>
      row.slice(firstNonZeroCol, lastNonZeroCol + 1)
    );
  };

  const getPreviewShape = (letter: string, shape: number[][]) => {
    const cropped = cropShape(shape);
    if (letter === "I" && cropped.length === 1) {
      // Rotate a 1xN shape into an N×1 vertical column.
      return cropped[0].map((val) => [val]);
    }
    if (letter === "L") {
      return rotate(cropped);
    }
    if (letter === "J") {
      return rotate(rotate(rotate(cropped)));
    }
    return cropped;
  };



  



  const [mounted, setMounted] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("game");
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <div
      className="h-screen w-full bg-gray-50 flex flex-col items-center justify-center overflow-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1 className="text-5xl font-extrabold mb-4 text-red-500 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] tracking-[0.25em]">
        TETRIS
      </h1>

      <div className="flex space-x-4 mb-4">
        <Button
          variant={activeTab === "game" ? "default" : "outline"}
          onClick={() => setActiveTab("game")}
        >
          Game
        </Button>
        <Button
          variant={activeTab === "controls" ? "default" : "outline"}
          onClick={() => setActiveTab("controls")}
        >
          Controls
        </Button>
      </div>
      {activeTab === "game" ? (
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Card className="w-40">
            <CardHeader>
              <CardTitle className="text-lg m-0 p-0">Stats</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="flex flex-col gap-2">
                {Object.entries(TETROMINOES).map(([key, tetromino]) => {
                  const cropped = cropShape(tetromino.shape);
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <div className="w-8 text-center font-bold">{key}</div>
                      <div
                        className="grid gap-0.5"
                        style={{
                          gridTemplateColumns: `repeat(${cropped[0].length}, 20px)`,
                        }}
                      >
                        {cropped.flat().map((cell, index) => (
                          <div
                            key={index}
                            style={{
                              width: 20,
                              height: 20,
                              backgroundColor: cell
                                ? tetromino.color
                                : "transparent",
                              border: "1px solid #ccc",
                            }}
                          />
                        ))}
                      </div>
                      <div className="ml-auto text-sm">
                        {dropStats[key] || 0}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDropStats(initialStats)}
              >
                Reset
              </Button>
            </CardContent>
          </Card>
          <div>
            <Board
              mergedBoard={mergedBoard}
              current={current}
              quickDropping={quickDropping}
              ghostPosition={ghostPosition}
              gameOver={gameOver}
              COLS={COLS}
              ROWS={ROWS}
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Card className="w-40">
              <CardHeader>
                <CardTitle className="text-lg m-0 p-0">Score</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div
                  className="text-3xl font-bold tracking-[0.15em] text-lime-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                  style={{ fontFamily: '"VT323", monospace' }}
                >
                  {score}
                </div>
                <div
                  className="mt-1 text-xl tracking-[0.15em] text-lime-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                  style={{ fontFamily: '"VT323", monospace' }}
                >
                  Level: {level}
                </div>
              </CardContent>
            </Card>
            <Card className="w-40">
              <CardHeader>
                <CardTitle className="text-lg m-0 p-0">Hold Piece</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                {hold ? (
                  <div
                    className="relative grid"
                    style={{
                      gridTemplateColumns: `repeat(${hold.tetromino.shape[0].length}, 30px)`,
                      width: hold.tetromino.shape[0].length * 30 + "px",
                      height: hold.tetromino.shape.length * 30 + "px",
                      border: "2px solid #ccc",
                    }}
                  >
                    {hold.tetromino.shape.flatMap((row, y) =>
                      row.map((cell, x) => (
                        <div
                          key={`${x}-${y}`}
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: cell
                              ? hold.tetromino.color
                              : "transparent",
                            boxSizing: "border-box",
                            border: "1px solid #999",
                          }}
                        />
                      ))
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Empty</div>
                )}
              </CardContent>
            </Card>
            <Card className="w-40">
              <CardHeader>
                <CardTitle className="text-lg m-0 p-0">Next Piece</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div
                  className="relative grid"
                  style={{
                    gridTemplateColumns: `repeat(${next.tetromino.shape[0].length}, 30px)`,
                    width: next.tetromino.shape[0].length * 30 + "px",
                    height: next.tetromino.shape.length * 30 + "px",
                    border: "2px solid #ccc",
                  }}
                >
                  {next.tetromino.shape.flatMap((row, y) =>
                    row.map((cell, x) => (
                      <div
                        key={`${x}-${y}`}
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: cell
                            ? next.tetromino.color
                            : "transparent",
                          boxSizing: "border-box",
                          border: "1px solid #999",
                        }}
                      />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setBoard(
                    Array.from({ length: ROWS }, () => new Array(COLS).fill(0))
                  );
                  setCurrent(randomTetromino(theme, 1));
                  setNext(randomTetromino(theme, 1));
                  setPosition({ x: Math.floor(COLS / 2) - 1, y: -1 });
                  setScore(0);
                  setGameOver(false);
                }}
              >
                Restart
              </Button>
              <Button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                }}
              >
                Fullscreen
              </Button>
              <Select
                value={theme}
                onValueChange={(val) => setTheme(val as Theme)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ) : activeTab === "controls" ? (
        <Controls />
      ) : null}
    </div>
  ) : (
    <div />
  );
}
