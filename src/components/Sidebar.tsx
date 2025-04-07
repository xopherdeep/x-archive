import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          </li>
          <li className="mb-2">
            <Link href="/tools" className="text-gray-700 hover:text-gray-900">Tool Shack</Link>
          </li>
          <li className="mb-2">
            <Link href="/docs" className="text-gray-700 hover:text-gray-900">Docs</Link>
          </li>
          <li className="mb-2">
            <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          </li>
          <li className="mb-2">
            <Link href="/education" className="text-gray-700 hover:text-gray-900">Learning Hub</Link>
            <ul className="ml-4 mt-1">
              <li className="mb-1">
                <Link href="/education/grade-3-5" className="text-sm text-gray-600 hover:text-gray-900">Grades 3-5</Link>
              </li>
              <li className="mb-1">
                <Link href="/education/grade-6-8" className="text-sm text-gray-600 hover:text-gray-900">Grades 6-8</Link>
              </li>
              <li className="mb-1">
                <Link href="/education/grade-9-12" className="text-sm text-gray-600 hover:text-gray-900">Grades 9-12</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
