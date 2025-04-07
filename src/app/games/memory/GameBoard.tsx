import React from "react";
import { MemoryCard } from "./MemoryCard";
import { CardType } from "./utils";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  cards: CardType[];
  difficulty: "easy" | "medium" | "hard";
  onCardClick: (id: number) => void;
}

export function GameBoard({ cards, difficulty, onCardClick }: GameBoardProps) {
  // Get grid columns class based on difficulty
  const getGridColumnsClass = (): string => {
    switch (difficulty) {
      case "easy": return "grid-cols-4";
      case "medium": return "grid-cols-6";
      case "hard": return "grid-cols-8";
      default: return "grid-cols-4";
    }
  };

  return (
    <div className={cn("grid gap-2 mb-6", getGridColumnsClass())}>
      {cards.map(card => (
        <MemoryCard
          key={card.id}
          card={card}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
