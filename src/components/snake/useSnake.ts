import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Direction, 
  Position, 
  Snake, 
  Food, 
  GameState,
  moveSnake,
  generateFood,
  hasSnakeCollidedWithItself,
  hasSnakeCollidedWithWall,
  arePositionsEqual,
  isValidDirectionChange,
  calculateScore,
  calculateLevel,
  calculateSpeed
} from './helpers';
import { toast } from 'sonner';

export default function useSnake(initialTheme: "light" | "dark") {
  // Game constants
  const BOARD_WIDTH = 20;
  const BOARD_HEIGHT = 20;
  const INITIAL_SNAKE: Snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
  const INITIAL_DIRECTION: Direction = 'RIGHT';

  // Game state
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  const [snake, setSnake] = useState<Snake>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Food>(() => generateFood(INITIAL_SNAKE, BOARD_WIDTH, BOARD_HEIGHT));
  const [gameState, setGameState] = useState<GameState>('READY');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(calculateSpeed(1));
  
  // Game loop
  const gameLoopRef = useRef<number | null>(null);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  // Update level and speed based on score
  useEffect(() => {
    const newLevel = calculateLevel(score);
    if (newLevel !== level) {
      setLevel(newLevel);
      setSpeed(calculateSpeed(newLevel));
      
      if (newLevel > 1) {
        toast(`Level ${newLevel}! Speed increased!`, {
          style: {
            background: "linear-gradient(45deg, #42e695, #3bb2b8)",
            color: "#fff",
            fontWeight: "bold",
          },
        });
      }
    }
  }, [score, level]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameState !== 'PLAYING') return;

    // Update direction from nextDirection
    setDirection(nextDirection);

    // Move snake
    setSnake(prevSnake => {
      const newSnake = moveSnake(prevSnake, nextDirection, false);
      const head = newSnake[0];

      // Check for collisions with walls or self
      if (
        hasSnakeCollidedWithWall(newSnake, BOARD_WIDTH, BOARD_HEIGHT) ||
        hasSnakeCollidedWithItself(newSnake)
      ) {
        setGameState('GAME_OVER');
        return prevSnake;
      }

      // Check if snake ate food
      if (arePositionsEqual(head, food)) {
        // Generate new food
        setFood(generateFood(newSnake, BOARD_WIDTH, BOARD_HEIGHT));
        
        // Increase score
        setScore(prevScore => prevScore + 10);
        
        // Grow snake
        return moveSnake(prevSnake, nextDirection, true);
      }

      return newSnake;
    });
  }, [gameState, nextDirection, food]);

  // Set up game loop interval
  useEffect(() => {
    if (gameState === 'PLAYING') {
      gameLoopRef.current = window.setInterval(gameLoop, speed);
    }
    
    return () => {
      if (gameLoopRef.current !== null) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop, speed]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'GAME_OVER') return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (isValidDirectionChange(direction, 'UP')) {
            setNextDirection('UP');
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (isValidDirectionChange(direction, 'DOWN')) {
            setNextDirection('DOWN');
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (isValidDirectionChange(direction, 'LEFT')) {
            setNextDirection('LEFT');
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (isValidDirectionChange(direction, 'RIGHT')) {
            setNextDirection('RIGHT');
          }
          break;
        case ' ':
          // Space to start or pause
          if (gameState === 'READY' || gameState === 'PAUSED') {
            setGameState('PLAYING');
          } else if (gameState === 'PLAYING') {
            setGameState('PAUSED');
          }
          break;
        case 'r':
        case 'R':
          // R to restart
          resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, direction]);

  // Game control functions
  const startGame = () => {
    if (gameState === 'READY' || gameState === 'PAUSED') {
      setGameState('PLAYING');
    }
  };

  const pauseGame = () => {
    if (gameState === 'PLAYING') {
      setGameState('PAUSED');
    }
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE, BOARD_WIDTH, BOARD_HEIGHT));
    setGameState('READY');
    setScore(0);
    setLevel(1);
    setSpeed(calculateSpeed(1));
  };

  const moveSnakeDirection = (newDirection: Direction) => {
    if (gameState !== 'PLAYING') return;
    if (isValidDirectionChange(direction, newDirection)) {
      setNextDirection(newDirection);
    }
  };

  // Create a flat board representation for rendering
  const createBoard = useCallback(() => {
    const board = Array(BOARD_WIDTH * BOARD_HEIGHT).fill(0);
    
    // Add snake to board
    snake.forEach((segment, index) => {
      const boardIndex = segment.y * BOARD_WIDTH + segment.x;
      if (boardIndex >= 0 && boardIndex < board.length) {
        board[boardIndex] = index === 0 ? 'head' : 'body';
      }
    });
    
    // Add food to board
    const foodIndex = food.y * BOARD_WIDTH + food.x;
    if (foodIndex >= 0 && foodIndex < board.length) {
      board[foodIndex] = 'food';
    }
    
    return board;
  }, [snake, food]);

  return {
    board: createBoard(),
    score,
    highScore,
    level,
    gameState,
    BOARD_WIDTH,
    BOARD_HEIGHT,
    startGame,
    pauseGame,
    resetGame,
    moveSnakeDirection,
    theme,
    setTheme
  };
}
