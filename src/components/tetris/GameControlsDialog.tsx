"use client"

import * as React from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Keyboard } from "lucide-react"

// Control mapping type
type ControlMapping = {
  action: string;
  key: string;
  customizable?: boolean;
};

// Default controls
const DEFAULT_CONTROLS: ControlMapping[] = [
  { action: "Move left", key: "←" },
  { action: "Move right", key: "→" },
  { action: "Soft drop", key: "↓" },
  { action: "Rotate piece", key: "↑" },
  { action: "Rotate opposite", key: "Shift + ↑" },
  { action: "Quick drop", key: "Space" },
  { action: "Pause game", key: "P" },
];

// Memoized control key component
const ControlKey = React.memo(function ControlKey({ 
  keyName 
}: { 
  keyName: string 
}) {
  return (
    <div className="px-2 py-1 bg-muted rounded text-center">
      {keyName}
    </div>
  );
});

// Memoized customizable control component
const CustomizableControl = React.memo(function CustomizableControl({
  action,
  currentKey,
  onCustomize,
  isListening,
}: {
  action: string;
  currentKey: string;
  onCustomize: () => void;
  isListening: boolean;
}) {
  const keyRef = React.useRef<HTMLButtonElement>(null);
  
  React.useEffect(() => {
    if (isListening && keyRef.current) {
      keyRef.current.focus();
    }
  }, [isListening]);
  
  return (
    <>
      <div className="font-medium">{action}</div>
      <Button
        ref={keyRef}
        variant="outline"
        size="sm"
        className="w-full"
        onClick={onCustomize}
        aria-label={`Press a key to set the ${action.toLowerCase()} control`}
      >
        {isListening ? "Press any key..." : currentKey}
      </Button>
    </>
  );
});

// Main dialog component
function GameControlsDialog({ 
  bindings, 
  setBindings 
}: { 
  bindings: { holdKey: string }, 
  setBindings: React.Dispatch<React.SetStateAction<{ holdKey: string }>> 
}) {
  const [listening, setListening] = React.useState(false);
  
  const handleKeyBinding = React.useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Prevent certain keys that might cause issues
    if (['Escape', 'Tab'].includes(event.key)) return;
    
    setBindings({ ...bindings, holdKey: event.key });
    setListening(false);
  }, [bindings, setBindings]);

  // Memoize the controls list to prevent unnecessary re-renders
  const controlsList = React.useMemo(() => {
    return (
      <div className="grid grid-cols-2 gap-2 my-4">
        {DEFAULT_CONTROLS.map((control) => (
          <React.Fragment key={control.action}>
            <div className="font-medium">{control.action}</div>
            <ControlKey keyName={control.key} />
          </React.Fragment>
        ))}
        
        <CustomizableControl
          action="Hold piece"
          currentKey={bindings?.holdKey || "X"}
          onCustomize={() => setListening(true)}
          isListening={listening}
        />
      </div>
    );
  }, [bindings?.holdKey, listening]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Keyboard className="h-4 w-4" />
          <span>Controls</span>
        </Button>
      </DialogTrigger>
      <DialogContent onKeyDown={listening ? handleKeyBinding : undefined}>
        <DialogHeader>
          <DialogTitle>Game Controls</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {controlsList}
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
