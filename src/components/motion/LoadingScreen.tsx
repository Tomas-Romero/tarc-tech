"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const SEEN_KEY = "tarc-intro-seen";
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const HOLD_MS = 1500;

// Brand intro, once per session. Deliberately a DIFFERENT beat from the
// Hero's assembly so the visitor isn't shown the same trick twice: here the
// mark comes out of the forge — pulled up out of the dark, molten and
// over-bright, cooling into crisp metal — then the name is struck under it
// and the whole plate lifts away to reveal the page.
export function LoadingScreen() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) return;

    setVisible(true);
    const t = setTimeout(
      () => {
        setVisible(false);
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          // Private browsing — it replays next load, harmless.
        }
      },
      reduceMotion ? 600 : HOLD_MS
    );
    return () => clearTimeout(t);
  }, [reduceMotion]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-background px-6"
          initial={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: "-6%", filter: "blur(6px)" }
          }
          transition={{ duration: reduceMotion ? 0.3 : 0.65, ease: EASE_OUT_EXPO }}
        >
          {/* Ember pooled behind the mark, as if it were still radiating. */}
          {!reduceMotion && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute h-[38rem] w-[38rem] max-w-[120vw] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, var(--color-orange-deep) 0%, transparent 62%)",
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: [0, 0.5, 0.22], scale: [0.7, 1.05, 1] }}
              transition={{ duration: 1.4, times: [0, 0.35, 1], ease: EASE_OUT_EXPO }}
            />
          )}

          <motion.div
            className="relative w-40 sm:w-56"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 34,
                    clipPath: "inset(100% 0 0 0)",
                    filter: "blur(14px) brightness(2.1) saturate(0.4)",
                  }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0% 0 0 0)",
                    filter: "blur(0px) brightness(1) saturate(1)",
                  }
            }
            transition={{ duration: reduceMotion ? 0.4 : 0.95, ease: EASE_OUT_EXPO }}
          >
            <Image
              src="/brand/isotipo.svg"
              alt=""
              width={224}
              height={182}
              priority
              className="h-auto w-full"
            />
          </motion.div>

          <div className="relative flex flex-col items-center">
            <motion.p
              className="tarc-logotype text-[clamp(1.75rem,9vw,3.25rem)] leading-none tracking-tight text-foreground"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { clipPath: "inset(0 100% 0 0)" }
              }
              animate={
                reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }
              }
              transition={{
                duration: reduceMotion ? 0.3 : 0.6,
                delay: reduceMotion ? 0.1 : 0.5,
                ease: EASE_OUT_EXPO,
              }}
            >
              TARC Tech
            </motion.p>

            <motion.div
              aria-hidden
              className="mt-4 h-px w-full origin-left bg-gradient-to-r from-orange via-orange-deep to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reduceMotion ? 0.3 : 0.75,
                delay: reduceMotion ? 0.15 : 0.78,
                ease: EASE_OUT_EXPO,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
