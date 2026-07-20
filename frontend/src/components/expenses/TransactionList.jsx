import ExpenseCard from "./ExpenseCard";

const TransactionList = ({
  expenses,
  currency = "₹",
  onSelect,
  onEdit,
  onDelete,
}) => {
  if (!expenses.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-12 text-center">
        <h2 className="text-xl font-semibold">
          No expenses found
        </h2>

        <p className="mt-2 text-gray-500">
          Try changing your filters or add a new expense.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-6
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
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
  );
};

export default TransactionList;