import React from "react";
import { cn } from "@/lib/utils";
import { CardType } from "./utils";

interface MemoryCardProps {
  card: CardType;
  onClick: (id: number) => void;
}

export function MemoryCard({ card, onClick }: MemoryCardProps) {
  return (
    <div 
      className="memory-card-container aspect-square cursor-pointer"
      onClick={() => onClick(card.id)}
    >
      <div 
        className={cn(
          "memory-card w-full h-full",
          card.isFlipped || card.isMatched ? "flipped" : "",
          card.isMatched ? "memory-card-matched" : ""
        )}
      >
        {/* Card back */}
        <div className="memory-card-face memory-card-back">
          <span className="text-white text-2xl">?</span>
        </div>
        
        {/* Card front */}
        <div className="memory-card-face memory-card-front">
          <span className="text-4xl">{card.emoji}</span>
        </div>
      </div>
    </div>
  );
}
