"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
     <div className="flex items-center gap-3">
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

      <div className="flex items-center gap-3">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href="/sign-in">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-5 rounded-lg">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
