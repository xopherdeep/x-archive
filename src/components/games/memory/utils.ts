export type CardType = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type Difficulty = "easy" | "medium" | "hard";

// Emoji sets for different difficulties
export const EMOJIS = {
  easy: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
  medium: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"],
  hard: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔"],
};

// Grid sizes for different difficulties
export const GRID_SIZES = {
  easy: { cols: 4, rows: 4 },
  medium: { cols: 6, rows: 4 },
  hard: { cols: 8, rows: 4 },
};

// Format time in seconds to mm:ss
export const formatTime = (timeInMs: number | null): string => {
  if (timeInMs === null) return "00:00";
  const totalSeconds = Math.floor(timeInMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Shuffle cards using Fisher-Yates algorithm
export const shuffleCards = (cards: CardType[]): CardType[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
