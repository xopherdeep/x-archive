"use client";
import React from "react";
import useTetris from "./useTetris";
import GameView from "./GameView";
import { Button } from "../ui/button";

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

export default function Tetris() {
  const [bindings, setBindings] = React.useState({ holdKey: "x" });
  const {
    mergedBoard,
    ghostPosition,
    handleKeyDown,
    score,
    level,
    gameOver,
    dropStats,
    linesCleared,
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
    setHoldStats,
    setHold,
    holdStats,
    drop,
    move,
    rotatePiece,
    quickDrop,
    holdPiece,
    COLS,
    ROWS,
  } = useTetris("light", bindings);

  const [bindings, setBindings] = React.useState({ holdKey: "x" });
  const [mounted, setMounted] = React.useState(false);
  const [topScore, setTopScore] = React.useState<number>(0);

  React.useEffect(() => {
    const storedTop = localStorage.getItem("tetris-topscore");
    if (storedTop) {
      setTopScore(Number(storedTop));
    }
  }, []);

  React.useEffect(() => {
    if (gameOver && score > topScore) {
      setTopScore(score);
      localStorage.setItem("tetris-topscore", String(score));
    }
  }, [gameOver, score, topScore]);

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

      <GameView
        mergedBoard={mergedBoard}
        current={current}
        quickDropping={quickDropping}
        ghostPosition={ghostPosition}
        gameOver={gameOver}
        COLS={COLS}
        ROWS={ROWS}
        dropStats={dropStats}
        linesCleared={linesCleared}
        score={score}
        level={level}
        next={next}
        hold={hold}
        topScore={topScore}
        theme={theme}
        setBoard={setBoard}
        setCurrent={setCurrent}
        setNext={setNext}
        setPosition={setPosition}
        setScore={setScore}
        setGameOver={setGameOver}
        setDropStats={setDropStats}
        setHold={setHold}
        setTheme={setTheme}
      />
    </div>
  ) : (
    <div />
  );
}
