import { useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import useFinance from "../hooks/useFinance";

import ExpenseHeader from "../components/expenses/ExpenseHeader";
import ExpenseSummary from "../components/expenses/ExpenseSummary";
import TransactionToolbar from "../components/expenses/TransactionToolbar";
import TransactionList from "../components/expenses/TransactionList";
import ExpenseAnalytics from "../components/expenses/ExpenseAnalytics";
import ExpenseFormModal from "../components/expenses/ExpenseFormModal";
import ExpenseDetailsDrawer from "../components/expenses/ExpenseDetailsDrawer";
import EmptyExpenseState from "../components/expenses/EmptyExpenseState";

const defaultFilters = {
  search: "",
  category: "All",
  merchant: "All",
  account: "All",
  priority: "All",
  tags: [],
  startDate: "",
  endDate: "",
  sortBy: "date",
};

const ExpensesPage = () => {
  const { user } = useAuth();

  const {
    expenses,
    createExpense,
    updateExpense,
    deleteExpense,
  } = useFinance();

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedExpense, setSelectedExpense] = useState(null);

  const [editingExpense, setEditingExpense] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredExpenses = useMemo(() => {
    let data = [...expenses];

    if (filters.search.trim()) {
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
        (expense) =>
          expense.category === filters.category
      );
    }

    if (filters.merchant !== "All") {
      data = data.filter(
        (expense) =>
          expense.merchant === filters.merchant
      );
    }

    if (filters.account !== "All") {
      data = data.filter(
        (expense) =>
          expense.account === filters.account
      );
    }

    if (filters.priority !== "All") {
      data = data.filter(
        (expense) =>
          expense.priority === filters.priority
      );
    }

    if (filters.startDate) {
      data = data.filter(
        (expense) =>
          new Date(expense.date) >=
          new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      data = data.filter(
        (expense) =>
          new Date(expense.date) <=
          new Date(filters.endDate)
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

  const openCreateModal = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingExpense(null);
    setIsModalOpen(false);
  };

  const handleSave = async (payload) => {
    if (editingExpense) {
      await updateExpense(editingExpense._id, payload);
    } else {
      await createExpense(payload);
    }

    closeModal();
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">

        <ExpenseHeader
          onAddExpense={openCreateModal}
          totalExpenses={filteredExpenses.length}
        />

        {expenses.length === 0 ? (
          <EmptyExpenseState
            onCreate={openCreateModal}
          />
        ) : (
          <>
            <ExpenseSummary
              expenses={filteredExpenses}
              currency={user?.currency}
            />

            <TransactionToolbar
              filters={filters}
              setFilters={setFilters}
              onAddExpense={openCreateModal}
            />

            <TransactionList
              expenses={filteredExpenses}
              currency={user?.currency}
              onSelect={setSelectedExpense}
              onEdit={openEditModal}
              onDelete={deleteExpense}
            />

            <ExpenseAnalytics
              expenses={filteredExpenses}
              currency={user?.currency}
            />
          </>
        )}

        <ExpenseFormModal
          open={isModalOpen}
          expense={editingExpense}
          onClose={closeModal}
          onSubmit={handleSave}
        />

        <ExpenseDetailsDrawer
          expense={selectedExpense}
          currency={user?.currency}
          onClose={() => setSelectedExpense(null)}
        />

      </div>
    </div>
  );
};

export default ExpensesPage;