"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WordlePage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Wordle</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Guess the five-letter word in six tries with color-coded hints!
        </p>
      </header>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="p-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-xl">Wordle Game Coming Soon!</p>
        </div>
        <Button asChild>
          <Link href="/games">Back to Games</Link>
        </Button>
      </div>
    </div>
  );
}
