import {
  Pencil,
  Trash2,
  Eye,
  Calendar,
} from "lucide-react";

const TransactionList = ({
  expenses,
  currency = "₹",
  onSelect,
  onEdit,
  onDelete,
}) => {
  if (!expenses.length) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center shadow">
        <h2 className="text-lg font-semibold">
          No expenses found
        </h2>

        <p className="text-gray-500 mt-2">
          Try changing your filters or add a new expense.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100 dark:bg-slate-800">

          <tr>

            <th className="text-left p-4">Title</th>

            <th className="text-left p-4">Category</th>

            <th className="text-left p-4">Amount</th>

            <th className="text-left p-4">Date</th>

            <th className="text-center p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {expenses.map((expense) => (

            <tr
              key={expense._id}
              className="border-t hover:bg-gray-50 dark:hover:bg-slate-800"
            >

              <td className="p-4">
                <div className="font-medium">
                  {expense.title}
                </div>

                <div className="text-sm text-gray-500">
                  {expense.merchant || "-"}
                </div>
              </td>

              <td className="p-4">
                {expense.category}
              </td>

              <td className="p-4 font-semibold text-red-600">
                {currency}{Number(expense.amount).toLocaleString()}
              </td>

              <td className="p-4">

                <div className="flex items-center gap-2">

                  <Calendar size={16} />

                  {new Date(expense.date).toLocaleDateString()}

                </div>

              </td>

              <td className="p-4">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onSelect(expense)}
                    className="p-2 rounded-lg hover:bg-blue-100"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onEdit(expense)}
                    className="p-2 rounded-lg hover:bg-yellow-100"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(expense._id)}
                    className="p-2 rounded-lg hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default TransactionList;