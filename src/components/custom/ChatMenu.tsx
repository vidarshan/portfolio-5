import { getClientId } from "@/app/utils/clientId";
import React, { useEffect, useRef, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { Dot, X } from "lucide-react";
import { AiOutlineOpenAI } from "react-icons/ai";
import { formatDateTime } from "@/app/utils/dateFormat";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "../ui/separator";
import { getQuota, getRemainingQuota } from "@/app/utils/getQuota";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Spinner } from "../ui/spinner";

interface ChatMessage {
  client_id: string;
  content: string;
  created_at: string;
  id: string;
  role: "user" | "assistant";
}

const ChatMenu = () => {
  const maxRequests = getQuota();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [chatUsage, setChatUsage] = useState<number>(0);
  const [chatQuota, setChatQuota] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [opened, setOpened] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => {
      setCollapsed(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function fetchChatHistory(clientId: string) {
    setLoading(true);
    const res = await fetch(`/api/chat?clientId=${clientId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      setLoading(false);
      throw new Error("Fetch failed");
    }

    const data = await res.json();
    setLoading(false);
    return data;
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatHistory]);

  async function sendMessage(question: string) {
    if (chatUsage === 0) {
      return;
    }
    const clientId = getClientId();
    setInput("");
    // 1. Optimistically add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      client_id: clientId,
      role: "user",
      content: question,
      created_at: new Date().toISOString(),
    };

    setChatHistory((prev) => [...prev, userMessage]);

    // 2. Send to server
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: question, clientId }),
    });

    const data = await res.json();
    setChatUsage(data?.remaining);

    // 3. Add assistant message
    setChatHistory((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        client_id: clientId,
        role: "assistant",
        content: data.reply,
        created_at: new Date().toISOString(),
      },
    ]);
  }

  console.log("Client ID in ChatMenu:", clientId);
  useEffect(() => {
    if (!opened) return;

    let isActive = true;

    (async () => {
      try {
        const data = await fetchChatHistory(getClientId());
        console.log("Fetched chat history data:", data);
        if (isActive) {
          setChatHistory(data?.data || []);
          setChatUsage(data?.remaining || 0);
          setChatQuota(data?.maxQuota || 0);
        }
      } catch (err) {
        console.error("Failed to fetch chat history", err);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [opened]);

  console.log("Remaining:", getRemainingQuota());
  console.log("Quota:", getQuota());

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-md">
      {opened && !loading && (
        <div
          className="
    relative flex flex-col gap-4
    rounded-3xl
    bg-white/85 dark:bg-neutral-900/85
    backdrop-blur-2xl
    border border-neutral-200/50 dark:border-neutral-800/60
    shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]
    px-5 py-4 mb-3
  "
        >
          {/* Luminous intelligence layer */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute -top-24 -left-24 h-72 w-72 bg-indigo-500/20 blur-3xl" />
            <div className="absolute top-1/3 -right-24 h-72 w-72 bg-cyan-400/15 blur-3xl" />
          </div>

          {/* Header */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Apple-like intelligence glyph */}
              <div className="relative h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg">
                <div className="flex items-center justify-center absolute inset-[2px] rounded-full bg-white dark:bg-neutral-900">
                  <AiOutlineOpenAI />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide">
                  AI Overview
                </span>

                <span className="text-xs font-medium text-neutral-300">
                  {chatUsage} / {chatQuota} remaining
                </span>
              </div>
            </div>

            <X className="cursor-pointer" onClick={() => setOpened(false)} />
          </div>

          {/* Soft divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300/50 dark:via-neutral-700/50 to-transparent" />

          {/* Chat area */}
          <div className="relative flex max-h-64 overflow-x-hidden overflow-y-auto overflow-scroll flex-col gap-3 hide-scrollbar">
            <Alert className="bg-transparent p-2">
              <AlertTitle className="text-sm text-neutral-500">
                Welcome to AI Overview
              </AlertTitle>

              <AlertDescription className="mt-1 text-sm text-neutral-500 leading-relaxed">
                Use this space to get personalized insights about{" "}
                Vidarshan&apos;s work, projects, and experience.
                <br />
                <span className="mt-2 block text-xs text-neutral-400">
                  Messages are automatically deleted on the 1st of each month.
                </span>
              </AlertDescription>
            </Alert>
            <Separator />
            {chatHistory.map((msg) => (
              <div key={msg.id}>
                <ChatBubble
                  role={msg.role}
                  content={msg.content}
                  created_at={msg.created_at}
                />
              </div>
            ))}
            {chatUsage === 0 && (
              <>
                <Separator />
                <Alert className="bg-transparent p-2">
                  <AlertTitle className="text-sm text-neutral-500">
                    Questions quota reached
                  </AlertTitle>

                  <AlertDescription className="mt-1 text-sm text-neutral-500 leading-relaxed">
                    Quota of {chatQuota} questions per month reached. Please
                    wait until the next month to ask more questions.
                  </AlertDescription>
                </Alert>
              </>
            )}
            <div ref={bottomRef} />
            {/* <ChatBubble
              role="assistant"
              content="Hello! I'm your AI assistant. How can I help you today?"
            />
            <ChatBubble
              role="user"
              content="Hello! I'm your AI assistant. How can I help you today?"
            />
            <ChatBubble
              role="assistant"
              content={
                <div className="flex flex-row">
                  <GoDotFill />
                  <GoDotFill />
                  <GoDotFill />
                </div>
              }
            /> */}
          </div>
        </div>
      )}
      <div className="bg-gradient-to-r from-indigo-500/70 to-cyan-400/70 rounded-xl shadow-lg p-[2px]">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur border border-neutral-300 dark:border-neutral-800 shadow-xl px-4 py-3"
            >
              {loading ? (
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="text-xs font-medium text-neutral-500">
                    Fetching chat...
                  </span>
                  <Spinner className="size-4" />
                </div>
              ) : (
                <input
                  value={input}
                  onFocus={() => setOpened(true)}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && input.trim()) {
                      sendMessage(input);
                    }
                  }}
                  placeholder={
                    chatUsage === 0
                      ? "Questions quota reached"
                      : "Ask me anything"
                  }
                  className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-500 outline-none"
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex justify-center rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur border border-neutral-300 dark:border-neutral-800 shadow-xl px-5 py-3"
            >
              <button
                onClick={() => setCollapsed(false)}
                className="flex items-center gap-1 text-sm text-neutral-900 dark:text-neutral-200"
              >
                <AiOutlineOpenAI />
                <span>
                  {chatUsage === 0
                    ? "Questions quota reached"
                    : "Ask me anything"}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatMenu;
