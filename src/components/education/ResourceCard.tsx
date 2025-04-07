import React from "react";
import { BookOpen, Video, FileText, Download } from "lucide-react";

interface ResourceCardProps {
  title: string;
  type: "worksheet" | "video" | "reading" | "download";
  description: string;
  url: string;
}

export default function ResourceCard({ title, type, description, url }: ResourceCardProps) {
  const getIcon = () => {
    switch (type) {
      case "worksheet":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "reading":
        return <BookOpen className="h-5 w-5" />;
      case "download":
        return <Download className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "worksheet":
        return "Worksheet";
      case "video":
        return "Video";
      case "reading":
        return "Reading";
      case "download":
        return "Download";
      default:
        return "Resource";
    }
  };

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md text-blue-600 dark:text-blue-300">
          {getIcon()}
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
            {getTypeLabel()}
          </div>
        </div>
      </div>
    </a>
  );
}
