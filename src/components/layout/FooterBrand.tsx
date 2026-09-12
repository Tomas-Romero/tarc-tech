"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The sign-off: the name at full width, wiped up into view the same strike
// language the hero uses, at the other end of the scroll. Re-plays every
// time it scrolls back into view (not just once) — a closing gesture that
// still feels alive if the visitor scrolls back up and down again.
//
// Was previously clipped by its own container (`overflow-hidden` + a
// negative bottom margin meant to trim whitespace ended up slicing through
// the glyphs themselves) — sized on a clamp() now, with real breathing room
// below, so nothing gets cut off at any viewport width.
export function FooterBrand() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="select-none px-4 pb-6 pt-8 sm:px-6">
      <motion.p
        className="tarc-logotype whitespace-nowrap text-center text-[clamp(3rem,14vw,11rem)] leading-[0.9] tracking-[-0.03em] text-foreground"
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
        viewport={{ once: false, margin: "0px 0px -12% 0px" }}
        transition={{ duration: reduceMotion ? 0.4 : 0.9, ease: EASE_OUT_EXPO }}
      >
        TARC <span className="text-orange">Tech</span>
      </motion.p>
    </div>
  );
}
