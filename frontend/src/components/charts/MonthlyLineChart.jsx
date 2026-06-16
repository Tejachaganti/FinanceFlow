import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "../../utils/formatters";

const MonthlyLineChart = ({ data }) => (
  <div className="glass-card h-96 p-5">
    <h3 className="font-display text-xl font-semibold text-white">Monthly expense trend</h3>
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
        <XAxis dataKey="label" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Area type="monotone" dataKey="total" stroke="#3b82f6" fill="url(#expenseGradient)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default MonthlyLineChart;
