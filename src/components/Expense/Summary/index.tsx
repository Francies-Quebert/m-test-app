import { useState, useEffect, useMemo } from "react";
import { groupExpensesByInterval } from "../../../utils";
import useExpensesContext from "../../../hooks/useExpensesContext";

const ExpenseSummary = () => {
  const [groupedExpenses, setGroupedExpenses] = useState<
    { date: string; total: number }[]
  >([]);

  const { expenses, interval } = useExpensesContext();

  const totalSpending = useMemo(
    () => groupedExpenses.reduce((sum, expense) => sum + expense.total, 0),
    [groupedExpenses]
  );

  useEffect(() => {
    const grouped = groupExpensesByInterval(expenses, interval);
    setGroupedExpenses(grouped);
  }, [expenses, interval]);

  return (
    <div className="p-2 bg-gradient-to-r from-green-100 to-orange-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-green-700 mb-1 text-center">
        Spending Summary ({interval.charAt(0).toUpperCase() + interval.slice(1)}
        )
      </h2>
      <ul className="text-left bg-white rounded-lg shadow-md p-2">
        {groupedExpenses.map((expense, index) => (
          <li
            key={expense.date}
            className={`mb-2 flex justify-between items-center p-2 ${
              index !== 0 ? "border-t" : ""
            } border-gray-200`}
          >
            <span className="text-green-700 text-xs">{expense.date}</span>
            <span className="text-blue-500 font-semibold text-xs">
              £{expense.total.toFixed(2)}
            </span>
          </li>
        ))}
        <li className="mt-1 pt-1 flex justify-between items-center border-t border-gray-300">
          <span className="text-green-700 font-bold text-sm">Total</span>
          <span className="text-blue-500 font-bold text-sm">
            £{totalSpending.toFixed(2)}
          </span>
        </li>
      </ul>
      <div className="mt-1 text-green-600 text-xs text-center">
        <p>Number of Transactions: {expenses.length}</p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
