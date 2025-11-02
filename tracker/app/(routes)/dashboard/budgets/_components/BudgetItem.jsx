import Link from 'next/link';
import React from 'react';

function BudgetItem({ budget }) {
  const calculateProgressperc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc.toFixed(2);
  };

  return (
    <Link href={`/dashboard/expenses/${budget?.id}`}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px] flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* ✅ Fixed Emoji Circle */}
            <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full text-2xl">
              {budget?.icon}
            </div>
            <div>
              <h2 className="font-medium">{budget.name}</h2>
              <p className="text-sm text-gray-500">
                {budget.expenseCount} Item{budget.expenseCount === 1 ? '' : 's'}
              </p>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">
            ${budget.amount.toLocaleString()}
          </h2>
        </div>

        {/* Bottom Section */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-slate-500">
            <span>${budget.totalSpend?.toLocaleString() || 0} Spend</span>
            <span>
              ${Math.max(budget.amount - budget.totalSpend, 0).toLocaleString()} Remain
            </span>
          </div>

          <div className="w-full bg-slate-300 h-2 mt-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${calculateProgressperc()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
