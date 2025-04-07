"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GamesPage() {
  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Games</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          A collection of classic games to enjoy in your browser
        </p>
      </header>
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <Card>
          <CardHeader>
            <CardTitle>Snake</CardTitle>
            <CardDescription>
              The classic Snake game. Eat food, grow longer, and avoid hitting walls or yourself!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">🐍</div>
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
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">🧩</div>
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
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">🃏</div>
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
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">🔢</div>
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
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">⭕❌</div>
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
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">💣</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/minesweeper">Play Minesweeper</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hangman</CardTitle>
            <CardDescription>
              Guess the word one letter at a time before the hangman is complete!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">📝</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/hangman">Play Hangman</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pong</CardTitle>
            <CardDescription>
              The classic arcade game. Bounce the ball back and forth to score points!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">🏓</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/pong">Play Pong</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Breakout</CardTitle>
            <CardDescription>
              Break all the bricks with a bouncing ball. Don't let it fall!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">🧱</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/breakout">Play Breakout</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Flappy Bird</CardTitle>
            <CardDescription>
              Navigate a bird through pipes by tapping to flap its wings!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">🐦</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/flappybird">Play Flappy Bird</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sudoku</CardTitle>
            <CardDescription>
              Fill the 9×9 grid with digits so each column, row, and box contains 1-9.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">🔢</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/sudoku">Play Sudoku</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Wordle</CardTitle>
            <CardDescription>
              Guess the five-letter word in six tries with color-coded hints!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-3xl">🔤</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/games/wordle">Play Wordle</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
