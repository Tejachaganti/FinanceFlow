const toneClasses = {
  info: "border-cyan-400/20 bg-cyan-500/10 text-cyan-100",
  success: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
  warning: "border-amber-400/20 bg-amber-500/10 text-amber-100",
  danger: "border-rose-400/20 bg-rose-500/10 text-rose-100"
};

const InsightsPanel = ({ insights }) => (
  <div className="glass-card p-5">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="font-display text-xl font-semibold text-white">AI insights</h3>
      <span className="text-sm text-slate-400">Rule-based intelligence</span>
    </div>
    <div className="space-y-3">
      {insights.map((item) => (
        <article key={item.title} className={`rounded-2xl border p-4 ${toneClasses[item.tone] || toneClasses.info}`}>
          <p className="font-semibold">{item.title}</p>
          <p className="mt-2 text-sm opacity-90">{item.description}</p>
        </article>
      ))}
    </div>
  </div>
);

export default InsightsPanel;
