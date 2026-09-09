"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { social } from "@/lib/social";
import { ChatIcon } from "@/components/ui/icons";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The one sanctioned exception to "orange is never a section background"
// (DESIGN.md §Colors). Text on it is the dark ember, never white — white on
// #F97316 lands around 2.9:1 and fails AA, which PRODUCT.md calls out by name.
const ON_ORANGE = "#431407";

// This is the page's closing beat (PRODUCT.md's peak-end framing puts real
// weight on it), so it gets its own arrival — a touch more scale and time
// than the generic Reveal every other section uses — rather than reusing
// that wrapper verbatim.
export function FinalCta({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contacto" className="px-6 py-24">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: reduceMotion ? 0.4 : 0.7, ease: EASE_OUT_EXPO }}
        className="mx-auto max-w-5xl rounded-lg bg-orange px-6 py-16 text-center sm:px-12"
        style={{ color: ON_ORANGE }}
      >
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.finalCta.title}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: ON_ORANGE }}>
          {dict.finalCta.subtitle}
        </p>

        <a
          href={waLink(dict.whatsapp.finalCta)}
          target="_blank"
          rel="noopener noreferrer"
          className="tarc-cta-glow mt-8 inline-flex min-h-14 items-center gap-2.5 rounded-md bg-background px-7 text-lg font-medium text-foreground hover:-translate-y-0.5"
        >
          <ChatIcon className="h-5 w-5" />
          {dict.finalCta.button}
        </a>

        {social.email && (
          <p className="mt-8">
            <a
              href={`mailto:${social.email}`}
              className="font-medium underline underline-offset-4"
              style={{ color: ON_ORANGE }}
            >
              {social.email}
            </a>
          </p>
        )}

        <p className="mt-3 text-sm" style={{ color: ON_ORANGE }}>
          {dict.finalCta.location}
        </p>
      </motion.div>
    </section>
  );
}
