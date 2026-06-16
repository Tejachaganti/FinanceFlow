import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  "AI-generated spending insights",
  "Budgets, recurring expenses, and savings goals",
  "PDF/CSV exports for reports and interviews",
  "Mobile-first SaaS dashboard with charts"
];

const LandingPage = () => (
  <div className="min-h-screen bg-mesh px-4 py-6 md:px-6">
    <div className="mx-auto max-w-7xl">
      <header className="glass-card flex flex-wrap items-center justify-between px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">FinanceFlow</p>
          <h1 className="font-display text-2xl font-bold text-white">AI-Powered Personal Finance Management</h1>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </header>

      <section className="grid items-center gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">Resume-worthy fintech dashboard</span>
          <h2 className="font-display text-5xl font-extrabold leading-tight text-white md:text-6xl">Turn a simple tracker into a polished finance operating system.</h2>
          <p className="max-w-2xl text-lg text-slate-300">Track expenses, manage budgets, export reports, and unlock AI-style financial guidance from a production-ready full-stack architecture.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/register" className="btn-primary">Launch Demo App <ArrowRight size={16} /></Link>
            <a href="#features" className="btn-secondary">Explore features</a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">{feature}</div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-5">
              <TrendingUp className="text-cyan-300" />
              <p className="mt-10 text-sm text-slate-300">Monthly cash health</p>
              <p className="mt-2 font-display text-3xl font-bold text-white">+18%</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-5">
              <Sparkles className="text-emerald-300" />
              <p className="mt-10 text-sm text-slate-300">AI savings suggestions</p>
              <p className="mt-2 font-display text-3xl font-bold text-white">7</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 p-5 md:col-span-2">
              <ShieldCheck className="text-fuchsia-300" />
              <p className="mt-6 text-sm text-slate-300">Secure auth, MongoDB persistence, protected routes, receipts upload, and deployment-ready backend.</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  </div>
);

export default LandingPage;
