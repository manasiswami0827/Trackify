'use client'

import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { and, desc, eq, sql } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import { db } from '@/utils/dbConfig';
import ExpenseListTable from '../_components/ExpenseListTable';
import { ArrowLeft, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import{
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
}from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';

function ExpensesScreen({ params }) {

  const { id } = use(params);
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList,setExpensesList]=useState([])
  const route=useRouter()

  useEffect(() => {
   
     user&& getBudgetInfo();
  
    
  }, [user]);


  const getBudgetInfo = async () => {

    const result = await db.select({
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
      .where(
        and(
          eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress.toLowerCase()),
         eq(Budgets.id, id)
        )
      ) 
      .groupBy(Budgets.id)

   
    setBudgetInfo(result[0]);
       getExpensesList();
  }
const getExpensesList=async()=>{
  const result=await db.select().from(Expenses)
  .where(eq(Expenses.budgetId,id))
  .orderBy(desc(Expenses.id));
  setExpensesList(result);
  
}

const deleteBudget=async()=>{
  const deleteExpensesResult=await db.delete(Expenses)
  .where(eq(Expenses.budgetId,id))
  .returning()
  if(deleteExpensesResult)
  {
  const result=await db.delete(Budgets)
  .where(eq(Budgets.id,id))
  .returning();
}
toast("budget deleted")
route.replace('/dashboard/budgets')
}
  return (
    <div className='p-10'>
    <div className='p-6 sm:p-8 md:p-10'>

  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
    <div className='flex items-center gap-3'>
      <ArrowLeft
        onClick={() => route.back()}
        className='cursor-pointer w-6 h-6 text-gray-600 hover:text-black'
      />
      <h2 className='text-2xl font-bold'>My Expenses</h2>
    </div>

    <div className='flex gap-2 flex-wrap items-center'>
      <EditBudget budgetInfo={budgetInfo}
      refreshData={()=>getBudgetInfo()} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className='flex gap-2 items-center' variant='destructive'>
            <Trash className='w-4 h-4' /> Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the current budget along with expenses and remove your data from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</div>    
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 '>
       {budgetInfo? <BudgetItem
        budget={budgetInfo}
        />:
        <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>
        </div>}
        <AddExpense budgetId={id}
        user={user}
        refreshData={()=>getBudgetInfo()}
        />
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable expensesList={expensesList}
        refreshData={()=>getBudgetInfo()}/>
      </div>
    </div>
  )
}

export default ExpensesScreen
