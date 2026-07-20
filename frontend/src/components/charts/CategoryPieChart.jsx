import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

const COLORS = [
  "#3B82F6",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F97316",
  "#8B5CF6",
  "#EF4444",
  "#64748B",
];

const CategoryPieChart = ({ data = [] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl h-[420px]">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Category Spending
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Expense distribution
          </p>
        </div>

        <div className="rounded-2xl bg-cyan-500/20 p-3 text-cyan-400">
          <PieChartIcon size={22} />
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={75}
            outerRadius={115}
            paddingAngle={4}
            cornerRadius={8}
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              background: "#111827",
              border: "1px solid #374151",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              color: "#CBD5E1",
              fontSize: "13px",
              paddingTop: "12px",
            }}
          />

        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center mt-10">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Total
          </p>

          <h3 className="mt-1 text-xl font-bold text-white">
            {formatCurrency(total)}
          </h3>
        </div>
      </div>

    </div>
  );
};

export default CategoryPieChart;