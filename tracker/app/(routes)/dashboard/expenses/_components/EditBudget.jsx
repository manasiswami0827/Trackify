// 'use client'
// import { Button } from '@/components/ui/button'
// import {PenBox } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import EmojiPicker from 'emoji-picker-react';
// import { useUser } from '@clerk/nextjs';
// import { Input } from '@/components/ui/input';
// import { db } from '@/utils/dbConfig';
// import { Budgets } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import { toast } from 'sonner';

// function EditBudget({budgetInfo,refreshData}) {

//   const { user } = useUser();
//   const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
//   const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
//   const [name, setName] = useState('');
//   const [amount, setAmount] = useState('');

//   useEffect(()=>{
//     if(budgetInfo)
//     {
//         setEmojiIcon(budgetInfo?.icon)
//         setAmount(budgetInfo?.amount)
//         setName(budgetInfo?.name)
//     }
//   },[budgetInfo])

//     const onUpdateBudget=async()=>{
//        if (!budgetInfo || !budgetInfo.id) {
//         console.error("Invalid or missing budgetInfo:", budgetInfo);
//         return;
//     }
//         const result = await db.update(Budgets).set({
//             name:name,
//             amount:Number(amount),
//             icon:emojiIcon,
//         }).where(eq(Budgets.id,budgetInfo.id))
//         .returning();

//         if(result)
//         {
//             refreshData();
//             toast('budget updated!');
//         }
//     }

//   return (
//     <div>
     
//         <Dialog>
//              <DialogTrigger asChild>
//                 <Button className='flex gap-2'><PenBox/>Edit</Button>
//              </DialogTrigger>
       
//              <DialogContent>
//                <DialogHeader>
//                  <DialogTitle>Update Budget</DialogTitle>
//                  <DialogDescription className="text-sm text-muted-foreground">
//                    Choose an emoji:
//                  </DialogDescription>
       
//                  <div className="mt-5">
//                    <Button
//                      variant="outline"
//                      className="text-lg"
//                      onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
//                    >
//                      {emojiIcon}
//                    </Button>
       
//                    {openEmojiPicker && (
//                      <div className="absolute z-50">
//                        <EmojiPicker
//                        open={openEmojiPicker}
//                          onEmojiClick={(e) => {
//                            setEmojiIcon(e.emoji);
//                            setOpenEmojiPicker(false);
//                          }}
//                        />
//                      </div>
//                    )}
       
//                    <div className="mt-2">
//                      <h2 className="text-black font-medium my-1">Update Budget </h2>
//                      <Input
//                        placeholder="e.g. Home Decor"
//                        defaultValue={budgetInfo?.name}
//                        onChange={(e) => setName(e.target.value)}
//                      />
//                    </div>
       
//                    <div className="mt-2">
//                      <h2 className="text-black font-medium my-1">Budget Amount</h2>
//                      <Input
//                        type="number"
//                        placeholder="e.g. 5000"
//                        defaultValue={budgetInfo?.amount}
//                        onChange={(e) => setAmount(e.target.value)}
//                      />
//                    </div>
//                  </div>
//                </DialogHeader>
       
//                <DialogFooter className="sm:justify-start">
//                  <DialogClose asChild>
//                    <Button
//                      disabled={!(name&&amount)}
//                      onClick={onUpdateBudget}
//                      className="mt-5 w-full"
//                    >
//                      Create Budget
//                    </Button>
//                  </DialogClose>
//                </DialogFooter>
//              </DialogContent>
//            </Dialog>
//     </div>
//   )
// }

// export default EditBudget

'use client';

import { Button } from '@/components/ui/button';
import { PenBox } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

function EditBudget({ budgetInfo, refreshData }) {
  const { user } = useUser();
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon ?? '🙂');
  const [name, setName] = useState(budgetInfo?.name ?? '');
  const [amount, setAmount] = useState(budgetInfo?.amount ?? '');

  useEffect(() => {
    if (!budgetInfo) return;
    setEmojiIcon((prev) => budgetInfo?.icon ?? prev);
    setAmount((prev) => (budgetInfo?.amount ?? prev));
    setName((prev) => budgetInfo?.name ?? prev);
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    if (!budgetInfo || !budgetInfo.id) {
      console.error('Invalid or missing budgetInfo:', budgetInfo);
      return;
    }
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: Number(amount),
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast('budget updated!');
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">Choose an emoji:</DialogDescription>

            <div className="mt-5">
              <Button variant="outline" className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                {emojiIcon}
              </Button>

              {openEmojiPicker && (
                <div className="absolute z-50">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Update Budget </h2>
                <Input placeholder="e.g. Home Decor" defaultValue={budgetInfo?.name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input type="number" placeholder="e.g. 5000" defaultValue={budgetInfo?.amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
            </div>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button disabled={!(name && amount)} onClick={onUpdateBudget} className="mt-5 w-full">
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
