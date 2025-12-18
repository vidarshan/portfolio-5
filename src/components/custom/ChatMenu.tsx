import { getClientId } from "@/app/utils/clientId";
import React, { useEffect, useRef, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { Dot, X } from "lucide-react";
import { GoDotFill } from "react-icons/go";
import { formatDateTime } from "@/app/utils/dateFormat";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "../ui/separator";

interface ChatMessage {
  client_id: string;
  content: string;
  created_at: string;
  id: string;
  role: "user" | "assistant";
}

const ChatMenu = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [chatUsage, setChatUsage] = useState<number>(0);
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
    const res = await fetch(`/api/chat?clientId=${clientId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Fetch failed");

    const data = await res.json();
    return data;
  }

  // async function submit() {
  //   if (!input.trim()) return;

  //   setLoading(true);
  //   setReply(null);

  //   const res = await fetch("/api/chat", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ message: input, clientId: getClientId() }),
  //   });

  //   const data = await res.json();
  //   console.log(data);
  //   setReply(data.reply);
  //   setLoading(false);
  // }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatHistory]);

  async function sendMessage() {
    const clientId = getClientId();

    // 1. Optimistically add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      client_id: clientId,
      role: "user",
      content: input,
      created_at: new Date().toISOString(),
    };

    setChatHistory((prev) => [...prev, userMessage]);

    // 2. Send to server
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input, clientId }),
    });

    const data = await res.json();

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
          setChatUsage(data?.usage?.count || 0);
        }
      } catch (err) {
        console.error("Failed to fetch chat history", err);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [opened]);

  console.log("Chat history:", chatHistory);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-md">
      {opened && (
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
                <div className="absolute inset-[2px] rounded-full bg-white dark:bg-neutral-900" />
              </div>

              <span className="text-sm font-semibold tracking-wide">
                AI Overview
              </span>
            </div>

            <span className="text-xs font-medium text-neutral-500">
              {20 - chatUsage} / 20 remaining
            </span>
            <X onClick={() => setOpened(false)} />
          </div>

          {/* Soft divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300/50 dark:via-neutral-700/50 to-transparent" />

          {/* Chat area */}
          <div className="relative flex max-h-64 overflow-x-hidden overflow-y-auto overflow-scroll flex-col gap-3 hide-scrollbar">
            <Alert className="bg-transparent border-none p-0">
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
                <ChatBubble role={msg.role} content={msg.content} created_at={msg.created_at} />
              </div>
            ))}
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

      {!collapsed ? (
        <div className="flex items-center gap-3 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur border border-neutral-300 dark:border-neutral-800 shadow-xl px-4 py-3">
          <input
            value={input}
            onFocus={() => setOpened(true)}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything about my work"
            className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-500 outline-none"
          />
          <span className="text-xs text-neutral-500">↵</span>
        </div>
      ) : (
        <button
          onClick={() => setCollapsed(false)}
          className="w-full rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur border border-neutral-300 dark:border-neutral-800 shadow-xl px-5 py-3 text-sm text-neutral-900 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          Ask me anything
        </button>
      )}
    </div>
  );
};

export default ChatMenu;
