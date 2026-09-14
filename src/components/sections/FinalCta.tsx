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
    <section id="contacto" className="relative overflow-hidden px-6 py-24">
      {/* Real photo Tomás picked for this section, in its own color — the
          card sitting on top of it is a translucent tint rather than a
          solid fill, so the photo actually shows through instead of only
          living in the margins around the card. */}
      <Image
        src="/contact/contact-visual.jpg"
        alt=""
        aria-hidden
        fill
        className="pointer-events-none absolute inset-0 object-cover opacity-[0.35]"
        sizes="100vw"
      />

      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: reduceMotion ? 0.4 : 0.7, ease: EASE_OUT_EXPO }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-lg bg-orange/60 px-6 py-16 text-center backdrop-blur-sm sm:px-12"
        style={{ color: ON_ORANGE }}
      >
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

        {/* Button, divider and contact info as one group now, so the
            isotipo can sit beside it — centered on the group, just to its
            right — instead of stamped in a far corner of the card. */}
        <div className="relative mx-auto mt-9 w-fit">
          <motion.div {...item(0.16)}>
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

          {/* The isotipo: centered on this block and sitting just to its
              right, not cropped in a corner — visible enough to read as a
              deliberate mark, not competing with the button or the text. */}
          <Image
            src="/brand/isotipo-mono-white.svg"
            alt=""
            aria-hidden
            width={200}
            height={163}
            className="pointer-events-none absolute left-full top-1/2 hidden h-auto w-24 -translate-y-1/2 opacity-[0.3] md:ml-10 md:block lg:w-32"
          />
        </div>
      </motion.div>
    </section>
  );
}
