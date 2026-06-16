import { useMemo, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseTable from "../components/expenses/ExpenseTable";
import FilterBar from "../components/expenses/FilterBar";
import useAuth from "../hooks/useAuth";
import useFinance from "../hooks/useFinance";

const ExpensesPage = () => {
  const { user } = useAuth();
  const { expenses, createExpense, updateExpense, deleteExpense } = useFinance();
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({ search: "", category: "All", startDate: "", endDate: "", sortBy: "date" });

  const filteredExpenses = useMemo(() => {
    let result = [...(expenses || [])];

    if (filters.search) {
      result = result.filter((item) => item.title.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.category !== "All") {
      result = result.filter((item) => item.category === filters.category);
    }
    if (filters.startDate) {
      result = result.filter((item) => new Date(item.date) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      result = result.filter((item) => new Date(item.date) <= new Date(filters.endDate));
    }

    result.sort((a, b) => (filters.sortBy === "amount" ? b.amount - a.amount : new Date(b.date) - new Date(a.date)));
    return result;
  }, [expenses, filters]);

  const handleSubmit = async (payload) => {
    if (editingExpense) {
      await updateExpense(editingExpense._id, payload);
      setEditingExpense(null);
      return;
    }
    await createExpense(payload);
  };

  return (
    <div className="space-y-4">
      <SectionHeading title="Expense management" subtitle="Capture daily spending, receipts, recurring records, and searchable transaction history." />
      <ExpenseForm onSubmit={handleSubmit} editingExpense={editingExpense} onCancel={() => setEditingExpense(null)} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <ExpenseTable expenses={filteredExpenses} currency={user?.currency} onEdit={setEditingExpense} onDelete={deleteExpense} />
    </div>
  );
};

export default ExpensesPage;
