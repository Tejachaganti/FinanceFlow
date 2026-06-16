const Loader = ({ fullScreen = false, label = "Loading" }) => (
  <div className={`${fullScreen ? "min-h-screen" : "min-h-[200px]"} flex items-center justify-center`}>
    <div className="flex items-center gap-3 rounded-full border border-cyan-400/20 bg-slate-900/70 px-5 py-3 text-sm text-slate-200 backdrop-blur">
      <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
      {label}
    </div>
  </div>
);

export default Loader;
