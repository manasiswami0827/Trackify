"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LayoutDashboard, PieChart, Wallet, LogOut } from "lucide-react";

export default function SideNav({ closeSidebar }) {
  const router = useRouter();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Budgets", icon: Wallet, path: "/dashboard/budgets" },
    { name: "Expenses", icon: PieChart, path: "/dashboard/expenses" },
  ];

  return (
    <div
      className="h-screen sticky top-0 flex flex-col justify-between 
      p-5 bg-white text-gray-800 border-r border-gray-200 shadow-md"
    >
      {/* Top Section - Logo + Menu */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/icon.jpeg"
            width={40}
            height={40}
            alt="Logo"
            className="rounded-lg"
          />
          <h1 className="text-3xl font-extrabold text-purple-700 drop-shadow-[0_2px_3px_rgba(124,58,237,0.3)] tracking-wide">
            Trackify
          </h1>
        </div>

        {/* Navigation Menu */}
        <ul className="space-y-2">
          {menu.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                router.push(item.path);
                closeSidebar?.();
              }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 cursor-pointer transition-colors"
            >
              <item.icon size={20} className="text-purple-500" />
              <span className="font-medium">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer - Logout */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => router.push("/sign-out")}
          className="w-full flex items-center justify-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
