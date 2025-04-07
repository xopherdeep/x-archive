"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { randomTetromino, mergeBoard, checkCollision, clearLines, cropShape, rotate } from "./helpers";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const COLS = 10;
const ROWS = 20;

const TETROMINOES = {
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

export default function useTetris(initialTheme: "light" | "dark", bindings = { holdKey: "c" }) {
  const [board, setBoard] = useState<Array<Array<0 | string>>>(Array.from({ length: ROWS }, () => new Array(COLS).fill(0)));
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  const { holdKey } = bindings;
  const [current, setCurrent] = useState(() => randomTetromino(theme, 1));
  const [next, setNext] = useState(() => randomTetromino(theme, 1));
  const [position, setPosition] = useState({ x: Math.floor(COLS / 2) - 1, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const initialStats = Object.keys(TETROMINOES).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  const [dropStats, setDropStats] = useState<Record<string, number>>(initialStats);
  const [holdStats, setHoldStats] = useState<Record<string, number>>(initialStats);
  const [linesCleared, setLinesCleared] = useState(0);
  const [hold, setHold] = useState<null | { key: string; tetromino: { shape: number[][]; color: string } }>(null);
  const [quickDropping, setQuickDropping] = useState(false);
  const dropInterval = useRef<number>(1000);

  const drop = useCallback(() => {
    setPosition((prev) => {
      const newPos = { x: prev.x, y: prev.y + 1 };
      if (checkCollision(board, current.tetromino, newPos)) {
        const merged = mergeBoard(board, current.tetromino, prev, current.key);
        const { board: clearedBoard, cleared } = clearLines(merged);
        setBoard(clearedBoard);
        setLinesCleared((prev) => prev + cleared);
        if (cleared > 0) {
          const scoreMap = { 1: 10, 2: 25, 3: 40, 4: 50 };
          const points = scoreMap[cleared] || 0;
          toast(`💥 Cleared ${cleared} lines +${points} points!`, {
            style: {
              background: "linear-gradient(45deg, #42e695, #3bb2b8)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
            },
            position: "top-center",
          });
        
          // Enhanced confetti effects based on lines cleared
          const confettiConfig = {
            1: { particleCount: 50, spread: 50, origin: { y: 0.8 }, colors: ['#1e90ff', '#00ffff'] },
            2: { particleCount: 100, spread: 70, origin: { y: 0.8 }, colors: ['#7fff00', '#00ff00'] },
            3: { particleCount: 150, spread: 90, origin: { y: 0.8 }, colors: ['#ff8c00', '#ffa500'] },
            4: { particleCount: 250, spread: 120, origin: { y: 0.8 }, colors: ['#ff4500', '#ff0000', '#ffd700'] }
          };
        
          const config = confettiConfig[cleared] || confettiConfig[1];
        
          // Fire confetti from both sides for more impressive effect
          confetti({
            ...config,
            origin: { x: 0.2, y: 0.8 }
          });
          confetti({
            ...config,
            origin: { x: 0.8, y: 0.8 }
          });
        }
        if (prev.y < 0) {
          setGameOver(true);
          return prev;
        }
        const scoreMap = { 1: 10, 2: 25, 3: 40, 4: 50 };
        setScore((prevScore) => prevScore + (scoreMap[cleared] || 0));
        // Drop stats are updated in quickDrop, so we don't need to update them here
        const newPiece = next;
        setCurrent(newPiece);
        setNext(randomTetromino(theme, level));
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
    setPosition((prev) => {
      const newPos = { x: prev.x + dx, y: prev.y };
      return checkCollision(board, current.tetromino, newPos) ? prev : newPos;
    });
  };

  const rotatePiece = () => {
    setCurrent((prev) => {
      const rotated = { ...prev, tetromino: { ...prev.tetromino, shape: rotate(prev.tetromino.shape) } };
      return checkCollision(board, rotated.tetromino, position) ? prev : rotated;
    });
  };

  const rotatePieceOpposite = () => {
    setCurrent((prev) => {
      const rotated = { ...prev, tetromino: { ...prev.tetromino, shape: rotate(rotate(rotate(prev.tetromino.shape))) } };
      return checkCollision(board, rotated.tetromino, position) ? prev : rotated;
    });
  };

  const holdPiece = () => {
    const pieceToHold = current;
    let newCurrent;
    if (!hold) {
      newCurrent = next;
      setNext(randomTetromino(theme, level));
    } else {
      newCurrent = hold;
    }
    setHoldStats((prev) => {
      const newCount = (prev[pieceToHold.key] || 0) + 1;
      console.log("HoldStats update for", pieceToHold.key, ":", newCount);
      return { ...prev, [pieceToHold.key]: newCount };
    });
    setHold(pieceToHold);
    setCurrent(newCurrent);
    setPosition({
      x: Math.floor(COLS / 2) - Math.floor(newCurrent.tetromino.shape[0].length / 2),
      y: -1,
    });
  };

  const quickDrop = () => {
    setQuickDropping(true);
    let posCopy = position;
    while (!checkCollision(board, current.tetromino, { x: posCopy.x, y: posCopy.y + 1 })) {
      posCopy = { x: posCopy.x, y: posCopy.y + 1 };
    }
    setPosition(posCopy);
    const merged = mergeBoard(board, current.tetromino, posCopy, current.key);
    const { board: clearedBoard, cleared } = clearLines(merged);
    setBoard(clearedBoard);
    setLinesCleared((prev) => prev + cleared);
    if (cleared > 0) {
      const scoreMap = { 1: 10, 2: 25, 3: 40, 4: 50 };
      const points = scoreMap[cleared] || 0;
      toast(`💥 Cleared ${cleared} lines +${points} points!`, {
          style: {
            background: "linear-gradient(45deg, #42e695, #3bb2b8)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
          },
          position: "top-center",
      });
      
      // Enhanced confetti effects based on lines cleared
      const confettiConfig = {
        1: { particleCount: 50, spread: 50, origin: { y: 0.8 }, colors: ['#1e90ff', '#00ffff'] },
        2: { particleCount: 100, spread: 70, origin: { y: 0.8 }, colors: ['#7fff00', '#00ff00'] },
        3: { particleCount: 150, spread: 90, origin: { y: 0.8 }, colors: ['#ff8c00', '#ffa500'] },
        4: { particleCount: 250, spread: 120, origin: { y: 0.8 }, colors: ['#ff4500', '#ff0000', '#ffd700'] }
      };
      
      const config = confettiConfig[cleared] || confettiConfig[1];
      
      // Fire confetti from both sides for more impressive effect
      confetti({
        ...config,
        origin: { x: 0.2, y: 0.8 }
      });
      confetti({
        ...config,
        origin: { x: 0.8, y: 0.8 }
      });
    }
    if (posCopy.y < 0) {
      setGameOver(true);
      return;
    }
    const scoreMap = { 1: 10, 2: 25, 3: 40, 4: 50 };
    setScore((prevScore) => prevScore + (scoreMap[cleared] || 0));
    setDropStats((prevStats) => ({
      ...prevStats,
      [current.key]: (prevStats[current.key] || 0) + 1,
    }));
    const newPiece = next;
    setCurrent(newPiece);
    setNext(randomTetromino(theme, level));
    setPosition({ x: Math.floor(COLS / 2) - Math.floor(newPiece.tetromino.shape[0].length / 2), y: -1 });
    setTimeout(() => setQuickDropping(false), 300);
  };

  const mergedBoard = useMemo(() => {
    const newBoard = board.map((row) => row.slice());
    current.tetromino.shape.forEach((r, py) => {
      r.forEach((v, px) => {
        const boardY = position.y + py;
        const boardX = position.x + px;
        if (v && boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
          // Store both color and tetromino key in the cell
          newBoard[boardY][boardX] = `${current.tetromino.color}:${current.key}`;
        }
      });
    });
    return newBoard.flat();
  }, [board, current, position]);

  const ghostPosition = useMemo(() => {
    let ghost = { ...position };
    while (!checkCollision(board, current.tetromino, { x: ghost.x, y: ghost.y + 1 })) {
      ghost.y++;
    }
    return ghost;
  }, [board, current.tetromino, position]);

  useEffect(() => {
    const newLevel = 1 + Math.floor(linesCleared / 10);
    if (newLevel !== level) {
      setLevel(newLevel);
      dropInterval.current = Math.max(100, 1000 - 100 * (newLevel - 1));
      
      // Celebrate level up with confetti
      if (newLevel % 10 === 0) {
        // Major level milestone (every 10 levels)
        // Create a spectacular confetti explosion
        const colors = ['#ff0000', '#ffd700', '#00ff00', '#1e90ff', '#ff00ff', '#00ffff'];
        
        // Multiple bursts of confetti from different angles
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            confetti({
              particleCount: 200,
              spread: 160,
              origin: { x: 0.1 + (i * 0.2), y: 0.5 },
              colors: colors,
              startVelocity: 40,
              gravity: 1.2,
              scalar: 1.2
            });
          }, i * 300);
        }
        
        // Add a special toast notification
        toast(`🎉 LEVEL ${newLevel} ACHIEVED! AMAZING! 🎉`, {
          style: {
            background: "linear-gradient(45deg, #ff4500, #ffd700)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            fontSize: "18px"
          },
          duration: 5000,
          position: "top-center",
        });
      } else {
        // Regular level up
        // Fire confetti from multiple positions
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.3, y: 0.5 },
          colors: ['#ffd700', '#1e90ff', '#00ff00']
        });
        
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.7, y: 0.5 },
          colors: ['#ffd700', '#1e90ff', '#00ff00']
        });
        
        // Add a toast notification
        toast(`🆙 Level Up! Now at Level ${newLevel}! 🆙`, {
          style: {
            background: "linear-gradient(45deg, #1e90ff, #00ff00)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px"
          },
          position: "top-center",
        });
      }
    }
  }, [linesCleared, level]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "].includes(event.key)) {
      event.preventDefault();
    }
    if (gameOver) return;
    if (event.key === "ArrowUp" && event.shiftKey) {
      rotatePieceOpposite();
      return;
    }
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
      case holdKey:
        event.preventDefault();
        holdPiece();
        break;
      default:
        break;
    }
  };

  return {
    board,
    setBoard,
    current,
    setCurrent,
    next,
    setNext,
    position,
    setPosition,
    gameOver,
    setGameOver,
    score,
    setScore,
    level,
    dropStats,
    setDropStats,
    linesCleared,
    hold,
    quickDropping,
    mergedBoard,
    ghostPosition,
    handleKeyDown,
    move,
    rotatePiece,
    quickDrop,
    holdPiece,
    setTheme,
    theme,
    drop,
    holdStats,
    setHoldStats,
    setHold,
    COLS,
    ROWS,
  };
}
