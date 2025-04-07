import React from 'react';
import { Button } from '../ui/button';
import { Direction } from './helpers';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw 
} from 'lucide-react';

interface TouchControlsProps {
  onMove: (direction: Direction) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isPaused: boolean;
  isGameOver: boolean;
}

export default function TouchControls({ 
  onMove, 
  onStart, 
  onPause, 
  onReset, 
  isPaused, 
  isGameOver 
}: TouchControlsProps) {
  return (
    <div className="mt-4">
      {/* Direction controls */}
      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
        <div className="col-start-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-full aspect-square"
            onClick={() => onMove('UP')}
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </div>
        <div className="col-start-1 col-end-2 row-start-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-full aspect-square"
            onClick={() => onMove('LEFT')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="col-start-3 col-end-4 row-start-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-full aspect-square"
            onClick={() => onMove('RIGHT')}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="col-start-2 row-start-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-full aspect-square"
            onClick={() => onMove('DOWN')}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Game controls */}
      <div className="flex justify-center gap-4 mt-4">
        {isGameOver ? (
          <Button 
            variant="default" 
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Restart
          </Button>
        ) : isPaused ? (
          <Button 
            variant="default" 
            onClick={onStart}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Play
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={onPause}
            className="flex items-center gap-2"
          >
            <Pause className="h-4 w-4" />
            Pause
          </Button>
        )}
        
        {!isGameOver && (
          <Button 
            variant="outline" 
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
