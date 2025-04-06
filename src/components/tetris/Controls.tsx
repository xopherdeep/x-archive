"use client"
import React from "react";
import { GameControlsDialog } from "@/components/ui/dialog";

export default function Controls({ bindings, setBindings }: { bindings: { holdKey: string }, setBindings: React.Dispatch<React.SetStateAction<{ holdKey: string }>> }) {
  return <GameControlsDialog bindings={bindings} setBindings={setBindings} />;
}
