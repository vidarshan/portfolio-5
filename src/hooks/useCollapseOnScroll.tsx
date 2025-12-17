"use client";

import { useEffect, useRef, useState } from "react";

export function useCollapseOnScroll() {
  const [collapsed, setCollapsed] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (y > lastY.current && y > 80) setCollapsed(true);
      if (y < 40) setCollapsed(false);

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return collapsed;
}
