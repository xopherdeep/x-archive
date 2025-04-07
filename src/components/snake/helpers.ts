// Helper functions for the Snake game

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Position = { x: number; y: number };
export type Snake = Position[];
export type Food = Position;
export type GameState = 'READY' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

// Check if two positions are equal
export function arePositionsEqual(pos1: Position, pos2: Position): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Check if position is in snake body
export function isPositionInSnake(position: Position, snake: Snake, excludeHead: boolean = false): boolean {
  const startIndex = excludeHead ? 1 : 0;
  return snake.slice(startIndex).some(segment => arePositionsEqual(segment, position));
}

// Check if snake has collided with itself
export function hasSnakeCollidedWithItself(snake: Snake): boolean {
  if (snake.length <= 1) return false;
  const head = snake[0];
  return isPositionInSnake(head, snake, true);
}

// Check if snake has collided with wall
export function hasSnakeCollidedWithWall(snake: Snake, boardWidth: number, boardHeight: number): boolean {
  const head = snake[0];
  return (
    head.x < 0 || 
    head.x >= boardWidth || 
    head.y < 0 || 
    head.y >= boardHeight
  );
}

// Generate random food position
export function generateFood(snake: Snake, boardWidth: number, boardHeight: number): Food {
  let newFood: Food;
  do {
    newFood = {
      x: Math.floor(Math.random() * boardWidth),
      y: Math.floor(Math.random() * boardHeight)
    };
  } while (isPositionInSnake(newFood, snake));
  
  return newFood;
}

// Move snake in the current direction
export function moveSnake(snake: Snake, direction: Direction, grow: boolean = false): Snake {
  const head = { ...snake[0] };
  
  switch (direction) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }
  
  const newSnake = [head, ...snake];
  if (!grow) {
    newSnake.pop();
  }
  
  return newSnake;
}

// Get opposite direction
export function getOppositeDirection(direction: Direction): Direction {
  switch (direction) {
    case 'UP': return 'DOWN';
    case 'DOWN': return 'UP';
    case 'LEFT': return 'RIGHT';
    case 'RIGHT': return 'LEFT';
  }
}

// Check if direction change is valid (can't go directly opposite)
export function isValidDirectionChange(currentDirection: Direction, newDirection: Direction): boolean {
  return currentDirection !== getOppositeDirection(newDirection);
}

// Calculate score based on snake length
export function calculateScore(snakeLength: number): number {
  return (snakeLength - 3) * 10; // Starting length is 3, so subtract that
}

// Get color based on level
export function getLevelColor(level: number): string {
  const colors = [
    '#4CAF50', // Green
    '#2196F3', // Blue
    '#FFC107', // Yellow
    '#FF5722', // Orange
    '#9C27B0', // Purple
    '#E91E63', // Pink
    '#F44336', // Red
    '#009688', // Teal
    '#673AB7', // Deep Purple
    '#3F51B5', // Indigo
  ];
  
  return colors[(level - 1) % colors.length];
}

// Calculate level based on score
export function calculateLevel(score: number): number {
  return Math.floor(score / 100) + 1;
}

// Calculate speed based on level
export function calculateSpeed(level: number): number {
  // Base speed is 200ms, decreases by 15ms per level, min 50ms
  return Math.max(200 - ((level - 1) * 15), 50);
}
