import {
  Search,
  Plus,
  RotateCcw,
  ArrowUpDown,
  Filter,
  CalendarRange,
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
    <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-4 shadow-lg sm:p-6">

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={filters.search}
            onChange={(e) =>
              updateFilter("search", e.target.value)
            }
            placeholder="Search expenses, merchants..."
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />

        </div>

        {/* Filters */}

        <div className="flex flex-wrap items-center gap-3">

          <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3">

            <Filter
              size={18}
              className="text-slate-400"
            />

            <select
              value={filters.category}
              onChange={(e) =>
                updateFilter("category", e.target.value)
              }
              className="bg-transparent text-sm text-white outline-none"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  className="bg-slate-900"
                >
                  {category}
                </option>
              ))}
            </select>

          </div>

          <div className="flex min-w-[210px] flex-1 items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 sm:flex-none">
            <CalendarRange size={17} className="shrink-0 text-slate-400" />
            <input aria-label="Start date" type="date" value={filters.startDate} onChange={(e) => updateFilter("startDate", e.target.value)} className="min-w-0 flex-1 bg-transparent text-xs text-slate-300 outline-none [color-scheme:dark]" />
            <span className="text-slate-600">–</span>
            <input aria-label="End date" type="date" value={filters.endDate} onChange={(e) => updateFilter("endDate", e.target.value)} className="min-w-0 flex-1 bg-transparent text-xs text-slate-300 outline-none [color-scheme:dark]" />
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3">

            <ArrowUpDown
              size={18}
              className="text-slate-400"
            />

            <select
              value={filters.sortBy}
              onChange={(e) =>
                updateFilter("sortBy", e.target.value)
              }
              className="bg-transparent text-sm text-white outline-none"
            >
              <option value="date" className="bg-slate-900">
                Newest
              </option>

              <option value="amount" className="bg-slate-900">
                Highest Amount
              </option>

              <option value="title" className="bg-slate-900">
                A-Z
              </option>

            </select>

          </div>

          <button
            onClick={resetFilters}
            className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-slate-300 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-800"
          >
            <RotateCcw size={18} />

            Reset
          </button>

          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/40"
          >
            <Plus size={18} />

            Add Expense
          </button>

        </div>

      </div>

    </section>
  );
};

export default TransactionToolbar;
