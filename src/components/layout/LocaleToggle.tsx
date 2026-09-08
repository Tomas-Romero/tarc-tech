"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";

export function LocaleToggle({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
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
            className={`flex h-11 min-w-11 items-center justify-center rounded-full px-2.5 uppercase transition-colors ${
              active
                ? "bg-orange text-[#431407]"
                : "text-foreground-secondary hover:text-foreground"
            }`}
          >
            {code}
          </Link>
        );
      })}
    </div>
  );
}
