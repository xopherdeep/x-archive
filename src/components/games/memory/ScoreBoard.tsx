import React from "react";
import { formatTime } from "./utils";

interface ScoreBoardProps {
  bestScores: {
    easy: number | null;
    medium: number | null;
    hard: number | null;
  };
}

export function ScoreBoard({ bestScores }: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
        <div className="font-medium">Easy Best</div>
        <div>{formatTime(bestScores.easy)}</div>
      </div>
      <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
        <div className="font-medium">Medium Best</div>
        <div>{formatTime(bestScores.medium)}</div>
      </div>
      <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
        <div className="font-medium">Hard Best</div>
        <div>{formatTime(bestScores.hard)}</div>
      </div>
    </div>
  );
}
