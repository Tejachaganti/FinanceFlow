import { motion } from "framer-motion";
import {
  Wallet,
  TrendingDown,
  PieChart,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

const config = {
  blue: {
    icon: Wallet,
    bg: "bg-blue-500/15",
    color: "text-blue-400",
  },
  green: {
    icon: TrendingDown,
    bg: "bg-emerald-500/15",
    color: "text-emerald-400",
  },
  purple: {
    icon: PieChart,
    bg: "bg-violet-500/15",
    color: "text-violet-400",
  },
  orange: {
    icon: Target,
    bg: "bg-amber-500/15",
    color: "text-amber-400",
  },
};

const StatsCards = ({ cards, currency }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const item = config[card.color] || config.blue;
        const Icon = item.icon;

        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
            className="rounded-3xl border border-white/10 bg-[#131D33] p-6 shadow-xl"
          >
            <div className="flex items-start justify-between">

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon className={item.color} size={26} />
              </div>

              <div
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                  card.trend === "up"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-rose-500/10 text-rose-400"
                }`}
              >
                {card.trend === "up" ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}

                {card.change}
              </div>

            </div>

            <p className="mt-6 text-sm text-slate-400">
              {card.label}
            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              {card.isPercentage
                ? `${card.value}%`
                : formatCurrency(card.value, currency)}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {card.caption}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;