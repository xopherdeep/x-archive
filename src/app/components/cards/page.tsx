"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Card Components</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Versatile card components for displaying content in a clean, organized way
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>A simple card with header, content, and footer</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the main content area of the card. You can put any content here.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <CardHeader>
              <CardTitle>Card with Image</CardTitle>
              <CardDescription>A card with a header image</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cards with images are great for product displays, blog posts, and more.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-blue-500">
            <CardHeader className="bg-blue-50 dark:bg-blue-900">
              <CardTitle>Styled Card</CardTitle>
              <CardDescription>A card with custom styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p>You can customize cards with different borders, backgrounds, and more.</p>
            </CardContent>
            <CardFooter className="bg-blue-50 dark:bg-blue-900">
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Pricing Card</CardTitle>
              <CardDescription>Basic Plan</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-center mb-4">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Feature One
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Feature Two
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Feature Three
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Subscribe</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>A card with interactive elements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p>This card demonstrates how to include interactive elements like progress bars.</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Usage</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Import the Card components and use them in your React components:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>
{`import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
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
