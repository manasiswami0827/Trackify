"use client";

import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 flex justify-between items-center px-8 md:px-16 py-3 
      border-b bg-white/80 backdrop-blur-md shadow-sm transition-all"
    >
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-3">
        <Image
          src="/icon.jpeg"
          width={40}
          height={40}
          alt="Logo"
          className="rounded-lg"
        />
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Trackify
        </h1>
      </div>
    </nav>
  );
}
