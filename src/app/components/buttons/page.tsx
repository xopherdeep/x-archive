"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export default function ButtonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Button Components</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of customizable button components for your UI needs
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Basic Buttons</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </Button>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Button States</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button className="animate-pulse">Animated</Button>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Buttons with Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
              Continue
            </Button>
            <Button variant="outline">
              Download
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Usage</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Import the Button component and use it in your React components:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>
{`import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return (
    <Button variant="default" size="default">
      Click Me
    </Button>
  );
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
