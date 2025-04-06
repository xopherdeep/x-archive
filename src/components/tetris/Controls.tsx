"use client"
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Controls({ bindings, setBindings }: { bindings: { holdKey: string }, setBindings: React.Dispatch<React.SetStateAction<{ holdKey: string }>> }) {
  const [listening, setListening] = React.useState(false);

  const handleKeyBinding = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    setBindings({ ...bindings, holdKey: event.key });
    setListening(false);
  };

  return (
    <Card className="w-fit max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Game Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside">
          <li><strong>Arrow Left:</strong> Move left</li>
          <li><strong>Arrow Right:</strong> Move right</li>
          <li><strong>Arrow Down:</strong> Soft drop</li>
          <li><strong>Arrow Up:</strong> Rotate piece</li>
          <li><strong>Space:</strong> Quick drop</li>
          <li>
            <strong>{listening ? "Press key..." : bindings.holdKey + ":"}</strong>{" "}
            <span onClick={() => setListening(true)} onKeyDown={handleKeyBinding} tabIndex={0}>
              Hold piece
            </span>
          </li>
        </ul>
        <div className="mt-4">
          <Button variant="outline">Edit Controls</Button>
        </div>
      </CardContent>
    </Card>
  );
}
