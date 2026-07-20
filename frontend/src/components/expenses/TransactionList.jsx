import ExpenseCard from "./ExpenseCard";

const TransactionList = ({
  expenses,
  currency,
  onSelect,
  onEdit,
  onDelete,
}) => {
  if (!expenses.length) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-700 bg-[#131A2A] py-20 text-center">

        <div className="mx-auto max-w-md">

          <h2 className="text-2xl font-bold text-white">
            No Matching Expenses
          </h2>

          <p className="mt-3 text-slate-400">
            Try changing your search or filters to find
            the expenses you're looking for.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="space-y-6">

      {/* Section Header */}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Showing {expenses.length} transaction
            {expenses.length !== 1 ? "s" : ""}
          </p>

        </div>

      </div>

      {/* Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {expenses.map((expense) => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            currency={currency}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

      </div>

    </section>
  );
};

export default TransactionList;