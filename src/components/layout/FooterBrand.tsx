"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

// The sign-off: the name at full width, wiped up into view the same strike
// language the hero uses, at the other end of the scroll.
//
// Was previously clipped by its own container (`overflow-hidden` + a
// negative bottom margin meant to trim whitespace ended up slicing through
// the glyphs themselves) — sized on a clamp() now, with real breathing room
// below, so nothing gets cut off at any viewport width.
//
// Driven by scroll position (useScroll), not `whileInView`: this element
// sits at the document's own bottom edge, and an IntersectionObserver-based
// trigger there kept failing to fire — the browser has no more scroll room
// left to move it "into" a detection zone once you're already at the end of
// the page. Tying the wipe directly to scroll progress between "its top
// reaches the bottom of the viewport" and "its own bottom reaches the
// bottom of the viewport" sidesteps that: the second point is, by
// definition, exactly where scrolling maxes out for the last element on the
// page, so it always finishes revealing right as you hit the true bottom.
export function FooterBrand() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const clip = useTransform(scrollYProgress, (v) => {
    const revealed = Math.min(Math.max(v, 0), 1) * 100;
    return `inset(${100 - revealed}% 0 0 0)`;
  });
  const y = useTransform(scrollYProgress, [0, 1], [26, 0], { clamp: true });

  return (
    <div
      ref={ref}
      aria-hidden
      className="select-none px-4 pb-6 pt-8 sm:px-6"
    >
      <motion.p
        className="tarc-logotype whitespace-nowrap text-center text-[clamp(3rem,14vw,11rem)] leading-[0.9] tracking-[-0.03em] text-foreground"
        style={reduceMotion ? undefined : { clipPath: clip, y }}
      >
        TARC <span className="text-orange">Tech</span>
      </motion.p>
    </div>
  );
}
