import {
  X,
  Calendar,
  Tag,
  Building2,
  CreditCard,
  Wallet,
  StickyNote,
} from "lucide-react";

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-slate-700 p-4">
    <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
      <Icon size={20} className="text-blue-600" />
    </div>

    <div className="flex-1">
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium break-words">
        {value || "-"}
      </p>
    </div>
  </div>
);

const ExpenseDetailsDrawer = ({ expense, onClose }) => {
  if (!expense) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">

      <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto">

        {/* Header */}

        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 p-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Expense Details
            </h2>

            <p className="text-sm text-gray-500">
              Transaction information
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-6">

          {/* Amount */}

          <div className="rounded-3xl bg-gradient-to-r from-red-500 to-pink-500 text-white p-6">

            <p className="text-sm opacity-80">
              Total Amount
            </p>

            <h1 className="text-4xl font-bold mt-2">
              ₹{Number(expense.amount).toLocaleString()}
            </h1>

            <div className="mt-4 inline-flex rounded-full bg-white/20 px-4 py-1 text-sm">
              {expense.category}
            </div>

          </div>

          <DetailRow
            icon={Tag}
            label="Title"
            value={expense.title}
          />

          <DetailRow
            icon={Building2}
            label="Merchant"
            value={expense.merchant || "Unknown Merchant"}
          />

          <DetailRow
            icon={Wallet}
            label="Account"
            value={expense.account || "Cash"}
          />

          <DetailRow
            icon={CreditCard}
            label="Payment Method"
            value={expense.paymentMethod || "Not specified"}
          />

          <DetailRow
            icon={Calendar}
            label="Date"
            value={new Date(expense.date).toLocaleDateString()}
          />

          {expense.notes && (
            <div className="rounded-2xl border border-gray-200 dark:border-slate-700 p-5">

              <div className="flex items-center gap-2 mb-3">

                <StickyNote
                  size={18}
                  className="text-blue-600"
                />

                <h3 className="font-semibold">
                  Notes
                </h3>

              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-7">
                {expense.notes}
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ExpenseDetailsDrawer;