import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600">
        <Bot className="h-5 w-5 text-white" />
      </div>

      <div className="rounded-3xl border border-slate-700/40 bg-slate-900/60 px-5 py-4">
        <p className="mb-3 text-sm text-slate-400">
          FinanceFlow AI is thinking...
        </p>

        <div className="flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;