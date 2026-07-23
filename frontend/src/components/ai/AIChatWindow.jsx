import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import WelcomeCard from "./WelcomeCard";
import AIMessage from "./AIMessage";
import TypingIndicator from "./TypingIndicator";

const AIChatWindow = ({ messages = [], isTyping = false, onSelectPrompt, onRegenerate }) => {
  const messagesEndRef = useRef(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, isTyping]);
  if (!messages.length && !isTyping) return <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-4 sm:p-7"><WelcomeCard onSelectPrompt={onSelectPrompt} /></div>;
  return <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6"><div className="mx-auto flex max-w-4xl flex-col gap-5">{messages.map((message, index) => <motion.div key={message.id || index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><AIMessage {...message} onRegenerate={() => onRegenerate?.(index)} /></motion.div>)}{isTyping && <TypingIndicator />}<div ref={messagesEndRef} /></div></div>;
};

export default AIChatWindow;
