'use client';

import React, { useEffect, useState, useCallback } from 'react';
import CreateBudget from './CreateBudget';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';
import { db } from '@/utils/dbConfig';

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  const getBudgetList = useCallback(async () => {
    if (!user) return;
    try {
      const result = await db
        .select({
          id: Budgets.id,
          name: Budgets.name,
          amount: Budgets.amount,
          icon: Budgets.icon,
          createdBy: Budgets.createdBy,
          totalSpend: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number),
          expenseCount: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress.toLowerCase()))
        .groupBy(Budgets.id, Budgets.name, Budgets.amount, Budgets.icon, Budgets.createdBy)
        .orderBy(desc(Budgets.id));

      setBudgetList(result);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) getBudgetList();
  }, [user, getBudgetList]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={getBudgetList} />
        {budgetList?.length > 0
          ? budgetList.map((budget) => <BudgetItem key={budget.id ?? budget.name} budget={budget} />)
          : [1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse" />
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
