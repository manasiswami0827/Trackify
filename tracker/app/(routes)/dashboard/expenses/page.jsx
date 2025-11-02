'use client';

import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/utils/dbConfig';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import EditBudget from './_components/EditBudget';

export default function ExpensesHome() {
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);
   const [budgetInfo, setBudgetInfo] = useState();

  useEffect(() => {
    if (user) fetchBudgets();
  }, [user]);

  const fetchBudgets = async () => {
    const result = await db
      .select({
        id: Budgets.id,
        name: Budgets.name,
        icon: Budgets.icon,
        amount: Budgets.amount,
        totalSpend: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress.toLowerCase()))
      .groupBy(Budgets.id);

    setBudgets(result);
  };

  return (
    <div className="p-6">
        <div className='flex items-center justify-between p-5 mb-5'>
      <h1 className="text-2xl font-bold mb-6  flex">Your Budgets & Expenses</h1>
    <EditBudget  budgetInfo={budgetInfo}
      refreshData={()=>fetchBudgets()}/>
    </div>
      {budgets.length === 0 ? (
        <p className="text-gray-500">No budgets found. Please create one to track expenses.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {
          budgets.map((budget) => (
            <div key={budget.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{budget.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold">{budget.name}</h2>
                  <p className="text-sm text-gray-600">
                    ₹{budget.totalSpend} spent of ₹{budget.amount}
                  </p>
                </div>
              </div>

              <Link href={`/dashboard/expenses/${budget.id}`}>
                <Button className="w-full mt-2">View Expenses</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
