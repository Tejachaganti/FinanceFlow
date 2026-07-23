import { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { if (import.meta.env.DEV) console.error("FinanceFlow render error", error, info); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return <main className="grid min-h-screen place-items-center bg-[#0B1120] p-6 text-white"><section role="alert" className="w-full max-w-md rounded-3xl border border-slate-700 bg-[#131A2A] p-8 text-center shadow-2xl"><AlertTriangle className="mx-auto text-amber-300" size={34} /><h1 className="mt-5 text-xl font-bold">Something went wrong</h1><p className="mt-3 text-sm leading-6 text-slate-400">FinanceFlow couldn’t display this screen. Your data has not been changed.</p><button onClick={() => window.location.reload()} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><RefreshCw size={16} /> Reload FinanceFlow</button></section></main>;
  }
}
export default ErrorBoundary;
