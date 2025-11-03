
// import { PiggyBank, ReceiptText, Wallet} from 'lucide-react'
// import React, { useEffect, useState } from 'react'

// function CardInfo({budgetList}) {

//   const [totalBudget, setTotalBudget] = useState(0)
//   const [totalSpend, setTotalSpend] = useState(0)
//   const [budgetCount, setBudgetCount] = useState(0)

//     useEffect(() => {
//     if (budgetList && budgetList.length > 0) {
//       calculateCardInfo()
//     }
//   }, [budgetList])
//     const calculateCardInfo=()=>{
//         let totalBudget_=0;
//         let totalSpend_=0;

//         budgetList.forEach(element => {
//             totalBudget_ += Number(element.amount || 0);
//             totalSpend_=totalSpend_+ Number(element.totalSpend || 0)
//         });   

//     setTotalBudget(totalBudget_)
//     setTotalSpend(totalSpend_)
//     setBudgetCount(budgetList.length)
//     }
//   return (
//     <div>
//       {budgetList?.length>0?
//     <div className='mt-7 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3'>
//       <div className='p-7 border rounded-lg flex items-center justify-between'>
//         <div>
//         <h2 className='text-sm'>Total Spend</h2>
//         <h2 className='font-bold text-2xl'>${totalSpend}</h2>
//         </div>
//          <PiggyBank      
//       className='bg-primary p-3 h-12 w-12 rounded-full text-white '/>
//       </div>
//       <div className='p-7 border rounded-lg flex items-center justify-between'>
//         <div>
//         <h2 className='text-sm'>No. Of Budget</h2>
//         <h2 className='font-bold text-2xl'>{budgetCount}</h2>
//         </div>
//          <ReceiptText 
//       className='bg-primary p-3 h-12 w-12 rounded-full text-white '/>
//       </div>
//       <div className='p-7 border rounded-lg flex items-center justify-between'>
//         <div>
//         <h2 className='text-sm'>Total Budget</h2>
//         <h2 className='font-bold text-2xl'>${totalBudget}</h2>
//         </div>
//          <Wallet
//       className='bg-primary p-3 h-12 w-12 rounded-full text-white '/>
//       </div>
     
//     </div> 
//     :
   
//       <div className='mt-7 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3'>
//       <div className='p-7 border rounded-lg flex items-center justify-between'>
//         <div>
//         <h2 className='text-sm'>Total Spend</h2>
//         <h2 className='font-bold text-2xl'>$0</h2>
//         </div>
//          <PiggyBank      
//       className='bg-primary p-3 h-12 w-12 rounded-full text-white '/>
//       </div>
//       <div className='p-7 border rounded-lg flex items-center justify-between'>
//         <div>
//         <h2 className='text-sm'>No. Of Budget</h2>
//         <h2 className='font-bold text-2xl'>0</h2>
//         </div>
//          <ReceiptText 
//       className='bg-primary p-3 h-12 w-12 rounded-full text-white '/>
//       </div>
//       <div className='p-7 border rounded-lg flex items-center justify-between'>
//         <div>
//         <h2 className='text-sm'>Total Budget</h2>
//         <h2 className='font-bold text-2xl'>$0</h2>
//         </div>
//          <Wallet
//       className='bg-primary p-3 h-12 w-12 rounded-full text-white '/>
//       </div>
     
//     </div> 
    
//     }
//     </div>
//   )
// }

// export default CardInfo
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [budgetCount, setBudgetCount] = useState(0);

  function calculateCardInfo() {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ += Number(element.amount || 0);
      totalSpend_ += Number(element.totalSpend || 0);
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
    setBudgetCount(budgetList.length);
  }

  useEffect(() => {
    if (budgetList && budgetList.length > 0) {
      calculateCardInfo();
    } else {
      // Reset when empty
      setTotalBudget(0);
      setTotalSpend(0);
      setBudgetCount(0);
    }
  }, [budgetList]);

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-bold text-2xl">${totalSpend}</h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white " />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">No. Of Budget</h2>
              <h2 className="font-bold text-2xl">{budgetCount}</h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white " />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">${totalBudget}</h2>
            </div>
            <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white " />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-bold text-2xl">$0</h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white " />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">No. Of Budget</h2>
              <h2 className="font-bold text-2xl">0</h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white " />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">$0</h2>
            </div>
            <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white " />
          </div>
        </div>
      )}
    </div>
  );
}

export default CardInfo;
