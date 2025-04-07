import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GameControlsProps {
  difficulty: "easy" | "medium" | "hard";
  onDifficultyChange: (value: "easy" | "medium" | "hard") => void;
  onNewGame: () => void;
  moves: number;
  matches: number;
  totalPairs: number;
  elapsedTime: string;
  isGameInProgress: boolean;
}

export function GameControls({
  difficulty,
  onDifficultyChange,
  onNewGame,
  moves,
  matches,
  totalPairs,
  elapsedTime,
  isGameInProgress
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
      <div className="flex items-center gap-2">
        <span className="font-medium">Difficulty:</span>
        <Select
          value={difficulty}
          onValueChange={(value) => onDifficultyChange(value as "easy" | "medium" | "hard")}
          disabled={isGameInProgress}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-4">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Moves</div>
          <div className="text-xl font-bold">{moves}</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Matches</div>
          <div className="text-xl font-bold">{matches}/{totalPairs}</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</div>
          <div className="text-xl font-bold">{elapsedTime}</div>
        </div>
      </div>
      
      <Button onClick={onNewGame}>
        New Game
      </Button>
    </div>
  );
}
