"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Shared entrance for every section below the hero (DESIGN.md "Reveal
// wrapper"): fade + 16-24px translate on first viewport entry, staggered
// 60-80ms between siblings via the `delay` prop. transform/opacity only;
// disabled entirely under prefers-reduced-motion.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
