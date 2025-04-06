"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface GameCardProps {
  title: string;
  children: React.ReactNode;
}

export default function GameCard({ title, children }: GameCardProps) {
  return (
    <Card className="w-full gap-0 py-2">
      {/* <CardHeader>
        <CardTitle className="text-lg m-0 p-0">{title}</CardTitle>
      </CardHeader> */}
      <CardContent className="p-2 text-left bg-gray-900 rounded-sm mx-2 space-y-2">
        <div
          className="flex flex-col text-sm tracking-[0.15em] text-white font-bold"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          <p>{title}</p>
          <p>{children}</p>
        </div>
      </CardContent>
    </Card>
  );
}
