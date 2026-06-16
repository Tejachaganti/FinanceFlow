import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "../../utils/formatters";

const colors = ["#22d3ee", "#3b82f6", "#10b981", "#f59e0b", "#f97316", "#a855f7", "#ef4444", "#94a3b8"];

const CategoryPieChart = ({ data }) => (
  <div className="glass-card h-96 p-5">
    <h3 className="font-display text-xl font-semibold text-white">Category spending</h3>
    <ResponsiveContainer width="100%" height="90%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={3}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default CategoryPieChart;
