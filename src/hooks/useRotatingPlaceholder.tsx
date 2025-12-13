"use client";

import { useEffect, useState } from "react";

const prompts = [
  "Summarize this portfolio…",
  "What does Vidarshan specialize in?",
  "Which project should I see first?",
  "Explain my skills simply…",
  "Give me a quick overview…",
];

export function useRotatingPlaceholder(interval = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % prompts.length);
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return prompts[index];
}
