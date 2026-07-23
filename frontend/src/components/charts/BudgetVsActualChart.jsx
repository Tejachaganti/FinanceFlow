import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Target,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatters";

const BudgetVsActualChart = ({
  data = [],
  currency,
}) => {
  if (!data.length || (!data[0]?.budget && !data[0]?.actual)) {
    return (
      <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-5 sm:p-8">
        <div className="flex h-[330px] flex-col items-center justify-center text-center">
          <Target size={46} className="text-slate-600" />
          <h3 className="mt-5 text-lg font-semibold text-white">No budget comparison yet</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">Set a monthly budget and add expenses to compare your plan with actual spending.</p>
        </div>
      </section>
    );
  }
  return (
    <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-5 sm:p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20">

            <Target
              size={28}
              className="text-white"
            />

          </div>

          <div>

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">

              Budget Analysis

            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">

              Budget vs Actual

            </h2>

            <p className="mt-2 text-slate-400">

              Compare planned budgets with your actual expenses.

            </p>

          </div>

        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer
        width="100%"
        height={340}
      >

        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >

          <CartesianGrid
            stroke="#233046"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              formatCurrency(value, currency)
            }
          />

          <Tooltip
            cursor={{
              fill: "rgba(6,182,212,0.08)",
            }}
            contentStyle={{
              background: "#131A2A",
              border: "1px solid #334155",
              borderRadius: 16,
              color: "#fff",
            }}
            formatter={(value) =>
              formatCurrency(value, currency)
            }
          />

          <Legend
            wrapperStyle={{
              color: "#CBD5E1",
              paddingTop: 16,
            }}
          />

          <Bar
            dataKey="budget"
            name="Budget"
            fill="#06B6D4"
            radius={[10, 10, 0, 0]}
          />

          <Bar
            dataKey="actual"
            name="Actual"
            fill="#10B981"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4">

        <div>

          <p className="text-sm text-slate-400">

            Budget Performance

          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">

            Planned vs Actual Spending

          </h3>

        </div>

        <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">

          Updated

        </div>

      </div>

    </section>
  );
};

export default BudgetVsActualChart;
