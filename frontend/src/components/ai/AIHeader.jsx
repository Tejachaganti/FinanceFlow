import { Bot, MessageSquarePlus, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AIHeader = ({ onNewChat }) => <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-[#131A2A] p-5 shadow-2xl shadow-black/10 sm:p-7">
  <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20"><Bot size={25} className="text-white" /></span><div><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.17em] text-cyan-300"><Sparkles size={14} /> AI financial copilot</div><h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">Make your next money move clearer</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Ask about spending, set a stronger budget, or explore smart saving opportunities.</p></div></div><button onClick={onNewChat} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200"><MessageSquarePlus size={17} /> New chat</button></div>
  <div className="relative mt-5 flex items-center gap-2 text-xs text-slate-500"><ShieldCheck size={15} className="text-emerald-300" /> Your finance questions stay within your FinanceFlow session.</div>
</motion.header>;

export default AIHeader;
