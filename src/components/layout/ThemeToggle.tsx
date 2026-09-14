"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SunIcon, MoonIcon } from "@/components/ui/icons";

const STORAGE_KEY = "tarc-theme";

export function ThemeToggle({ label }: { label: string }) {
  const reduceMotion = useReducedMotion();
  // Must start at the DEFAULT theme (light) on both server and the first
  // client render — reading `document` in the initializer would fight the
  // blocking script in [locale]/layout.tsx and throw a hydration mismatch
  // for any returning dark-theme visitor. The effect below corrects it
  // right after mount, without writing back to a DOM the script already
  // set correctly.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Private browsing / storage disabled — theme still works for this session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={isDark}
      className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-md text-foreground-secondary transition-[color,transform] duration-150 hover:text-foreground active:scale-90"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          className="flex"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.25, ease: [0.23, 1, 0.32, 1] }}
        >
          {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
