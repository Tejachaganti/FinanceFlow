import { ArrowDownCircle, ArrowUpRight, PiggyBank, Target, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { formatCurrency } from "../../utils/formatters";

const AnalyticsStats = ({ dashboard, loading = false }) => {
  const cards = [
    { title: "Total income", value: dashboard?.totalIncome ?? 0, icon: Wallet, tone: "text-emerald-300", surface: "bg-emerald-400/10", trend: "Money in" },
    { title: "Total expenses", value: dashboard?.totalExpenses ?? 0, icon: ArrowDownCircle, tone: "text-rose-300", surface: "bg-rose-400/10", trend: "Money out" },
    { title: "Net savings", value: dashboard?.balance ?? 0, icon: PiggyBank, tone: "text-cyan-300", surface: "bg-cyan-400/10", trend: dashboard?.balance >= 0 ? "Positive balance" : "Needs attention" },
    { title: "Savings rate", value: dashboard?.savingsRate ?? 0, icon: Target, tone: "text-amber-300", surface: "bg-amber-400/10", trend: "Of total income", percentage: true },
  ];

  return <section aria-label="Financial summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {cards.map((card, index) => {
      const Icon = card.icon;
      return <motion.article key={card.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} whileHover={{ y: -4 }} className="rounded-3xl border border-slate-700/50 bg-[#131A2A] p-5 shadow-lg shadow-black/5 transition-shadow hover:shadow-cyan-950/20 sm:p-6">
        {loading ? <div className="animate-pulse"><div className="h-4 w-24 rounded bg-slate-700" /><div className="mt-5 h-8 w-36 rounded bg-slate-700" /></div> : <>
          <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-400">{card.title}</p><p className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">{card.percentage ? <><CountUp end={card.value} duration={1.35} decimals={1} />%</> : <CountUp end={card.value} duration={1.35} formattingFn={formatCurrency} />}</p></div><span className={`grid h-11 w-11 place-items-center rounded-2xl ${card.surface}`}><Icon size={21} className={card.tone} /></span></div>
          <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-slate-400"><ArrowUpRight size={14} className={card.tone} />{card.trend}</div>
        </>}
      </motion.article>;
    })}
  </section>;
};

export default AnalyticsStats;
