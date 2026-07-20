import {
  Download,
  Plus,
  Receipt,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const ExpenseHeader = ({ onAddExpense, totalExpenses = 0 }) => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-xl">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="space-y-4">

          <div className="flex items-center gap-2 text-sm text-slate-500">

            <span>Dashboard</span>

            <ChevronRight size={14} />

            <span className="text-cyan-400 font-medium">
              Expenses
            </span>

          </div>

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

              <Receipt className="h-8 w-8 text-white" />

            </div>

            <div>

              <h1 className="text-3xl lg:text-4xl font-bold text-white">

                Expenses & Transactions

              </h1>

              <p className="mt-2 text-slate-400 max-w-2xl">

                Track, organize and analyse every transaction,
                monitor spending trends and gain AI-powered
                financial insights.

              </p>

            </div>

          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm">

            <div className="flex items-center gap-2 text-slate-400">

              <CalendarDays size={16} />

              {today}

            </div>

            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-cyan-400">

              {totalExpenses} Transactions

            </span>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-4">

          <button className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/50 px-5 py-3 text-slate-200 transition hover:border-slate-600 hover:bg-slate-800">

            <Download size={18} />

            Export

          </button>

          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >

            <Plus size={18} />

            Add Expense

          </button>

        </div>

      </div>

    </section>
  );
};

export default ExpenseHeader;