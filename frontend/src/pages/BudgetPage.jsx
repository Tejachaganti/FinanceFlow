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
    <div className="space-y-4">
      <SectionHeading title="Budgeting & savings" subtitle="Set monthly limits, monitor overspending, and track income against savings goals." />
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleBudgetSubmit} className="glass-card space-y-4 p-5">
          <h3 className="font-display text-xl font-semibold text-white">Monthly budget plan</h3>
          <input className="field" type="number" value={form.monthlyBudget} onChange={(e) => setForm((prev) => ({ ...prev, monthlyBudget: e.target.value }))} placeholder="Monthly budget" />
          <input className="field" type="number" value={form.alertThresholdPercent} onChange={(e) => setForm((prev) => ({ ...prev, alertThresholdPercent: e.target.value }))} placeholder="Alert threshold %" />
          <button type="submit" className="btn-primary">Save budget</button>
        </form>
        <BudgetProgress snapshot={snapshot} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <form onSubmit={handleIncomeSubmit} className="glass-card space-y-4 p-5">
          <h3 className="font-display text-xl font-semibold text-white">Income tracking</h3>
          <input className="field" value={incomeForm.source} onChange={(e) => setIncomeForm((prev) => ({ ...prev, source: e.target.value }))} placeholder="Income source" />
          <input className="field" type="number" value={incomeForm.amount} onChange={(e) => setIncomeForm((prev) => ({ ...prev, amount: e.target.value }))} placeholder="Amount" />
          <input className="field" type="date" value={incomeForm.date} onChange={(e) => setIncomeForm((prev) => ({ ...prev, date: e.target.value }))} />
          <input className="field" value={incomeForm.notes} onChange={(e) => setIncomeForm((prev) => ({ ...prev, notes: e.target.value }))} placeholder="Notes" />
          <button type="submit" className="btn-primary">Add income</button>
        </form>
        <div className="glass-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-white">Income history</h3>
            <span className="text-sm text-slate-400">Savings goals ready</span>
          </div>
          <div className="space-y-3">
            {income?.map((item) => (
              <div key={item._id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="font-medium text-white">{item.source}</p>
                <p className="text-sm text-slate-400">{new Date(item.date).toLocaleDateString()} • {item.notes || "No notes"}</p>
                <p className="mt-1 font-semibold text-emerald-300">+{formatCurrency(item.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
