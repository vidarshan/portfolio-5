"use client";

import React, { useState } from "react";
import { RiOpenaiFill } from "react-icons/ri";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRotatingPlaceholder } from "@/hooks/useRotatingPlaceholder";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const AIInput = () => {
  const placeholder = useRotatingPlaceholder(3000);
  const [open, setOpen] = useState(false);

  const handleFocus = () => setOpen(true);
  const closeChat = () => setOpen(false);

  return (
    <div
      className=" z-40
      fixed bottom-1 left-1/2 -translate-x-1/2
      w-full max-w-md rounded-xl
      bg-white/40 dark:bg-white/10
      backdrop-blur-xl
      border border-black/10 dark:border-white/20
      shadow-xl
      overflow-hidden flex flex-col
    "
    >
      {" "}
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
      {/* Input Row */}
      <div className="flex items-center gap-2 p-2">
        <Input
          type="text"
          placeholder={placeholder}
          onFocus={handleFocus}
          className="
            flex-1 h-8 px-4 text-base
            bg-black/5 dark:bg-white/10
            border border-black/20 dark:border-white/20
            text-black dark:text-white
            placeholder:text-black/40 dark:placeholder:text-white/40
            rounded-lg
          "
        />
        <Button
          type="submit"
          className="
            h-8 px-4 rounded-lg flex items-center gap-2
          "
        >
          <RiOpenaiFill />
          Ask ChatGPT
        </Button>
      </div>
    </div>
  );
};

export default AIInput;
