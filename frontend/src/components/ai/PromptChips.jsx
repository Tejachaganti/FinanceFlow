import { BarChart3, Landmark, PiggyBank, Target } from "lucide-react";
import { motion } from "framer-motion";

const prompts = [
  { title: "Expense Analysis", description: "Understand where your money is going.", icon: BarChart3, prompt: "Analyze my spending and identify areas I can improve." },
  { title: "Budget Advice", description: "Build a more practical spending plan.", icon: Target, prompt: "Give me practical advice to improve my budget." },
  { title: "Savings Tips", description: "Find realistic ways to save more.", icon: PiggyBank, prompt: "What are some realistic savings tips for me?" },
  { title: "Investment Guidance", description: "Explore thoughtful next steps to invest.", icon: Landmark, prompt: "What should I consider before starting to invest?" },
];

const PromptChips = ({ onSelect }) => <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{prompts.map((item, index) => { const Icon = item.icon; return <motion.button key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -3 }} onClick={() => onSelect(item.prompt)} className="group rounded-2xl border border-slate-700/60 bg-slate-900/55 p-4 text-left transition hover:border-cyan-400/50 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><Icon size={18} /></span><h3 className="mt-3 text-sm font-semibold text-white group-hover:text-cyan-200">{item.title}</h3><p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p></motion.button>; })}</div>;

export default PromptChips;
