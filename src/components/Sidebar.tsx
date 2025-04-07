import React from "react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-gray-900">Components</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-gray-900">Docs</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
          </li>
          <li className="mb-2">
            <a href="/education" className="text-gray-700 hover:text-gray-900">Learning Hub</a>
            <ul className="ml-4 mt-1">
              <li className="mb-1">
                <a href="/education/grade-3-5" className="text-sm text-gray-600 hover:text-gray-900">Grades 3-5</a>
              </li>
              <li className="mb-1">
                <a href="/education/grade-6-8" className="text-sm text-gray-600 hover:text-gray-900">Grades 6-8</a>
              </li>
              <li className="mb-1">
                <a href="/education/grade-9-12" className="text-sm text-gray-600 hover:text-gray-900">Grades 9-12</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
