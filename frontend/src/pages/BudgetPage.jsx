import { useEffect, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import BudgetProgress from "../components/settings/BudgetProgress";
import useFinance from "../hooks/useFinance";
import { formatCurrency } from "../utils/formatters";

const initialIncomeForm = {
  source: "Salary",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  notes: ""
};

const BudgetPage = () => {
  const { budget, snapshot, income, saveBudget, createIncome } = useFinance();
  const [form, setForm] = useState({ monthlyBudget: 0, alertThresholdPercent: 80 });
  const [incomeForm, setIncomeForm] = useState(initialIncomeForm);

  useEffect(() => {
    setForm({
      monthlyBudget: budget?.monthlyBudget || 0,
      alertThresholdPercent: budget?.alertThresholdPercent || 80
    });
  }, [budget]);

  const handleBudgetSubmit = async (event) => {
    event.preventDefault();
    await saveBudget({
      monthlyBudget: Number(form.monthlyBudget),
      alertThresholdPercent: Number(form.alertThresholdPercent)
    });
  };

  const handleIncomeSubmit = async (event) => {
    event.preventDefault();
    const success = await createIncome({
      ...incomeForm,
      amount: Number(incomeForm.amount)
    });

    if (success) {
      setIncomeForm(initialIncomeForm);
    }
  };

  return (
  <div className="min-h-screen bg-[#0B1120]">
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">

      {/* Hero */}

      <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              Budget Planner
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white">
              Manage Your Budget
            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-400">
              Set monthly spending limits, monitor savings,
              track income, and stay financially healthy.
            </p>

          </div>

          <div className="rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 px-8 py-6 shadow-xl shadow-cyan-500/20">

            <p className="text-sm text-cyan-100">
              Current Savings Rate
            </p>

            <h2 className="mt-2 text-5xl font-bold text-white">
              {snapshot?.savingsRate || 0}%
            </h2>

          </div>

        </div>

      </div>

      {/* Summary */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-6">
          <p className="text-sm text-slate-400">Monthly Budget</p>
          <h2 className="mt-3 text-3xl font-bold text-white">
            {formatCurrency(budget?.monthlyBudget || 0)}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-6">
          <p className="text-sm text-slate-400">Total Expenses</p>
          <h2 className="mt-3 text-3xl font-bold text-red-400">
            {formatCurrency(snapshot?.expenses || 0)}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-6">
          <p className="text-sm text-slate-400">Remaining Budget</p>
          <h2 className="mt-3 text-3xl font-bold text-green-400">
            {formatCurrency(
              Math.max(
                (budget?.monthlyBudget || 0) -
                  (snapshot?.expenses || 0),
                0
              )
            )}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-6">
          <p className="text-sm text-slate-400">
            Alert Threshold
          </p>

          <h2 className="mt-3 text-3xl font-bold text-cyan-400">
            {budget?.alertThresholdPercent || 80}%
          </h2>

        </div>

      </section>

      {/* Budget Planner */}

      <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">

        <form
          onSubmit={handleBudgetSubmit}
          className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8"
        >

          <h2 className="text-2xl font-bold text-white">
            Monthly Budget Plan
          </h2>

          <p className="mt-2 text-slate-400">
            Configure your monthly spending limit.
          </p>

          <div className="mt-8 space-y-6">

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Monthly Budget
              </label>

              <input
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-cyan-500"
                type="number"
                value={form.monthlyBudget}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    monthlyBudget: e.target.value,
                  }))
                }
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Alert Threshold (%)
              </label>

              <input
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-cyan-500"
                type="number"
                value={form.alertThresholdPercent}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    alertThresholdPercent:
                      e.target.value,
                  }))
                }
              />

            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:-translate-y-1"
            >
              Save Budget
            </button>

          </div>

        </form>

        <BudgetProgress snapshot={snapshot} />

      </section>

      {/* Income */}

      <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">

        <form
          onSubmit={handleIncomeSubmit}
          className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8"
        >

          <div className="mb-8">

            <h2 className="text-2xl font-bold text-white">
              Income Tracking
            </h2>

            <p className="mt-2 text-slate-400">
              Record every income source and monitor your earnings.
            </p>

          </div>

          <div className="space-y-6">

            <input
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-cyan-500"
              value={incomeForm.source}
              onChange={(e) =>
                setIncomeForm((prev) => ({
                  ...prev,
                  source: e.target.value,
                }))
              }
              placeholder="Salary"
            />

            <input
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-cyan-500"
              type="number"
              value={incomeForm.amount}
              onChange={(e) =>
                setIncomeForm((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
              placeholder="Amount"
            />

            <input
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-cyan-500"
              type="date"
              value={incomeForm.date}
              onChange={(e) =>
                setIncomeForm((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            />

            <textarea
              rows={4}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-cyan-500"
              value={incomeForm.notes}
              onChange={(e) =>
                setIncomeForm((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              placeholder="Optional notes..."
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Add Income
            </button>

          </div>

        </form>

        <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-white">
                Income History
              </h2>

              <p className="mt-2 text-slate-400">
                {income?.length || 0} income records
              </p>

            </div>

            <div className="rounded-2xl bg-cyan-500/10 px-4 py-2 text-cyan-300">
              Total Income
            </div>

          </div>

          {income?.length ? (

            <div className="space-y-4">

              {income.map((item) => (

                <div
                  key={item._id}
                  className="rounded-3xl border border-slate-700 bg-slate-900/60 p-5 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="text-lg font-semibold text-white">
                        {item.source}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400">
                        {new Date(item.date).toLocaleDateString()}
                      </p>

                    </div>

                    <h3 className="text-2xl font-bold text-green-400">
                      +{formatCurrency(item.amount)}
                    </h3>

                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-800/50 p-4">

                    <p className="text-sm text-slate-400">
                      {item.notes || "No notes added."}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 py-20 text-center">

              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-3xl">
                💰
              </div>

              <h3 className="text-2xl font-semibold text-white">
                No Income Added
              </h3>

              <p className="mt-3 max-w-md text-slate-400">
                Add your salary or other income sources to monitor your financial growth and savings.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  </div>
);
};

export default BudgetPage;
