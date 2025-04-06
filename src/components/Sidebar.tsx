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
        </ul>
      </nav>
      </div>
    </div>
    </SidebarProvider>
  );
}
