import { formatCurrency, formatDate } from "../../utils/formatters";

const RecentTransactions = ({ expenses, currency }) => (
  <div className="glass-card p-5">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="font-display text-xl font-semibold text-white">Recent transactions</h3>
      <span className="text-sm text-slate-400">{expenses.length} records</span>
    </div>
    <div className="space-y-3">
      {expenses.slice(0, 6).map((expense) => (
        <div key={expense._id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3">
          <div>
            <p className="font-medium text-white">{expense.title}</p>
            <p className="text-sm text-slate-400">{expense.category} • {formatDate(expense.date)}</p>
          </div>
          <p className="font-semibold text-rose-300">-{formatCurrency(expense.amount, currency)}</p>
        </div>
      ))}
    </div>
  </div>
);

export default RecentTransactions;
