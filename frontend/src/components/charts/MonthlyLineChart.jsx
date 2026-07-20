import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  TrendingUp,
  Calendar,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatters";

const MonthlyLineChart = ({
  data = [],
  currency,
}) => {
  return (
    <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

            <TrendingUp
              size={28}
              className="text-white"
            />

          </div>

          <div>

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">

              Analytics

            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">

              Monthly Spending

            </h2>

            <p className="mt-2 text-slate-400">

              Track your monthly expense trend.

            </p>

          </div>

        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-300">

          <Calendar size={16} />

          This Year

        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer
        width="100%"
        height={340}
      >

        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >

          <defs>

            <linearGradient
              id="expenseGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#06B6D4"
                stopOpacity={0.45}
              />

              <stop
                offset="95%"
                stopColor="#06B6D4"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            stroke="#233046"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            stroke="#94A3B8"
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="#94A3B8"
            tickFormatter={(value) =>
              formatCurrency(value, currency)
            }
          />

          <Tooltip
            cursor={{
              stroke: "#06B6D4",
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              background: "#131A2A",
              border: "1px solid #334155",
              borderRadius: 18,
              color: "#fff",
            }}
            formatter={(value) =>
              formatCurrency(value, currency)
            }
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#06B6D4"
            strokeWidth={4}
            fill="url(#expenseGradient)"
            activeDot={{
              r: 7,
              fill: "#06B6D4",
              stroke: "#fff",
              strokeWidth: 3,
            }}
          />

        </AreaChart>

      </ResponsiveContainer>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4">

        <div>

          <p className="text-sm text-slate-400">

            Trend

          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">

            Monthly Expense Analysis

          </h3>

        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">

          Live Data

        </div>

      </div>

    </section>
  );
};

export default MonthlyLineChart;