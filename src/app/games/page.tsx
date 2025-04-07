"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GamesPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Games</h1>
      </header>
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Snake</CardTitle>
            <CardDescription>
              The classic Snake game. Eat food, grow longer, and avoid hitting walls or yourself!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-4xl">🐍</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/snake">Play Snake</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tetris</CardTitle>
            <CardDescription>
              The classic block-stacking puzzle game. Arrange falling blocks to create complete lines.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-4xl">🧩</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/tetris">Play Tetris</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
