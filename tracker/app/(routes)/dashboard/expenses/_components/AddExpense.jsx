import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({budgetId,user,refreshData}) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');


const addNewExpense=async()=>{
  const result = await db.insert(Expenses).values({
  name: name,
  amount: parseFloat(amount),
  budgetId: budgetId,
  createdAt:moment().format('DD/MM/YYY') 
}).returning({insertedId:Budgets.id});


  setAmount('');
  setName('');
    if(result)
    {
       refreshData()
        toast("new expenses added")
    }
    }
  return (
    <div className='border p-6 rounded-lg ml-1'>
      <h2>Add Expense</h2>
            <div className='mt-2'>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Expense Name</h2>
                  <Input
                    placeholder="e.g. Bedroom Decor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
    
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Expense Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 1000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <Button disabled={!(name&&amount)}
                onClick={()=>addNewExpense()}
                 className="mt-3 w-full">Add New Expense</Button>
             </div>
    </div>
  )
}

export default AddExpense
