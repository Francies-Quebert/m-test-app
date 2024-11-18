export type Expense = {
  id: number;
  category: string;
  amount: number;
  date: string;
};

export type Category = "Food" | "Travel" | "Shooping" | "All";

export type Intervals = "daily" | "weekly" | "monthly";
