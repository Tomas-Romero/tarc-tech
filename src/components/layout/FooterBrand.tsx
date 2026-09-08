"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The sign-off: the name at full width, seated hard on the page's bottom
// edge and slightly cropped by it, so it reads as stamped into the page
// rather than placed on it. Wiped up into view on first arrival — the same
// strike language as the hero, at the other end of the scroll.
export function FooterBrand() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative select-none overflow-hidden px-4 pt-8 sm:px-6"
    >
      {/* Cropped by the page's own bottom edge on purpose — the name runs
          off the end of the document rather than sitting politely inside it. */}
      <motion.p
        className="tarc-logotype -mb-[0.14em] whitespace-nowrap text-center text-[15.5vw] leading-[0.78] tracking-[-0.03em] text-foreground"
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { clipPath: "inset(100% 0 0 0)", y: 26 }
        }
        whileInView={
          reduceMotion
            ? { opacity: 1 }
            : { clipPath: "inset(0% 0 0 0)", y: 0 }
        }
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: reduceMotion ? 0.4 : 0.9, ease: EASE_OUT_EXPO }}
      >
        TARC Tech
      </motion.p>
    </div>
  );
}
