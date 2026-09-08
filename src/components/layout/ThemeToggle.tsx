"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/components/ui/icons";

const STORAGE_KEY = "tarc-theme";

export function ThemeToggle({ label }: { label: string }) {
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
      className="flex h-11 w-11 items-center justify-center rounded-md text-foreground-secondary transition-colors hover:text-foreground"
    >
      {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
}
