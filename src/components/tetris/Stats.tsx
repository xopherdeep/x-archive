"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatsProps {
  dropStats: Record<string, number>;
  onReset: () => void;
  TETROMINOES: { [key: string]: { shape: number[][]; color: string } };
  cropShape: (shape: number[][]) => number[][];
  hold?: { key: string; tetromino: { shape: number[][]; color: string } };
}

export default function Stats({ dropStats, onReset, TETROMINOES, cropShape, hold }: StatsProps) {
  return (
    <Card className="w-40">
      <CardHeader>
        <CardTitle className="text-lg m-0 p-0">Stats</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex flex-col gap-2">
          {Object.entries(TETROMINOES).map(([key, tetromino]) => {
            const cropped = cropShape(tetromino.shape);
            return (
              <div key={key} className="flex items-center gap-2">
                <div className="w-8 text-center font-bold">{key}</div>
                <div
                  className="grid gap-0.5"
                  style={{ gridTemplateColumns: `repeat(${cropped[0].length}, 20px)` }}
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
                <div className="ml-auto text-sm">{dropStats[key] || 0}</div>
              </div>
            );
          })}
        </div>
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
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
                        backgroundColor: cell ? hold.tetromino.color : "transparent",
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
      </CardContent>
    </Card>
  );
}
