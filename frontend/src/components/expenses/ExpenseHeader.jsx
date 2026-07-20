import { Download, Plus, Receipt } from "lucide-react";

const ExpenseHeader = ({ onAddExpense }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">

            <Receipt className="w-8 h-8 text-white" />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-white">
              Expenses & Transactions
            </h1>

            <p className="text-slate-400 mt-2">
              Track, organize and analyze every transaction with AI insights.
            </p>

          </div>

        </div>

        <div className="flex gap-4">

          <button
            className="flex items-center gap-2 rounded-2xl border border-slate-700 px-5 py-3 text-slate-200 hover:bg-slate-800 transition"
          >
            <Download size={18} />

            Export
          </button>

          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg hover:scale-[1.02] transition"
          >
            <Plus size={18} />

            Add Expense
          </button>

        </div>

      </div>

    </div>
  );
};

export default ExpenseHeader;