import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  PieChart as PieChartIcon,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatters";

const COLORS = [
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#84CC16",
];

const ExpenseAnalytics = ({
  expenses,
  currency,
}) => {
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

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const sortedData = [...data].sort(
    (a, b) => b.value - a.value
  );

  const topCategory = sortedData[0];

  return (
    <section className="grid gap-6 xl:grid-cols-2">

      {/* Chart */}

      <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-7 shadow-lg">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">

            <PieChartIcon
              size={26}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Spending Analytics
            </h2>

            <p className="text-sm text-slate-400">
              Category-wise expense distribution
            </p>

          </div>

        </div>

        <div className="h-80">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={75}
                outerRadius={110}
                paddingAngle={4}
              >

                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#131A2A",
                  border: "1px solid #334155",
                  borderRadius: 16,
                  color: "#fff",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Breakdown */}

      <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-7 shadow-lg">

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600">

              <TrendingUp
                className="text-white"
                size={26}
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Category Breakdown
              </h2>

              <p className="text-sm text-slate-400">
                Spending insights
              </p>

            </div>

          </div>

          {topCategory && (

            <div className="rounded-2xl bg-slate-800 px-4 py-2">

              <div className="flex items-center gap-2 text-amber-400">

                <Trophy size={16} />

                <span className="text-xs font-semibold">
                  Top Category
                </span>

              </div>

              <p className="mt-1 text-sm font-bold text-white">
                {topCategory.name}
              </p>

            </div>

          )}

        </div>

        {sortedData.length === 0 ? (

          <div className="flex h-64 items-center justify-center text-slate-500">

            No analytics available

          </div>

        ) : (

          <div className="space-y-5">

            {sortedData.map((item, index) => {
              const percent = total
                ? ((item.value / total) * 100).toFixed(1)
                : 0;

              return (

                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 transition hover:border-cyan-500/40"
                >

                  <div className="mb-3 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span
                        className="h-3 w-3 rounded-full"
                        style={{
                          background:
                            COLORS[index % COLORS.length],
                        }}
                      />

                      <span className="font-medium text-white">
                        {item.name}
                      </span>

                    </div>

                    <span className="font-bold text-white">
                      {formatCurrency(
                        item.value,
                        currency
                      )}
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-700">

                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percent}%`,
                        background:
                          COLORS[index % COLORS.length],
                      }}
                    />

                  </div>

                  <div className="mt-2 flex justify-between text-xs text-slate-400">

                    <span>{percent}%</span>

                    <span>
                      {formatCurrency(
                        item.value,
                        currency
                      )}
                    </span>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>

    </section>
  );
};

export default ExpenseAnalytics;