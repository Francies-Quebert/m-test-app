import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ExpensesProvider } from "./store/ExpensesProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExpensesProvider>
      <App />
    </ExpensesProvider>
  </StrictMode>
);
