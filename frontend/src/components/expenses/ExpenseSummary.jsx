import { IndianRupee, CreditCard, TrendingDown, Calendar } from "lucide-react";

const ExpenseSummary = ({ expenses, currency = "₹" }) => {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const today = new Date().toDateString();

  const todaySpent = expenses
    .filter((e) => new Date(e.date).toDateString() === today)
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const thisMonth = new Date().getMonth();

  const monthlySpent = expenses
    .filter((e) => new Date(e.date).getMonth() === thisMonth)
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const cards = [
    {
      title: "Total Expenses",
      value: `${currency}${total.toLocaleString()}`,
      icon: IndianRupee,
    },
    {
      title: "Today's Spending",
      value: `${currency}${todaySpent.toLocaleString()}`,
      icon: Calendar,
    },
    {
      title: "Monthly Spending",
      value: `${currency}${monthlySpent.toLocaleString()}`,
      icon: TrendingDown,
    },
    {
      title: "Transactions",
      value: expenses.length,
      icon: CreditCard,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>

              <h2 className="text-2xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <card.icon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseSummary;