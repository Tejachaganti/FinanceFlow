import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Wallet,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register: registerField, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: "", password: "" } });

  const [showPassword, setShowPassword] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const onSubmit = async (form) => {
    if (submitting) return;
    setSubmitting(true);

    const success = await login(form);

    setSubmitting(false);

    if (success) {
      navigate("/app/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl" />

      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12">

        {/* Left */}

        <div className="flex w-full justify-center lg:w-1/2">

          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">

            {/* Logo */}

            <div className="mb-10 flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/20">

                <Wallet
                  size={30}
                  className="text-white"
                />

              </div>

              <div>

                <h1 className="text-3xl font-bold text-white">
                  FinanceFlow
                </h1>

                <p className="text-slate-400">
                  Smart Personal Finance
                </p>

              </div>

            </div>

            {/* Welcome */}

            <div className="mb-8">

              <h2 className="text-4xl font-bold text-white">
                Welcome Back
              </h2>

              <p className="mt-3 text-lg text-slate-400">
                Sign in to manage your finances,
                budgets and AI insights.
              </p>

            </div>

            {/* Card */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-slate-700/70 bg-[#131A2A]/85 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl"
            >

              {/* Email */}

              <div className="mb-6">

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    {...registerField("email", { required: "Email is required.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address." } })}
                    placeholder="john@example.com"
                    aria-invalid={Boolean(errors.email)} className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />

                </div>{errors.email && <p className="mt-2 text-xs text-rose-300">{errors.email.message}</p>}

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    {...registerField("password", { required: "Password is required." })}
                    placeholder="••••••••"
                    aria-invalid={Boolean(errors.password)} className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 py-3 pl-12 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg text-slate-500 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>{errors.password && <p className="mt-2 text-xs text-rose-300">{errors.password.message}</p>}

              </div>
                            {/* Forgot Password */}

              <div className="mt-4 flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-400"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 rounded border-slate-600 bg-slate-900 accent-cyan-400" /> Remember me</label>

                <Link to="/forgot-password"
                  type="button"
                  onClick={() => toast("Password reset is not enabled on this FinanceFlow server yet.", { icon: "ℹ️" })} className="text-sm text-cyan-400 transition hover:text-cyan-300"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <><LoaderCircle size={18} className="animate-spin" /> Signing in...</>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              
              {/* Divider */}

              <div className="my-8 flex items-center">

                <div className="h-px flex-1 bg-slate-700" />

                <span className="px-4 text-sm text-slate-500">
                  New to FinanceFlow?
                </span>

                <div className="h-px flex-1 bg-slate-700" />

              </div>

              {/* Register */}

              <Link
                to="/register"
                className="flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/60 py-3 font-medium text-slate-300 transition-all duration-300 hover:border-cyan-500 hover:text-white"
              >
                Create an Account
              </Link>

            </form>

          </motion.div>

        </div>

        {/* Right Side */}

        <div className="hidden w-1/2 items-center justify-center lg:flex">

          <div className="w-full max-w-lg">

            {/* Main Card */}

            <div className="rounded-3xl border border-slate-700 bg-[#131A2A] p-8 shadow-2xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-400">
                    Total Balance
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-white">
                    ₹2,48,320
                  </h2>

                </div>

                <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-4">

                  <Wallet
                    size={28}
                    className="text-white"
                  />

                </div>

              </div>

              {/* Progress */}

              <div className="mt-8">

                <div className="mb-2 flex justify-between text-sm text-slate-400">

                  <span>Monthly Budget</span>

                  <span>72%</span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />

                </div>

              </div>

              {/* Stats */}

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">

                  <p className="text-sm text-slate-400">
                    Expenses
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    ₹24,500
                  </h3>

                  <p className="mt-1 text-sm text-green-400">
                    +12%
                  </p>

                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">

                  <p className="text-sm text-slate-400">
                    Savings
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    ₹18,240
                  </h3>

                  <p className="mt-1 text-sm text-cyan-400">
                    Healthy
                  </p>

                </div>

              </div>

              {/* Categories */}

              <div className="mt-8 space-y-5">

                <div>

                  <div className="mb-2 flex justify-between text-sm">

                    <span className="text-slate-400">
                      Food
                    </span>

                    <span className="text-white">
                      45%
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-800">

                    <div className="h-full w-[45%] rounded-full bg-cyan-500" />

                  </div>

                </div>

                <div>

                  <div className="mb-2 flex justify-between text-sm">

                    <span className="text-slate-400">
                      Shopping
                    </span>

                    <span className="text-white">
                      30%
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-800">

                    <div className="h-full w-[30%] rounded-full bg-blue-500" />

                  </div>

                </div>

                <div>

                  <div className="mb-2 flex justify-between text-sm">

                    <span className="text-slate-400">
                      Bills
                    </span>

                    <span className="text-white">
                      25%
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-800">

                    <div className="h-full w-[25%] rounded-full bg-indigo-500" />

                  </div>

                </div>

              </div>

            </div>

            <p className="mt-8 text-center text-slate-500">
              AI-powered budgeting • Smart analytics • Secure finance management
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;
