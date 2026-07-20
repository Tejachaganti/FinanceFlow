import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
  "#7c3aed",
  "#0891b2",
];

const ExpenseAnalytics = ({ expenses }) => {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Other";

    categoryTotals[category] =
      (categoryTotals[category] || 0) + Number(expense.amount || 0);
  });

  const data = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6">

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Spending by Category
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Category Summary
        </h2>

        <div className="space-y-4">

          {data.length === 0 && (
            <p className="text-gray-500">
              No analytics available.
            </p>
          )}

          {data.map((item) => (
            <div
              key={item.name}
              className="flex justify-between border-b pb-3"
            >
              <span>{item.name}</span>

              <span className="font-semibold">
                ₹{item.value.toLocaleString()}
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default ExpenseAnalytics;