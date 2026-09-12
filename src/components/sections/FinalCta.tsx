"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { social } from "@/lib/social";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The one sanctioned exception to "orange is never a section background"
// (DESIGN.md §Colors). Text on it is the dark ember, never white — white on
// #F97316 lands around 2.9:1 and fails AA, which PRODUCT.md calls out by name.
const ON_ORANGE = "#431407";

// This is the page's closing beat (PRODUCT.md's peak-end framing puts real
// weight on it): the panel arrives with more weight than the generic Reveal
// every other section uses, and its own content settles in on a short
// stagger rather than as one flat block.
export function FinalCta({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();

  const item = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: reduceMotion ? 0.4 : 0.55, delay: reduceMotion ? 0 : delay, ease: EASE_OUT_EXPO },
  });

  return (
    <section id="contacto" className="px-6 py-24">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: reduceMotion ? 0.4 : 0.7, ease: EASE_OUT_EXPO }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-lg bg-orange px-6 py-16 text-center sm:px-12"
        style={{ color: ON_ORANGE }}
      >
        {/* The isotipo, cropped off the corner — the same "stamped into the
            page" language FooterBrand uses at the very end of the document,
            echoed here at the end of the content instead. Low-opacity white
            so it reads as an embossed watermark on the orange, not a second
            logo competing with the CTA. */}
        <Image
          src="/brand/isotipo-mono-white.svg"
          alt=""
          aria-hidden
          width={280}
          height={228}
          className="pointer-events-none absolute -right-14 -top-14 h-auto w-48 opacity-[0.12] sm:w-64"
        />

        <motion.h2
          {...item(0)}
          className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {dict.finalCta.title}
        </motion.h2>

        <motion.p
          {...item(0.08)}
          className="relative mx-auto mt-4 max-w-xl text-lg"
          style={{ color: ON_ORANGE }}
        >
          {dict.finalCta.subtitle}
        </motion.p>

        <motion.div {...item(0.16)} className="relative mt-9">
          <a
            href={waLink(dict.whatsapp.finalCta)}
            target="_blank"
            rel="noopener noreferrer"
            className="tarc-cta-glow group inline-flex min-h-14 items-center gap-2.5 rounded-md bg-background px-7 text-lg font-medium text-foreground hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            {dict.finalCta.button}
          </a>
        </motion.div>

        <motion.div
          {...item(0.24)}
          className="relative mx-auto mt-10 h-px w-16 bg-current opacity-25"
          aria-hidden
        />

        <motion.div {...item(0.28)} className="relative mt-6 space-y-2">
          {social.email && (
            <p>
              <a
                href={`mailto:${social.email}`}
                className="font-medium underline underline-offset-4 opacity-90 transition-opacity hover:opacity-100"
                style={{ color: ON_ORANGE }}
              >
                {social.email}
              </a>
            </p>
          )}
          <p className="text-sm opacity-80" style={{ color: ON_ORANGE }}>
            {dict.finalCta.location}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
