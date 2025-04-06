import React from "react";
import Stats from "./Stats";
import Board from "./Board";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import StyleBoxes from "./StyleBoxes";
import { randomTetromino } from "./helpers";

type GameViewProps = {
  mergedBoard: (0 | string)[];
  current: { tetromino: { shape: number[][]; color: string } };
  quickDropping: boolean;
  ghostPosition: { x: number; y: number };
  gameOver: boolean;
  COLS: number;
  ROWS: number;
  dropStats: Record<string, number>;
  holdStats: Record<string, number>;
  linesCleared: number;
  score: number;
  level: number;
  next: { tetromino: { shape: number[][]; color: string } };
  hold: { key: string; tetromino: { shape: number[][]; color: string } } | null;
  theme: "light" | "dark";
  setBoard: React.Dispatch<React.SetStateAction<(0 | string)[][]>>;
  setCurrent: (value: any) => void;
  setNext: (value: any) => void;
  setPosition: (value: { x: number; y: number }) => void;
  setScore: (value: number) => void;
  setGameOver: (value: boolean) => void;
  setDropStats: (value: Record<string, number>) => void;
  setTheme: (theme: "light" | "dark") => void;
};

export default function GameView(props: GameViewProps) {
  const {
    mergedBoard,
    current,
    quickDropping,
    ghostPosition,
    gameOver,
    COLS,
    ROWS,
    dropStats,
    holdStats,
    linesCleared,
    score,
    level,
    next,
    hold,
    theme,
    setBoard,
    setCurrent,
    setNext,
    setPosition,
    setScore,
    setGameOver,
    setDropStats,
    setTheme,
  } = props;
  const [started, setStarted] = React.useState(false);
  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => new Array(COLS).fill(0)));
    setCurrent(randomTetromino(theme, level));
    setNext(randomTetromino(theme, level));
    setPosition({ x: Math.floor(COLS / 2) - 1, y: -1 });
    setScore(0);
    setGameOver(false);
    setHold(null);
  };

  const restartLevel = () => {
    setBoard(Array.from({ length: ROWS }, () => new Array(COLS).fill(0)));
    setCurrent(randomTetromino(theme, level));
    setNext(randomTetromino(theme, level));
    setPosition({ x: Math.floor(COLS / 2) - 1, y: -1 });
    setGameOver(false);
    setHold(null);
  };

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

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <Stats
        dropStats={dropStats}
        holdStats={holdStats}
        onReset={() =>
          setDropStats(
            Object.keys({
              I: null,
              O: null,
              T: null,
              S: null,
              Z: null,
              J: null,
              L: null,
            }).reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
          )
        }
        TETROMINOES={{
          I: { shape: [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                  ], color: "cyan" },
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
        }}
        cropShape={cropShape}
        hold={hold}
        theme={theme}
        setTheme={setTheme}
      />
      <div>
        <div className="flex gap-4 mb-4 justify-between w-full">
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
        <div className="relative">
          <Board
            mergedBoard={mergedBoard}
            current={current}
            quickDropping={quickDropping}
            ghostPosition={ghostPosition}
            gameOver={gameOver}
            COLS={COLS}
            ROWS={ROWS}
            level={level}
          />
          {(!started || gameOver) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black bg-opacity-75 p-4">
              {gameOver ? (
                <>
                  <div className="mb-4 flex flex-col items-center">
                    <span className="text-5xl font-extrabold text-white">💀</span>
                    <span className="mt-2 text-4xl font-bold text-white">GAME OVER</span>
                  </div>
                  <div className="mb-2 text-2xl text-white">Score: {score}</div>
                  <div className="mb-4 text-2xl text-white">Lines Cleared: {linesCleared}</div>
                  <div className="flex flex-col gap-2">
                    <Button className="px-6" onClick={() => { resetGame(); setStarted(true); }}>Start Over</Button>
                    <Button className="px-6" onClick={() => { restartLevel(); }}>Restart Level</Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4 text-4xl font-bold text-white">Welcome to Tetris!</div>
                  <Button className="px-6" onClick={() => { resetGame(); setStarted(true); }}>Start Game</Button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="mt-4">
          <StyleBoxes />
        </div>
        <div className="mt-4 text-xl font-bold text-center">
          Lines Cleared: {linesCleared}
        </div>
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
            <Button variant="outline" size="sm" className="mt-2" onClick={resetGame}>Restart</Button>
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
      </div>
    </div>
  );
}
