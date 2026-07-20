import { PlusCircle, Wallet, Sparkles } from "lucide-react";

const EmptyExpenseState = ({ onCreate }) => {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">

      <div className="flex flex-col items-center text-center px-10 py-20">

        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">

          <Wallet className="w-12 h-12 text-white" />

        </div>

        <div className="mt-8">

          <h2 className="text-3xl font-bold">
            No Expenses Yet
          </h2>

          <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400 leading-7">
            Track your daily spending, monitor categories,
            visualize trends, and receive useful financial
            insights—all in one place.
          </p>

        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <button
            onClick={onCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-medium transition"
          >
            <PlusCircle size={20} />
            Add First Expense
          </button>

          <button
            disabled
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-slate-700 px-6 py-3 text-gray-500 cursor-default"
          >
            <Sparkles size={18} />
            Analytics will appear here
          </button>

        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">

          <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 p-5">
            <h3 className="font-semibold">
              Track Spending
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Record every transaction in seconds.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 p-5">
            <h3 className="font-semibold">
              Smart Analytics
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Understand where your money goes.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 p-5">
            <h3 className="font-semibold">
              Better Budgeting
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Build healthy financial habits.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default EmptyExpenseState;