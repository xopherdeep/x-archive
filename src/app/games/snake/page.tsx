"use client";

import React from 'react';
import SnakeGame from '@/components/snake/SnakeGame';

export default function SnakePage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Snake Game</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Control the snake, eat food, and avoid hitting the walls or yourself!
        </p>
      </header>
      
      <section>
        <SnakeGame />
      </section>
    </div>
  );
}
