import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

const StatsCards = ({ cards, currency }) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {cards.map((card, index) => (
      <motion.div
        key={card.label}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-300">{card.label}</p>
          <span className={`rounded-full p-2 ${card.trend === "up" ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`}>
            {card.trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          </span>
        </div>
        <p className="mt-4 font-display text-3xl font-bold text-white">{formatCurrency(card.value, currency)}</p>
        <p className="mt-2 text-sm text-slate-400">{card.caption}</p>
      </motion.div>
    ))}
  </div>
);

export default StatsCards;
