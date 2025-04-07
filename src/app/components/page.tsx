"use client";
import React from "react";
import Link from "next/link";

export default function ToolsPage() {
  const toolCategories = [
    {
      title: "UI Components",
      description: "Ready-to-use UI components for your projects",
      tools: [
        { name: "Buttons", description: "Various button styles and variants", path: "/tools/buttons" },
        { name: "Cards", description: "Content containers with multiple styles", path: "/tools/cards" },
        { name: "Forms", description: "Input components and form layouts", path: "/tools/forms" },
        { name: "Modals", description: "Dialog and overlay components", path: "/tools/modals" },
      ],
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Utilities",
      description: "Helper functions and utility components",
      tools: [
        { name: "Date Helpers", description: "Date formatting and manipulation", path: "/tools/date-helpers" },
        { name: "Text Formatters", description: "Text transformation utilities", path: "/tools/text-formatters" },
        { name: "Color Tools", description: "Color manipulation and palettes", path: "/tools/color-tools" },
        { name: "Validators", description: "Form validation helpers", path: "/tools/validators" },
      ],
      color: "from-green-500 to-teal-600",
    },
    {
      title: "Layouts",
      description: "Page layout components and patterns",
      tools: [
        { name: "Grids", description: "Responsive grid systems", path: "/tools/grids" },
        { name: "Sidebars", description: "Navigation sidebar components", path: "/tools/sidebars" },
        { name: "Headers", description: "Page header components", path: "/tools/headers" },
        { name: "Footers", description: "Page footer components", path: "/tools/footers" },
      ],
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Tool Shack
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of useful components and tools to boost your development workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {toolCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className={`h-24 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex}>
                      <Link 
                        href={tool.path}
                        className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="font-medium text-gray-800 dark:text-white">{tool.name}</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Getting Started</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our tools are designed to be easy to use and integrate into your projects. Simply browse the categories above,
            select a tool, and follow the documentation to implement it in your application.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>
                {`// Example usage
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return (
    <Button variant="primary" size="lg">
      Click Me
    </Button>
  );
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Featured Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/buttons" className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-800 dark:text-white">Buttons</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customizable button components</p>
            </Link>
            <Link href="/tools/forms" className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-800 dark:text-white">Forms</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Form components and validation</p>
            </Link>
            <Link href="/tools/date-helpers" className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-800 dark:text-white">Date Helpers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Date formatting utilities</p>
            </Link>
            <Link href="/tools/grids" className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-800 dark:text-white">Grids</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Responsive layout systems</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
