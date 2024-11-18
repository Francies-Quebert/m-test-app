import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { groupExpensesByInterval } from "../../../utils";
import useExpensesContext from "../../../hooks/useExpensesContext";
import DataFilter from "../DataFilter";
import useFilteredExpenses from "../../../hooks/useFilteredExpenses";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const ExpenseChart = () => {
  const { interval } = useExpensesContext();
  const filteredExpense = useFilteredExpenses();
  const groupedExpenses = groupExpensesByInterval(filteredExpense, interval);

  const data = {
    labels: groupedExpenses.map((expense) => expense.date),
    datasets: [
      {
        label: "Expenses",
        data: groupedExpenses.map((expense) => expense.total),
        fill: false,
        backgroundColor: "rgb(34, 197, 94)",
        borderColor: "rgb(34, 197, 94)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Amount (£)" } },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-green-700">
          Expenses Over Time
        </h3>
      </div>
      <DataFilter />
      <div style={{ height: "300px", width: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
export default ExpenseChart;
