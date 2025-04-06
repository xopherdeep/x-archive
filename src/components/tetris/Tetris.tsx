"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Controls from "./Controls";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const LIGHT_THEME = {
  I: "cyan",
  O: "yellow",
  T: "purple",
  S: "green",
  Z: "red",
  J: "blue",
  L: "orange",
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

function randomTetromino(theme: Theme): { key: string; tetromino: Tetromino } {
  const keys = Object.keys(TETROMINOES);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  const tetromino = TETROMINOES[randKey];
  const themeMapping = theme === "light" ? LIGHT_THEME : DARK_THEME;
  return { key: randKey, tetromino: { ...tetromino, color: themeMapping[randKey] || tetromino.color } };
}

function rotate(matrix: number[][]): number[][] {
  return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
}

function mergeBoard(board: Cell[][], tetromino: Tetromino, pos: Position): Cell[][] {
  const newBoard = board.map(row => row.slice());
  tetromino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        if (newBoard[y + pos.y] && newBoard[y + pos.y][x + pos.x] !== undefined) {
          newBoard[y + pos.y][x + pos.x] = tetromino.color;
        }
      }
    });
  });
  return newBoard;
}

function checkCollision(board: Cell[][], tetromino: Tetromino, pos: Position): boolean {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        const boardY = y + pos.y;
        const boardX = x + pos.x;
        if (boardX < 0 || boardX >= COLS || boardY >= ROWS || (boardY >= 0 && board[boardY][boardX])) {
          return true;
        }
      }
    }
  }
  return false;
}

function clearLines(board: Cell[][]): { board: Cell[][]; cleared: number } {
  let cleared = 0;
  const newBoard = board.filter(row => {
    if (row.every(cell => cell !== 0)) {
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
  const [board, setBoard] = useState<Cell[][]>(
    Array.from({ length: ROWS }, () => new Array(COLS).fill(0))
  );
  const [theme, setTheme] = useState<Theme>("light");
  const [current, setCurrent] = useState<{ key: string; tetromino: Tetromino }>(() => randomTetromino("light"));
  const [next, setNext] = useState<{ key: string; tetromino: Tetromino }>(() => randomTetromino("light"));
  const [position, setPosition] = useState<Position>({ x: Math.floor(COLS / 2) - 1, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [activeTab, setActiveTab] = useState("game");
  const dropInterval = useRef<number>(1000);
  const [quickDropping, setQuickDropping] = useState(false);

  // Helper functions to normalize tetromino shape for preview display
  const cropShape = (shape: number[][]) => {
    const croppedRows = shape.filter(row => row.some(cell => cell));
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
    return croppedRows.map(row => row.slice(firstNonZeroCol, lastNonZeroCol + 1));
  };

  const getPreviewShape = (letter: string, shape: number[][]) => {
    const cropped = cropShape(shape);
    if (letter === "I" && cropped.length === 1) {
      // Rotate a 1xN shape into an N×1 vertical column.
      return cropped[0].map(val => [val]);
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
    setCurrent(prev => ({
      key: prev.key,
      tetromino: { ...TETROMINOES[prev.key], color: theme === "light" ? LIGHT_THEME[prev.key] : DARK_THEME[prev.key] }
    }));
    setNext(prev => ({
      key: prev.key,
      tetromino: { ...TETROMINOES[prev.key], color: theme === "light" ? LIGHT_THEME[prev.key] : DARK_THEME[prev.key] }
    }));
  }, [theme]);

  const drop = useCallback(() => {
    setPosition(prev => {
      const newPos = { x: prev.x, y: prev.y + 1 };
      if (checkCollision(board, current.tetromino, newPos)) {
        const merged = mergeBoard(board, current.tetromino, prev);
        const { board: clearedBoard, cleared } = clearLines(merged);
        setBoard(clearedBoard);
        if (prev.y < 0) {
          setGameOver(true);
          return prev;
        }
        setScore(prevScore => {
          const newScore = prevScore + cleared * 10;
          if (newScore >= level * 50) {
            setLevel(prevLevel => prevLevel + 1);
            dropInterval.current = Math.max(100, dropInterval.current - 100);
          }
          return newScore;
        });
        const newPiece = next;
        setCurrent(newPiece);
        setNext(randomTetromino(theme));
        return { x: Math.floor(COLS / 2) - Math.floor(newPiece.tetromino.shape[0].length / 2), y: -1 };
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
    setPosition(prev => {
      const newPos = { x: prev.x + dx, y: prev.y };
      if (!checkCollision(board, current.tetromino, newPos)) {
        return newPos;
      }
      return prev;
    });
  };

  const rotatePiece = () => {
    setCurrent(prev => {
      const rotatedShape = rotate(prev.tetromino.shape);
      const rotatedTetromino = { ...prev.tetromino, shape: rotatedShape };
      if (!checkCollision(board, rotatedTetromino, position)) {
        return { key: prev.key, tetromino: rotatedTetromino };
      }
      return prev;
    });
  };

  const quickDrop = () => {
    setQuickDropping(true);
    let posCopy = position;
    while (!checkCollision(board, current.tetromino, { x: posCopy.x, y: posCopy.y + 1 })) {
      posCopy = { x: posCopy.x, y: posCopy.y + 1 };
    }
    setPosition(posCopy);
    const merged = mergeBoard(board, current.tetromino, posCopy);
    const { board: clearedBoard, cleared } = clearLines(merged);
    setBoard(clearedBoard);
    if (posCopy.y < 0) {
      setGameOver(true);
      return;
    }
    setScore(prevScore => {
      const newScore = prevScore + cleared * 10;
      if (newScore >= level * 50) {
        setLevel(prevLevel => prevLevel + 1);
        dropInterval.current = Math.max(100, dropInterval.current - 100);
      }
      return newScore;
    });
    const newPiece = next;
    setCurrent(newPiece);
    setNext(randomTetromino(theme));
    setPosition({ x: Math.floor(COLS / 2) - Math.floor(newPiece.tetromino.shape[0].length / 2), y: -1 });
    setTimeout(() => setQuickDropping(false), 300);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "].includes(event.key)) {
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
      default:
        break;
    }
  };
  
  const mergedBoard = React.useMemo(() => {
    const newBoard = board.map(row => [...row]);
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
    while (!checkCollision(board, current.tetromino, { x: ghost.x, y: ghost.y + 1 })) {
      ghost.y++;
    }
    return ghost;
  }, [board, current.tetromino, position]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4" tabIndex={0} onKeyDown={handleKeyDown}>
      <h2 className="text-4xl font-bold mb-4 text-gray-800">Tetris</h2>
      <div className="flex space-x-4 mb-4">
        {Object.entries(TETROMINOES).map(([key, tetromino]) => {
          const previewShape = getPreviewShape(key, tetromino.shape);
          return (
            <div key={key} className="flex flex-col items-center">
              <div className="mb-1 font-bold">{key}</div>
              <div
                className="grid gap-0.5 p-1"
                style={{ gridTemplateColumns: `repeat(${previewShape[0].length}, 20px)` }}
              >
                {previewShape.flat().map((cell, index) => (
                  <div
                    key={index}
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: cell ? tetromino.color : "transparent",
                      border: "1px solid #ccc"
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex space-x-4 mb-4">
        <Button variant={activeTab === "game" ? "default" : "outline"} onClick={() => setActiveTab("game")}>Game</Button>
        <Button variant={activeTab === "controls" ? "default" : "outline"} onClick={() => setActiveTab("controls")}>Controls</Button>
      </div>
      {activeTab === "game" ? (
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className={`relative grid grid-cols-10 ${quickDropping ? "transition-transform duration-300 transform translate-y-2" : ""}`} style={{ width: COLS * 30, height: ROWS * 30, background: "url('/assets/retro-bg.png') repeat", backgroundSize: "auto" }}>
          {mergedBoard.map((cell, index) => (
            <div
              key={index}
              className="transition-all duration-300"
              style={{
                width: 30,
                height: 30,
                backgroundColor: cell === 0 ? "transparent" : cell,
                boxSizing: "border-box",
                border: "1px solid #999",
              }}
            />
          ))}
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-3xl font-bold">Game Over</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-4">
          <Card className="w-fit">
            <CardHeader>
              <CardTitle className="text-lg">Next Piece</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="relative grid" style={{ gridTemplateColumns: `repeat(${next.tetromino.shape[0].length}, 30px)`, width: next.tetromino.shape[0].length * 30, height: next.tetromino.shape.length * 30, border: "2px solid #ccc" }}>
                {next.tetromino.shape.flatMap((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: cell ? next.tetromino.color : "transparent",
                        boxSizing: "border-box",
                        border: "1px solid #999",
                      }}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
          <div className="text-2xl tracking-widest text-green-400 drop-shadow-lg">Score: {score} | Level: {level}</div>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setBoard(Array.from({ length: ROWS }, () => new Array(COLS).fill(0)));
                setCurrent(randomTetromino(theme));
                setNext(randomTetromino(theme));
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
            <Select value={theme} onValueChange={(val) => setTheme(val as Theme)}>
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
      ) : (
        <Controls />
      )}
    </div>
  );
}
