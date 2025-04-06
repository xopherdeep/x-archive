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

function randomTetromino(theme: Theme, level: number): { key: string; tetromino: Tetromino } {
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

export default function Tetris() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [board, setBoard] = useState<Cell[][]>(
    Array.from({ length: ROWS }, () => new Array(COLS).fill(0))
  );
  const [theme, setTheme] = useState<Theme>("light");
  const [current, setCurrent] = useState<{ key: string; tetromino: Tetromino }>(
    () => randomTetromino("light", 1)
  );
  const [next, setNext] = useState<{ key: string; tetromino: Tetromino }>(() =>
    randomTetromino("light", 1)
  );
  const [position, setPosition] = useState<Position>({
    x: Math.floor(COLS / 2) - 1,
    y: -1,
  });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const initialStats = Object.keys(TETROMINOES).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  const [dropStats, setDropStats] = useState<Record<string, number>>(initialStats);
  const [activeTab, setActiveTab] = useState("game");
  const [hold, setHold] = useState<{
    key: string;
    tetromino: Tetromino;
  } | null>(null);
  const [hasHeld, setHasHeld] = useState(false);
  const dropInterval = useRef<number>(1000);
  const [quickDropping, setQuickDropping] = useState(false);

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

  React.useEffect(() => {
    setCurrent((prev) => ({
      key: prev.key,
      tetromino: {
        ...TETROMINOES[prev.key],
        color:
          level < 5
            ? NES_LOW_LEVEL[prev.key]
            : level < 10
            ? NES_MID_LEVEL[prev.key]
            : NES_HIGH_LEVEL[prev.key],
      },
    }));
    setNext((prev) => ({
      key: prev.key,
      tetromino: {
        ...TETROMINOES[prev.key],
        color:
          level < 5
            ? NES_LOW_LEVEL[prev.key]
            : level < 10
            ? NES_MID_LEVEL[prev.key]
            : NES_HIGH_LEVEL[prev.key],
      },
    }));
  }, [theme, level]);

  const drop = useCallback(() => {
    setPosition((prev) => {
      const newPos = { x: prev.x, y: prev.y + 1 };
      if (checkCollision(board, current.tetromino, newPos)) {
        const merged = mergeBoard(board, current.tetromino, prev);
        const { board: clearedBoard, cleared } = clearLines(merged);
        setBoard(clearedBoard);
        if (cleared > 0) {
          toast(`🎉 Cleared ${cleared} lines! 🚀`);
          if (cleared === 4) {
              confetti({
                particleCount: 150,
                spread: 60,
                origin: { y: 0.8 },
              });
          }
        }
        if (prev.y < 0) {
          setGameOver(true);
          return prev;
        }
        setScore((prevScore) => {
          const newScore = prevScore + cleared * 10;
          if (newScore >= level * 50) {
            setLevel((prevLevel) => prevLevel + 1);
            dropInterval.current = Math.max(100, dropInterval.current - 100);
          }
          return newScore;
        });
        const newPiece = next;
        setDropStats(prev => ({ ...prev, [newPiece.key]: (prev[newPiece.key] || 0) + 1 }));
        setCurrent(newPiece);
        setNext(randomTetromino(theme, level));
        return {
          x:
            Math.floor(COLS / 2) -
            Math.floor(newPiece.tetromino.shape[0].length / 2),
          y: -1,
        };
      }
      return newPos;
    });
  }, [board, current.tetromino, next, theme, level]);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(drop, dropInterval.current);
    return () => clearInterval(timer);
  }, [drop, gameOver]);

  const move = (dx: number) => {
    setPosition((prev) => {
      const newPos = { x: prev.x + dx, y: prev.y };
      if (!checkCollision(board, current.tetromino, newPos)) {
        return newPos;
      }
      return prev;
    });
  };

  const rotatePiece = () => {
    setCurrent((prev) => {
      const rotatedShape = rotate(prev.tetromino.shape);
      const rotatedTetromino = { ...prev.tetromino, shape: rotatedShape };
      if (!checkCollision(board, rotatedTetromino, position)) {
        return { key: prev.key, tetromino: rotatedTetromino };
      }
      return prev;
    });
  };

  const holdPiece = () => {
    // Allow swapping hold piece repeatedly
    let newCurrent, newHold;
    if (!hold) {
      // If nothing is held, store the current piece and load the next piece.
      newHold = current;
      newCurrent = next;
      setNext(randomTetromino(theme));
    } else {
      // Swap the held piece with the current piece.
      newCurrent = hold;
      newHold = current;
    }
    setHold(newHold);
    setCurrent(newCurrent);
    setPosition({
      x: Math.floor(COLS / 2) - Math.floor(newCurrent.tetromino.shape[0].length / 2),
      y: -1,
    });
  };

  const quickDrop = () => {
    setQuickDropping(true);
    let posCopy = position;
    while (
      !checkCollision(board, current.tetromino, {
        x: posCopy.x,
        y: posCopy.y + 1,
      })
    ) {
      posCopy = { x: posCopy.x, y: posCopy.y + 1 };
    }
    setPosition(posCopy);
    const merged = mergeBoard(board, current.tetromino, posCopy);
    const { board: clearedBoard, cleared } = clearLines(merged);
    setBoard(clearedBoard);
    if (cleared > 0) {
      toast(`🎉 Cleared ${cleared} lines! 🚀`);
      if (cleared === 4) {
        confetti({
          particleCount: 150,
          spread: 60,
          origin: { y: 0.8 },
        });
      }
    }
    if (posCopy.y < 0) {
      setGameOver(true);
      return;
    }
    setScore((prevScore) => {
      const newScore = prevScore + cleared * 10;
      if (newScore >= level * 50) {
        setLevel((prevLevel) => prevLevel + 1);
        dropInterval.current = Math.max(100, dropInterval.current - 100);
      }
      return newScore;
    });
    const newPiece = next;
    setDropStats(prev => ({ ...prev, [newPiece.key]: (prev[newPiece.key] || 0) + 1 }));
    setCurrent(newPiece);
    setNext(randomTetromino(theme, level));
    setPosition({
      x:
        Math.floor(COLS / 2) -
        Math.floor(newPiece.tetromino.shape[0].length / 2),
      y: -1,
    });
    setTimeout(() => setQuickDropping(false), 300);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "].includes(
        event.key
      )
    ) {
      event.preventDefault();
    }
    if (gameOver) return;
    switch (event.key) {
      case "ArrowLeft":
        move(-1);
        break;
      case "ArrowRight":
        move(1);
        break;
      case "ArrowDown":
        drop();
        break;
      case "ArrowUp":
        rotatePiece();
        break;
      case " ":
        quickDrop();
        break;
      case "x":
        holdPiece();
        break;
      default:
        break;
    }
  };

  const mergedBoard = React.useMemo(() => {
    const newBoard = board.map((row) => [...row]);
    current.tetromino.shape.forEach((r, py) => {
      r.forEach((v, px) => {
        const boardY = position.y + py;
        const boardX = position.x + px;
        if (v && boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
          newBoard[boardY][boardX] = current.tetromino.color;
        }
      });
    });
    return newBoard.flat();
  }, [board, current, position]);

  const ghostPosition = React.useMemo(() => {
    let ghost = { ...position };
    while (
      !checkCollision(board, current.tetromino, { x: ghost.x, y: ghost.y + 1 })
    ) {
      ghost.y++;
    }
    return ghost;
  }, [board, current.tetromino, position]);

  return mounted ? (
    <div
      className="h-screen w-full bg-gray-50 flex flex-col items-center justify-center overflow-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1 className="text-5xl font-extrabold mb-4 text-red-500 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] tracking-[0.25em]">TETRIS</h1>
      
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
              <CardTitle className="text-lg">Stats</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="flex flex-col gap-2">
                {Object.entries(TETROMINOES).map(([key, tetromino]) => {
                  const cropped = cropShape(tetromino.shape);
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <div className="w-8 text-center font-bold">{key}</div>
                      <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${cropped[0].length}, 20px)` }}>
                        {cropped.flat().map((cell, index) => (
                          <div key={index} style={{ width: 20, height: 20, backgroundColor: cell ? tetromino.color : "transparent", border: "1px solid #ccc" }}/>
                        ))}
                      </div>
                      <div className="ml-2 text-sm">{dropStats[key] || 0}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <div>
            <div className="text-3xl font-bold tracking-[0.15em] text-lime-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] mb-4" style={{ fontFamily: '"VT323", monospace' }}>
              SCORE: {score}
            </div>
            <div>
              <div
                className={`relative grid grid-cols-10 ${
                  quickDropping
                    ? "transition-transform duration-300 transform translate-y-2"
                    : ""
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
              <div className="mt-2 text-3xl font-bold tracking-[0.15em] text-lime-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]" style={{ fontFamily: '"VT323", monospace' }}>
                LEVEL: {level}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Card className="w-40">
              <CardHeader>
                <CardTitle className="text-lg">Hold Piece</CardTitle>
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
                <CardTitle className="text-lg">Next Piece</CardTitle>
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
