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
    bg: "bg-cyan-500/10",
    color: "text-cyan-400",
  },
  green: {
    icon: TrendingDown,
    bg: "bg-emerald-500/10",
    color: "text-emerald-400",
  },
  purple: {
    icon: PieChart,
    bg: "bg-violet-500/10",
    color: "text-violet-400",
  },
  orange: {
    icon: Target,
    bg: "bg-amber-500/10",
    color: "text-amber-400",
  },
};

const StatsCards = ({ cards, currency }) => {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card, index) => {
        const item = config[card.color] || config.blue;
        const Icon = item.icon;

        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
            }}
            whileHover={{
              y: -8,
            }}
            className="group relative overflow-hidden rounded-3xl border border-slate-700/40 bg-[#131A2A] p-6 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10"
          >

            {/* Background Glow */}

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/5 blur-3xl transition-all duration-300 group-hover:bg-cyan-500/10" />

            {/* Header */}

            <div className="relative flex items-start justify-between">

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon
                  size={26}
                  className={item.color}
                />
              </div>

              <div
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
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

            {/* Content */}

            <div className="relative mt-8">

              <p className="text-sm font-medium text-slate-400">
                {card.label}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">

                {card.isPercentage
                  ? `${card.value}%`
                  : formatCurrency(card.value, currency)}

              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {card.caption}
              </p>

            </div>

            {/* Bottom Accent */}

            <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-slate-800">

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              />

            </div>

          </motion.div>
        );
      })}

    </section>
  );
};

export default StatsCards;