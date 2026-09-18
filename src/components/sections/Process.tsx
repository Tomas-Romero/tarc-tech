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
const STEP_VH = 0.95;

// Second authored moment of the page (PLAN §6.6), reinvented as a
// full-bleed cinematic slideshow instead of a row of small cards: the
// pinned viewport itself becomes the photo, one per step, cross-fading as
// you scroll — Tomás asked for desktop to feel drastically more alive here,
// explicitly clearing us to change the page's own mood for this section.
// The five photos already existed (`process-*.jpg`); this just gives them
// the size and weight to actually carry the section instead of sitting in
// a thumbnail.
//
// Mobile keeps the small-card snap carousel from before, untouched — it
// already reads well at that size, and a full-bleed photo per swipe would
// fight the thumb for scroll ownership the same way a forced pin would.
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
  const carouselRef = useRef<HTMLDivElement>(null);
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

  // Mobile carousel: the step nearest the container's center counts as
  // "arrived," mirroring the desktop pin's activation with a normal
  // IntersectionObserver instead of a scroll-progress calculation.
  useEffect(() => {
    if (pinned) return;
    const root = carouselRef.current;
    const nodes = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!root || nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = nodes.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setCarouselActive(idx);
      },
      { root, threshold: [0.6] },
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

          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-6 py-14">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {dict.process.title}
              </h2>
              <p className="mt-3 max-w-md text-white/70">{dict.process.intro}</p>
            </div>

            <div className="flex items-end justify-between gap-10">
              <ActiveStep step={processSteps[activeIndex]} locale={locale} />
              <StepRail steps={processSteps} activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {dict.process.title}
            </h2>
            <p className="mt-4 max-w-xl text-foreground-secondary">
              {dict.process.intro}
            </p>
          </div>

          {/* Mobile / reduced motion: a snap carousel the thumb controls. */}
          <div
            ref={carouselRef}
            className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {processSteps.map((step, i) => (
              <StepCard
                key={step.id}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                step={step}
                locale={locale}
                width={260}
                snap
                isActive={i === carouselActive}
              />
            ))}
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
        <span className="flex items-center gap-2 text-sm font-medium text-orange">
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

function StepCard({
  ref,
  step,
  locale,
  width,
  snap,
  isActive,
}: {
  ref?: (node: HTMLElement | null) => void;
  step: ProcessStep;
  locale: Locale;
  width: number;
  snap?: boolean;
  isActive?: boolean;
}) {
  const Icon = ICONS[step.icon];

  return (
    <article
      ref={ref}
      style={{ width }}
      className={`group relative shrink-0 overflow-hidden rounded-lg border bg-surface transition-colors duration-300 ${
        isActive ? "border-orange" : "border-border hover:border-orange"
      } ${snap ? "snap-start" : ""}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={step.image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 70vw, 260px"
        />
        {/* Number, stamped on the photo itself — the same corner-cut
            faceted badge the old timeline used, just moved onto the image
            instead of floating beside bare text. */}
        <span
          aria-hidden
          style={{ clipPath: OCTAGON }}
          className={`absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center border text-xs font-bold backdrop-blur-sm transition-colors duration-300 ${
            isActive
              ? "border-orange bg-orange text-[#431407]"
              : "border-white/40 bg-black/30 text-white"
          }`}
        >
          {String(step.number).padStart(2, "0")}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-orange">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="mt-2 text-sm font-bold">{step.title[locale]}</h3>
        <p className="mt-1 text-xs text-foreground-secondary">
          {step.description[locale]}
        </p>
      </div>
    </article>
  );
}
