import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-5 shadow-md border-b flex justify-between items-center flex-wrap gap-3 bg-white">
      {/* Left side — Home button */}
      <div>
        <Link
          href="/"
          className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition text-sm sm:text-base"
        >
          Home
        </Link>
      </div>

      {/* Right side — User profile button */}
      <div>
        <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
      </div>
    </div>
  );
}

export default DashboardHeader;
