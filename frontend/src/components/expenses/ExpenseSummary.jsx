import {
  IndianRupee,
  CalendarDays,
  TrendingUp,
  Receipt,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatters";

const ExpenseSummary = ({ expenses, currency }) => {
  const today = new Date();

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const todaySpent = expenses
    .filter(
      (expense) =>
        new Date(expense.date).toDateString() === today.toDateString()
    )
    .reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );

  const monthSpent = expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );

  const averageExpense =
    expenses.length > 0
      ? totalSpent / expenses.length
      : 0;

  const cards = [
    {
      title: "Total Spent",
      value: formatCurrency(totalSpent, currency),
      subtitle: `${expenses.length} Transactions`,
      icon: IndianRupee,
      color: "from-rose-500 to-pink-600",
    },
    {
      title: "Today's Spend",
      value: formatCurrency(todaySpent, currency),
      subtitle: "Updated Today",
      icon: CalendarDays,
      color: "from-sky-500 to-cyan-600",
    },
    {
      title: "This Month",
      value: formatCurrency(monthSpent, currency),
      subtitle: "Current Billing Cycle",
      icon: TrendingUp,
      color: "from-violet-500 to-indigo-600",
    },
    {
      title: "Average Expense",
      value: formatCurrency(averageExpense, currency),
      subtitle: "Average Per Transaction",
      icon: Receipt,
      color: "from-emerald-500 to-green-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-3xl border border-slate-700/40 bg-[#131A2A] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10"
          >
            {/* Top Accent */}
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.color}`}
            />

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                  {card.value}
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <Icon className="text-white" size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ExpenseSummary;