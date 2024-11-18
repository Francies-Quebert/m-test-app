import { useState, useMemo, useEffect } from "react";
import useExpensesContext from "../../../hooks/useExpensesContext";
import useFilteredExpenses from "../../../hooks/useFilteredExpenses";

const ITEMS_PER_PAGE = 5;

const ExpenseList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { deleteExpense } = useExpensesContext();
  const filteredExpense = useFilteredExpenses();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredExpense]);

  const paginatedExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredExpense.slice(startIndex, endIndex);
  }, [currentPage, filteredExpense]);

  const totalPages = Math.ceil(filteredExpense.length / ITEMS_PER_PAGE);

  return (
    <div>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Amount</th>
            <th className="py-2 px-4 border-b text-left">Category</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedExpenses.map((expense) => (
            <tr key={expense.id} className="bg-white hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-left">{expense.date}</td>
              <td className="py-2 px-4 border-b text-left">
                £{expense.amount.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b text-left">
                {expense.category}
              </td>
              <td className="py-2 px-4 border-b text-left">
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
