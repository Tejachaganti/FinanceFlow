import {
  ShoppingBag,
  Utensils,
  Car,
  Home,
  Film,
  HeartPulse,
  Wallet,
  ArrowUpRight,
} from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/formatters";

const categoryIcons = {
  Food: <Utensils size={18} />,
  Shopping: <ShoppingBag size={18} />,
  Transport: <Car size={18} />,
  Home: <Home size={18} />,
  Entertainment: <Film size={18} />,
  Healthcare: <HeartPulse size={18} />,
};

const RecentTransactions = ({ expenses = [], currency }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Recent Transactions
          </h2>

          <p className="text-sm text-slate-400">
            {expenses.length} transactions
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-500/20 p-3 text-indigo-400">
          <Wallet size={22} />
        </div>
      </div>

      <div className="space-y-4">

        {expenses.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 py-10 text-center text-slate-400">
            No transactions yet.
          </div>
        )}

        {expenses.slice(0, 6).map((expense) => (
          <div
            key={expense._id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 p-4 transition-all duration-300 hover:border-indigo-500 hover:bg-slate-900/70"
          >
            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-indigo-500/20 p-3 text-indigo-400">
                {categoryIcons[expense.category] || <ShoppingBag size={18} />}
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  {expense.title}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <span>{expense.category}</span>
                  <span>•</span>
                  <span>{formatDate(expense.date)}</span>
                </div>
              </div>

            </div>

            <div className="text-right">

              <div className="flex items-center justify-end gap-1 text-rose-400 font-bold">
                <ArrowUpRight size={16} />
                {formatCurrency(expense.amount, currency)}
              </div>

              <span className="mt-1 inline-block rounded-full bg-rose-500/20 px-2 py-1 text-xs text-rose-300">
                Expense
              </span>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default RecentTransactions;