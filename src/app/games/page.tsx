"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function GamesPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Games</h1>
      </header>
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Game 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a description of Game 1.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Game 2</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a description of Game 2.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Game 3</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a description of Game 3.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tetris</CardTitle>
          </CardHeader>
          <CardContent>
            <a href="/games/tetris" className="text-gray-700 hover:text-gray-900">Play Tetris</a>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
