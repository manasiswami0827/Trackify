"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

const Hero = () => {
  const { isSignedIn, user } = useUser();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-purple-100 flex flex-col items-center justify-center text-center px-6 py-24">
      {/* Background Blurs (lighter + smaller for faster paint) */}
      <div className="absolute top-0 left-0 w-56 h-56 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 max-w-3xl"
      >
        {/* 👇 Added text-transparent fallback for faster first paint */}
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 [font-display:swap]">
          Smart Savings Start Here
        </h1>

        {!isSignedIn ? (
          <>
            <p className="text-lg sm:text-xl text-gray-700 mb-10">
              Manage your expenses, track your savings, and plan your goals.
              <br />
              <span className="text-purple-600 font-semibold">
                Sign in or create an account
              </span>{" "}
              to start your journey.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/sign-in">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 bg-purple-600 text-white font-medium rounded-2xl shadow-lg hover:bg-purple-700 transition-all"
                >
                  Sign In
                </motion.button>
              </Link>

              <Link href="/sign-up">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-2xl shadow-lg hover:bg-gray-300 transition-all"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg sm:text-xl text-gray-700 mb-10">
              Welcome back,{" "}
              <span className="text-purple-600 font-semibold">
                {user?.firstName || "User"}
              </span>
              ! 🎉 Ready to manage your budgets and track your expenses?
            </p>

            <div className="flex justify-center">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 bg-purple-600 text-white font-medium rounded-2xl shadow-lg hover:bg-purple-700 transition-all"
                >
                  Go to Dashboard
                </motion.button>
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;
