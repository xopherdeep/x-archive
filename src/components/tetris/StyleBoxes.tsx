"use client";
import React from "react";

export default function StyleBoxes() {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-24 h-24 bg-blue-800 text-white flex items-center justify-center">
        Dark
      </div>
      <div className="w-24 h-24 bg-blue-300 flex items-center justify-center">
        Light
      </div>
      <div className="w-24 h-24 bg-white border border-blue-500 flex items-center justify-center">
        White
      </div>
    </div>
  );
}
