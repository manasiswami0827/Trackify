import { uuid } from "drizzle-orm/gel-core";
import { pgTable, serial, text, integer, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  icon: text("icon"),
  createdBy: uuid("createdBy").notNull(), 
});

export const Expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: integer('amount').notNull().default(0),
  budgetId: integer('budget_id').references(() => Budgets.id),
  createdAt:varchar('createdAt').notNull()
});


