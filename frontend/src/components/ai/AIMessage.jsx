import { useState } from "react";
import { Bot, Check, Copy, RefreshCw, User } from "lucide-react";

const AIMessage = ({ role = "assistant", content, timestamp, isError = false, onRegenerate }) => {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);
  const copyMessage = async () => { try { await navigator.clipboard.writeText(content); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (error) { console.error("Failed to copy message:", error); } };
  return <div className={`flex gap-3 sm:gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
    {!isUser && <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/15"><Bot size={19} className="text-white" /></span>}
    <article className={`max-w-[calc(100%-3.25rem)] rounded-3xl border px-4 py-3.5 sm:max-w-[78%] sm:px-5 ${isUser ? "border-cyan-300/20 bg-gradient-to-br from-cyan-500 to-blue-600 text-white" : isError ? "border-rose-400/30 bg-rose-400/10 text-slate-200" : "border-slate-700/60 bg-slate-900/65 text-slate-200"}`}>
      <p className="whitespace-pre-wrap text-sm leading-6 sm:text-[15px] sm:leading-7">{content}</p>
      <footer className={`mt-3 flex items-center gap-2 ${timestamp ? "justify-between" : "justify-end"}`}>{timestamp && <span className={`text-[11px] ${isUser ? "text-cyan-100" : "text-slate-500"}`}>{timestamp}</span>}{!isUser && <div className="flex items-center"><button aria-label="Copy response" onClick={copyMessage} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300">{copied ? <Check size={15} /> : <Copy size={15} />}</button>{onRegenerate && <button aria-label="Regenerate response" onClick={onRegenerate} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"><RefreshCw size={15} /></button>}</div>}</footer>
    </article>
    {isUser && <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-700"><User size={18} className="text-white" /></span>}
  </div>;
};

export default AIMessage;
