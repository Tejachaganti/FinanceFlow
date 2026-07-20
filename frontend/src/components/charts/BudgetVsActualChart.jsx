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
import { Target } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

const BudgetVsActualChart = ({ data = [], currency }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#131D33] p-6 shadow-xl">

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-emerald-500/10 p-3">
            <Target
              size={22}
              className="text-emerald-400"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Budget vs Actual
            </h2>

            <p className="text-sm text-slate-400">
              Compare planned budget with actual spending
            </p>
          </div>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={340}
      >
        <BarChart data={data}>

          <CartesianGrid
            stroke="#24314D"
            strokeDasharray="3 3"
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
            tickFormatter={(v) =>
              formatCurrency(v, currency)
            }
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

          <Legend />

          <Bar
            dataKey="budget"
            name="Budget"
            fill="#4F6BFF"
            radius={[10, 10, 0, 0]}
          />

          <Bar
            dataKey="actual"
            name="Actual"
            fill="#22C55E"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default BudgetVsActualChart;