import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "../../utils/formatters";

const WeeklyBarChart = ({ data }) => (
  <div className="glass-card h-96 p-5">
    <h3 className="font-display text-xl font-semibold text-white">Weekly spending</h3>
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
        <XAxis dataKey="label" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Bar dataKey="total" fill="#22d3ee" radius={[12, 12, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default WeeklyBarChart;
