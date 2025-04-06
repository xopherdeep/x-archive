"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface GameCardProps {
  title: string;
  children: React.ReactNode;
}

export default function GameCard({ title, children }: GameCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg m-0 p-0">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 text-center bg-gray-800">
        <div
          className="text-3xl font-bold tracking-[0.15em] text-lime-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
          style={{ fontFamily: '"Player 2", cursive' }}
        >
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
