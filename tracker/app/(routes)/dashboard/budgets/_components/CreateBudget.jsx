'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { toast } from 'sonner'; 

function CreateBudget({ refreshData }) {
  const { user } = useUser();

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState('🙂');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const onCreateBudget = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("User email not found.");
      return;
    }

    const result = await db.insert(Budgets)
      .values({
        name: name,
        amount: parseFloat(amount),
        createdBy: user.primaryEmailAddress.emailAddress.toLowerCase(),
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      toast('New Budget Created!');
      refreshData?.();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md"
        >
          <span className="text-3xl">+</span>
          <span>Create New Budget</span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Choose an emoji:
          </DialogDescription>

          <div className="mt-5">
            <Button
              variant="outline"
              className="text-lg"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
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
              <h2 className="text-black font-medium my-1">Budget Name</h2>
              <Input
                placeholder="e.g. Home Decor"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Amount</h2>
              <Input
                type="number"
                placeholder="e.g. 5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              disabled={!(name && amount)}
              onClick={onCreateBudget}
              className="mt-5 bg-purple-600 w-full"
            >
              Create Budget
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBudget;
