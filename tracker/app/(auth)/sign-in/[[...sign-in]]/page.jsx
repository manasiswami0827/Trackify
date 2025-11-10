"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-purple-100">
        <h1 className="text-center text-4xl font-extrabold text-purple-700 mb-6 drop-shadow-[0_2px_3px_rgba(124,58,237,0.3)]">
          Trackify
        </h1>        
        <SignIn
          appearance={{
            elements: {
              card: "shadow-none border-0",
              headerTitle: "text-2xl font-semibold text-gray-800",
              formButtonPrimary:
                "bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg py-2 transition-colors",
              formFieldInput:
                "border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg",
              footerActionLink: "text-purple-600 hover:underline font-medium",
            },
          }}
          afterSignInUrl="/dashboard"
        />
        
      </div>
      
    </div>
     <footer className="text-center mt-6 pb-3 text-xs text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold text-purple-600">Trackify</span> — Smart Budgeting Made Simple
      </footer>
      </div>
  );
}
