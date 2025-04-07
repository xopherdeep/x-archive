// Game dimensions
export const COLS = 10;
export const ROWS = 20;
export const CELL_SIZE = 30;

// Tetromino definitions
export const TETROMINOES = {
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

// Scoring system
export const SCORE_MAP = { 1: 10, 2: 25, 3: 40, 4: 50 };

// Confetti configurations
export const CONFETTI_CONFIG = {
  1: { particleCount: 50, spread: 50, origin: { y: 0.8 }, colors: ['#1e90ff', '#00ffff'] },
  2: { particleCount: 100, spread: 70, origin: { y: 0.8 }, colors: ['#7fff00', '#00ff00'] },
  3: { particleCount: 150, spread: 90, origin: { y: 0.8 }, colors: ['#ff8c00', '#ffa500'] },
  4: { particleCount: 250, spread: 120, origin: { y: 0.8 }, colors: ['#ff4500', '#ff0000', '#ffd700'] }
};

// Music tracks
export const MUSIC_TRACKS = [
  "/assets/music/track1.mp3",
  "/assets/music/track2.mp3",
  "/assets/music/track3.mp3",
];

// Initial stats
export const INITIAL_STATS = Object.keys(TETROMINOES).reduce(
  (acc, key) => ({ ...acc, [key]: 0 }), 
  {}
);
