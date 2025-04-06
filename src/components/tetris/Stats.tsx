"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [listening, setListening] = React.useState(false);
  const holdRanking = Object.keys(TETROMINOES).sort((a, b) => (holdStats[b] || 0) - (holdStats[a] || 0));
  return (
    <Card className="w-50">
      <CardHeader>
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
        <CardTitle className="text-lg m-0 p-0">Tetrominoes</CardTitle>
        <div className="flex justify-between">
          <div className="text-xs text-muted">Hold</div>
          {/* <div className="text-xs text-muted">Piece</div> */}
          <div className="text-xs text-muted">Drop</div>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex flex-col gap-2">
          {Object.entries(TETROMINOES)
            .sort((a, b) => (dropStats[b[0]] || 0) - (dropStats[a[0]] || 0))
            .map(([key, tetromino]) => {
              const cropped = cropShape(tetromino.shape);
              return (
                <div key={key} className="transition-all duration-500">
                  <div className="flex items-center gap-2 justify-between">
                    <div className="text-sm px-2">
                      {holdStats[key] || 0}
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative inline-block">
                          <div
                            className="grid gap-0.5 px-2"
                            style={{
                              gridTemplateColumns: `repeat(${cropped[0]?.length || 0}, 20px)`,
                            }}
                          >
                            {cropped.flat().map((cell, index) => (
                              <div
                                key={index}
                                style={{
                                  width: 20,
                                  height: 20,
                                  backgroundColor: cell ? tetromino.color : "transparent",
                                  border: "1px solid #ccc",
                                }}
                              />
                            ))}
                          </div>
                          {(() => {
                             if (!(holdStats[key] > 0)) return null;
                             const rank = holdRanking.indexOf(key);
                             return rank === 0 ? (
                               <span className="absolute top-0 left-full -ml-4 text-xl">🥇</span>
                             ) : rank === 1 ? (
                               <span className="absolute top-0 left-full -ml-4 text-xl">🥈</span>
                             ) : rank === 2 ? (
                               <span className="absolute top-0 left-full -ml-4 text-xl">🥉</span>
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
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
              <ul className="list-disc list-inside">
                <li><strong>Arrow Right:</strong> Move right</li>
                <li><strong>Arrow Down:</strong> Soft drop</li>
                <li><strong>Arrow Up:</strong> Rotate piece</li>
                <li><strong>Shift + Arrow Up:</strong> Rotate piece opposite</li>
                <li><strong>Space:</strong> Quick drop</li>
                <li>
                  <strong>{listening ? "Press key..." : (bindings?.holdKey || "Hold Key")}:</strong>{" "}
                  <span
                    onClick={() => setListening(true)}
                    onKeyDown={(e) => {
                      setBindings({ ...bindings, holdKey: e.key });
                      setListening(false);
                    }}
                    tabIndex={0}
                  >
                    Hold piece
                  </span>
                </li>
              </ul>
        {hold !== undefined && (
          <>
            <hr className="my-2" />
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
                        backgroundColor: cell
                          ? hold.tetromino.color
                          : "transparent",
                        boxSizing: "border-box",
                        border: "1px solid #999",
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
        <Dialog>
          <Button variant="outline" size="sm">
            <DialogTrigger asChild>
              Controls
            </DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Game Controls</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <ul className="list-disc list-inside">
                <li><strong>Arrow Left:</strong> Move left</li>
                <li><strong>Arrow Right:</strong> Move right</li>
                <li><strong>Arrow Down:</strong> Soft drop</li>
                <li><strong>Arrow Up:</strong> Rotate piece</li>
                <li><strong>Shift + Arrow Up:</strong> Rotate piece opposite</li>
                <li><strong>Space:</strong> Quick drop</li>
                <li>
                  <strong>{listening ? "Press key..." : (bindings?.holdKey || "Hold Key")}:</strong>{" "}
                  <span
                    onClick={() => setListening(true)}
                    onKeyDown={(e) => {
                      setBindings({ ...bindings, holdKey: e.key });
                      setListening(false);
                    }}
                    tabIndex={0}
                  >
                    Hold piece
                  </span>
                </li>
              </ul>
            </DialogDescription>
            <DialogFooter>
              <Button variant="outline">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
