import { PlusCircle, Wallet } from "lucide-react";

const EmptyExpenseState = ({ onCreate }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-12 text-center">

      <div className="flex justify-center mb-6">
        <Wallet className="w-16 h-16 text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold mb-3">
        No Expenses Yet
      </h2>

      <p className="text-gray-500 mb-8">
        Start tracking your expenses to view analytics and insights.
      </p>

      <button
        onClick={onCreate}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        <PlusCircle size={20} />
        Add First Expense
      </button>

    </div>
  );
};

export default EmptyExpenseState;