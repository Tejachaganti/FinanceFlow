import {
  X,
  Receipt,
} from "lucide-react";

import ExpenseForm from "./ExpenseForm";

const ExpenseFormModal = ({
  open,
  expense,
  onClose,
  onSubmit,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md">

      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-[#131A2A] shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-10 border-b border-slate-700 bg-[#131A2A]/95 px-8 py-6 backdrop-blur">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

                <Receipt
                  size={26}
                  className="text-white"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">

                  {expense
                    ? "Edit Expense"
                    : "Add Expense"}

                </h2>

                <p className="mt-1 text-sm text-slate-400">

                  {expense
                    ? "Update your expense details"
                    : "Create a new expense record"}

                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition-all duration-300 hover:bg-red-500 hover:text-white"
            >
              <X size={20} />
            </button>

          </div>

        </div>

        {/* Scrollable Form */}

        <div className="flex-1 overflow-y-auto p-8">

          <ExpenseForm
            editingExpense={expense}
            onSubmit={onSubmit}
            onCancel={onClose}
          />

        </div>

      </div>

    </div>
  );
};

export default ExpenseFormModal;