"use client";
import React from "react";

export default function GridsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Grid Layout Systems</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Responsive grid layouts for organizing content on your pages
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Basic Grid</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            A simple responsive grid with equal-width columns.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">Column 1</div>
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">Column 2</div>
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">Column 3</div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-8">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>
{`<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>`}
              </code>
            </pre>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Column Spans</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Control how many columns each item spans.
          </p>
          
          <div className="grid grid-cols-6 gap-4 mb-8">
            <div className="col-span-6 bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">Full Width (span 6)</div>
            <div className="col-span-2 bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">Span 2</div>
            <div className="col-span-4 bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">Span 4</div>
            <div className="col-span-3 bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">Span 3</div>
            <div className="col-span-3 bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">Span 3</div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-8">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>
{`<div className="grid grid-cols-6 gap-4">
  <div className="col-span-6">Full Width (span 6)</div>
  <div className="col-span-2">Span 2</div>
  <div className="col-span-4">Span 4</div>
  <div className="col-span-3">Span 3</div>
  <div className="col-span-3">Span 3</div>
</div>`}
              </code>
            </pre>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Responsive Grids</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Grids that change layout based on screen size.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Item 1</div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Item 2</div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Item 3</div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Item 4</div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Item 5</div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Item 6</div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Item 7</div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Item 8</div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-8">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>
{`<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
  <div>Item 7</div>
  <div>Item 8</div>
</div>`}
              </code>
            </pre>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Grid Auto Flow</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Control the auto placement of grid items.
            </p>
            
            <div className="grid grid-cols-3 grid-flow-row gap-4 mb-8">
              <div className="row-span-2 bg-amber-100 dark:bg-amber-900 p-4 rounded-lg text-center">1 (spans 2 rows)</div>
              <div className="col-span-2 bg-amber-100 dark:bg-amber-900 p-4 rounded-lg text-center">2 (spans 2 cols)</div>
              <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-lg text-center">3</div>
              <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-lg text-center">4</div>
              <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-lg text-center">5</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="text-sm font-mono overflow-x-auto">
                <code>
{`<div className="grid grid-cols-3 grid-flow-row gap-4">
  <div className="row-span-2">1 (spans 2 rows)</div>
  <div className="col-span-2">2 (spans 2 cols)</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</div>`}
                </code>
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Grid Template Areas</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Using CSS Grid template areas for layout.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" style={{
              gridTemplateAreas: `
                "header header header header"
                "sidebar main main main"
                "sidebar footer footer footer"
              `
            }}>
              <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center" style={{ gridArea: 'header' }}>Header</div>
              <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center" style={{ gridArea: 'sidebar' }}>Sidebar</div>
              <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center" style={{ gridArea: 'main' }}>Main Content</div>
              <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center" style={{ gridArea: 'footer' }}>Footer</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="text-sm font-mono overflow-x-auto">
                <code>
{`<div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{
  gridTemplateAreas: \`
    "header header header header"
    "sidebar main main main"
    "sidebar footer footer footer"
  \`
}}>
  <div style={{ gridArea: 'header' }}>Header</div>
  <div style={{ gridArea: 'sidebar' }}>Sidebar</div>
  <div style={{ gridArea: 'main' }}>Main Content</div>
  <div style={{ gridArea: 'footer' }}>Footer</div>
</div>`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Usage</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Tailwind CSS provides a powerful grid system based on CSS Grid. Here's how to use it:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>
{`// Basic grid
<div className="grid grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Column spans
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-4">Spans 4 columns</div>
  <div className="col-span-8">Spans 8 columns</div>
</div>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
