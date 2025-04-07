import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { GameControlsDialog } from "@/components/tetris/GameControlsDialog";
import GameCard from "./GameCard";
import { 
  tetrominoStyleMap, 
  BlockStyle, 
  generateColorVariations,
  getLevelColorTheme 
} from "./tetrominoStyles";

interface StatsProps {
  dropStats: Record<string, number>;
  holdStats: Record<string, number>;
  onReset: () => void;
  TETROMINOES: { [key: string]: { shape: number[][]; color: string } };
  cropShape: (shape: number[][]) => number[][];
  hold?: { key: string; tetromino: { shape: number[][]; color: string } };
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
  bindings: { holdKey: string };
  setBindings: React.Dispatch<React.SetStateAction<{ holdKey: string }>>;
}

export default function Stats({
  dropStats,
  holdStats = {},
  onReset,
  TETROMINOES,
  cropShape,
  hold,
  theme,
  setTheme,
  bindings,
  setBindings,
}: StatsProps) {
  const holdRanking = Object.keys(TETROMINOES).sort(
    (a, b) => (holdStats[b] || 0) - (holdStats[a] || 0)
  );
  console.log("Hold stats in Stats component:", holdStats);
  
  // Function to get the appropriate block style based on tetromino type
  const getTetrominoBlockStyle = (key: string, color: string, size: number = 30): React.CSSProperties => {
    const variations = generateColorVariations(color);
    const style = tetrominoStyleMap[key];
    
    switch (style) {
      case BlockStyle.BORDERED: // I, O, T
        return {
          backgroundColor: variations.light,
          border: `2px solid ${variations.border}`,
          boxShadow: `inset 1px 1px 1px ${variations.highlight}, inset -1px -1px 1px ${variations.shadow}`,
          backgroundImage: `radial-gradient(circle at center, white 30%, transparent 70%)`,
        };
        
      case BlockStyle.DARK: // J, S
        return {
          backgroundColor: variations.dark,
          border: `1px solid ${variations.border}`,
          boxShadow: `inset 2px 2px 1px ${variations.highlight}, inset -2px -2px 1px ${variations.shadow}`,
        };
        
      case BlockStyle.LIGHT: // Z, L
        return {
          backgroundColor: variations.light,
          border: `1px solid ${variations.border}`,
          boxShadow: `inset 2px 2px 1px ${variations.highlight}, inset -2px -2px 1px ${variations.shadow}`,
        };
        
      default:
        return { backgroundColor: color };
    }
  };
  return (
    <div className="flex flex-col gap-4 w-auto">
      <GameCard title="Tetrominoes">
        <hr className="my-2" />
        <div className="flex justify-between">
          <div className="text-xs">Hold</div>
          {/* <div className="text-xs text-muted">Piece</div> */}
          <div className="text-xs">Drop</div>
        </div>
        <div className="flex flex-col gap-2">
          {Object.entries(TETROMINOES)
            .sort((a, b) => (dropStats[b[0]] || 0) - (dropStats[a[0]] || 0))
            .map(([key, tetromino]) => {
              const cropped = cropShape(tetromino.shape);
              return (
                <div key={key} className="transition-all duration-500">
                  <div className="flex items-center gap-2 justify-between">
                    <div className="text-sm px-2">{holdStats[key] || 0}</div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative inline-block">
                          <div
                            className="grid gap-0.5 px-2"
                            style={{
                              gridTemplateColumns: `repeat(${
                                cropped[0]?.length || 0
                              }, 20px)`,
                            }}
                          >
                            {cropped.flat().map((cell, index) => (
                              <div
                                key={index}
                                style={{
                                  width: 20,
                                  height: 20,
                                  ...(cell ? getTetrominoBlockStyle(key, tetromino.color, 20) : { backgroundColor: "transparent" }),
                                  boxSizing: "border-box",
                                }}
                              />
                            ))}
                          </div>
                          {(() => {
                            if (!(holdStats[key] > 0)) return null;
                            const rank = holdRanking.indexOf(key);
                            return rank === 0 ? (
                              <span className="absolute top-0 left-full -ml-4 text-xl">
                                🥇
                              </span>
                            ) : rank === 1 ? (
                              <span className="absolute top-0 left-full -ml-4 text-xl">
                                🥈
                              </span>
                            ) : rank === 2 ? (
                              <span className="absolute top-0 left-full -ml-4 text-xl">
                                🥉
                              </span>
                            ) : null;
                          })()}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{key}</TooltipContent>
                    </Tooltip>
                    <div className="text-sm px-2">{dropStats[key] || 0}</div>
                  </div>
                </div>
              );
            })}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="w-full mt-2"
        >
          Reset
        </Button>

        <hr className="my-2" />
        <GameControlsDialog bindings={bindings} setBindings={setBindings} />
        <hr className="my-2" />
        {hold !== undefined && (
          <>
            <div className="text-center font-bold">Hold Piece</div>
            {hold ? (
              <div
                className="relative grid mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${hold.tetromino.shape[0].length}, 30px)`,
                  width: hold.tetromino.shape[0].length * 30 + "px",
                  height: hold.tetromino.shape.length * 30 + "px",
                  border: "2px solid #ccc",
                }}
              >
                {hold.tetromino.shape.flatMap((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      style={{
                        width: "30px",
                        height: "30px",
                        ...(cell 
                          ? getTetrominoBlockStyle(hold.key, hold.tetromino.color, 30) 
                          : { backgroundColor: "transparent" }),
                        boxSizing: "border-box",
                      }}
                    />
                  ))
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center">Empty</div>
            )}
          </>
        )}
      </GameCard>
      <GameCard>
        <div className="flex flex-col gap-2 my-4">
          <Select
            value={theme}
            onValueChange={(val) => setTheme(val as "light" | "dark")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </GameCard>
    </div>
  );
}
