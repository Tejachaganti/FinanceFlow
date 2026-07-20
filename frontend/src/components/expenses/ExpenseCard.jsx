import {
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
  CreditCard,
  Landmark,
  ShoppingBag,
  UtensilsCrossed,
  Car,
  Film,
  Home,
  HeartPulse,
  Receipt,
} from "lucide-react";

const categoryConfig = {
  Food: {
    icon: UtensilsCrossed,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
  },
  Shopping: {
    icon: ShoppingBag,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
  },
  Travel: {
    icon: Car,
    color: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300",
  },
  Entertainment: {
    icon: Film,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300",
  },
  Bills: {
    icon: Home,
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
  },
  Health: {
    icon: HeartPulse,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300",
  },
};

const getRelativeDate = (date) => {
  const today = new Date();
  const expenseDate = new Date(date);

  const diff = Math.floor(
    (today.setHours(0, 0, 0, 0) -
      expenseDate.setHours(0, 0, 0, 0)) /
      86400000
  );

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";

  return expenseDate.toLocaleDateString();
};

const ExpenseCard = ({
  expense,
  currency = "₹",
  onSelect,
  onEdit,
  onDelete,
}) => {
  const config =
    categoryConfig[expense.category] || {
      icon: Receipt,
      color:
        "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-300",
    };

  const Icon = config.icon;

  return (
    <div className="group rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Top */}

      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${config.color}`}
          >
            <Icon size={26} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {expense.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {expense.merchant || "Unknown Merchant"}
            </p>
          </div>

        </div>

        <div className="text-right">

          <div className="text-2xl font-bold text-red-500">
            {currency}
            {Number(expense.amount).toLocaleString()}
          </div>

          <div className="text-xs text-gray-400">
            Expense
          </div>

        </div>

      </div>

      {/* Badges */}

      <div className="flex flex-wrap gap-2 mt-6">

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
        >
          {expense.category}
        </span>

        {expense.paymentMethod && (
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-xs flex items-center gap-1">
            <CreditCard size={13} />
            {expense.paymentMethod}
          </span>
        )}

        {expense.account && (
          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-xs flex items-center gap-1">
            <Landmark size={13} />
            {expense.account}
          </span>
        )}

      </div>

      {/* Footer */}

      <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-200 dark:border-slate-700">

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <CalendarDays size={16} />

          {getRelativeDate(expense.date)}

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onSelect(expense)}
            className="w-10 h-10 rounded-xl hover:bg-blue-100 dark:hover:bg-slate-800 flex items-center justify-center transition"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit(expense)}
            className="w-10 h-10 rounded-xl hover:bg-yellow-100 dark:hover:bg-slate-800 flex items-center justify-center transition"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(expense._id)}
            className="w-10 h-10 rounded-xl hover:bg-red-100 dark:hover:bg-slate-800 flex items-center justify-center transition"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ExpenseCard;