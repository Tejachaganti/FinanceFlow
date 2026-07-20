import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wallet,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
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

    const success = await register(form);

    setSubmitting(false);

    if (success) {
      navigate("/app/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

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

            <div className="mb-8">

              <h2 className="text-4xl font-bold text-white">
                Create Your Account
              </h2>

              <p className="mt-3 text-lg text-slate-400">
                Join FinanceFlow and take control of
                your finances with AI-powered insights.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-700 bg-[#131A2A] p-8 shadow-2xl"
            >

              {/* Name */}

              <div className="mb-6">

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />

                </div>

              </div>

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
                    minLength={6}
                    value={form.password}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        password:
                          e.target.value,
                      }))
                    }
                    placeholder="Minimum 6 characters"
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
                            {/* Password Hint */}

              <p className="mt-2 text-xs text-slate-500">
                Use at least 6 characters to keep your account secure.
              </p>

              {/* Register Button */}

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Divider */}

              <div className="my-8 flex items-center">

                <div className="h-px flex-1 bg-slate-700" />

                <span className="px-4 text-sm text-slate-500">
                  Already have an account?
                </span>

                <div className="h-px flex-1 bg-slate-700" />

              </div>

              {/* Login Link */}

              <Link
                to="/login"
                className="flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/60 py-3 font-medium text-slate-300 transition-all duration-300 hover:border-cyan-500 hover:text-white"
              >
                Sign In
              </Link>

            </form>

          </div>

        </div>

        {/* Right Side */}

        <div className="hidden w-1/2 items-center justify-center lg:flex">

          <div className="w-full max-w-lg">

            {/* Hero Card */}

            <div className="rounded-3xl border border-slate-700 bg-[#131A2A] p-8 shadow-2xl">

              <h2 className="text-3xl font-bold text-white">
                Take Control of Your Money
              </h2>

              <p className="mt-3 text-slate-400 leading-7">
                FinanceFlow helps you manage expenses,
                monitor budgets, visualize trends,
                and receive AI-powered financial insights.
              </p>

              {/* Features */}

              <div className="mt-10 space-y-5">

                <div className="flex items-start gap-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-5">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold">
                    AI
                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      AI Financial Insights
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Discover spending habits and receive smart recommendations.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-5">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold">
                    ₹
                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      Budget Tracking
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Monitor your monthly expenses and stay within your budget.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-5">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold">
                    ✓
                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      Secure & Reliable
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Your financial information is protected with secure authentication.
                    </p>

                  </div>

                </div>

              </div>

              {/* Stats */}

              <div className="mt-10 grid grid-cols-3 gap-4">

                <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-center">

                  <p className="text-2xl font-bold text-white">
                    24K+
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Expenses Tracked
                  </p>

                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-center">

                  <p className="text-2xl font-bold text-white">
                    98%
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Budget Accuracy
                  </p>

                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-center">

                  <p className="text-2xl font-bold text-white">
                    AI
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Smart Insights
                  </p>

                </div>

              </div>

            </div>

            <p className="mt-8 text-center text-slate-500">
              Join thousands of users managing their finances with confidence.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default RegisterPage;