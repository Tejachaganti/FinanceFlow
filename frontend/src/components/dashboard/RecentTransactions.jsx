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

import {
  formatCurrency,
  formatDate,
} from "../../utils/formatters";

const categoryIcons = {
  Food: <Utensils size={18} />,
  Shopping: <ShoppingBag size={18} />,
  Transport: <Car size={18} />,
  Home: <Home size={18} />,
  Entertainment: <Film size={18} />,
  Healthcare: <HeartPulse size={18} />,
};

const RecentTransactions = ({
  expenses = [],
  currency,
}) => {
  return (
    <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">

            Transactions

          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">

            Recent Transactions

          </h2>

          <p className="mt-2 text-slate-400">

            {expenses.length} recent transactions

          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

          <Wallet
            size={28}
            className="text-white"
          />

        </div>

      </div>

      {/* Empty */}

      {!expenses.length && (

        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 py-16">

          <Wallet
            size={42}
            className="mb-5 text-slate-500"
          />

          <h3 className="text-xl font-semibold text-white">

            No Transactions Yet

          </h3>

          <p className="mt-3 max-w-sm text-center text-slate-400">

            Your recent expenses will appear here once
            you start tracking your spending.

          </p>

        </div>

      )}

      {/* Transactions */}

      {!!expenses.length && (

        <div className="space-y-4">

          {expenses.slice(0, 6).map((expense) => (

            <div
              key={expense._id}
              className="rounded-3xl border border-slate-700 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

                    {categoryIcons[expense.category] || (
                      <ShoppingBag size={18} />
                    )}

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-white">

                      {expense.title}

                    </h3>

                    <p className="mt-2 text-sm text-slate-400">

                      {expense.category} • {formatDate(expense.date)}

                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <div className="flex items-center justify-end gap-2 text-xl font-bold text-rose-400">

                    <ArrowUpRight size={18} />

                    {formatCurrency(
                      expense.amount,
                      currency
                    )}

                  </div>

                  <span className="mt-3 inline-flex rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-300">

                    Expense

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
};

export default RecentTransactions;