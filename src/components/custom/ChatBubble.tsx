import { formatDateTime } from "@/app/utils/dateFormat";
import { JSX } from "react";

type ChatBubbleProps = {
  role: "user" | "assistant";
  content: JSX.Element | string;
  created_at: string;
};

export const ChatBubble = ({ role, content, created_at }: ChatBubbleProps) => {
  const isUser = role === "user";

  return (
    <div>
      <div
        className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`
          relative max-w-[75%] px-4 py-2 text-sm leading-relaxed
          rounded-2xl
          ${
            isUser
              ? `
              bg-neutral-900 text-white
              dark:bg-neutral-100 dark:text-neutral-900
              rounded-br-md
            `
              : `
              bg-white/80 dark:bg-neutral-800/80
              text-neutral-900 dark:text-neutral-100
              border border-neutral-200/60 dark:border-neutral-700/60
              rounded-bl-md
              shadow-sm
            `
          }
        `}
        >
          {/* Assistant spectral edge */}
          {!isUser && (
            <div
              className="
              pointer-events-none absolute inset-0 rounded-2xl
              ring-1 ring-transparent
              before:absolute before:inset-0 before:rounded-2xl
              before:bg-gradient-to-br
              before:from-[#3B82F6]/20
              before:via-[#8B5CF6]/15
              before:via-[#EC4899]/10
              before:to-[#EF4444]/10
              before:opacity-60
            "
            />
          )}

          <span className="relative z-10">{content}</span>
        </div>
      </div>
      <div
        className={`w-full text-xs text-neutral-500 ${
          isUser ? "text-right" : "text-left"
        } mt-1`}
      >
        {formatDateTime(created_at)}
      </div>
    </div>
  );
};
