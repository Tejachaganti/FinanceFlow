import {
  IndianRupee,
  CreditCard,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

const ExpenseSummary = ({ expenses, currency = "₹" }) => {
  const now = new Date();

  const totalSpent = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const todaySpent = expenses
    .filter(
      (e) =>
        new Date(e.date).toDateString() === now.toDateString()
    )
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const monthSpent = expenses
    .filter((e) => {
      const d = new Date(e.date);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const average =
    expenses.length > 0
      ? totalSpent / expenses.length
      : 0;

  const cards = [
    {
      title: "Total Spent",
      value: `${currency}${totalSpent.toLocaleString()}`,
      subtitle: `${expenses.length} Transactions`,
      icon: IndianRupee,
      color:
        "from-indigo-500 to-blue-600",
    },
    {
      title: "Today's Spend",
      value: `${currency}${todaySpent.toLocaleString()}`,
      subtitle: "Today's expenses",
      icon: CalendarDays,
      color:
        "from-emerald-500 to-green-600",
    },
    {
      title: "This Month",
      value: `${currency}${monthSpent.toLocaleString()}`,
      subtitle: "Current month",
      icon: TrendingUp,
      color:
        "from-orange-500 to-red-500",
    },
    {
      title: "Average Expense",
      value: `${currency}${average.toFixed(0)}`,
      subtitle: "Per transaction",
      icon: CreditCard,
      color:
        "from-violet-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${card.color}`}
            />

            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-3">
                    {card.value}
                  </h2>

                  <p className="text-xs text-gray-400 mt-2">
                    {card.subtitle}
                  </p>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <Icon size={26} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseSummary;