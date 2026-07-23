import { Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import PromptChips from "./PromptChips";

const WelcomeCard = ({ onSelectPrompt }) => <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto w-full max-w-2xl text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-xl shadow-cyan-500/20"><Bot size={31} className="text-white" /></span><div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300"><Sparkles size={14} /> FinanceFlow AI</div><h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">How can I help with your finances?</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">Start with a focused question or choose a quick action to get practical, personalized guidance.</p><div className="mt-7"><PromptChips onSelect={onSelectPrompt} /></div></motion.div>;

export default WelcomeCard;
