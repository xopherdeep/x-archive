export function rotate(matrix: number[][]): number[][] {
  return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
}

export function mergeBoard(
  board: (0 | string)[][],
  tetromino: { shape: number[][]; color: string },
  pos: { x: number; y: number },
  tetrominoKey: string = ""
): (0 | string)[][] {
  const newBoard = board.map(row => row.slice());
  tetromino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        if (newBoard[y + pos.y] && newBoard[y + pos.y][x + pos.x] !== undefined) {
          // Store both color and tetromino key in the cell
          newBoard[y + pos.y][x + pos.x] = tetrominoKey 
            ? `${tetromino.color}:${tetrominoKey}` 
            : tetromino.color;
        }
      }
    });
  });
  return newBoard;
}

export function checkCollision(
  board: (0 | string)[][],
  tetromino: { shape: number[][]; color: string },
  pos: { x: number; y: number }
): boolean {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        const boardY = y + pos.y;
        const boardX = x + pos.x;
        if (
          boardX < 0 ||
          boardX >= 10 ||
          boardY >= 20 ||
          (boardY >= 0 && board[boardY][boardX])
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export function clearLines(board: (0 | string)[][]): { board: (0 | string)[][]; cleared: number } {
  let cleared = 0;
  const newBoard = board.filter(row => {
    if (row.every(cell => cell !== 0)) {
      cleared++;
      return false;
    }
    return true;
  });
  while (newBoard.length < 20) {
    newBoard.unshift(new Array(10).fill(0));
  }
  return { board: newBoard, cleared };
}

export function cropShape(shape: number[][]): number[][] {
  const croppedRows = shape.filter(row => row.some(cell => cell));
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
  return croppedRows.map(row => row.slice(firstNonZeroCol, lastNonZeroCol + 1));
}

export function getPreviewShape(letter: string, shape: number[][]): number[][] {
  const cropped = cropShape(shape);
  if (letter === "I" && cropped.length === 1) {
    return cropped[0].map(val => [val]);
  }
  if (letter === "L") {
    return rotate(cropped);
  }
  if (letter === "J") {
    return rotate(rotate(rotate(cropped)));
  }
  return cropped;
}

import { getLevelColorTheme } from "./tetrominoStyles";

export function randomTetromino(theme: "light" | "dark", level: number = 1): { key: string; tetromino: { shape: number[][]; color: string } } {
  const TETROMINOES = {
    I: { shape: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], color: "cyan" },
    O: { shape: [[1,1],[1,1]], color: "yellow" },
    T: { shape: [[0,1,0],[1,1,1],[0,0,0]], color: "purple" },
    S: { shape: [[0,1,1],[1,1,0],[0,0,0]], color: "green" },
    Z: { shape: [[1,1,0],[0,1,1],[0,0,0]], color: "red" },
    J: { shape: [[1,0,0],[1,1,1],[0,0,0]], color: "blue" },
    L: { shape: [[0,0,1],[1,1,1],[0,0,0]], color: "orange" },
  };
  
  const keys = Object.keys(TETROMINOES);
  const randKey = keys[Math.floor(Math.random()*keys.length)];
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

export function generateSVGPattern(primary: string, secondary: string, size: number = 30): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="${secondary}" stroke="${primary}" stroke-width="2"/></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}
