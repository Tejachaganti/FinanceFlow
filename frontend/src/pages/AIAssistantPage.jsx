import { Clock3, MessageCircleMore, Plus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import useAIChat from "../hooks/useAIChat";
import AIHeader from "../components/ai/AIHeader";
import AIChatWindow from "../components/ai/AIChatWindow";
import AIInput from "../components/ai/AIInput";

const AIAssistantPage = () => {
  const { message, setMessage, messages, isTyping, sendMessage, sendPrompt, regenerateResponse, newChat } = useAIChat();
  const conversationPrompts = messages.filter((item) => item.role === "user");
  return <main className="min-h-screen bg-[#0B1120] text-white"><div className="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8"><AIHeader onNewChat={newChat} />
    <div className="grid min-h-[620px] grid-cols-1 gap-6 xl:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="order-2 rounded-3xl border border-slate-700/50 bg-[#131A2A] p-4 xl:order-1 xl:flex xl:flex-col">
        <div className="flex items-center justify-between xl:block"><div className="flex items-center gap-2 text-sm font-semibold text-slate-200"><MessageCircleMore size={17} className="text-cyan-300" /> Conversation</div><button onClick={newChat} className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/10 xl:mt-4 xl:w-full xl:justify-center xl:border xl:border-slate-700 xl:py-2"><Plus size={15} /> New chat</button></div>
        <div className="mt-4 max-h-36 space-y-2 overflow-y-auto xl:max-h-none xl:flex-1">{conversationPrompts.length ? conversationPrompts.map((item) => <button key={item.id} onClick={() => sendPrompt(item.content)} className="flex w-full items-center gap-2 rounded-xl bg-slate-900/45 px-3 py-2.5 text-left text-xs text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"><Clock3 size={14} className="shrink-0 text-slate-500" /><span className="truncate">{item.content}</span></button>) : <div className="rounded-2xl border border-dashed border-slate-700 p-4 text-xs leading-5 text-slate-500">Your questions in this chat will appear here for quick reference.</div>}</div>
        <div className="mt-4 hidden rounded-2xl bg-cyan-400/5 p-3 text-xs leading-5 text-slate-400 xl:block"><Sparkles size={15} className="mb-2 text-cyan-300" /> Start a new chat anytime to clear this conversation.</div>
      </aside>
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="order-1 flex min-h-[620px] flex-col overflow-hidden rounded-3xl border border-slate-700/50 bg-[#131A2A] shadow-2xl shadow-black/10 xl:order-2"><div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-3.5"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="text-sm font-semibold text-slate-200">FinanceFlow AI</span></div><span className="text-xs text-slate-500">Financial guidance</span></div><AIChatWindow messages={messages} isTyping={isTyping} onSelectPrompt={sendPrompt} onRegenerate={regenerateResponse} /><AIInput value={message} onChange={(event) => setMessage(event.target.value)} onSend={sendMessage} disabled={isTyping} /></motion.section>
    </div>
  </div></main>;
};

export default AIAssistantPage;
