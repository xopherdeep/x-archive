"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Form Components</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of form components for building accessible and user-friendly forms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Basic Form</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Form with Validation</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter your username" className="border-red-500" />
                <p className="text-sm text-red-500">Username is required</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email2">Email</Label>
                <Input id="email2" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password2">Password</Label>
                <Input id="password2" type="password" placeholder="Enter your password" />
                <p className="text-sm text-gray-500">Password must be at least 8 characters</p>
              </div>
              <Button type="submit" className="w-full">Register</Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Form Controls</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="select">Select Option</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Radio Options</Label>
                <RadioGroup defaultValue="option1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="option1" />
                    <Label htmlFor="option1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="option2" />
                    <Label htmlFor="option2">Option 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="option3" />
                    <Label htmlFor="option3">Option 3</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here" />
              </div>
              
              <Button type="submit">Submit</Button>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Inline Form</h2>
            <form>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="firstName" className="sr-only">First Name</Label>
                  <Input id="firstName" placeholder="First Name" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="lastName" className="sr-only">Last Name</Label>
                  <Input id="lastName" placeholder="Last Name" />
                </div>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="email3" className="sr-only">Email</Label>
                <Input id="email3" type="email" placeholder="Email Address" />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="subscribe" />
                  <Label htmlFor="subscribe">Subscribe to newsletter</Label>
                </div>
                <Button type="submit">Subscribe</Button>
              </div>
            </form>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-white">Search Form</h3>
            <form>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="search" className="sr-only">Search</Label>
                  <Input id="search" placeholder="Search..." />
                </div>
                <Button type="submit">Search</Button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Usage</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Import the form components and use them in your React components:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>
{`import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MyForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
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
