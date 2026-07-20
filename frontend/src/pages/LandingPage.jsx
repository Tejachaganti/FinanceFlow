import {
  ArrowRight,
  Wallet,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const LandingPage = () => {
  const [mobileMenu, setMobileMenu] =
    useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#0B1120] text-white">

      {/* Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-3xl" />

      </div>

      {/* Navbar */}

      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0B1120]/80 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-4"
          >

            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

              <Wallet
                size={28}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-2xl font-bold">
                FinanceFlow
              </h1>

              <p className="text-sm text-slate-400">
                AI Finance OS
              </p>

            </div>

          </Link>

          {/* Desktop Nav */}

          <nav className="hidden items-center gap-8 lg:flex">

            <a
              href="#features"
              className="text-slate-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how"
              className="text-slate-300 transition hover:text-white"
            >
              How It Works
            </a>

            <a
              href="#pricing"
              className="text-slate-300 transition hover:text-white"
            >
              Benefits
            </a>

          </nav>

          {/* Actions */}

          <div className="hidden items-center gap-4 lg:flex">

            <Link
              to="/login"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-3 text-slate-300 transition hover:border-cyan-500 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
            >
              Get Started
            </Link>

          </div>

          {/* Mobile */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="lg:hidden"
          >

            {mobileMenu ? (
              <X />
            ) : (
              <Menu />
            )}

          </button>

        </div>

        {mobileMenu && (

          <div className="border-t border-slate-800 bg-[#131A2A] lg:hidden">

            <div className="flex flex-col gap-4 p-6">

              <a href="#features">
                Features
              </a>

              <a href="#how">
                How It Works
              </a>

              <Link to="/login">
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-center font-semibold"
              >
                Get Started
              </Link>

            </div>

          </div>

        )}

      </header>

      {/* Hero */}

      <section className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">

        {/* Left */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">

            🚀 AI-Powered Personal Finance Platform

          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">

            Manage Your

            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              Money Smarter

            </span>

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">

            Track expenses, manage budgets,
            analyze spending, generate reports,
            and receive AI-powered financial
            insights—all from one modern dashboard.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
            >

              Start Free

              <ArrowRight size={18} />

            </Link>

            <a
              href="#features"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 text-slate-300 transition hover:border-cyan-500 hover:text-white"
            >
              Learn More
            </a>

          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-3 gap-6">

            <div>

              <h2 className="text-4xl font-bold text-cyan-400">
                10K+
              </h2>

              <p className="mt-2 text-slate-400">
                Transactions
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-cyan-400">
                AI
              </h2>

              <p className="mt-2 text-slate-400">
                Smart Insights
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-cyan-400">
                100%
              </h2>

              <p className="mt-2 text-slate-400">
                Secure
              </p>

            </div>

          </div>

        </motion.div>
                {/* Right - Dashboard Preview */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="relative"
        >

          {/* Glow */}

          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl" />

          <div className="relative rounded-[32px] border border-slate-700/50 bg-[#131A2A] p-8 shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">
                  Total Balance
                </p>

                <h2 className="mt-2 text-5xl font-bold text-white">
                  ₹2,48,320
                </h2>

              </div>

              <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-4">

                <Wallet
                  className="text-white"
                  size={30}
                />

              </div>

            </div>

            {/* Monthly Spending */}

            <div className="mt-10">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-slate-400">
                  Monthly Budget
                </span>

                <span className="font-semibold text-white">
                  72%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{
                    duration: 1.5,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                />

              </div>

            </div>

            {/* Cards */}

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6">

                <p className="text-sm text-slate-400">
                  Income
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  ₹82,500
                </h3>

                <span className="mt-2 inline-block rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                  +15%
                </span>

              </div>

              <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6">

                <p className="text-sm text-slate-400">
                  Expenses
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  ₹24,180
                </h3>

                <span className="mt-2 inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
                  Healthy
                </span>

              </div>

            </div>

            {/* Spending Categories */}

            <div className="mt-10 space-y-6">

              {[
                {
                  name: "Food",
                  value: "45%",
                  width: "45%",
                },
                {
                  name: "Shopping",
                  value: "32%",
                  width: "32%",
                },
                {
                  name: "Bills",
                  value: "23%",
                  width: "23%",
                },
              ].map((item) => (

                <div key={item.name}>

                  <div className="mb-2 flex justify-between text-sm">

                    <span className="text-slate-400">
                      {item.name}
                    </span>

                    <span className="text-white">
                      {item.value}
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-800">

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: item.width,
                      }}
                      transition={{
                        duration: 1.2,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    />

                  </div>

                </div>

              ))}

            </div>

            {/* Recent Transactions */}

            <div className="mt-12">

              <h3 className="mb-5 text-lg font-semibold text-white">
                Recent Transactions
              </h3>

              <div className="space-y-4">

                {[
                  {
                    title: "Starbucks",
                    amount: "-₹420",
                  },
                  {
                    title: "Netflix",
                    amount: "-₹649",
                  },
                  {
                    title: "Salary",
                    amount: "+₹80,000",
                  },
                ].map((item) => (

                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/50 p-4"
                  >

                    <div>

                      <p className="font-medium text-white">
                        {item.title}
                      </p>

                      <p className="text-sm text-slate-400">
                        Today
                      </p>

                    </div>

                    <span
                      className={`font-semibold ${
                        item.amount.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.amount}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </motion.div>

      </section>
            {/* Features */}

      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-24"
      >

        <div className="text-center">

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">

            Powerful Features

          </span>

          <h2 className="mt-6 text-5xl font-bold">

            Everything You Need to
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              Master Your Finances

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">

            FinanceFlow combines expense tracking,
            budgeting, AI insights, analytics and
            financial reporting into one modern platform.

          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {[
            {
              icon: "💳",
              title: "Expense Tracking",
              desc: "Track every expense with categories, merchants and payment methods.",
            },
            {
              icon: "📈",
              title: "Analytics",
              desc: "Beautiful charts help you understand your spending patterns.",
            },
            {
              icon: "🤖",
              title: "AI Insights",
              desc: "Receive smart recommendations to improve your financial habits.",
            },
            {
              icon: "🎯",
              title: "Budget Goals",
              desc: "Set monthly budgets and achieve your savings goals.",
            },
          ].map((feature) => (

            <motion.div
              whileHover={{
                y: -8,
              }}
              key={feature.title}
              className="rounded-3xl border border-slate-700 bg-[#131A2A] p-8 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-3xl">

                {feature.icon}

              </div>

              <h3 className="mt-8 text-2xl font-semibold">

                {feature.title}

              </h3>

              <p className="mt-4 leading-7 text-slate-400">

                {feature.desc}

              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* How It Works */}

      <section
        id="how"
        className="mx-auto max-w-7xl px-6 py-24"
      >

        <div className="grid gap-16 lg:grid-cols-2">

          <div>

            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">

              How It Works

            </span>

            <h2 className="mt-6 text-5xl font-bold">

              Three Simple Steps

            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">

              FinanceFlow simplifies personal finance
              so you can focus on achieving your goals.

            </p>

          </div>

          <div className="space-y-8">

            {[
              {
                step: "01",
                title: "Track Your Income & Expenses",
                desc: "Add transactions in seconds using a clean and intuitive interface.",
              },
              {
                step: "02",
                title: "Analyze Spending",
                desc: "Interactive charts reveal where your money goes every month.",
              },
              {
                step: "03",
                title: "Receive AI Insights",
                desc: "Get personalized recommendations to save more and spend smarter.",
              },
            ].map((item) => (

              <motion.div
                whileHover={{
                  x: 8,
                }}
                key={item.step}
                className="flex gap-6 rounded-3xl border border-slate-700 bg-[#131A2A] p-8 transition-all duration-300 hover:border-cyan-500/40"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-xl font-bold">

                  {item.step}

                </div>

                <div>

                  <h3 className="text-2xl font-semibold">

                    {item.title}

                  </h3>

                  <p className="mt-3 leading-7 text-slate-400">

                    {item.desc}

                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* Why Choose */}

      <section
        id="pricing"
        className="mx-auto max-w-7xl px-6 py-24"
      >

        <div className="rounded-[40px] border border-slate-700 bg-[#131A2A] p-12">

          <div className="grid gap-12 lg:grid-cols-2">

            <div>

              <h2 className="text-5xl font-bold">

                Why Choose

                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                  FinanceFlow?

                </span>

              </h2>

              <p className="mt-8 text-lg leading-8 text-slate-400">

                Designed with modern fintech principles,
                FinanceFlow combines powerful features,
                elegant design and AI-powered intelligence
                into one seamless experience.

              </p>

            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              {[
                "AI Recommendations",
                "Interactive Charts",
                "Budget Planning",
                "Expense Reports",
                "Cloud Storage",
                "Secure Authentication",
              ].map((item) => (

                <div
                  key={item}
                  className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 text-center text-lg font-medium transition-all duration-300 hover:border-cyan-500 hover:bg-slate-900"
                >

                  {item}

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>
            {/* Final CTA */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="relative overflow-hidden rounded-[40px] border border-slate-700 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 px-10 py-20 text-center shadow-2xl">

          {/* Decorative Glow */}

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">

            <span className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-cyan-100">
              Ready to Get Started?
            </span>

            <h2 className="mt-8 text-4xl font-bold md:text-6xl">

              Build Better Financial Habits

            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-cyan-100">

              Join FinanceFlow today and experience AI-powered
              expense tracking, intelligent budgeting, beautiful
              analytics, and smart financial planning—all in one
              powerful platform.

            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">

              <Link
                to="/register"
                className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Create Free Account

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/login"
                className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/20"
              >
                Sign In
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-center lg:justify-between">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600">

                <Wallet
                  size={28}
                  className="text-white"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  FinanceFlow

                </h2>

                <p className="text-slate-400">

                  AI-Powered Personal Finance Platform

                </p>

              </div>

            </div>

            <p className="mt-6 max-w-md leading-7 text-slate-400">

              Simplify your financial journey with intelligent
              expense tracking, budgeting, analytics, and AI-driven
              recommendations.

            </p>

          </div>

          {/* Links */}

          <div className="grid gap-10 sm:grid-cols-3">

            <div>

              <h3 className="mb-5 font-semibold text-white">

                Product

              </h3>

              <div className="space-y-3 text-slate-400">

                <a href="#features" className="block hover:text-white">
                  Features
                </a>

                <a href="#how" className="block hover:text-white">
                  How It Works
                </a>

                <Link to="/register" className="block hover:text-white">
                  Get Started
                </Link>

              </div>

            </div>

            <div>

              <h3 className="mb-5 font-semibold text-white">

                Account

              </h3>

              <div className="space-y-3 text-slate-400">

                <Link to="/login" className="block hover:text-white">
                  Login
                </Link>

                <Link to="/register" className="block hover:text-white">
                  Register
                </Link>

              </div>

            </div>

            <div>

              <h3 className="mb-5 font-semibold text-white">

                Technologies

              </h3>

              <div className="space-y-3 text-slate-400">

                <p>React.js</p>

                <p>Node.js</p>

                <p>MongoDB</p>

                <p>OpenAI API</p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800">

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row">

            <p>

              © {new Date().getFullYear()} FinanceFlow. All rights reserved.

            </p>

            <p>

              Built with ❤️ using React, Node.js & AI

            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default LandingPage;