"use client";
import React from "react";
import Tetris from "@/components/tetris/Tetris";

export default function TetrisPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-bold">Tetris</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <Tetris />
      </main>
    </div>
  );
}
