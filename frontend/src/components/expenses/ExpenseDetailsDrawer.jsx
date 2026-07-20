import {
  X,
  Calendar,
  Tag,
  Building2,
  CreditCard,
  Wallet,
  StickyNote,
  Receipt,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatters";

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 transition hover:border-cyan-500/40">
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
      <Icon
        size={20}
        className="text-white"
      />
    </div>

    <div className="flex-1">

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-white">
        {value || "-"}
      </p>

    </div>

  </div>
);

const ExpenseDetailsDrawer = ({
  expense,
  currency,
  onClose,
}) => {
  if (!expense) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md">

      {/* Drawer */}

      <div className="h-full w-full max-w-md overflow-y-auto border-l border-slate-700 bg-[#131A2A] shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-10 border-b border-slate-700 bg-[#131A2A]/95 px-6 py-5 backdrop-blur">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">

                <Receipt
                  className="text-white"
                  size={22}
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-white">
                  Expense Details
                </h2>

                <p className="text-sm text-slate-400">
                  Transaction Information
                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-red-500 hover:text-white"
            >
              <X size={20} />
            </button>

          </div>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          {/* Amount Card */}

          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 p-6 shadow-xl">

            <p className="text-sm text-white/80">
              Total Expense
            </p>

            <h1 className="mt-2 text-4xl font-bold text-white">
              {formatCurrency(
                expense.amount,
                currency
              )}
            </h1>

            <div className="mt-5 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">

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
            value={
              expense.merchant ||
              "Unknown Merchant"
            }
          />

          <DetailRow
            icon={Wallet}
            label="Account"
            value={
              expense.account ||
              "Cash"
            }
          />

          <DetailRow
            icon={CreditCard}
            label="Payment Method"
            value={
              expense.paymentMethod ||
              "Not Specified"
            }
          />

          <DetailRow
            icon={Calendar}
            label="Date"
            value={new Date(
              expense.date
            ).toLocaleDateString()}
          />

          {expense.notes && (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">

              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">

                  <StickyNote
                    size={18}
                    className="text-white"
                  />

                </div>

                <h3 className="font-semibold text-white">
                  Notes
                </h3>

              </div>

              <p className="leading-7 text-slate-300">
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