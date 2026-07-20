import { useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import useFinance from "../hooks/useFinance";

import ExpenseSummary from "../components/expenses/ExpenseSummary";
import TransactionToolbar from "../components/expenses/TransactionToolbar";
import TransactionList from "../components/expenses/TransactionList";
import ExpenseFormModal from "../components/expenses/ExpenseFormModal";
import ExpenseDetailsDrawer from "../components/expenses/ExpenseDetailsDrawer";
import ExpenseAnalytics from "../components/expenses/ExpenseAnalytics";
import EmptyExpenseState from "../components/expenses/EmptyExpenseState";

const ExpensesPage = () => {
  const { user } = useAuth();

  const {
    expenses,
    createExpense,
    updateExpense,
    deleteExpense,
  } = useFinance();

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    merchant: "All",
    account: "All",
    priority: "All",
    tags: [],
    startDate: "",
    endDate: "",
    sortBy: "date",
  });

  const filteredExpenses = useMemo(() => {
    let data = [...expenses];

    if (filters.search) {
      const keyword = filters.search.toLowerCase();

      data = data.filter((expense) =>
        [
          expense.title,
          expense.merchant,
          expense.category,
          expense.notes,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword)
      );
    }

    if (filters.category !== "All") {
      data = data.filter(
        (expense) => expense.category === filters.category
      );
    }

    if (filters.merchant !== "All") {
      data = data.filter(
        (expense) => expense.merchant === filters.merchant
      );
    }

    if (filters.account !== "All") {
      data = data.filter(
        (expense) => expense.account === filters.account
      );
    }

    if (filters.priority !== "All") {
      data = data.filter(
        (expense) => expense.priority === filters.priority
      );
    }

    if (filters.startDate) {
      data = data.filter(
        (expense) =>
          new Date(expense.date) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      data = data.filter(
        (expense) =>
          new Date(expense.date) <= new Date(filters.endDate)
      );
    }

    data.sort((a, b) => {
      switch (filters.sortBy) {
        case "amount":
          return b.amount - a.amount;

        case "title":
          return a.title.localeCompare(b.title);

        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return data;
  }, [expenses, filters]);

  const handleSave = async (payload) => {
    if (editingExpense) {
      await updateExpense(editingExpense._id, payload);
    } else {
      await createExpense(payload);
    }

    setEditingExpense(null);
    setIsModalOpen(false);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  if (!expenses.length) {
    return (
      <EmptyExpenseState
        onCreate={() => setIsModalOpen(true)}
      />
    );
  }

  return (
    <div className="space-y-6">

      <ExpenseSummary
        expenses={filteredExpenses}
        currency={user?.currency}
      />

      <TransactionToolbar
        filters={filters}
        setFilters={setFilters}
        onAddExpense={() => {
          setEditingExpense(null);
          setIsModalOpen(true);
        }}
      />

      <ExpenseAnalytics
        expenses={filteredExpenses}
      />

      <TransactionList
        expenses={filteredExpenses}
        currency={user?.currency}
        onSelect={setSelectedExpense}
        onEdit={handleEdit}
        onDelete={deleteExpense}
      />

      <ExpenseFormModal
        open={isModalOpen}
        expense={editingExpense}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
      />

      <ExpenseDetailsDrawer
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
      />

    </div>
  );
};

export default ExpensesPage;