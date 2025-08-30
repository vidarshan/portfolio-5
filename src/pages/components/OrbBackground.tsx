// components/OrbBackground.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

const OrbBackground = () => {
  return (
    <div >
      {/* Orb 1 */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-blue-500/30 blur-3xl"
        animate={{
          x: [0, 200, -150, 0],
          y: [0, -100, 150, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-purple-500/25 blur-3xl"
        animate={{
          x: [100, -200, 150, 100],
          y: [50, 200, -150, 50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default OrbBackground;
