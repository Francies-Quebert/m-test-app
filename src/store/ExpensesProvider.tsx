import { useState, ReactNode, useCallback } from "react";
import { Expense, Category, Intervals } from "../types";
import { ExpensesContext } from "./ExpensesContext";
import { today } from "../utils";

export const ExpensesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [interval, setInterval] = useState<Intervals>("daily");
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [category, setCategory] = useState<Category>("All");

  const addExpense = useCallback((expense: Expense) => {
    setExpenses((stateExpenses) => {
      const newExpenses = [...stateExpenses, expense].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      localStorage.setItem("expenses", JSON.stringify(newExpenses));
      return newExpenses;
    });
  }, []);

  const deleteExpense = useCallback((id: number) => {
    setExpenses((stateExpenses) => {
      const newExpenses = stateExpenses.filter((expense) => expense.id !== id);
      localStorage.setItem("expenses", JSON.stringify(newExpenses));
      return newExpenses;
    });
  }, []);

  const memoizedSetInterval = useCallback((interval: Intervals) => {
    setInterval(interval);
  }, []);

  const memoizedSetStartDate = useCallback(
    (date: string) => {
      if (date > today) {
        console.warn("Start date cannot be in the future.");
        return;
      }
      if (endDate && date > endDate) {
        console.warn("Start date cannot be later than the end date.");
        return;
      }
      setStartDate(date);
    },
    [endDate]
  );

  const memoizedSetEndDate = useCallback(
    (date: string) => {
      if (startDate > date) setStartDate(date);
      setEndDate(date);
    },
    [startDate]
  );

  const memoizedSetCategory = useCallback((category: Category) => {
    setCategory(category);
  }, []);

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        interval,
        setInterval: memoizedSetInterval,
        startDate,
        setStartDate: memoizedSetStartDate,
        endDate,
        setEndDate: memoizedSetEndDate,
        category,
        setCategory: memoizedSetCategory,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
