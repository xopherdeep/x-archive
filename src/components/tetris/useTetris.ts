"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { randomTetromino, mergeBoard, checkCollision, clearLines, cropShape, rotate } from "./helpers";
import { celebrateLineClear, celebrateLevelUp, storage } from "./utils";
import { COLS, ROWS, TETROMINOES, INITIAL_STATS, SCORE_MAP } from "./constants";

export default function useTetris(initialTheme: "light" | "dark", bindings = { holdKey: "c" }) {
  // Game state
  const [board, setBoard] = useState<Array<Array<0 | string>>>(
    Array.from({ length: ROWS }, () => new Array(COLS).fill(0))
  );
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  const { holdKey } = bindings;
  const [current, setCurrent] = useState(() => randomTetromino(theme, 1));
  const [next, setNext] = useState(() => randomTetromino(theme, 1));
  const [position, setPosition] = useState({ x: Math.floor(COLS / 2) - 1, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [dropStats, setDropStats] = useState<Record<string, number>>(INITIAL_STATS);
  const [holdStats, setHoldStats] = useState<Record<string, number>>(INITIAL_STATS);
  const [linesCleared, setLinesCleared] = useState(0);
  const [hold, setHold] = useState<null | { key: string; tetromino: { shape: number[][]; color: string } }>(null);
  const [quickDropping, setQuickDropping] = useState(false);
  
  // Refs
  const dropInterval = useRef<number>(1000);
  const canHold = useRef<boolean>(true); // Prevent multiple holds per piece

  const drop = useCallback(() => {
    if (gameOver || paused) return;
    
    setPosition((prev) => {
      const newPos = { x: prev.x, y: prev.y + 1 };
      
      // Check if the piece would collide in the new position
      if (checkCollision(board, current.tetromino, newPos)) {
        // Lock the piece in place
        const merged = mergeBoard(board, current.tetromino, prev, current.key);
        const { board: clearedBoard, cleared } = clearLines(merged);
        
        // Update the board and stats
        setBoard(clearedBoard);
        setLinesCleared((prev) => prev + cleared);
        
        // Celebrate line clears
        if (cleared > 0) {
          celebrateLineClear(cleared);
        }
        
        // Check for game over
        if (prev.y < 0) {
          setGameOver(true);
          return prev;
        }
        
        // Update score
        setScore((prevScore) => prevScore + (SCORE_MAP[cleared] || 0));
        
        // Update drop stats
        setDropStats((prevStats) => ({
          ...prevStats,
          [current.key]: (prevStats[current.key] || 0) + 1,
        }));
        
        // Get the next piece
        const newPiece = next;
        setCurrent(newPiece);
        setNext(randomTetromino(theme, level));
        
        // Reset hold ability
        canHold.current = true;
        
        // Reset position for the new piece
        return { 
          x: Math.floor(COLS / 2) - Math.floor(newPiece.tetromino.shape[0].length / 2), 
          y: -1 
        };
      }
      
      // Move down if no collision
      return newPos;
    });
  }, [board, current, next, theme, level, gameOver, paused]);

  useEffect(() => {
    if (gameOver || paused) return;
    const timer = setInterval(drop, dropInterval.current);
    return () => clearInterval(timer);
  }, [drop, gameOver, paused]);

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

  const holdPiece = useCallback(() => {
    if (gameOver || paused || !canHold.current) return;
    
    // Prevent multiple holds per piece
    canHold.current = false;
    
    const pieceToHold = current;
    let newCurrent;
    
    // If no piece is being held, use the next piece
    if (!hold) {
      newCurrent = next;
      setNext(randomTetromino(theme, level));
    } else {
      newCurrent = hold;
    }
    
    // Update hold stats
    setHoldStats((prev) => {
      const newCount = (prev[pieceToHold.key] || 0) + 1;
      return { ...prev, [pieceToHold.key]: newCount };
    });
    
    // Update hold and current pieces
    setHold(pieceToHold);
    setCurrent(newCurrent);
    
    // Reset position for the new piece
    setPosition({
      x: Math.floor(COLS / 2) - Math.floor(newCurrent.tetromino.shape[0].length / 2),
      y: -1,
    });
  }, [current, hold, next, theme, level, gameOver, paused]);

  const quickDrop = useCallback(() => {
    if (gameOver || paused) return;
    
    setQuickDropping(true);
    
    // Find the lowest valid position
    let posCopy = { ...position };
    while (!checkCollision(board, current.tetromino, { x: posCopy.x, y: posCopy.y + 1 })) {
      posCopy = { x: posCopy.x, y: posCopy.y + 1 };
    }
    
    // Update position
    setPosition(posCopy);
    
    // Lock the piece in place
    const merged = mergeBoard(board, current.tetromino, posCopy, current.key);
    const { board: clearedBoard, cleared } = clearLines(merged);
    
    // Update board and stats
    setBoard(clearedBoard);
    setLinesCleared((prev) => prev + cleared);
    
    // Celebrate line clears
    if (cleared > 0) {
      celebrateLineClear(cleared);
    }
    
    // Check for game over
    if (posCopy.y < 0) {
      setGameOver(true);
      return;
    }
    
    // Update score
    setScore((prevScore) => prevScore + (SCORE_MAP[cleared] || 0));
    
    // Update drop stats
    setDropStats((prevStats) => ({
      ...prevStats,
      [current.key]: (prevStats[current.key] || 0) + 1,
    }));
    
    // Get the next piece
    const newPiece = next;
    setCurrent(newPiece);
    setNext(randomTetromino(theme, level));
    
    // Reset hold ability
    canHold.current = true;
    
    // Reset position for the new piece
    setPosition({ 
      x: Math.floor(COLS / 2) - Math.floor(newPiece.tetromino.shape[0].length / 2), 
      y: -1 
    });
    
    // Reset quickDropping state after a short delay
    setTimeout(() => setQuickDropping(false), 300);
  }, [board, current, next, position, theme, level, gameOver, paused]);

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

  // Level up effect
  useEffect(() => {
    const newLevel = 1 + Math.floor(linesCleared / 10);
    if (newLevel !== level) {
      setLevel(newLevel);
      
      // Adjust drop speed based on level
      dropInterval.current = Math.max(100, 1000 - 100 * (newLevel - 1));
      
      // Celebrate level up
      celebrateLevelUp(newLevel);
    }
  }, [linesCleared]);
  
  // Calculate board fullness and adjust music speed
  useEffect(() => {
    if (gameOver || paused) return;
    
    // Count filled cells in the top half of the board
    let filledCells = 0;
    const topHalfRows = 10; // Check top half of the board
    const totalCells = COLS * topHalfRows;
    
    for (let y = 0; y < topHalfRows; y++) {
      for (let x = 0; x < COLS; x++) {
        if (board[y][x] !== 0) {
          filledCells++;
        }
      }
    }
    
    // Calculate danger level (0-1)
    const dangerLevel = filledCells / totalCells;
    
    // Import music speed functions
    import('./utils').then(({ switchToFastMusic, switchToNormalMusic }) => {
      if (dangerLevel >= 0.7) {
        switchToFastMusic(dangerLevel);
      } else if (dangerLevel < 0.5) {
        switchToNormalMusic(dangerLevel);
      }
    });
    
  }, [board, gameOver, paused]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "].includes(event.key)) {
      event.preventDefault();
    }
    
    // Handle pause with 'p' key regardless of game state
    if (event.key === "p" || event.key === "P") {
      setPaused(prev => !prev);
      return;
    }
    
    if (gameOver || paused) return;
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
    paused,
    setPaused,
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
