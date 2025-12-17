"use client";

import React, { useState } from "react";
import { RiOpenaiFill } from "react-icons/ri";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRotatingPlaceholder } from "@/hooks/useRotatingPlaceholder";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowScroll } from "@mantine/hooks";

const AIInput = () => {
  const placeholder = useRotatingPlaceholder(3000);
  const [open, setOpen] = useState(false);

  const handleFocus = () => setOpen(true);
  const closeChat = () => setOpen(false);

  const [scroll, scrollTo] = useWindowScroll();
  console.log(scroll);

  return (
    <motion.div
      animate={{
        maxWidth: scroll.y === 0 ? "28rem" : "fit-content",
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="
    z-40 fixed bottom-4 left-1/2 -translate-x-1/2 w-fill
    bg-white/40 dark:bg-white/10
    backdrop-blur-xl
    border border-black/10 dark:border-white/20
    shadow-xl rounded-xl overflow-hidden
  "
    >
      {open && (
        <motion.div
          key="chat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex flex-col"
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between">
            <RiOpenaiFill className="text-2xl text-black/70 dark:text-white/70" />
            <div>
              <p className="text-sm font-medium text-black/80 dark:text-white/90">
                AI Overview
              </p>
              <p className="text-xs text-center text-black/50 dark:text-white/60">
                GPT-4o
              </p>
            </div>
            <X className="cursor-pointer" onClick={closeChat} />
          </div>

          <Separator className="bg-black/10 dark:bg-white/20" />

          {/* Message Area */}
          <div className="p-3 min-h-40 max-h-80 overflow-y-auto space-y-3">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-black/5 dark:bg-white/15 rounded-lg px-3 py-2 max-w-[85%]">
                <p className="text-sm text-black/80 dark:text-white/80">
                  Summarize this whole portfolio so I can read it quickly.
                </p>
              </div>
            </div>

            {/* AI message */}
            <div className="flex justify-start">
              <div className="bg-black/5 dark:bg-white/10 rounded-lg px-3 py-2 max-w-[85%]">
                <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit...
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-black/10 dark:bg-white/20" />
        </motion.div>
      )}

      <div className="flex items-center gap-2 p-1 whitespace-nowrap">
        <motion.div
          animate={{
            width: scroll.y === 0 ? "100%" : 0,
            opacity: scroll.y === 0 ? 1 : 0,
            marginRight: scroll.y === 0 ? 8 : 0,
            pointerEvents: scroll.y === 0 ? "auto" : "none",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden"
          style={{
            minWidth: 0,
            flexShrink: 1,
          }}
        ></motion.div>

        <Button
          type="submit"
          className="h-8 px-4 rounded-lg flex items-center gap-2"
        >
          <RiOpenaiFill />
          Ask ChatGPT
        </Button>
      </div>
    </motion.div>
  );
};

export default AIInput;
