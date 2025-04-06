"use client"

import * as React from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function GameControlsDialog({ bindings, setBindings }: { bindings: { holdKey: string }, setBindings: React.Dispatch<React.SetStateAction<{ holdKey: string }>> }) {
  const [listening, setListening] = React.useState(false);
  const handleKeyBinding = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    setBindings({ ...bindings, holdKey: event.key });
    setListening(false);
  };

  return (
    <Dialog>
      <Button variant="outline" size="sm">
        <DialogTrigger asChild>
          <span>Controls</span>
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Controls</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <ul className="list-disc list-inside">
            <li><strong>Arrow Left:</strong> Move left</li>
            <li><strong>Arrow Right:</strong> Move right</li>
            <li><strong>Arrow Down:</strong> Soft drop</li>
            <li><strong>Arrow Up:</strong> Rotate piece</li>
            <li><strong>Shift + Arrow Up:</strong> Rotate piece opposite</li>
            <li><strong>Space:</strong> Quick drop</li>
            <li>
              <strong>{listening ? "Press key..." : (bindings?.holdKey || "Hold Key")}:</strong>{" "}
              <span onClick={() => setListening(true)} onKeyDown={handleKeyBinding} tabIndex={0}>
                Hold piece
              </span>
            </li>
          </ul>
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export {
  GameControlsDialog,
}
