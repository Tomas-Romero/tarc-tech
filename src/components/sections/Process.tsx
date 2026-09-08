"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type { Dictionary, Locale } from "@/i18n";
import { processSteps, type ProcessStep } from "@/data/process";

// Second authored moment of the page (PLAN §6.6): the line is drawn by the
// scroll itself and each step ignites as the line reaches it — the method
// literally advancing in front of the visitor. Vertical on mobile, horizontal
// on desktop. Drawn with a transform (scaleX/scaleY) rather than an animated
// SVG path length: same authored effect, but it stays on the compositor,
// which matters on the mid-range phone PRODUCT.md names as the judge.
export function Process({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });

  // Reduced motion: the line is simply already drawn, and every step is lit.
  const drawn = useTransform(scrollYProgress, (v) => (reduceMotion ? 1 : v));

  return (
    <section id="proceso" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {dict.process.title}
      </h2>
      <p className="mt-4 max-w-xl text-foreground-secondary">
        {dict.process.intro}
      </p>

      <div ref={ref} className="relative mt-16">
        {/* Track + drawn line. The wrapper owns the centering translate and
            the animated child owns only its scale — Motion writes transform
            inline, so sharing one element would silently drop the centering. */}
        <div
          aria-hidden
          className="absolute left-5 top-0 h-full w-px -translate-x-1/2 md:hidden"
        >
          <div className="h-full w-full bg-border" />
          <motion.div
            style={{ scaleY: drawn }}
            className="absolute inset-0 origin-top bg-orange"
          />
        </div>

        <div
          aria-hidden
          className="absolute left-0 top-5 hidden h-px w-full -translate-y-1/2 md:block"
        >
          <div className="h-full w-full bg-border" />
          <motion.div
            style={{ scaleX: drawn }}
            className="absolute inset-0 origin-left bg-orange"
          />
        </div>

        <ol className="flex flex-col gap-10 md:flex-row md:gap-8">
          {processSteps.map((step, i) => (
            <Step
              key={step.id}
              step={step}
              locale={locale}
              progress={drawn}
              // Ignites as the line passes this step. Thresholds sit inside
              // the run (0.1 … 0.9 for five steps) so no step is already lit
              // before the line has been drawn to it.
              threshold={(i + 0.5) / processSteps.length}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  step,
  locale,
  progress,
  threshold,
  reduceMotion,
}: {
  step: ProcessStep;
  locale: Locale;
  progress: MotionValue<number>;
  threshold: number;
  reduceMotion: boolean;
}) {
  const lit = useTransform(
    progress,
    [Math.max(threshold - 0.06, 0), threshold],
    [0, 1],
    { clamp: true }
  );

  const numberColor = useTransform(
    lit,
    [0, 1],
    ["var(--color-border)", "var(--color-orange)"]
  );
  const numberText = useTransform(
    lit,
    [0, 1],
    ["var(--color-foreground-secondary)", "var(--color-orange)"]
  );
  const bodyOpacity = useTransform(lit, [0, 1], [0.55, 1]);

  return (
    <li className="relative flex gap-5 md:flex-1 md:flex-col md:gap-0">
      <motion.span
        aria-hidden
        style={
          reduceMotion
            ? { borderColor: "var(--color-orange)", color: "var(--color-orange)" }
            : { borderColor: numberColor, color: numberText }
        }
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background font-bold"
      >
        {step.number}
      </motion.span>

      <motion.div
        style={reduceMotion ? undefined : { opacity: bodyOpacity }}
        className="md:mt-6"
      >
        <h3 className="font-bold">{step.title[locale]}</h3>
        <p className="mt-2 text-sm text-foreground-secondary">
          {step.description[locale]}
        </p>
      </motion.div>
    </li>
  );
}
