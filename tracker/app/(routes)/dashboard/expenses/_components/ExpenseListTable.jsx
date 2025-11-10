import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList = [], refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();
    if (result) {
      toast("Expense deleted!");
      refreshData();
    }
  };

  return (
    <div className="mt-5 rounded-xl overflow-hidden shadow-md border border-gray-200">
     
      <div className="grid grid-cols-4 bg-gray-100 p-3 font-semibold text-gray-800">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>

      
      {expensesList.length > 0 ? (
        expensesList.map((expense, index) => (
          <div
            key={expense.id ?? `${expense.name}-${index}`}
            className="grid grid-cols-4 p-3 border-t border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <h2 className="truncate">{expense.name}</h2>
            <h2>₹{expense.amount}</h2>
            <h2>{new Date(expense.createdAt).toLocaleDateString()}</h2>
            <h2>
              <Trash
                className="text-red-500 hover:text-red-400 cursor-pointer"
                onClick={() => deleteExpense(expense)}
              />
            </h2>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-600 bg-white">
          No expenses found.
        </div>
      )}
    </div>
  );
}

export default ExpenseListTable;
