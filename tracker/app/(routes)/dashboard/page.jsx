
"use client";

import { db } from "@/utils/dbConfig";
import { UserButton, useUser } from "@clerk/nextjs";
import { desc, eq, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Budgets, Expenses } from "@/utils/schema";
import CardInfo from "./_components/CardInfo";
import dynamic from "next/dynamic";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import DashboardHeader from "./_components/DashboardHeader";

const BarChartDashboard = dynamic(() => import("./_components/BarChartDashboard"), {
  ssr: false,
});

export default function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
    if (!email) return;

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
        .where(eq(Budgets.createdBy, email))
        .groupBy(
          Budgets.id,
          Budgets.name,
          Budgets.amount,
          Budgets.icon,
          Budgets.createdBy
        )
        .orderBy(desc(Budgets.id));

      const formatted = result.map((budget) => ({
        ...budget,
        amount: Number(budget.amount),
      }));

      setBudgetList(formatted);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
    if (!email) return;

    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, email))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader showHome />
      <main className="p-5">
        <h2 className="font-bold text-3xl text-gray-800">
          Hi, {user?.fullName} ✌️
        </h2>
        <p className="text-gray-500 mb-6">
          Here's what's happening with your money. Let's manage it better.
        </p>

        <CardInfo budgetList={budgetList} />

        <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
            <BarChartDashboard budgetList={budgetList} />
            <ExpenseListTable
              expensesList={expensesList}
              refreshData={() => getBudgetList()}
            />
          </div>

          {budgetList.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-4">
              <h2 className="font-bold text-lg text-purple-700 mb-3">
                Latest Budgets
              </h2>
              <div className="grid gap-4">
                {budgetList.map((budget) => (
                  <BudgetItem budget={budget} key={budget.id ?? budget.name} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

