import { useContext } from "react";
import { ExpensesContext } from "../store/ExpensesContext";

const useExpensesContext = () => {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error(
      "useExpensesContext must be used within an ExpensesProvider"
    );
  }

  return context;
};

export default useExpensesContext;
