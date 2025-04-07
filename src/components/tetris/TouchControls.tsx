"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown, RotateCw, RotateCcw, ArrowDown, Pause, Play } from "lucide-react";

interface TouchControlsProps {
  onMove: (dx: number) => void;
  onRotate: () => void;
  onRotateOpposite: () => void;
  onDrop: () => void;
  onQuickDrop: () => void;
  onHold: () => void;
  onPause: () => void;
  isPaused: boolean;
}

export default function TouchControls({
  onMove,
  onRotate,
  onRotateOpposite,
  onDrop,
  onQuickDrop,
  onHold,
  onPause,
  isPaused,
}: TouchControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 md:hidden">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onMove(-1)}
            aria-label="Move left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onMove(1)}
            aria-label="Move right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onDrop}
            aria-label="Move down"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onRotateOpposite}
            aria-label="Rotate counter-clockwise"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onRotate}
            aria-label="Rotate clockwise"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onHold}
            aria-label="Hold piece"
          >
            <span className="font-bold">H</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onQuickDrop}
            aria-label="Quick drop"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onPause}
            aria-label={isPaused ? "Resume game" : "Pause game"}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
