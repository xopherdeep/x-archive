import React from "react";
import Link from "next/link";

interface SubjectCardProps {
  title: string;
  description: string;
  color: "blue" | "green" | "purple" | "amber" | "red" | "pink";
  topics: Array<{
    title: string;
    description: string;
  }>;
  link?: {
    href: string;
    text: string;
  };
}

const colorMap = {
  blue: {
    title: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500",
  },
  green: {
    title: "text-green-600 dark:text-green-400",
    border: "border-green-500",
  },
  purple: {
    title: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500",
  },
  amber: {
    title: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500",
  },
  red: {
    title: "text-red-600 dark:text-red-400",
    border: "border-red-500",
  },
  pink: {
    title: "text-pink-600 dark:text-pink-400",
    border: "border-pink-500",
  },
};

export default function SubjectCard({ title, description, color, topics, link }: SubjectCardProps) {
  const colorClasses = colorMap[color];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className={`text-xl font-bold mb-3 ${colorClasses.title}`}>{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div key={index} className={`border-l-4 ${colorClasses.border} pl-4 py-2`}>
            <h3 className="font-semibold">{topic.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{topic.description}</p>
          </div>
        ))}
      </div>
      {link && (
        <div className="mt-4">
          <Link 
            href={link.href}
            className={`inline-block bg-${color}-100 hover:bg-${color}-200 text-${color}-800 px-4 py-2 rounded-md text-sm font-medium`}
          >
            {link.text}
          </Link>
        </div>
      )}
    </div>
  );
}
