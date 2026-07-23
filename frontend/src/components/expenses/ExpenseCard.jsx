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

import { formatCurrency } from "../../utils/formatters";
import { motion } from "framer-motion";
import { memo } from "react";

const categoryConfig = {
  Food: {
    icon: UtensilsCrossed,
    color: "from-orange-500 to-red-500",
    badge: "bg-orange-500/15 text-orange-300",
  },
  Shopping: {
    icon: ShoppingBag,
    color: "from-purple-500 to-pink-500",
    badge: "bg-purple-500/15 text-purple-300",
  },
  Travel: {
    icon: Car,
    color: "from-sky-500 to-cyan-500",
    badge: "bg-sky-500/15 text-sky-300",
  },
  Entertainment: {
    icon: Film,
    color: "from-pink-500 to-rose-500",
    badge: "bg-pink-500/15 text-pink-300",
  },
  Bills: {
    icon: Home,
    color: "from-red-500 to-orange-500",
    badge: "bg-red-500/15 text-red-300",
  },
  Health: {
    icon: HeartPulse,
    color: "from-green-500 to-emerald-500",
    badge: "bg-green-500/15 text-green-300",
  },
};

const getRelativeDate = (date) => {
  const today = new Date();
  const d = new Date(date);

  const diff = Math.floor(
    (today.setHours(0, 0, 0, 0) -
      d.setHours(0, 0, 0, 0)) / 86400000
  );

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";

  return d.toLocaleDateString();
};

const ExpenseCard = ({
  expense,
  currency,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const config = categoryConfig[expense.category] || {
    icon: Receipt,
    color: "from-slate-500 to-slate-700",
    badge: "bg-slate-700/30 text-slate-300",
  };

  const Icon = config.icon;

  return (
    <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-3xl border border-slate-700/40 bg-[#131A2A] p-5 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 sm:p-6">

      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${config.color}`}
      />

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${config.color} shadow-lg transition-all duration-300 group-hover:scale-110`}
          >
            <Icon
              className="text-white"
              size={26}
            />
          </div>

          <div>

            <h3 className="text-lg font-semibold text-white">
              {expense.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {expense.merchant || "Unknown Merchant"}
            </p>

          </div>

        </div>

        <div className="text-right">

          <h2 className="text-2xl font-bold text-rose-400">

            {formatCurrency(
              expense.amount,
              currency
            )}

          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Expense
          </p>

        </div>

      </div>

      <div className="mt-6 flex flex-wrap gap-2">

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${config.badge}`}
        >
          {expense.category}
        </span>

        {expense.paymentMethod && (
          <span className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">

            <CreditCard size={13} />

            {expense.paymentMethod}

          </span>
        )}

        {expense.account && (
          <span className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">

            <Landmark size={13} />

            {expense.account}

          </span>
        )}

      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-5">

        <div className="flex items-center gap-2 text-sm text-slate-400">

          <CalendarDays size={16} />

          {getRelativeDate(expense.date)}

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onSelect(expense)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-cyan-500 hover:text-white"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit(expense)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-amber-500 hover:text-white"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(expense._id)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </motion.article>
  );
};

export default memo(ExpenseCard);
