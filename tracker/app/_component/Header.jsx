"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';

function Header () {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      {/* Use image from public folder */}
      <Image src={'/lg.svg'} width={80} height={80} alt="Logo" />

      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  )
}

export default Header
