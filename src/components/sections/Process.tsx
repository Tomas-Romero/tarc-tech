"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type { Dictionary, Locale } from "@/i18n";
import { processSteps, type ProcessStep } from "@/data/process";
import {
  EarIcon,
  LightbulbIcon,
  HammerIcon,
  RocketIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons";

const ICONS: Record<ProcessStep["icon"], ComponentType<{ className?: string }>> = {
  ear: EarIcon,
  lightbulb: LightbulbIcon,
  hammer: HammerIcon,
  rocket: RocketIcon,
  shield: ShieldCheckIcon,
};

const OCTAGON =
  "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
// How much scroll (in viewport-heights) buys one step-to-step transition —
// bigger than a single vh so each photo actually gets read, not flashed.
// Raised from the original 0.95 per Tomás's follow-up: the crossfade still
// read as rushed at that pace, and the fix is more runway per step, not a
// longer transition curve on the same runway (that would just soften the
// blend, not slow the pace you actually feel while scrolling).
const STEP_VH = 1.6;

// Second authored moment of the page (PLAN §6.6), reinvented as a
// full-bleed cinematic slideshow instead of a row of small cards: the
// pinned viewport itself becomes the photo, one per step, cross-fading as
// you scroll — Tomás asked for desktop to feel drastically more alive here,
// explicitly clearing us to change the page's own mood for this section.
// The five photos already existed (`process-*.jpg`); this just gives them
// the size and weight to actually carry the section instead of sitting in
// a thumbnail.
//
// Mobile drops the pin entirely and reads as a vertical connected timeline
// instead (Tomás's follow-up: the old side-scrolling card carousel read
// awkwardly on a phone) — a full-bleed photo per swipe would still fight the
// thumb for scroll ownership the same way a forced pin would, so the pinned
// cinematic treatment stays desktop-only either way.
export function Process({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const reduceMotion = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselActive, setCarouselActive] = useState(0);

  useEffect(() => {
    // 1024px matches the breakpoint "Qué hacemos" and the Solutions rail
    // already use — one consistent point where the page switches from
    // mobile-stacked to desktop-authored layouts.
    const query = window.matchMedia("(min-width: 1024px)");
    function sync() {
      const on = query.matches && !reduceMotion;
      setPinned(on);
      if (!on) return setScrollDistance(0);
      setScrollDistance(window.innerHeight * STEP_VH * (processSteps.length - 1));
    }
    sync();
    query.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(v * (processSteps.length - 1));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  // Mobile timeline: the step nearest the middle of the viewport counts as
  // "arrived" — the page itself scrolls now (no side-scrolling container of
  // its own), so this watches the real viewport instead of a scroll-parent.
  useEffect(() => {
    if (pinned) return;
    const nodes = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = nodes.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setCarouselActive(idx);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pinned]);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      style={pinned ? { height: `calc(100vh + ${scrollDistance}px)` } : undefined}
    >
      {pinned ? (
        <div className="sticky top-0 h-screen overflow-hidden bg-zinc-950">
          {processSteps.map((step, i) => (
            <StepBackdrop
              key={step.id}
              step={step}
              progress={scrollYProgress}
              index={i}
              count={processSteps.length}
            />
          ))}

          {/* Legibility scrims — one grounding the bottom text block, one
              darkening the left column where the copy sits. Never a
              full-frame flat tint: that would flatten the photos into
              wallpaper instead of letting them read as the point. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

          {/* Title stays a compact top-left eyebrow instead of anchoring the
              whole layout to `justify-between`; the step content below it
              centers in the REMAINING space instead of pinning to the very
              bottom edge, which is what read as "queda muy abajo y
              separado" — text now lives where the eye actually rests
              through most of the pin's scroll range. Top padding is pinned
              to `--nav-height` (plus a little air) rather than a flat `py`
              value: this box sticks flush to the viewport's own top edge, so
              a padding shorter than the fixed nav's height let the nav's own
              72px bar clip the heading's ascenders for as long as the
              section stayed pinned — not a one-off transient overlap like a
              normal scrolling section gets, but the whole time this title is
              on screen. */}
          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-6 pb-14 pt-[calc(var(--nav-height)+1.5rem)]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {dict.process.title}
              </h2>
              <p className="mt-3 max-w-md text-white/70">{dict.process.intro}</p>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
              <ActiveStep step={processSteps[activeIndex]} locale={locale} />
              <StepRail steps={processSteps} activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-24">
          <div className="mx-auto w-full max-w-3xl px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {dict.process.title}
            </h2>
            <p className="mt-4 text-foreground-secondary">{dict.process.intro}</p>
          </div>

          {/* Mobile / reduced motion: a vertical connected timeline instead
              of the old side-scrolling card carousel — Tomás felt swiping
              sideways read as awkward on a phone, and a timeline is the
              native shape for "these five things happen in order" on a
              column the thumb only ever moves up and down. Each step still
              carries its own real photo (kept, per his brief), just as a
              small thumbnail beside the text instead of a full card. */}
          <div className="relative mx-auto mt-10 max-w-md px-6">
            <div
              aria-hidden
              className="absolute bottom-6 left-[17px] top-6 w-px bg-border"
            />
            <ol className="relative space-y-10">
              {processSteps.map((step, i) => (
                <StepTimelineItem
                  key={step.id}
                  ref={(node) => {
                    cardRefs.current[i] = node;
                  }}
                  step={step}
                  locale={locale}
                  isActive={i === carouselActive}
                />
              ))}
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}

// One full-bleed layer per step, stacked; only its opacity animates. A
// gentler falloff than Services' own card highlight on purpose: that one
// can safely bottom out to 0 between two cards because there's a lit card
// on either side of the gap. A photo dipping all the way to 0 here means a
// flash of black between every step, since nothing else is holding the
// frame. Halving the falloff means neighbors overlap at ~50% at the
// midpoint instead of both hitting zero — a cross-dissolve, not a blackout.
function StepBackdrop({
  step,
  progress,
  index,
  count,
}: {
  step: ProcessStep;
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const idealCenter = count > 1 ? index / (count - 1) : 0;
  const falloff = count > 1 ? count - 1 : 1;
  const opacity = useTransform(progress, (v) =>
    Math.max(0, 1 - Math.abs(v - idealCenter) * falloff)
  );
  const scale = useTransform(opacity, [0, 1], [1.06, 1]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity, scale }}
      className="absolute inset-0"
    >
      <Image
        src={step.image}
        alt=""
        fill
        priority={index === 0}
        className="object-cover"
        sizes="100vw"
      />
    </motion.div>
  );
}

function ActiveStep({ step, locale }: { step: ProcessStep; locale: Locale }) {
  const Icon = ICONS[step.icon];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        className="max-w-xl"
      >
        <span className="flex items-center justify-center gap-2 text-sm font-medium text-orange">
          <Icon className="h-5 w-5" />
          {String(step.number).padStart(2, "0")}
        </span>
        <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          {step.title[locale]}
        </h3>
        <p className="mt-3 text-base text-white/75 sm:text-lg">
          {step.description[locale]}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

function StepRail({
  steps,
  activeIndex,
}: {
  steps: ProcessStep[];
  activeIndex: number;
}) {
  return (
    <ol className="hidden shrink-0 items-center gap-3 sm:flex">
      {steps.map((step, i) => {
        const isActive = i === activeIndex;
        return (
          <li key={step.id} className="flex items-center gap-3">
            <span
              aria-hidden
              style={{ clipPath: OCTAGON }}
              className={`flex h-9 w-9 items-center justify-center border text-xs font-bold transition-colors duration-300 ${
                isActive
                  ? "border-orange bg-orange text-[#431407]"
                  : "border-white/30 text-white/50"
              }`}
            >
              {String(step.number).padStart(2, "0")}
            </span>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={`h-px w-6 transition-colors duration-300 ${
                  i < activeIndex ? "bg-orange" : "bg-white/20"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepTimelineItem({
  ref,
  step,
  locale,
  isActive,
}: {
  ref?: (node: HTMLElement | null) => void;
  step: ProcessStep;
  locale: Locale;
  isActive?: boolean;
}) {
  const Icon = ICONS[step.icon];

  return (
    <li ref={ref} className="relative flex gap-4">
      {/* Badge sits on top of the shared vertical line drawn by the parent
          `<ol>` — the same octagon punch every numbered badge on the page
          uses, so this reads as one more step in the site's own timeline
          language, not a borrowed pattern. */}
      <span
        aria-hidden
        style={{ clipPath: OCTAGON }}
        className={`relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border text-xs font-bold transition-colors duration-300 ${
          isActive
            ? "border-orange bg-orange text-[#431407]"
            : "border-border bg-background text-foreground-secondary"
        }`}
      >
        {String(step.number).padStart(2, "0")}
      </span>

      <div className="flex min-w-0 flex-1 gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border">
          <Image
            src={step.image}
            alt=""
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-orange">
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="mt-1 text-base font-bold">{step.title[locale]}</h3>
          <p className="mt-1 text-sm text-foreground-secondary">
            {step.description[locale]}
          </p>
        </div>
      </div>
    </li>
  );
}
