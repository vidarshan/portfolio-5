import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-prose space-y-6 text-neutral-700 dark:text-neutral-400"
    >
      <h2 className="text-xl text-neutral-900 dark:text-neutral-200">
        How I think
      </h2>
      <p>
        I believe good frontend work is invisible when done right. The best
        interfaces don’t draw attention to themselves — they remove friction and
        let people focus on what matters.
      </p>
    </motion.div>
  );
};

export default About;
