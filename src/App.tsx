import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/Expense/List";
import ExpenseChart from "./components/Expense/Chart";
import ExpenseSummary from "./components/Expense/Summary";
import useExpensesContext from "./hooks/useExpensesContext";
import { useEffect } from "react";

const App = () => {
  const { expenses, setStartDate } = useExpensesContext();
  useEffect(() => {
    if (expenses.length > 0) setStartDate(expenses[0].date);
  }, [expenses, setStartDate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 p-4">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          Personal Finance Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1.5">
            <ExpenseForm />
            {expenses.length > 0 && <ExpenseSummary />}
          </div>
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <ExpenseChart />
            <ExpenseList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
