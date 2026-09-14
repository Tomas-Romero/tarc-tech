"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { locales, type Locale } from "@/i18n";

export function LocaleToggle({
  locale,
  label,
  scope = "default",
}: {
  locale: Locale;
  label: string;
  /** Distinguishes the sliding-pill `layoutId` between simultaneously
   *  mounted instances (desktop nav vs. the mobile menu's own copy, which
   *  stays in the DOM — just `hidden` — while the other is open) so Motion
   *  never tries to sync one shared layout animation across two unrelated
   *  elements. */
  scope?: string;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  // Read after mount, not during render: the initial (SSR-matching) render
  // must be hash-free, so the anchor is only known once we're safely on the
  // client — reading window.location.hash inline here is unreliable across
  // hydration and silently drops the anchor.
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(window.location.hash);
  }, [pathname]);

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-0.5 rounded-full border border-border p-0.5 text-xs font-medium"
    >
      {locales.map((code) => {
        const active = code === locale;
        const rest = pathname.split("/").slice(2).join("/");
        const href = `/${code}${rest ? `/${rest}` : ""}${hash}`;

        return (
          <Link
            key={code}
            href={href}
            aria-current={active ? "true" : undefined}
            className={`relative flex h-11 min-w-11 items-center justify-center rounded-full px-2.5 uppercase transition-[color,transform] duration-150 active:scale-90 ${
              active ? "text-[#431407]" : "text-foreground-secondary hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`locale-pill-${scope}`}
                className="absolute inset-0 rounded-full bg-orange"
                transition={
                  reduceMotion
                    ? { duration: 0.1 }
                    : { type: "spring", duration: 0.4, bounce: 0.15 }
                }
              />
            )}
            <span className="relative">{code}</span>
          </Link>
        );
      })}
    </div>
  );
}
