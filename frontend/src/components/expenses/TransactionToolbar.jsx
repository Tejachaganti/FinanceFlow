import { Search, Plus } from "lucide-react";

const TransactionToolbar = ({
  filters,
  setFilters,
  onAddExpense,
}) => {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow p-5">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search expenses..."
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value,
            })
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        >
          <option>All</option>
          <option>Food</option>
          <option>Shopping</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Health</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <button
          onClick={onAddExpense}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Expense
        </button>

      </div>
    </div>
  );
};

export default TransactionToolbar;