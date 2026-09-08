"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/components/ui/icons";

const STORAGE_KEY = "tarc-theme";

export function ThemeToggle({ label }: { label: string }) {
  // Must start false on both server and the first client render — reading
  // `document` in the initializer here would fight the blocking script in
  // [locale]/layout.tsx and throw a hydration mismatch for any returning
  // light-theme visitor. The effect below corrects it right after mount
  // instead, without writing back to a DOM the script already set correctly.
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.dataset.theme === "light");
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
    } catch {
      // Private browsing / storage disabled — theme still works for this session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={isLight}
      className="flex h-9 w-9 items-center justify-center rounded-md text-foreground-secondary transition-colors hover:text-foreground"
    >
      {isLight ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
  );
}
