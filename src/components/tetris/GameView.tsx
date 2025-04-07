import React from "react";
import Stats from "./Stats";
import Board from "./Board";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import StyleBoxes from "./StyleBoxes";
import GameCard from "./GameCard";
import { toast } from "sonner";
import { randomTetromino } from "./helpers";
import { 
  tetrominoStyleMap, 
  BlockStyle, 
  getLevelColorTheme,
  getTetrominoBlockStyle
} from "./tetrominoStyles";

type GameViewProps = {
  mergedBoard: (0 | string)[];
  current: { tetromino: { shape: number[][]; color: string } };
  quickDropping: boolean;
  ghostPosition: { x: number; y: number };
  gameOver: boolean;
  paused: boolean;
  COLS: number;
  ROWS: number;
  dropStats: Record<string, number>;
  holdStats: Record<string, number>;
  linesCleared: number;
  score: number;
  level: number;
  topScore: number;
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
  setHold: (
    value: {
      key: string;
      tetromino: { shape: number[][]; color: string };
    } | null
  ) => void;
  setHoldStats?: (value: Record<string, number>) => void;
};

export default function GameView(props: GameViewProps) {
  const {
    mergedBoard,
    current,
    quickDropping,
    ghostPosition,
    gameOver,
    paused,
    COLS,
    ROWS,
    dropStats,
    holdStats,
    linesCleared,
    score,
    level,
    topScore,
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
    setHold,
    setTheme,
    bindings,
    setBindings,
    setPaused,
  } = props;
  console.log("Hold stats in GameView:", holdStats);
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

  // We'll use the imported getTetrominoBlockStyle function instead of defining it here

  return (
    <div className="relative flex flex-col md:flex-row gap-8 items-center justify-center">
      <div>
        <Stats
          dropStats={dropStats}
          holdStats={holdStats}
          onReset={() => {
            const resetStats = Object.keys({
              I: null,
              O: null,
              T: null,
              S: null,
              Z: null,
              J: null,
              L: null,
            }).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
            setDropStats(resetStats);
            // Also reset hold stats
            setHoldStats?.(resetStats);
          }}
          TETROMINOES={{
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
          }}
          cropShape={cropShape}
          hold={hold}
          theme={theme}
          setTheme={setTheme}
          bindings={bindings}
          setBindings={setBindings}
          level={level}
        />
      </div>
      <div>
        <h1
          style={{ fontFamily: "'Press Start 2P', cursive" }}
          className="text-5xl font-extrabold  text-red-500 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] tracking-[0.25em] text-center"
        >
          TETRIS
        </h1>
        <GameCard>
          <div className="relative">
            <Board
              mergedBoard={mergedBoard}
              current={current}
              quickDropping={quickDropping}
              ghostPosition={ghostPosition}
              gameOver={gameOver}
              paused={paused}
              COLS={COLS}
              ROWS={ROWS}
              level={level}
            />
            {(!started || gameOver) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black bg-opacity-75 p-4">
                {gameOver ? (
                  <>
                    <div className="mb-4 flex flex-col items-center gap-2">
                      <span className="text-5xl font-extrabold text-white">
                        🧱
                      </span>
                      <span className="mt-2 text-3xl font-bold text-white text-center">
                        GAME OVER
                      </span>
                    </div>
                    <div className="mb-2 text-2xl text-white">
                      Score: {score}
                    </div>
                    <div className="mb-4 text-2xl text-white">
                      Lines: {linesCleared}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        className="px-6"
                        onClick={() => {
                          resetGame();
                          setStarted(true);
                        }}
                      >
                        Start Over
                      </Button>
                      <Button
                        className="px-6"
                        onClick={() => {
                          restartLevel();
                        }}
                      >
                        Restart Level
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4 text-4xl font-bold text-white text-center flex-col flex">
                      Welcome to
                      <span className="text-red-500">TETRIS</span>
                    </div>
                    <Button
                      className="px-6"
                      onClick={() => {
                        resetGame();
                        setStarted(true);
                        toast("Game Started! Good luck!", {
                          style: {
                            background:
                              "linear-gradient(45deg, #ff6ec4, #7873f5)",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: "8px",
                          },
                          position: "top-center",
                        });
                      }}
                    >
                      Start Game
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="mt-4 text-xl font-bold text-center">
            Lines: {linesCleared}
          </div>
        </GameCard>
      </div>
      <div className="flex flex-col items-start gap-4 w-40">
        <GameCard title="Next">
          <div className="py-4">
            <div
              className="relative grid mx-auto"
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
                      ...(cell 
                        ? getTetrominoBlockStyle(next.key, next.tetromino.color, 30) 
                        : { backgroundColor: "transparent" }),
                      boxSizing: "border-box",
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </GameCard>
        <GameCard title="Level">
          <div className="flex items-center justify-center my-2">
            <div className="text-3xl font-bold">{level}</div>
          </div>
          
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-300 ease-in-out"
              style={{ width: `${(linesCleared % 10) * 10}%` }}
              aria-label={`Progress to next level: ${linesCleared % 10} of 10 lines`}
            ></div>
          </div>
          <div className="text-xs text-center mt-1">
            {10 - (linesCleared % 10)} lines to next level
          </div>

          <CardFooter>
            <div className="flex flex-col gap-2">
              <Button
                className="mt-2 w-full"
                onClick={resetGame}
              >
                Restart
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setPaused(prev => !prev)}
              >
                {paused ? "Resume" : "Pause"}
              </Button>
            </div>
          </CardFooter>
        </GameCard>
        <Card className="w-full gap-0">
          <CardContent className="p-2 text-left bg-gray-900 rounded-sm mx-2 space-y-2">
            <div
              className="flex flex-col text-sm tracking-[0.15em] text-white font-bold"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <p>Top</p>
              <p>{topScore.toString().padStart(8, "0")}</p>
            </div>
            <div
              className="text-sm font-bold tracking-[0.15em] text-white"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <p>Score</p>
              <p>{score.toString().padStart(8, "0")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
