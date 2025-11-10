"use client";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6">
      {/* Center Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/icon.jpeg"
            width={50}
            height={50}
            alt="Trackify Logo"
            className="rounded-lg shadow-md"
          />
          <h1 className="text-3xl font-extrabold text-purple-700 drop-shadow-[0_2px_3px_rgba(124,58,237,0.3)] tracking-wide">
            Trackify
          </h1>
        </div>

        {/* Sign-Up Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-purple-100">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-purple-600 hover:bg-purple-700 text-sm font-medium",
                formFieldInput: "border-gray-300 focus:border-purple-500",
                formFieldLabel: "text-gray-700 font-medium",
              },
              variables: {
                colorPrimary: "#7C3AED",
              },
            }}
            afterSignUpUrl="/dashboard"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-6 pb-3 text-xs text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold text-purple-600">Trackify</span> — Smart Budgeting Made Simple
      </footer>
    </div>
  );
}
