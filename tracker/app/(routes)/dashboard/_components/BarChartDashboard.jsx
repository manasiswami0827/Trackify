import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ budgetList }) {
  return (
    <div className='border rounded-lg p-5'>
      {budgetList?.length > 0 ?  <h2 className='font-bold text-lg mb-4'>Activity</h2> :
      <h2> </h2> }
    
      {budgetList?.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={budgetList}
            margin={{ top: 7 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
            <Bar dataKey="amount" stackId="a" fill="#c3c2ff" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center text-gray-500 py-10">
          No expenses yet. Add your first expense to see the chart 📊
        </div>
      )}
    </div>
  )
}

export default BarChartDashboard
