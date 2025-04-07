export type GameState = 'READY' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';
export type Position = { x: number; y: number };
export type Velocity = { dx: number; dy: number };
export type Size = { width: number; height: number };

export type Paddle = {
  position: Position;
  size: Size;
  speed: number;
};

export type Ball = {
  position: Position;
  velocity: Velocity;
  radius: number;
  speed: number;
};

export type Brick = {
  position: Position;
  size: Size;
  health: number;
  color: string;
  points: number;
  broken: boolean;
};

export type PowerUpType = 'EXPAND' | 'SHRINK' | 'SLOW' | 'FAST' | 'MULTI_BALL' | 'EXTRA_LIFE';

export type PowerUp = {
  type: PowerUpType;
  position: Position;
  velocity: Velocity;
  size: Size;
  active: boolean;
};

export type GameLevel = {
  bricks: Brick[];
  backgroundColor: string;
  ballSpeed: number;
};

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const PADDLE_WIDTH = 100;
export const PADDLE_HEIGHT = 20;
export const PADDLE_SPEED = 8;
export const BALL_RADIUS = 10;
export const BALL_SPEED = 5;
export const BRICK_WIDTH = 80;
export const BRICK_HEIGHT = 30;
export const BRICK_PADDING = 10;
export const BRICK_ROWS = 5;
export const BRICK_COLUMNS = 10;

// Create a level with bricks
export function createLevel(level: number): GameLevel {
  const bricks: Brick[] = [];
  const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE'];
  
  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLUMNS; col++) {
      // Calculate position
      const x = col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_PADDING;
      const y = row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_PADDING + 50;
      
      // Higher rows have more health and points
      const health = Math.min(3, Math.floor(level / 2) + 1);
      const points = (row + 1) * 10 * level;
      
      bricks.push({
        position: { x, y },
        size: { width: BRICK_WIDTH, height: BRICK_HEIGHT },
        health,
        color: colors[row % colors.length],
        points,
        broken: false
      });
    }
  }
  
  return {
    bricks,
    backgroundColor: `hsl(${(level * 30) % 360}, 70%, 80%)`,
    ballSpeed: BALL_SPEED + (level * 0.5)
  };
}

// Check collision between ball and another object
export function checkBallCollision(
  ball: Ball,
  object: { position: Position; size: Size }
): boolean {
  // Find the closest point on the rectangle to the circle
  const closestX = Math.max(object.position.x, Math.min(ball.position.x, object.position.x + object.size.width));
  const closestY = Math.max(object.position.y, Math.min(ball.position.y, object.position.y + object.size.height));
  
  // Calculate the distance between the circle's center and this closest point
  const distanceX = ball.position.x - closestX;
  const distanceY = ball.position.y - closestY;
  
  // If the distance is less than the circle's radius, an intersection occurs
  const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
  return distanceSquared < (ball.radius * ball.radius);
}

// Handle ball collision with walls
export function handleWallCollision(ball: Ball): Ball {
  const newBall = { ...ball };
  
  // Left and right walls
  if (ball.position.x - ball.radius <= 0 || 
      ball.position.x + ball.radius >= CANVAS_WIDTH) {
    newBall.velocity.dx = -ball.velocity.dx;
  }
  
  // Top wall
  if (ball.position.y - ball.radius <= 0) {
    newBall.velocity.dy = -ball.velocity.dy;
  }
  
  return newBall;
}

// Handle ball collision with paddle
export function handlePaddleCollision(ball: Ball, paddle: Paddle): Ball {
  if (!checkBallCollision(ball, paddle)) {
    return ball;
  }
  
  const newBall = { ...ball };
  
  // Reverse vertical direction
  newBall.velocity.dy = -Math.abs(ball.velocity.dy);
  
  // Change horizontal direction based on where the ball hit the paddle
  const paddleCenter = paddle.position.x + paddle.size.width / 2;
  const ballDistanceFromCenter = ball.position.x - paddleCenter;
  const percentFromCenter = ballDistanceFromCenter / (paddle.size.width / 2);
  
  // Adjust horizontal velocity based on where the ball hit the paddle
  newBall.velocity.dx = ball.speed * percentFromCenter;
  
  return newBall;
}

// Handle ball collision with bricks
export function handleBrickCollision(
  ball: Ball,
  bricks: Brick[]
): { ball: Ball; bricks: Brick[]; score: number } {
  let newBall = { ...ball };
  let score = 0;
  
  const newBricks = bricks.map(brick => {
    // Skip already broken bricks
    if (brick.broken) {
      return brick;
    }
    
    // Check for collision
    if (checkBallCollision(ball, brick)) {
      // Reduce brick health
      const newBrick = { ...brick, health: brick.health - 1 };
      
      // Mark as broken if health is 0
      if (newBrick.health <= 0) {
        newBrick.broken = true;
        score += brick.points;
      }
      
      // Determine collision side and adjust ball velocity
      const ballCenterX = ball.position.x;
      const ballCenterY = ball.position.y;
      const brickCenterX = brick.position.x + brick.size.width / 2;
      const brickCenterY = brick.position.y + brick.size.height / 2;
      
      // Calculate differences
      const dx = ballCenterX - brickCenterX;
      const dy = ballCenterY - brickCenterY;
      
      // Determine if collision is more horizontal or vertical
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal collision
        newBall.velocity.dx = Math.sign(dx) * Math.abs(newBall.velocity.dx);
      } else {
        // Vertical collision
        newBall.velocity.dy = Math.sign(dy) * Math.abs(newBall.velocity.dy);
      }
      
      return newBrick;
    }
    
    return brick;
  });
  
  return { ball: newBall, bricks: newBricks, score };
}

// Update ball position
export function updateBallPosition(ball: Ball): Ball {
  return {
    ...ball,
    position: {
      x: ball.position.x + ball.velocity.dx,
      y: ball.position.y + ball.velocity.dy
    }
  };
}

// Check if ball is out of bounds (bottom of screen)
export function isBallOutOfBounds(ball: Ball): boolean {
  return ball.position.y - ball.radius > CANVAS_HEIGHT;
}

// Create initial game state
export function createInitialGameState(level: number = 1) {
  const gameLevel = createLevel(level);
  
  return {
    paddle: {
      position: {
        x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
        y: CANVAS_HEIGHT - PADDLE_HEIGHT - 20
      },
      size: { width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
      speed: PADDLE_SPEED
    },
    ball: {
      position: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - PADDLE_HEIGHT - 30
      },
      velocity: { dx: 0, dy: 0 },
      radius: BALL_RADIUS,
      speed: gameLevel.ballSpeed
    },
    bricks: gameLevel.bricks,
    score: 0,
    lives: 3,
    level,
    gameState: 'READY' as GameState,
    backgroundColor: gameLevel.backgroundColor
  };
}

// Launch the ball
export function launchBall(ball: Ball): Ball {
  // Random angle between -45 and 45 degrees
  const angle = ((Math.random() * 90) - 45) * Math.PI / 180;
  
  return {
    ...ball,
    velocity: {
      dx: ball.speed * Math.sin(angle),
      dy: -ball.speed * Math.cos(angle)
    }
  };
}

// Reset ball position
export function resetBall(ball: Ball, paddle: Paddle): Ball {
  return {
    ...ball,
    position: {
      x: paddle.position.x + paddle.size.width / 2,
      y: paddle.position.y - ball.radius - 5
    },
    velocity: { dx: 0, dy: 0 }
  };
}

// Check if all bricks are broken
export function areAllBricksBroken(bricks: Brick[]): boolean {
  return bricks.every(brick => brick.broken);
}
