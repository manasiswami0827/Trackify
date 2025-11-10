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
import { Budgets, Expenses } from '@/utils/schema';
import { eq, sum } from 'drizzle-orm';
import { toast } from 'sonner';

function EditBudget({ budgetInfo, refreshData }) {
  const { user } = useUser();
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon ?? '🙂');
  const [name, setName] = useState(budgetInfo?.name ?? '');
  const [amount, setAmount] = useState(budgetInfo?.amount ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo.icon ?? '🙂');
      setAmount(budgetInfo.amount ?? '');
      setName(budgetInfo.name ?? '');
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    try {
      if (!budgetInfo || !budgetInfo.id) {
        toast.error('Invalid budget information.');
        return;
      }

      const newAmount = Number(amount);

      if (isNaN(newAmount) || newAmount <= 0) {
        toast.error('⚠️ Please enter a valid positive amount.');
        return;
      }

      setIsSubmitting(true);

      const totalSpent = await db
        .select({ total: sum(Expenses.amount) })
        .from(Expenses)
        .where(eq(Expenses.budgetId, budgetInfo.id));

      const spent = totalSpent[0]?.total ?? 0;

      if (newAmount < spent) {
        toast.error(
          ` Invalid update! You've already spent ₹${spent}, which exceeds your entered budget ₹${newAmount}.`,
          {
            description: 'Please enter an amount higher than your current spending.',
            duration: 5000,
          }
        );
        setIsSubmitting(false);
        return;
      }

      const result = await db
        .update(Budgets)
        .set({
          name,
          amount: newAmount,
          icon: emojiIcon,
        })
        .where(eq(Budgets.id, budgetInfo.id))
        .returning();

      if (result) {
        refreshData();
        toast.success('Budget updated successfully!', {
          description: `Your new limit is ₹${newAmount}.`,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while updating the budget.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex hover:bg-purple-700 bg-purple-600 gap-2">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
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
                <h2 className="text-black font-medium my-1">Update Budget</h2>
                <Input
                  placeholder="e.g. Home Decor"
                  defaultValue={budgetInfo?.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g. 5000"
                  defaultValue={budgetInfo?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
           
            <Button
              disabled={!(name && amount) || isSubmitting}
              onClick={onUpdateBudget}
              className="mt-5 bg-purple-600 w-full"
            >
              {isSubmitting ? 'Updating...' : 'Update Budget'}
            </Button>

            <DialogClose asChild>
              <Button variant="secondary" className="mt-5 w-full">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
