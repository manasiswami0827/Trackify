// import { db } from '@/utils/dbConfig'
// import { Expenses } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
// import { Trash } from 'lucide-react'
// import React from 'react'
// import { toast } from 'sonner'

// function ExpenseListTable({expensesList,refreshData}) {

//   const deleteExpense=async(expense)=>{
//     const result=await db.delete(Expenses)
//     .where(eq(Expenses.id,expense.id))
//     .returning();
//     if(result){
//       toast('expense deleted!');
//       refreshData()
//     }
//   }
//   return (
//     <div className='mt-3'>
      
//       <div className='grid grid-cols-4 bg-slate-200 p-2 font-bold mt-3 last:hidden'>
//         <h2 >Name</h2>
//         <h2>Amount</h2>
//         <h2>Date</h2>
//         <h2>Action</h2>
    
//     </div>
//       {expensesList.map((expenses,index)=>(
//         <div key={index} className='grid grid-cols-4 bg-slate-50 p-2'>
//         <h2>{expenses.name}</h2>
//         <h2>{expenses.amount}</h2>
//         <h2>{expenses.createdAt}</h2>
//         <h2>
//             <Trash className='text-red-600 cursor-pointer'
//             onClick={()=>deleteExpense(expenses)}></Trash>
//         </h2> 
//       </div>
//       ))}
   
//     </div>
//   )
// }

// export default ExpenseListTable

import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

function ExpenseListTable({ expensesList = [], refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db.delete(Expenses).where(eq(Expenses.id, expense.id)).returning();
    if (result) {
      toast('expense deleted!');
      refreshData();
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2 font-bold mt-3 last:hidden">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>
      {expensesList?.map((expense) => (
        <div key={expense.id ?? `${expense.name}-${expense.createdAt}`} className="grid grid-cols-4 bg-slate-50 p-2">
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{expense.createdAt}</h2>
          <h2>
            <Trash className="text-red-600 cursor-pointer" onClick={() => deleteExpense(expense)} />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
