'use client';
import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function DashboardLayout({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (user) {
      const checkUserBudgets = async () => {
        try {
          const res = await fetch(`/api/budgets?email=${user.primaryEmailAddress?.emailAddress}`);
          if (!res.ok) throw new Error("Failed to fetch budgets");

          const data = await res.json();

          if (!data || data.length === 0) {
            router.replace('/dashboard/budgets');
          }
        } catch (error) {
          console.error('Error checking budgets:', error);
        } finally {
          setLoading(false);
        }
      };

      checkUserBudgets();
    } else {
      setLoading(false);
    }
  }, [user, isLoaded, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
