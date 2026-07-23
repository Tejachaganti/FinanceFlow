import { useState } from "react";
import api from "../services/api";

const timestamp = () => new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date());

const useAIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendPrompt = async (prompt) => {
    if (!prompt?.trim() || isTyping) return;
    const userMessage = { id: crypto.randomUUID(), role: "user", content: prompt.trim(), timestamp: timestamp() };
    setMessages((previous) => [...previous, userMessage]);
    setIsTyping(true);
    try {
      const { data } = await api.post("/ai/chat", { message: prompt.trim() });
      setMessages((previous) => [...previous, { id: crypto.randomUUID(), role: "assistant", content: data.reply || data.message || "I couldn't generate a response right now.", timestamp: timestamp() }]);
    } catch (error) {
      setMessages((previous) => [...previous, { id: crypto.randomUUID(), role: "assistant", content: "Sorry, something went wrong. Please try again.", timestamp: timestamp(), isError: true }]);
    } finally { setIsTyping(false); }
  };

  const sendMessage = () => { if (message.trim()) { sendPrompt(message); setMessage(""); } };
  const regenerateResponse = (messageIndex) => {
    const priorUserMessage = [...messages.slice(0, messageIndex)].reverse().find((item) => item.role === "user");
    if (priorUserMessage) sendPrompt(priorUserMessage.content);
  };
  const newChat = () => { setMessages([]); setMessage(""); };

  return { message, setMessage, messages, isTyping, sendMessage, sendPrompt, regenerateResponse, newChat };
};

export default useAIChat;
