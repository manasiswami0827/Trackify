"use client";

import React, { useState } from "react";
import SideNav from "./_components/SideNav";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f9f9ff] text-gray-900 transition-colors duration-300">
  
      <aside
        className={`fixed inset-y-0 left-0 transform bg-white border-r border-purple-100 shadow-md transition-transform duration-300 z-40 w-64 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <SideNav closeSidebar={() => setIsSidebarOpen(false)} />
      </aside>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}

        <div className="flex-1 md:ml-64">
        <div className="p-3 md:hidden flex justify-between items-center shadow-sm bg-white sticky top-0 z-20 transition-colors duration-300">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md bg-purple-100 hover:bg-purple-200 transition"
          >
            ☰
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
