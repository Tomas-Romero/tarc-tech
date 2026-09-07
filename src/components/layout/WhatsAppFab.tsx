"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { ChatIcon } from "@/components/ui/icons";

// Appears once the visitor scrolls past roughly the first viewport (PLAN
// §6.12: "aparece después del hero"). Uses scroll position rather than an
// element ref so it works before the real Hero section exists.
export function WhatsAppFab({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink(dict.whatsapp.nav)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.hero.ctaPrimary}
      className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ChatIcon className="h-7 w-7" />
    </a>
  );
}
