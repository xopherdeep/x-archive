"use client";
import React from "react";
import Tetris from "@/components/tetris/Tetris";

export default function TetrisPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Tetris</h1>
      </header>
      <main>
        <Tetris />
      </main>
    </div>
  );
}
