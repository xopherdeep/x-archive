"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DateHelpersPage() {
  const [date, setDate] = useState(new Date());
  const [inputDate, setInputDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [formatString, setFormatString] = useState("YYYY-MM-DD");

  // Format date based on format string
  const formatDate = (date, format) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid date";

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    
    const pad = (num) => num.toString().padStart(2, '0');
    
    return format
      .replace(/YYYY/g, year)
      .replace(/YY/g, year.toString().slice(-2))
      .replace(/MM/g, pad(month))
      .replace(/M/g, month)
      .replace(/DD/g, pad(day))
      .replace(/D/g, day)
      .replace(/HH/g, pad(hours))
      .replace(/H/g, hours)
      .replace(/hh/g, pad(hours > 12 ? hours - 12 : hours || 12))
      .replace(/h/g, hours > 12 ? hours - 12 : hours || 12)
      .replace(/mm/g, pad(minutes))
      .replace(/m/g, minutes)
      .replace(/ss/g, pad(seconds))
      .replace(/s/g, seconds)
      .replace(/A/g, hours >= 12 ? 'PM' : 'AM')
      .replace(/a/g, hours >= 12 ? 'pm' : 'am');
  };

  // Get relative time (e.g., "2 days ago")
  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  };

  // Add days to date
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Format the date when button is clicked
  const handleFormatDate = () => {
    try {
      const parsedDate = new Date(inputDate);
      setFormattedDate(formatDate(parsedDate, formatString));
    } catch (error) {
      setFormattedDate("Invalid date");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Date Helper Utilities</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of utilities for formatting and manipulating dates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Date Formatter</CardTitle>
              <CardDescription>Format dates using custom format strings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date-input">Date</Label>
                  <Input 
                    id="date-input" 
                    type="datetime-local" 
                    value={inputDate} 
                    onChange={(e) => setInputDate(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format-input">Format String</Label>
                  <Input 
                    id="format-input" 
                    value={formatString} 
                    onChange={(e) => setFormatString(e.target.value)} 
                    placeholder="YYYY-MM-DD" 
                  />
                  <p className="text-sm text-gray-500">
                    Use: YYYY (year), MM (month), DD (day), HH (hour), mm (minute), ss (second), A (AM/PM)
                  </p>
                </div>
                <Button onClick={handleFormatDate}>Format Date</Button>
                {formattedDate && (
                  <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <p className="font-mono">{formattedDate}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relative Time</CardTitle>
              <CardDescription>Display dates as relative time (e.g., "2 days ago")</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="relative-date-input">Date</Label>
                  <Input 
                    id="relative-date-input" 
                    type="datetime-local" 
                    value={inputDate} 
                    onChange={(e) => setInputDate(e.target.value)} 
                  />
                </div>
                <Button onClick={() => setFormattedDate(getRelativeTime(inputDate))}>
                  Get Relative Time
                </Button>
                {formattedDate && (
                  <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <p className="font-mono">{formattedDate}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Date Manipulation</CardTitle>
              <CardDescription>Add or subtract time from dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="manipulation-date-input">Date</Label>
                  <Input 
                    id="manipulation-date-input" 
                    type="date" 
                    value={inputDate} 
                    onChange={(e) => setInputDate(e.target.value)} 
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => {
                    const newDate = addDays(new Date(inputDate), 7);
                    setFormattedDate(formatDate(newDate, "YYYY-MM-DD"));
                  }}>
                    Add 7 Days
                  </Button>
                  <Button onClick={() => {
                    const newDate = addDays(new Date(inputDate), -7);
                    setFormattedDate(formatDate(newDate, "YYYY-MM-DD"));
                  }}>
                    Subtract 7 Days
                  </Button>
                </div>
                {formattedDate && (
                  <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <p className="font-mono">{formattedDate}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Date Formats</CardTitle>
              <CardDescription>Examples of commonly used date formats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="common-date-input">Date</Label>
                  <Input 
                    id="common-date-input" 
                    type="datetime-local" 
                    value={inputDate} 
                    onChange={(e) => setInputDate(e.target.value)} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => setFormattedDate(formatDate(inputDate, "YYYY-MM-DD"))}>
                    ISO Date
                  </Button>
                  <Button variant="outline" onClick={() => setFormattedDate(formatDate(inputDate, "MM/DD/YYYY"))}>
                    US Format
                  </Button>
                  <Button variant="outline" onClick={() => setFormattedDate(formatDate(inputDate, "DD/MM/YYYY"))}>
                    EU Format
                  </Button>
                  <Button variant="outline" onClick={() => setFormattedDate(formatDate(inputDate, "YYYY-MM-DD HH:mm:ss"))}>
                    DateTime
                  </Button>
                  <Button variant="outline" onClick={() => setFormattedDate(formatDate(inputDate, "h:mm A, MMMM D, YYYY"))}>
                    Long Format
                  </Button>
                  <Button variant="outline" onClick={() => setFormattedDate(formatDate(inputDate, "ddd, MMM D, YYYY"))}>
                    Short Format
                  </Button>
                </div>
                {formattedDate && (
                  <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <p className="font-mono">{formattedDate}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Usage</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Import the date helper functions and use them in your React components:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>
{`import { formatDate, getRelativeTime, addDays } from "@/utils/date-helpers";

export default function MyComponent() {
  const now = new Date();
  
  return (
    <div>
      <p>Formatted date: {formatDate(now, "YYYY-MM-DD")}</p>
      <p>Relative time: {getRelativeTime(new Date("2023-01-01"))}</p>
      <p>Next week: {formatDate(addDays(now, 7), "YYYY-MM-DD")}</p>
    </div>
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
