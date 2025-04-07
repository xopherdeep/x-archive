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
    // Create tetromino shapes for the loading animation
    const loadingTetrominos = [
      { shape: TETROMINOES.I.shape, color: "#00ffff", rotation: 0 },    // I - Cyan
      { shape: TETROMINOES.L.shape, color: "#ff8c00", rotation: 90 },   // L - Orange
      { shape: TETROMINOES.T.shape, color: "#9370db", rotation: 180 },  // T - Purple
      { shape: TETROMINOES.Z.shape, color: "#ff4500", rotation: 270 },  // Z - Red
    ];
    
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black bg-opacity-90">
        <div className="animate-pulse text-5xl font-extrabold text-red-500 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] tracking-[0.25em] text-center mb-8"
             style={{ fontFamily: "'Press Start 2P', cursive" }}>
          TETRIS
        </div>
        {loading && (
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 animate-spin">
              {loadingTetrominos.map((tetromino, index) => (
                <div 
                  key={index}
                  className="absolute"
                  style={{
                    transform: `rotate(${tetromino.rotation}deg)`,
                    transformOrigin: 'center',
                    left: index === 0 ? '-30px' : index === 1 ? '60px' : index === 2 ? '60px' : '-30px',
                    top: index === 0 ? '30px' : index === 1 ? '-30px' : index === 2 ? '60px' : '60px',
                  }}
                >
                  {tetromino.shape.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: "flex" }}>
                      {row.map((cell, cellIndex) => (
                        <div
                          key={cellIndex}
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: cell ? tetromino.color : "transparent",
                            border: cell ? `2px solid ${tetromino.color}` : "none",
                            boxShadow: cell ? `0 0 5px ${tetromino.color}` : "none",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg text-white">Loading game...</p>
            <div className="mt-4 w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-300"
                style={{ 
                  width: `${loading ? '100%' : '0%'}`,
                  animation: 'loadingProgress 1.5s ease-in-out'
                }}
              ></div>
            </div>
          </div>
        )}
        
        <style jsx>{`
          @keyframes loadingProgress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <GameCard>
        {/* Background should always be visible */}
        <Background theme={theme} level={level} />
        <div ref={containerRef} className="relative z-10">
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
