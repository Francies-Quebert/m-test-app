import { Expense, Intervals } from "./types";
import { parse, format, startOfWeek, startOfMonth } from "date-fns";

export const sortExpensesByDate = (expenses: Expense[]): Expense[] => {
  return expenses.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

export const groupExpensesByInterval = (
  expenses: Expense[],
  interval: Intervals
) => {
  const grouped: { [key: string]: number } = {};

  expenses.forEach((expense) => {
    let key = "";

    switch (interval) {
      case "daily":
        key = format(
          parse(expense.date, "yyyy-MM-dd", new Date()),
          "yyyy-MM-dd"
        );
        break;
      case "weekly":
        key = format(
          startOfWeek(parse(expense.date, "yyyy-MM-dd", new Date())),
          "yyyy-MM-dd"
        );
        break;
      case "monthly":
        key = format(
          startOfMonth(parse(expense.date, "yyyy-MM-dd", new Date())),
          "yyyy-MM"
        );
        break;
    }

    if (grouped[key]) {
      grouped[key] += expense.amount;
    } else {
      grouped[key] = expense.amount;
    }
  });

  return Object.entries(grouped).map(([date, total]) => ({ date, total }));
};

export const captureErrorReason = (data: {
  category: string;
  amount: string;
  date: string;
}) => {
  const errors = {
    generic: "Please verify your",
  };

  if (!data.category) {
    return `${errors["generic"]} category`;
  }

  if (!data.amount || parseFloat(data.amount.toString()) <= 0) {
    return `${errors["generic"]} amount`;
  }

  if (new Date(data.date) > new Date()) {
    return `${errors["generic"]} date`;
  }

  return `${errors["generic"]} data`;
};

export const today = format(new Date(), "yyyy-MM-dd");
