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
import VoiceExpenseRecorder from "../components/voice/VoiceExpenseRecorder";
import { motion } from "framer-motion";

const ExpenseSkeletons = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {[0, 1, 2, 3].map((item) => <div key={item} className="h-40 animate-pulse rounded-3xl border border-slate-700/40 bg-[#131A2A] p-6"><div className="h-4 w-24 rounded bg-slate-700" /><div className="mt-5 h-8 w-32 rounded bg-slate-700" /><div className="mt-5 h-3 w-20 rounded bg-slate-800" /></div>)}
  </div>
);

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
    loading,
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
    let success;
    if (editingExpense) {
      success = await updateExpense(editingExpense._id, payload);
    } else {
      success = await createExpense(payload);
    }

    if (success) closeModal();
  };

  return (
  <div className="min-h-screen bg-[#0B1120]">
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8">

      <ExpenseHeader
        onAddExpense={openCreateModal}
        totalExpenses={filteredExpenses.length}
      />

      {/* Voice Recorder + Tips */}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <VoiceExpenseRecorder createExpense={createExpense} />
        </div>

        <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-5 sm:p-6">

          <h3 className="text-lg font-bold text-white sm:text-xl">
            Voice Expense Tips
          </h3>

          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Speak naturally. Examples:
          </p>

          <div className="mt-5 space-y-3">

            <div className="rounded-xl bg-slate-900/60 p-3 text-sm text-slate-300 sm:text-base">
              🎤 I spent ₹450 on groceries today.
            </div>

            <div className="rounded-xl bg-slate-900/60 p-3 text-sm text-slate-300 sm:text-base">
              🎤 Paid ₹300 for petrol.
            </div>

            <div className="rounded-xl bg-slate-900/60 p-3 text-sm text-slate-300 sm:text-base">
              🎤 Coffee cost ₹220.
            </div>

            <div className="rounded-xl bg-slate-900/60 p-3 text-sm text-slate-300 sm:text-base">
              🎤 Bought shoes for ₹2499.
            </div>

          </div>

        </div>

      </motion.div>

      {loading ? <ExpenseSkeletons /> : expenses.length === 0 ? (
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
