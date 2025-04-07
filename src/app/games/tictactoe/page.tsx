"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";

type Player = 'X' | 'O' | null;
type BoardState = Player[];

// Winning combinations (indices)
const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6]  // diagonal top-right to bottom-left
];

export default function TicTacToePage() {
  // Game state
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [winningCombination, setWinningCombination] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

  // Handle cell click
  const handleCellClick = (index: number) => {
    // Don't allow clicks if cell is already filled or game is over
    if (board[index] || winner || isDraw) return;

    // Update the board with the current player's mark
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for winner or draw
    checkGameState(newBoard);

    // Switch player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // Check if there's a winner or draw
  const checkGameState = (currentBoard: BoardState) => {
    // Check for winner
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        setWinningCombination(combination);
        setScores(prev => ({
          ...prev,
          [currentBoard[a] as 'X' | 'O']: prev[currentBoard[a] as 'X' | 'O'] + 1
        }));
        return;
      }
    }

    // Check for draw
    if (currentBoard.every(cell => cell !== null)) {
      setIsDraw(true);
      setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
    }
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
    setWinningCombination(null);
  };

  // Get cell class based on its state
  const getCellClass = (index: number) => {
    let className = "flex items-center justify-center h-20 w-20 bg-gray-100 dark:bg-gray-800 text-4xl font-bold cursor-pointer transition-all duration-200";
    
    // Add border styles
    if (index % 3 !== 2) className += " border-r-2 border-gray-300 dark:border-gray-600"; // Right border
    if (index < 6) className += " border-b-2 border-gray-300 dark:border-gray-600"; // Bottom border
    
    // Highlight winning cells
    if (winningCombination?.includes(index)) {
      className += " bg-green-200 dark:bg-green-800";
    }
    
    // Hover effect (only when cell is empty and game is not over)
    if (!board[index] && !winner && !isDraw) {
      className += " hover:bg-gray-200 dark:hover:bg-gray-700";
    }
    
    return className;
  };

  // Get cell text color
  const getCellTextColor = (value: Player) => {
    if (value === 'X') return "text-blue-500";
    if (value === 'O') return "text-red-500";
    return "";
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
        <p className="text-gray-500 dark:text-gray-400">
          The classic game of X's and O's. Get three in a row to win!
        </p>
      </header>

      <div className="flex flex-col items-center justify-center gap-8">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            {/* Game status */}
            <div className="mb-6 text-center">
              {winner ? (
                <div className="text-2xl font-bold">
                  Player <span className={getCellTextColor(winner)}>{winner}</span> wins!
                </div>
              ) : isDraw ? (
                <div className="text-2xl font-bold">It's a draw!</div>
              ) : (
                <div className="text-2xl">
                  Current player: <span className={getCellTextColor(currentPlayer)}>{currentPlayer}</span>
                </div>
              )}
            </div>

            {/* Game board */}
            <div className="grid grid-cols-3 gap-0 mb-6 mx-auto w-max">
              {board.map((cell, index) => (
                <div
                  key={index}
                  className={getCellClass(index)}
                  onClick={() => handleCellClick(index)}
                >
                  <span className={getCellTextColor(cell)}>{cell}</span>
                </div>
              ))}
            </div>

            {/* Score board */}
            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                <div className="text-blue-500 font-bold">X</div>
                <div>{scores.X}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                <div className="font-bold">Ties</div>
                <div>{scores.ties}</div>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded">
                <div className="text-red-500 font-bold">O</div>
                <div>{scores.O}</div>
              </div>
            </div>

            {/* Game controls */}
            <div className="flex justify-center gap-4">
              <Button onClick={resetGame}>
                New Game
              </Button>
              <Button variant="outline" asChild>
                <Link href="/games">Back to Games</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
