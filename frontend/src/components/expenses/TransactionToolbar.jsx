import {
  Search,
  Plus,
  RotateCcw,
  ArrowUpDown,
} from "lucide-react";

const categories = [
  "All",
  "Food",
  "Shopping",
  "Travel",
  "Bills",
  "Health",
  "Entertainment",
  "Other",
];

const TransactionToolbar = ({
  filters,
  setFilters,
  onAddExpense,
}) => {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      search: "",
      category: "All",
      startDate: "",
      endDate: "",
      sortBy: "date",
    }));
  };

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-6">

      <div className="flex flex-col lg:flex-row lg:items-center gap-4">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={filters.search}
            onChange={(e) =>
              updateFilter("search", e.target.value)
            }
            placeholder="Search title, merchant..."
            className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <select
          value={filters.category}
          onChange={(e) =>
            updateFilter("category", e.target.value)
          }
          className="rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent px-4 py-3"
        >
          {categories.map((category) => (
            <option key={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) =>
            updateFilter("sortBy", e.target.value)
          }
          className="rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent px-4 py-3"
        >
          <option value="date">Newest</option>
          <option value="amount">Highest Amount</option>
          <option value="title">A-Z</option>
        </select>

        <button
          onClick={resetFilters}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-slate-700 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
        >
          <RotateCcw size={18} />
          Reset
        </button>

        <button
          onClick={onAddExpense}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 transition"
        >
          <Plus size={18} />
          Add Expense
        </button>

      </div>

    </div>
  );
};

export default TransactionToolbar;