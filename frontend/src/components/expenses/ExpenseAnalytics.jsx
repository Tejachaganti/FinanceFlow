import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon, TrendingUp } from "lucide-react";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#84CC16",
];

const ExpenseAnalytics = ({ expenses }) => {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Other";

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      Number(expense.amount || 0);
  });

  const data = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Chart */}

      <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">

            <PieChartIcon className="text-blue-600" size={22} />

          </div>

          <div>

            <h2 className="font-bold text-xl">
              Spending by Category
            </h2>

            <p className="text-sm text-gray-500">
              Distribution of your expenses
            </p>

          </div>

        </div>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={110}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Summary */}

      <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">

            <TrendingUp className="text-emerald-600" size={22} />

          </div>

          <div>

            <h2 className="font-bold text-xl">
              Category Breakdown
            </h2>

            <p className="text-sm text-gray-500">
              Expense distribution
            </p>

          </div>

        </div>

        {data.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No analytics available.
          </div>
        ) : (
          <div className="space-y-4">
            {data
              .sort((a, b) => b.value - a.value)
              .map((item, index) => {
                const percent = total
                  ? ((item.value / total) * 100).toFixed(1)
                  : 0;

                return (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-gray-100 dark:border-slate-700 p-4"
                  >
                    <div className="flex justify-between items-center mb-2">

                      <div className="flex items-center gap-3">

                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            background:
                              COLORS[index % COLORS.length],
                          }}
                        />

                        <span className="font-medium">
                          {item.name}
                        </span>

                      </div>

                      <span className="font-bold">
                        ₹{item.value.toLocaleString()}
                      </span>

                    </div>

                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">

                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percent}%`,
                          background:
                            COLORS[index % COLORS.length],
                        }}
                      />

                    </div>

                    <div className="text-xs text-gray-500 mt-2">
                      {percent}% of total spending
                    </div>

                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseAnalytics;