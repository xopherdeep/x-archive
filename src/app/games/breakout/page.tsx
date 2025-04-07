"use client";

import React from "react";
import Breakout from '@/components/breakout/Breakout';

export default function BreakoutPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Breakout</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Break all the bricks with a bouncing ball. Don't let it fall!
        </p>
      </header>
      <div className="flex flex-col items-center justify-center gap-8">
        <Breakout />
      </div>
    </div>
  );
}
