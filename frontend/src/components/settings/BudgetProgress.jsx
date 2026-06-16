const BudgetProgress = ({ snapshot }) => {
  const percent = Math.min(snapshot?.budgetUsedPercent || 0, 100);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-white">Budget progress</h3>
        <span className="text-sm text-slate-400">Real-time monthly utilization</span>
      </div>
      <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-800">
        <div className={`h-full rounded-full ${percent >= 100 ? "bg-rose-500" : percent >= 80 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-3 text-sm text-slate-300">{percent.toFixed(0)}% of budget used this month.</p>
    </div>
  );
};

export default BudgetProgress;
