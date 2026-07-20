import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Wallet,
  ArrowRight,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

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

          <div className="w-full max-w-md">

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
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-700 bg-[#131A2A] p-8 shadow-2xl"
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
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="john@example.com"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />

                </div>

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
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        password:
                          e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 py-3 pl-12 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>
                            {/* Forgot Password */}

              <div className="mt-3 flex justify-end">

                <button
                  type="button"
                  className="text-sm text-cyan-400 transition hover:text-cyan-300"
                >
                  Forgot Password?
                </button>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  "Signing In..."
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

          </div>

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