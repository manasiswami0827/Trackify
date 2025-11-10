import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5 bg-white">
      {budgetList?.length > 0 ? (
        <h2 className="font-bold text-lg mb-4 text-gray-800">Activity</h2>
      ) : (
        <h2> </h2>
      )}

      {budgetList?.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={budgetList} margin={{ top: 7 }}>
            <XAxis dataKey="name" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Bar dataKey="totalSpend" stackId="a" fill="#C084FC" />
            <Bar dataKey="amount" stackId="a" fill="#D8B4FE" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="group flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner border border-dashed border-gray-300 transition hover:shadow-md hover:scale-[1.01] duration-300">
          <div className="text-gray-700 text-lg font-medium tracking-wide mb-2">
            No expenses yet 💸
          </div>
          <p className="text-gray-500 text-sm max-w-md text-center leading-relaxed">
            Add your first expense to visualize your spending activity with beautiful charts 📊
          </p>
        </div>
      )}
    </div>
  );
}

export default BarChartDashboard;
