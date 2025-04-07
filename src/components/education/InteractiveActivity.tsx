import React from "react";
import Image from "next/image";

interface InteractiveActivityProps {
  title: string;
  description: string;
  imageUrl?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  onClick?: () => void;
}

export default function InteractiveActivity({ 
  title, 
  description, 
  imageUrl, 
  difficulty, 
  estimatedTime,
  onClick
}: InteractiveActivityProps) {
  const difficultyColor = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800"
  };
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {imageUrl && (
        <div className="relative h-40 w-full">
          <Image 
            src={imageUrl} 
            alt={title} 
            fill 
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <span className="text-xs text-gray-500">
            {estimatedTime}
          </span>
        </div>
      </div>
    </div>
  );
}
