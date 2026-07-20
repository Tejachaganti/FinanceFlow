import ExpenseForm from "./ExpenseForm";

const ExpenseFormModal = ({
  open,
  expense,
  onClose,
  onSubmit,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 shadow-xl">

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            {expense ? "Edit Expense" : "Add Expense"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black dark:hover:text-white"
          >
            ×
          </button>

        </div>

        <div className="p-6">

          <ExpenseForm
            expense={expense}
            onSubmit={onSubmit}
            onCancel={onClose}
          />

        </div>

      </div>

    </div>
  );
};

export default ExpenseFormModal;