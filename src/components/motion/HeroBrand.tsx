"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { HeroMark } from "./HeroMark";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The mark and the name are one gesture, not two stacked elements: the
// wordmark is struck in — wiped left to right like a stamp — at the exact
// frame the mark's last piece seats, and an ember rule draws under it as the
// heat bleeds off.
export function HeroBrand() {
  const reduceMotion = useReducedMotion();
  const [struck, setStruck] = useState(false);

  const onAssembled = useCallback(() => setStruck(true), []);

  return (
    <div className="flex flex-col items-center">
      <HeroMark className="block h-auto w-full" onAssembled={onAssembled} />

      <div className="mt-5 w-full sm:mt-6">
        <motion.p
          className="tarc-logotype text-center text-[clamp(1.5rem,7vw,2.75rem)] leading-none tracking-tight text-foreground"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { clipPath: "inset(0 100% 0 0)", opacity: 1 }
          }
          animate={
            reduceMotion
              ? { opacity: struck ? 1 : 0 }
              : { clipPath: struck ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }
          }
          transition={{ duration: reduceMotion ? 0.4 : 0.62, ease: EASE_OUT_EXPO }}
        >
          TARC <span className="text-orange">Tech</span>
        </motion.p>

        <motion.div
          aria-hidden
          className="mx-auto mt-3 h-px w-full max-w-[14rem] origin-left bg-gradient-to-r from-orange via-orange-deep to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={struck ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.3 : 0.7,
            delay: reduceMotion ? 0 : 0.18,
            ease: EASE_OUT_EXPO,
          }}
        />
      </div>
    </div>
  );
}
