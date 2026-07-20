import { X, Calendar, Tag, Building2, CreditCard } from "lucide-react";

const ExpenseDetailsDrawer = ({ expense, onClose }) => {
  if (!expense) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">

      <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl h-full overflow-y-auto">

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-semibold">
            Expense Details
          </h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>

        </div>

        <div className="space-y-6 p-6">

          <div>
            <p className="text-sm text-gray-500">Title</p>
            <h3 className="text-xl font-bold">
              {expense.title}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-3xl font-bold text-red-600">
              ₹{Number(expense.amount).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Tag size={18} />
            <span>{expense.category}</span>
          </div>

          <div className="flex items-center gap-3">
            <Building2 size={18} />
            <span>{expense.merchant || "Unknown Merchant"}</span>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard size={18} />
            <span>{expense.account || "Cash"}</span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={18} />
            <span>
              {new Date(expense.date).toLocaleDateString()}
            </span>
          </div>

          {expense.notes && (
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Notes
              </p>

              <div className="rounded-xl bg-gray-100 dark:bg-slate-800 p-4">
                {expense.notes}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ExpenseDetailsDrawer;