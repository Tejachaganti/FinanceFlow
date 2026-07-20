import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import {
  PieChart as PieChartIcon,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatters";

const COLORS = [
  "#06B6D4",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#F97316",
  "#8B5CF6",
  "#EF4444",
  "#64748B",
];

const CategoryPieChart = ({
  data = [],
  currency,
}) => {
  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <section className="relative rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">

            Analytics

          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">

            Category Spending

          </h2>

          <p className="mt-2 text-slate-400">

            See where your money goes across categories.

          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

          <PieChartIcon
            size={28}
            className="text-white"
          />

        </div>

      </div>

      {/* Chart */}

      <div className="relative h-[330px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={118}
              paddingAngle={4}
              cornerRadius={8}
              animationDuration={900}
            >

              {data.map((entry, index) => (

                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

            <Tooltip
              formatter={(value) =>
                formatCurrency(value, currency)
              }
              contentStyle={{
                background: "#131A2A",
                border: "1px solid #334155",
                borderRadius: 16,
                color: "#fff",
              }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                color: "#CBD5E1",
                fontSize: 13,
                paddingTop: 20,
              }}
            />

          </PieChart>

        </ResponsiveContainer>

        {/* Center */}

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

          <div className="rounded-full bg-[#131A2A]/90 px-6 py-5 text-center backdrop-blur-sm">

            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">

              Total

            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">

              {formatCurrency(total, currency)}

            </h3>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4">

        <div>

          <p className="text-sm text-slate-400">

            Categories

          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">

            {data.length} Active Categories

          </h3>

        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">

          Distribution

        </div>

      </div>

    </section>
  );
};

export default CategoryPieChart;