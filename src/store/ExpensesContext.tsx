import { createContext } from "react";
import { Category, Expense, Intervals } from "../types";

interface ExpensesContextProps {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: number) => void;
  interval: Intervals;
  setInterval: (interval: Intervals) => void;
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  category: Category;
  setCategory: (category: Category) => void;
}

export const ExpensesContext = createContext<ExpensesContextProps | undefined>(
  undefined
);
