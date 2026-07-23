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
    <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-5 sm:p-6 lg:p-8">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Transactions
          </p>

          <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
            Recent Transactions
          </h2>

          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            {expenses.length} recent transactions
          </p>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 sm:h-16 sm:w-16">

          <Wallet
            size={24}
            className="text-white"
          />

        </div>

      </div>
            {/* Empty State */}

      {!expenses.length && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 px-6 py-12 sm:py-16">

          <Wallet
            size={38}
            className="mb-5 text-slate-500"
          />

          <h3 className="text-lg font-semibold text-white sm:text-xl">
            No Transactions Yet
          </h3>

          <p className="mt-3 max-w-md text-center text-sm text-slate-400 sm:text-base">
            Your recent expenses will appear here once you start tracking your spending.
          </p>

        </div>
      )}

      {/* Transactions */}

      {!!expenses.length && (
        <div className="space-y-4">

          {expenses.slice(0, 6).map((expense) => (

            <div
              key={expense._id}
              className="rounded-3xl border border-slate-700 bg-slate-900/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 sm:p-5"
            >

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                {/* Left */}

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 sm:h-14 sm:w-14">

                    {categoryIcons[expense.category] || (
                      <ShoppingBag size={18} />
                    )}

                  </div>

                  <div className="min-w-0">

                    <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                      {expense.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {expense.category} • {formatDate(expense.date)}
                    </p>

                  </div>

                </div>

                {/* Right */}

                <div className="flex flex-col items-start sm:items-end">

                  <div className="flex flex-wrap items-center gap-2 text-lg font-bold text-rose-400 sm:text-xl">

                    <ArrowUpRight size={18} />

                    <span className="break-all">
                      {formatCurrency(expense.amount, currency)}
                    </span>

                  </div>

                  <span className="mt-3 inline-flex w-fit rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-300">
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