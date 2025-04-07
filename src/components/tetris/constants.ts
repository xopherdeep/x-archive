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
export const SCORE_MAP = { 1: 100, 2: 300, 3: 500, 4: 800 };

// Confetti configurations
export const CONFETTI_CONFIG = {
  1: { particleCount: 50, spread: 50, origin: { y: 0.8 }, colors: ['#1e90ff', '#00ffff'] },
  2: { particleCount: 100, spread: 70, origin: { y: 0.8 }, colors: ['#7fff00', '#00ff00'] },
  3: { particleCount: 150, spread: 90, origin: { y: 0.8 }, colors: ['#ff8c00', '#ffa500'] },
  4: { particleCount: 250, spread: 120, origin: { y: 0.8 }, colors: ['#ff4500', '#ff0000', '#ffd700'] }
};

// Music tracks - Original NES Tetris music by Hirokazu Tanaka
export const MUSIC_TRACKS = [
  {
    id: "music1",
    name: "Music 1 (Dance of the Sugar Plum Fairy)",
    src: "https://www.vgmpf.com/Wiki/images/7/76/01_-_Tetris_-_NES_-_Music_1.ogg",
    composer: "Pyotr Ilyich Tchaikovsky",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "music1_fast",
    name: "Music 1 - Fast",
    src: "https://www.vgmpf.com/Wiki/images/1/1b/02_-_Tetris_-_NES_-_Music_1_-_Fast.ogg",
    composer: "Pyotr Ilyich Tchaikovsky",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "music2",
    name: "Music 2 (Russian Folk Song)",
    src: "https://www.vgmpf.com/Wiki/images/2/23/03_-_Tetris_-_NES_-_Music_2.ogg",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "music2_fast",
    name: "Music 2 - Fast",
    src: "https://www.vgmpf.com/Wiki/images/b/b0/04_-_Tetris_-_NES_-_Music_2_-_Fast.ogg",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "music3",
    name: "Music 3 (Nintendo Call Hold Music)",
    src: "https://www.vgmpf.com/Wiki/images/a/a6/05_-_Tetris_-_NES_-_Music_3.ogg",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "music3_fast",
    name: "Music 3 - Fast",
    src: "https://www.vgmpf.com/Wiki/images/f/ff/06_-_Tetris_-_NES_-_Music_3_-_Fast.ogg",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "success",
    name: "Success!",
    src: "https://www.vgmpf.com/Wiki/images/a/a6/07_-_Tetris_-_NES_-_Success%21.ogg",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka",
    loop: false
  },
  {
    id: "victory",
    name: "Victory (Toréador Song from Carmen)",
    src: "https://www.vgmpf.com/Wiki/images/0/0d/08_-_Tetris_-_NES_-_Victory.ogg",
    composer: "Georges Bizet",
    arranger: "Hirokazu Tanaka",
    loop: false
  },
  {
    id: "high_score",
    name: "High Score",
    src: "https://www.vgmpf.com/Wiki/images/9/9d/09_-_Tetris_-_NES_-_High_Score.ogg",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka",
    loop: false
  },
  {
    id: "unknown",
    name: "Unknown (Unused Title Screen)",
    src: "https://www.vgmpf.com/Wiki/images/4/49/10_-_Tetris_-_NES_-_Unknown.ogg",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka",
    loop: false
  }
];

// Initial stats
export const INITIAL_STATS = Object.keys(TETROMINOES).reduce(
  (acc, key) => ({ ...acc, [key]: 0 }), 
  {}
);
