import { X, Receipt } from "lucide-react";
import ExpenseForm from "./ExpenseForm";

const ExpenseFormModal = ({
  open,
  expense,
  onClose,
  onSubmit,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">

      <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-slate-700">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">

              <Receipt
                className="text-blue-600"
                size={26}
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold">

                {expense
                  ? "Edit Expense"
                  : "Add Expense"}

              </h2>

              <p className="text-sm text-gray-500">

                {expense
                  ? "Update your transaction"
                  : "Record a new transaction"}

              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}

        <div className="p-8">

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