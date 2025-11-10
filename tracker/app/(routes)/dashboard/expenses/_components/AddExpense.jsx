"use client";

import React, { useState } from "react";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AddExpense({ budgetId, user, refreshData }) {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchBudgetAndSpent = async (bId) => {
    const budgets = await db.select().from(Budgets).where(eq(Budgets.id, bId));
    const budget = budgets?.[0] ?? null;

    const expenses = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, bId));

    const totalSpent = (expenses || []).reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );

    return { budget, totalSpent };
  };

  const addExpense = async (e) => {
    e.preventDefault();

    if (!expenseName || !amount) {
      toast.error("Please fill both name and amount.");
      return;
    }

    if (!budgetId) {
      toast.error("No budget selected.");
      return;
    }

    const newAmount = Number(amount);
    if (isNaN(newAmount) || newAmount <= 0) {
      toast.error("Enter a valid amount greater than 0.");
      return;
    }

    setIsLoading(true);

    try {
      const { budget, totalSpent } = await fetchBudgetAndSpent(budgetId);

      if (!budget) {
        toast.error("Budget not found.");
        setIsLoading(false);
        return;
      }

      const validTotalSpent = Math.max(0, totalSpent);
      const remaining = Number(budget.amount) - validTotalSpent;

      if (validTotalSpent > Number(budget.amount)) {
        toast.error(
          "Invalid budget: total spend already exceeds the budget amount."
        );
        setIsLoading(false);
        return;
      }

      if (newAmount > remaining) {
        toast.error(
          `Insufficient balance 💸 — only ₹${remaining.toLocaleString()} remaining.`
        );
        setIsLoading(false);
        return;
      }

      await db.insert(Expenses).values({
        name: expenseName,
        amount: newAmount,
        budgetId: budgetId,
        createdAt: new Date().toISOString(),
      });

      toast.success("Expense added successfully 🎉");
      setExpenseName("");
      setAmount("");
      refreshData && refreshData();
    } catch (err) {
      console.error("AddExpense error:", err);
      toast.error("Something went wrong while adding expense.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={addExpense}
      className="flex flex-col gap-4 bg-white text-gray-900 shadow p-6 rounded-xl"
    >
      <h3 className="font-bold text-lg">Add Expense</h3>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="expenseName">
          Expense Name
        </label>
        <Input
          id="expenseName"
          type="text"
          placeholder="e.g. Grocery"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="amount">
          Amount
        </label>
        <Input
          id="amount"
          type="number"
          placeholder="e.g. 500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
      >
        {isLoading ? "Adding..." : "Add Expense"}
      </Button>
    </form>
  );
}

export default AddExpense;
