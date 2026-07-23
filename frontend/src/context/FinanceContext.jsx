import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { AuthContext } from "./AuthContext.jsx";

export const FinanceContext = createContext(null);

const getErrorMessage = (error, fallback) => error?.response?.data?.message || fallback;

export const FinanceProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState([]);
  const [income, setIncome] = useState([]);
  const [snapshot, setSnapshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFinanceData = async () => {
    if (!localStorage.getItem("financeflow_token")) return;

    setLoading(true);
    try {
      const [expensesRes, budgetRes, analyticsRes, insightsRes, incomeRes, snapshotRes] = await Promise.all([
        api.get("/expenses"),
        api.get("/budgets"),
        api.get("/analytics"),
        api.get("/analytics/insights"),
        api.get("/profile/income"),
        api.get("/budgets/snapshot")
      ]);

      setExpenses(expensesRes.data.expenses);
      setBudget(budgetRes.data.budget);
      setAnalytics(analyticsRes.data.analytics);
      setInsights(insightsRes.data.insights);
      setIncome(incomeRes.data.incomes);
      setSnapshot(snapshotRes.data.snapshot);
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to load finance data"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFinanceData();
      return;
    }

    setExpenses([]);
    setBudget(null);
    setAnalytics(null);
    setInsights([]);
    setIncome([]);
    setSnapshot(null);
  }, [user]);

  const createExpense = async (formData) => {
    try {
      await api.post("/expenses", formData, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Expense added");
      await fetchFinanceData();
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to add expense"));
      return false;
    }
  };

  const updateExpense = async (id, formData) => {
    try {
      await api.put(`/expenses/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Expense updated");
      await fetchFinanceData();
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to update expense"));
      return false;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      toast.success("Expense deleted");
      await fetchFinanceData();
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to delete expense"));
      return false;
    }
  };

  const saveBudget = async (values) => {
    try {
      await api.put("/budgets", values);
      toast.success("Budget updated");
      await fetchFinanceData();
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to update budget"));
      return false;
    }
  };

  const createIncome = async (values) => {
    try {
      await api.post("/profile/income", values);
      toast.success("Income added");
      await fetchFinanceData();
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to add income"));
      return false;
    }
  };

  const exportReport = async (type) => {
    try {
      const response = await api.get(`/analytics/export/${type}`, { responseType: "blob" });
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = type === "csv" ? "expenses-report.csv" : "finance-report.pdf";
      link.click();
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, `Unable to export ${type.toUpperCase()} report`));
      return false;
    }
  };
  const dashboard = useMemo(() => {
  const totalIncome = income.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const balance = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0
      ? Number(((balance / totalIncome) * 100).toFixed(1))
      : 0;

 const monthlyBudget =
  budget?.monthlyBudget ??
  snapshot?.monthlyBudget ??
  0;

  const currentPeriodExpenses = snapshot?.spent ?? totalExpenses;
  const remainingBudget = monthlyBudget - currentPeriodExpenses;

  const financialHealth =
    totalIncome === 0
      ? 45
      : Math.min(
          100,
          Math.max(
            0,
            Math.round((balance / totalIncome) * 100)
          )
        );

 return {
  totalIncome,
  totalExpenses,
  currentPeriodExpenses,
  balance,
  savingsRate,
  monthlyBudget,
  remainingBudget,
  financialHealth,
};
}, [income, expenses, budget, snapshot]);
  const value = useMemo(
  () => ({
    expenses,
    budget,
    analytics,
    insights,
    income,
    snapshot,
    dashboard,
    loading,

    fetchFinanceData,
    createExpense,
    updateExpense,
    deleteExpense,
    saveBudget,
    createIncome,
    exportReport,

    // Optional
    setIncome,
  }),
  [
    expenses,
    budget,
    analytics,
    insights,
    income,
    snapshot,
    dashboard,
    loading,
  ]
);
  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};
