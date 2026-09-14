"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import {
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

const CARD_W = 260;
const GAP = 20;
// Same pacing knobs Services uses for its own horizontal pin, tuned further
// out than Services' own — Tomás felt the row still raced past. A bigger
// PACE means more scrolling buys less horizontal travel; HOLD_OUT_VH is a
// flat readjng pause added on top once the row finishes moving.
const PACE = 2.6;
const HOLD_OUT_VH = 0.6;

// Second authored moment of the page (PLAN §6.6) — rebuilt as the same
// pinned horizontal-scroll track "Qué hacemos" uses (motion.dev's own
// recipe: a tall section, a sticky viewport-height child, and the track's
// `x` driven by `scrollYProgress`), one real photo per step instead of an
// icon-and-line timeline that read as flat and empty. Desktop pins and
// travels sideways as you scroll; mobile keeps its thumb — a native snap
// carousel instead of hijacking the scroll, same split Services already
// makes and for the same reason (PRODUCT.md's mid-range-phone judge would
// feel a forced pin as jank there).
export function Process({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const reduceMotion = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [travel, setTravel] = useState(0);
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
      if (!on) return setTravel(0);
      const trackWidth = processSteps.length * CARD_W + (processSteps.length - 1) * GAP;
      const rawTravel = Math.max(0, trackWidth - (window.innerWidth - 96));
      setTravel(rawTravel);
      setScrollDistance(rawTravel * PACE + window.innerHeight * HOLD_OUT_VH);
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

  // The row finishes traveling partway through the pinned scroll (moveFrac)
  // and holds for the remainder — a beat to actually read the last step
  // before the page releases and carries on.
  const moveFrac = scrollDistance > 0 ? (travel * PACE) / scrollDistance : 1;
  const x = useTransform(scrollYProgress, [0, moveFrac], [0, -travel], {
    clamp: true,
  });
  const trackProgress = useTransform(scrollYProgress, [0, moveFrac], [0, 1], {
    clamp: true,
  });

  useMotionValueEvent(trackProgress, "change", (v) => {
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
      // The extra height IS the scroll runway while pinned — scrolling it
      // is what moves the row, then releases.
      style={pinned ? { height: `calc(100vh + ${scrollDistance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? // `justify-start` + a fixed top offset instead of centering:
              // with `justify-center`, how much of the block actually fits
              // depends on its own total height relative to the viewport —
              // the title and body text were spilling past the bottom edge
              // and getting clipped by `overflow-hidden` on shorter
              // viewports. A fixed offset is easy to guarantee fits instead.
              "sticky top-0 flex h-screen flex-col overflow-hidden pt-14"
            : "py-24"
        }
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.process.title}
          </h2>
          <p className="mt-4 max-w-xl text-foreground-secondary">
            {dict.process.intro}
          </p>
        </div>

        {pinned ? (
          <>
            <div className="mt-6 overflow-hidden px-12">
              <motion.div style={{ x, gap: GAP }} className="flex w-max">
                {processSteps.map((step, i) => (
                  <StepCard
                    key={step.id}
                    step={step}
                    locale={locale}
                    width={CARD_W}
                    isActive={i === activeIndex}
                  />
                ))}
              </motion.div>
            </div>
            <ScrollProgress progress={trackProgress} />
          </>
        ) : (
          // Mobile / reduced motion: a snap carousel the thumb controls.
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
        )}
      </div>
    </section>
  );
}

function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="mx-auto mt-5 h-px w-full max-w-6xl px-12">
      <div className="relative h-px w-full bg-border">
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-0 origin-left bg-orange"
        />
      </div>
    </div>
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
