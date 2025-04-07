"use client";
import React from "react";
import useTetris from "./useTetris";
import GameView from "./GameView";
import { Button } from "../ui/button";
import { toast, Toaster } from "sonner";
import GameCard from "./GameCard";
import MusicPlayer from "./MusicPlayer";
import Background from "./Background";
import TouchControls from "./TouchControls";

import { getLevelColorTheme } from "./tetrominoStyles";

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
  
  // Get the color theme based on the current level
  const palette = getLevelColorTheme(level);
  
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
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullscreen]);
  const {
    mergedBoard,
    ghostPosition,
    handleKeyDown,
    score,
    level,
    gameOver,
    paused,
    setPaused,
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

  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [topScore, setTopScore] = React.useState<number>(0);

  React.useEffect(() => {
    // Show welcome toast after a short delay
    const toastTimeout = setTimeout(() => {
      toast("🎉 Welcome to Tetris! Have fun! 🚀", {
        style: {
          background: "linear-gradient(45deg, #ff6ec4, #7873f5)",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "8px",
        },
        position: "top-center",
      });
    }, 1000);
    
    // Load top score from localStorage
    const storedTop = localStorage.getItem("tetris-topscore");
    if (storedTop) {
      setTopScore(Number(storedTop));
    }
    
    // Simulate loading assets
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      setMounted(true);
    }, 1500);
    
    return () => {
      clearTimeout(toastTimeout);
      clearTimeout(loadingTimeout);
    };
  }, []);

  React.useEffect(() => {
    if (gameOver && score > topScore) {
      setTopScore(score);
      localStorage.setItem("tetris-topscore", String(score));
    }
  }, [gameOver, score, topScore]);

  if (!mounted) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <div className="animate-pulse text-5xl font-extrabold text-red-500 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] tracking-[0.25em] text-center mb-8"
             style={{ fontFamily: "'Press Start 2P', cursive" }}>
          TETRIS
        </div>
        {loading && (
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 animate-spin">
              <div className="absolute w-5 h-5 bg-red-500 top-0 left-0"></div>
              <div className="absolute w-5 h-5 bg-blue-500 top-0 right-0"></div>
              <div className="absolute w-5 h-5 bg-green-500 bottom-0 left-0"></div>
              <div className="absolute w-5 h-5 bg-yellow-500 bottom-0 right-0"></div>
            </div>
            <p className="mt-4 text-lg">Loading game...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <MusicPlayer />
      <GameCard>
        <div ref={containerRef} className="relative">
          <Button
            variant="ghost"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-4 right-4 z-50"
          >
            {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </Button>
          <div
            className="h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="application"
            aria-label="Tetris Game"
            aria-live="polite"
          >
            {/* Re-render Background when fullscreen changes */}
            <Background theme={theme} level={level} key={`bg-${isFullscreen}-${level}`} />

            <GameView
              mergedBoard={mergedBoard}
              current={current}
              quickDropping={quickDropping}
              ghostPosition={ghostPosition}
              gameOver={gameOver}
              paused={paused}
              COLS={COLS}
              ROWS={ROWS}
              dropStats={dropStats}
              holdStats={holdStats}
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
              setHoldStats={setHoldStats}
              setTheme={setTheme}
              setPaused={setPaused}
            />
            
            <TouchControls
              onMove={move}
              onRotate={rotatePiece}
              onRotateOpposite={() => {
                setCurrent((prev) => {
                  const rotated = { 
                    ...prev, 
                    tetromino: { 
                      ...prev.tetromino, 
                      shape: rotate(rotate(rotate(prev.tetromino.shape))) 
                    } 
                  };
                  return checkCollision(board, rotated.tetromino, position) ? prev : rotated;
                });
              }}
              onDrop={drop}
              onQuickDrop={quickDrop}
              onHold={holdPiece}
              onPause={() => setPaused(prev => !prev)}
              isPaused={paused}
            />
          </div>
        </div>
      </GameCard>
    </>
  );
}
