"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

// Ambient depth for content-only sections that would otherwise sit on a flat
// background — DESIGN.md's "Persuade" mode wants the page to keep earning
// attention past the Hero, not go quiet the moment the copy takes over.
// Built entirely from the isotipo's own faceted vocabulary (the clip-path
// octagon Process's step badges use) — never a literal photo, and never the
// "glow naranja": DESIGN.md reserves that blurred effect for exactly three
// spots (CTA hover, the isotipo assembly flash, the active timeline step),
// so accents here are flat border color only, no box-shadow.
//
// The diagonal lattice itself lives in `PageGrid` now, one fixed layer for
// the whole document — each section used to draw its own patch, and every
// section boundary was a visible seam where the two patches fell out of
// phase with each other. This component keeps only the two floating shapes,
// which are meant to be per-section (their scroll-linked parallax is tied to
// each section's own scroll range).
//
// Two shapes drift past each other at different scroll-linked speeds for a
// small parallax as the section scrolls through — collapses to fully static
// under prefers-reduced-motion, same as every other scroll-tied moment on
// the page.
const OCTAGON =
  "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)";

export function SectionBackdrop({
  accent = false,
}: {
  /** Gives the smaller shape a faint orange-deep border instead of a neutral
   *  one — a restrained accent, not the reserved glow — for the one or two
   *  sections per page that can carry it. */
  accent?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const slow = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const fast = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.span
        style={{ y: reduceMotion ? 0 : slow, clipPath: OCTAGON }}
        className="absolute -right-8 top-[8%] h-40 w-40 border border-foreground-secondary/25 sm:h-56 sm:w-56"
      />
      <motion.span
        style={{ y: reduceMotion ? 0 : fast, rotate: 45 }}
        className={`absolute -left-10 bottom-[10%] h-24 w-24 border sm:h-32 sm:w-32 ${
          accent ? "border-orange-deep/40" : "border-foreground-secondary/25"
        }`}
      />
    </div>
  );
}
