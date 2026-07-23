import {
  Wallet,
  ArrowDown,
  PieChart,
  CreditCard,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatters";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const DashboardHero = ({ user, snapshot }) => {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const items = [
    {
      label: "Savings",
      value: snapshot?.savings || 0,
      icon: Wallet,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Spent",
      value: snapshot?.spent || 0,
      icon: ArrowDown,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      label: "Remaining",
      value: snapshot?.remaining || 0,
      icon: PieChart,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Total Balance",
      value: snapshot?.balance || 0,
      icon: CreditCard,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-700/40 bg-[#131A2A] p-5 sm:p-6 lg:p-8">

      {/* Background Glow */}

      <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10">

        {/* Top */}

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              Finance Dashboard
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {greeting},{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {user?.name?.split(" ")[0]}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Welcome back. Here's a quick overview of your finances today.
            </p>

          </div>

          {/* Balance */}

        <div className="w-full rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 shadow-xl shadow-cyan-500/20 sm:p-8 xl:w-auto">

            <p className="text-cyan-100">
              Available Balance
            </p>

          <h2 className="mt-3 break-words text-3xl font-bold text-white sm:text-4xl">
  <CountUp
    end={snapshot?.balance ?? 0}
    duration={1.5}
    formattingFn={(value) => formatCurrency(value)}
  />
</h2>

          </div>

        </div>

        {/* Stats */}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {items.map((item) => {
            const Icon = item.icon;

            
              return (
  <motion.div
    key={item.label}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.1,
      duration: 0.4,
    }}
    whileHover={{
      y: -5,
      scale: 1.02,
    }}
   className="rounded-3xl border border-slate-700 bg-slate-900/60 p-5 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 sm:p-6">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-400">
          {item.label}
        </p>

        <h3 className="mt-3 break-words text-xl font-bold text-white sm:text-2xl">
          <CountUp
            end={item.value ?? 0}
            duration={1.2}
            formattingFn={(value) => formatCurrency(value)}
          />
        </h3>
      </div>

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
      >
        <Icon
          size={26}
          className={item.color}
        />
      </div>
    </div>
  </motion.div>
);

              
          })}

        </div>

      </div>

    </section>
  );
};

export default DashboardHero;