"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The last piece of the hero to settle — fades in after the headline and
// CTAs, once the visitor has already read the pitch. "Tomás Romero" is a
// real link to #contacto with its own underline-draw, the same technique
// HeroBrand uses under the wordmark, so the signature reads as connected to
// the brand mark rather than a stray caption.
export function HeroSignature({
  prefix,
  name,
  suffix,
}: {
  prefix: string;
  name: string;
  suffix: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.p
      className="mt-8 text-sm text-foreground-secondary"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.9, ease: EASE_OUT_EXPO }}
    >
      {prefix}
      <a
        href="#contacto"
        className="group/sig relative inline-block font-medium text-foreground transition-colors duration-200 hover:text-orange-deep"
      >
        {name}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-orange to-orange-deep transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/sig:scale-x-100"
        />
      </a>
      {suffix}
    </motion.p>
  );
}
