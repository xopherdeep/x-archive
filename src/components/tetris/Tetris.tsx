"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

function randomTetromino(): { key: string; tetromino: Tetromino } {
  const keys = Object.keys(TETROMINOES);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return { key: randKey, tetromino: TETROMINOES[randKey] };
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
  const [current, setCurrent] = useState<{ key: string; tetromino: Tetromino }>(() => randomTetromino());
  const [next, setNext] = useState<{ key: string; tetromino: Tetromino }>(() => randomTetromino());
  const [position, setPosition] = useState<Position>({ x: Math.floor(COLS / 2) - 1, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const dropInterval = useRef<number>(1000);

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
        setScore(prevScore => prevScore + cleared * 10);
        const newPiece = next;
        setCurrent(newPiece);
        setNext(randomTetromino());
        return { x: Math.floor(COLS / 2) - Math.floor(newPiece.tetromino.shape[0].length / 2), y: -1 };
      }
      return newPos;
    });
  }, [board, current.tetromino]);

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(event.key)) {
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
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4" tabIndex={0} onKeyDown={handleKeyDown}>
      <h2 className="text-4xl font-bold mb-4 text-gray-800">Tetris</h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative grid grid-cols-10" style={{ width: COLS * 30, height: ROWS * 30, border: "4px solid #333" }}>
          {mergedBoard.map((cell, index) => (
            <div
              key={index}
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
          <div className="text-2xl tracking-widest text-green-400 drop-shadow-lg">Score: {score}</div>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setBoard(Array.from({ length: ROWS }, () => new Array(COLS).fill(0)));
                setCurrent(randomTetromino());
                setNext(randomTetromino());
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
          </div>
        </div>
      </div>
    </div>
  );
}
