import { Pencil, Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/formatters";

const ExpenseTable = ({ expenses, currency, onEdit, onDelete }) => (
  <div className="glass-card overflow-hidden p-5">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="font-display text-xl font-semibold text-white">Transaction history</h3>
      <span className="text-sm text-slate-400">Full CRUD with filters and receipts</span>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm text-slate-300">
        <thead>
          <tr className="border-b border-white/10 text-slate-400">
            <th className="py-3">Title</th>
            <th className="py-3">Category</th>
            <th className="py-3">Date</th>
            <th className="py-3">Method</th>
            <th className="py-3">Amount</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id} className="border-b border-white/5">
              <td className="py-4">
                <p className="font-medium text-white">{expense.title}</p>
                <p className="text-xs text-slate-400">{expense.notes || "No notes added"}</p>
              </td>
              <td className="py-4">{expense.category}</td>
              <td className="py-4">{formatDate(expense.date)}</td>
              <td className="py-4">{expense.paymentMethod}</td>
              <td className="py-4 font-semibold text-rose-300">-{formatCurrency(expense.amount, currency)}</td>
              <td className="py-4">
                <div className="flex gap-2">
                  <button type="button" className="btn-secondary" onClick={() => onEdit(expense)}><Pencil size={16} /></button>
                  <button type="button" className="btn-secondary" onClick={() => onDelete(expense._id)}><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ExpenseTable;
