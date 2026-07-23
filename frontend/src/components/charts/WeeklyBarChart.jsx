import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CalendarDays,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatters";

const WeeklyBarChart = ({
  data = [],
  currency,
}) => {
  if (!data.length) {
    return (
      <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-5 sm:p-8">
        <div className="flex h-[330px] flex-col items-center justify-center text-center">
          <CalendarDays size={46} className="text-slate-600" />
          <h3 className="mt-5 text-lg font-semibold text-white">No weekly activity yet</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">Weekly spending will appear here once expenses are recorded.</p>
        </div>
      </section>
    );
  }
  return (
    <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-5 sm:p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">

            Analytics

          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">

            Weekly Spending

          </h2>

          <p className="mt-2 text-slate-400">

            Track your expenses throughout the week.

          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

          <CalendarDays
            size={28}
            className="text-white"
          />

        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer
        width="100%"
        height={320}
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

          <Bar
            dataKey="total"
            fill="#06B6D4"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4">

        <div>

          <p className="text-sm text-slate-400">

            Weekly Overview

          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">

            Spending Pattern

          </h3>

        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">

          Live Report

        </div>

      </div>

    </section>
  );
};

export default WeeklyBarChart;
