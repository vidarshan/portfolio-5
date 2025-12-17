import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

const Experience = ({
  date,
  title,
  tech,
}: {
  date: string;
  title: string;
  tech: string[];
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-6 sm:gap-8"
    >
      <div className="text-xs tracking-wide text-neutral-500">{date}</div>

      <div>
        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-200">
          {title}
        </h3>
        <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-400 max-w-prose">
          I build and maintain frontend systems with an emphasis on long-term
          maintainability, accessibility, and collaboration with design.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
