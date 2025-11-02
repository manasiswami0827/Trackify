"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

function Hero() {
  const { isSignedIn } = useUser();

  return (
    <section className="bg-gray-50 flex items-center flex-col">
      {!isSignedIn ? (
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="flex justify-center mb-8">
            <Image
              src="/lg.svg"
              alt="BudgetBolt Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>

          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Manage Your Expense
              <strong className="text-primary"> Control Your Money</strong>
            </h1>

            <p className="mt-4 text-base text-gray-700 sm:text-lg/relaxed">
              Start creating your budget and take control of your spending.
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/sign-in"
                className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-md hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl text-center px-4 py-20">
          <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
            ✨ Smart saving starts here!  
          </h2>
          <p className="mt-4 text-gray-600 sm:text-lg">
            Create budgets, track your expenses, and edit them anytime.  
            Manage your money wisely and enjoy the best savings experience 🚀
          </p>
          <div className="mt-8">
            <Link href="/dashboard">
              <button className="rounded-lg bg-indigo-600 px-8 py-3 text-white font-medium shadow-md hover:bg-indigo-700 transition">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
