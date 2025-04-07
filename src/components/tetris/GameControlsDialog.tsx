"use client"

import * as React from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Keyboard } from "lucide-react"

function GameControlsDialog({ bindings, setBindings }: { bindings: { holdKey: string }, setBindings: React.Dispatch<React.SetStateAction<{ holdKey: string }>> }) {
  const [listening, setListening] = React.useState(false);
  const keyRef = React.useRef<HTMLButtonElement>(null);
  
  const handleKeyBinding = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Prevent certain keys that might cause issues
    if (['Escape', 'Tab'].includes(event.key)) return;
    
    setBindings({ ...bindings, holdKey: event.key });
    setListening(false);
  };

  React.useEffect(() => {
    if (listening && keyRef.current) {
      keyRef.current.focus();
    }
  }, [listening]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Keyboard className="h-4 w-4" />
          <span>Controls</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Controls</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="grid grid-cols-2 gap-2 my-4">
            <div className="font-medium">Move left</div>
            <div className="px-2 py-1 bg-muted rounded text-center">←</div>
            
            <div className="font-medium">Move right</div>
            <div className="px-2 py-1 bg-muted rounded text-center">→</div>
            
            <div className="font-medium">Soft drop</div>
            <div className="px-2 py-1 bg-muted rounded text-center">↓</div>
            
            <div className="font-medium">Rotate piece</div>
            <div className="px-2 py-1 bg-muted rounded text-center">↑</div>
            
            <div className="font-medium">Rotate opposite</div>
            <div className="px-2 py-1 bg-muted rounded text-center">Shift + ↑</div>
            
            <div className="font-medium">Quick drop</div>
            <div className="px-2 py-1 bg-muted rounded text-center">Space</div>
            
            <div className="font-medium">Pause game</div>
            <div className="px-2 py-1 bg-muted rounded text-center">P</div>
            
            <div className="font-medium">Hold piece</div>
            <Button
              ref={keyRef}
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setListening(true)}
              onKeyDown={handleKeyBinding}
              aria-label="Press a key to set the hold piece control"
            >
              {listening ? "Press any key..." : bindings?.holdKey || "X"}
            </Button>
          </div>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export {
  GameControlsDialog,
}
