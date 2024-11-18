import React, { useState } from "react";
import Select from "../Form/Select";
import SubmitButton from "../Form/Submit";
import { format } from "date-fns";
import { captureErrorReason } from "../../utils";
import { categoriesData } from "../../mockData/data";
import useExpensesContext from "../../hooks/useExpensesContext";

const ExpenseForm = () => {
  const [category, setCategory] = useState(categoriesData[1].value);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const { addExpense } = useExpensesContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !category ||
      !amount ||
      !date ||
      parseFloat(amount) <= 0 ||
      new Date(date) > new Date()
    ) {
      alert(captureErrorReason({ category, amount, date }));
      return;
    }

    addExpense({ id: Date.now(), category, amount: parseFloat(amount), date });
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 bg-green-50 rounded-lg shadow-md"
    >
      <div className="mb-2">
        <Select
          label="Category"
          dataList={categoriesData.filter((cat) => cat.value !== "All")}
          value={category}
          onChange={setCategory}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount:
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          step="0.01"
          min={0}
          placeholder="0.00"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date:
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <SubmitButton label="Add Expense" />
    </form>
  );
};

export default ExpenseForm;
