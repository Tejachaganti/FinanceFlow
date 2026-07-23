import { Download, FileSpreadsheet, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AnalyticsHero = ({ onExportCSV, onExportPDF }) => (
  <motion.section
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-[#131A2A] px-5 py-7 shadow-2xl shadow-black/10 sm:px-8 sm:py-9"
  >
    <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
          <Sparkles size={15} /> Financial intelligence
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Analytics overview</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
          A clear view of your spending patterns, budget performance, and financial momentum.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button onClick={onExportCSV} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-600 bg-slate-900/60 px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <FileSpreadsheet size={17} /> Export CSV
        </button>
        <button onClick={onExportPDF} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200">
          <Download size={17} /> <span>Export PDF</span><FileText size={15} className="hidden sm:block" />
        </button>
      </div>
    </div>
  </motion.section>
);

export default AnalyticsHero;
