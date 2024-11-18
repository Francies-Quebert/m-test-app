import { useMemo } from "react";
import useExpensesContext from "./useExpensesContext";

const useFilteredExpenses = () => {
  const { expenses, startDate, endDate, category } = useExpensesContext();

  const filteredExpenses = useMemo(() => {
    let result = expenses;

    // Filter by date range
    if (startDate && endDate) {
      result = result.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate)
        );
      });
    }

    // Filter by category
    if (category && category !== "All") {
      result = result.filter((expense) => expense.category === category);
    }

    return result;
  }, [expenses, category, startDate, endDate]);

  return filteredExpenses;
};

export default useFilteredExpenses;
