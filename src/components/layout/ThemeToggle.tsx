"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/components/ui/icons";

const STORAGE_KEY = "tarc-theme";

export function ThemeToggle({ label }: { label: string }) {
  // Starts in sync with the blocking script in [locale]/layout.tsx — no flash.
  const [isLight, setIsLight] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
  }, [isLight]);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
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
