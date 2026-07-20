import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

const MonthlyLineChart = ({ data = [], currency }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#131D33] p-6 shadow-xl">

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-500/10 p-3">
            <TrendingUp
              className="text-blue-400"
              size={22}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Monthly Spending
            </h2>

            <p className="text-sm text-slate-400">
              Expense trend over time
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          <Calendar size={16} />
          This Year
        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={330}
      >
        <AreaChart data={data}>

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
                stopColor="#4F6BFF"
                stopOpacity={0.5}
              />

              <stop
                offset="95%"
                stopColor="#4F6BFF"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            stroke="#24314d"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#94A3B8"
            tickFormatter={(v) =>
              formatCurrency(v, currency)
            }
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#1E293B",
              border: "1px solid #334155",
              borderRadius: 14,
              color: "#fff",
            }}
            formatter={(value) =>
              formatCurrency(value, currency)
            }
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#4F6BFF"
            strokeWidth={4}
            fill="url(#expenseGradient)"
            activeDot={{
              r: 7,
            }}
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
};

export default MonthlyLineChart;