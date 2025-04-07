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
        <Card>
          <CardHeader>
            <CardTitle>Memory Match</CardTitle>
            <CardDescription>
              Test your memory by matching pairs of cards. Find all matches to win!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-4xl">🃏</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/memory">Play Memory Match</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>2048</CardTitle>
            <CardDescription>
              Combine numbered tiles to reach 2048. A simple but addictive puzzle game!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-4xl">🔢</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/2048">Play 2048</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tic Tac Toe</CardTitle>
            <CardDescription>
              The classic game of X's and O's. Get three in a row to win!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-4xl">⭕❌</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/tictactoe">Play Tic Tac Toe</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Minesweeper</CardTitle>
            <CardDescription>
              Clear the board without detonating any mines. Use logic to identify safe squares!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-4xl">💣</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/minesweeper">Play Minesweeper</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
