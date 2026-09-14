"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
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

// Second authored moment of the page (PLAN §6.6): the line is drawn by the
// scroll itself and each step ignites as the line reaches it — the method
// literally advancing in front of the visitor. Drawn with a transform
// (scaleX/scaleY) rather than an animated SVG path length: same authored
// effect, but it stays on the compositor, which matters on the mid-range
// phone PRODUCT.md names as the judge.
//
// Was feeling flat and lifeless: five lines of text floating on a blank
// background with a thin rule underneath. This pass gives each step real
// weight (a bordered card, not bare text), puts a marker that visibly
// travels the line as it draws — so something is always in motion, not just
// "eventually lit or not" — and adds the same restrained floating shapes
// Solutions/About use for ambient depth, driven off the section's own
// `drawn` progress (not a second independent scroll tracker) since this
// section spends most of its life pinned, where a sticky element's own
// bounding box stops moving relative to the viewport.
//
// Desktop: the section pins in place — the same mechanism "Qué hacemos"
// uses — so the timeline finishes lighting every step before the page is
// allowed to keep scrolling, instead of racing past mid-draw. Mobile keeps
// its normal scroll-through: pinning a vertically-stacked list adds
// scroll-hijack risk without the horizontal-reveal payoff it buys on
// desktop, so it's dropped there and under reduced motion, same as
// "Qué hacemos".
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

  useEffect(() => {
    // 1024px matches the breakpoint "Qué hacemos" and the Solutions rail
    // already use — one consistent point where the page switches from
    // mobile-stacked to desktop-authored layouts.
    const query = window.matchMedia("(min-width: 1024px)");
    function sync() {
      const on = query.matches && !reduceMotion;
      setPinned(on);
      if (!on) return setScrollDistance(0);
      // Generous runway: five steps need to ignite one at a time and still
      // feel readable, not raced through.
      setScrollDistance(window.innerHeight * 1.7);
    }
    sync();
    query.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, [reduceMotion]);

  // Pinned: progress spans exactly the pin's own extra scroll height, same
  // as "Qué hacemos". Not pinned (mobile / reduced motion): the original
  // wide trigger window, since the timeline row itself is short and a tight
  // window drew the whole line within a few hundred pixels of scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: pinned ? ["start start", "end end"] : ["start 90%", "end 20%"],
  });

  // Reduced motion: the line is simply already drawn, and every step is lit.
  const drawn = useTransform(scrollYProgress, (v) => (reduceMotion ? 1 : v));

  // Ambient shapes, tied to the same progress the line uses: a gentle
  // fade/scale-in as the method starts advancing, not a separate scroll
  // tracker that would read a sticky element's frozen bounding box.
  const shapeOpacity = useTransform(drawn, [0, 0.3], [0, 1], { clamp: true });
  const shapeShift = useTransform(drawn, [0, 1], [24, -24]);
  const shapeShiftInverse = useTransform(shapeShift, (v) => -v);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      // The extra height IS the scroll runway while pinned — scrolling it
      // is what advances the ignite sequence, then releases.
      style={pinned ? { height: `calc(100vh + ${scrollDistance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : "relative overflow-hidden py-24"
        }
      >
        {/* Floating faceted shapes — same restrained vocabulary as
            Solutions/About's SectionBackdrop, but driven by `drawn` instead
            of an independent `useScroll` target: a sticky element's own
            bounding rect stays put once stuck, so a fresh scroll tracker
            here would never see any movement to react to. */}
        <motion.span
          aria-hidden
          style={{ opacity: reduceMotion ? 0.6 : shapeOpacity, y: reduceMotion ? 0 : shapeShift, clipPath: OCTAGON }}
          className="pointer-events-none absolute -right-8 top-[6%] h-40 w-40 border border-foreground-secondary/25 sm:h-56 sm:w-56"
        />
        <motion.span
          aria-hidden
          style={{
            opacity: reduceMotion ? 0.6 : shapeOpacity,
            y: reduceMotion ? 0 : shapeShiftInverse,
            rotate: 45,
          }}
          className="pointer-events-none absolute -left-10 bottom-[8%] h-24 w-24 border border-orange-deep/25 sm:h-32 sm:w-32"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.process.title}
          </h2>
          <p className="mt-4 max-w-xl text-foreground-secondary">
            {dict.process.intro}
          </p>

          <div className="relative mt-16">
            {/* Track + drawn line. The wrapper owns the centering translate
                and the animated child owns only its scale — Motion writes
                transform inline, so sharing one element would silently drop
                the centering. */}
            <div
              aria-hidden
              className="absolute left-5 top-0 h-full w-px -translate-x-1/2 md:hidden"
            >
              <div className="h-full w-full bg-border" />
              <motion.div
                style={{ scaleY: drawn }}
                className="absolute inset-0 origin-top bg-orange"
              />
              <TravelMarker progress={drawn} axis="y" />
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
              <TravelMarker progress={drawn} axis="x" />
            </div>

            <ol className="flex flex-col gap-10 md:flex-row md:gap-8">
              {processSteps.map((step, i) => (
                <Step
                  key={step.id}
                  step={step}
                  locale={locale}
                  progress={drawn}
                  // Ignites as the line passes this step. Thresholds sit
                  // inside the run (0.1 … 0.9 for five steps) so no step is
                  // already lit before the line has been drawn to it.
                  threshold={(i + 0.5) / processSteps.length}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

// The marker riding the line as it draws — proof that something is always
// actively moving, not just "lit or not." A small diamond, matching the
// step badges' faceted language rather than a circular dot.
function TravelMarker({
  progress,
  axis,
}: {
  progress: MotionValue<number>;
  axis: "x" | "y";
}) {
  const percent = useTransform(progress, (v) => `${v * 100}%`);
  const opacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <motion.span
      aria-hidden
      style={{
        [axis === "x" ? "left" : "top"]: percent,
        opacity,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 rotate-45 bg-orange"
    >
      <span className="block h-2.5 w-2.5" />
    </motion.span>
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
  const Icon = ICONS[step.icon];
  // Hovering a step ignites it on its own, independent of where the scroll
  // line actually is — parked there for the length of its own transition
  // instead of jumping straight to lit, and it never drags any other step
  // along with it. Whichever source (scroll or hover) is further along wins.
  const hoverLit = useMotionValue(0);

  const scrollLit = useTransform(
    progress,
    [Math.max(threshold - 0.06, 0), threshold],
    [0, 1],
    { clamp: true }
  );
  const lit = useTransform([scrollLit, hoverLit], (values: number[]) =>
    Math.max(values[0], values[1])
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
  const borderColor = useTransform(
    lit,
    [0, 1],
    ["var(--color-border)", "var(--color-orange-deep)"]
  );
  // Floor is 0.85, not the more dramatic 0.55 it started at: Lighthouse
  // caught that dimming text-foreground-secondary (7.4:1 at full opacity)
  // down to 0.55 drops it to ~2.6:1, failing AA for anyone who lands on the
  // page before scrolling reaches a given step. 0.85 keeps a visible "not
  // lit yet" dim while staying above 4.5:1.
  const bodyOpacity = useTransform(lit, [0, 1], [0.85, 1]);
  const cardY = useTransform(lit, [0, 1], [0, -4]);

  return (
    <li
      className="relative md:flex-1"
      onMouseEnter={() => hoverLit.set(1)}
      onMouseLeave={() => hoverLit.set(0)}
    >
      <motion.div
        style={{
          y: reduceMotion ? 0 : cardY,
          ...(reduceMotion
            ? { borderColor: "var(--color-orange-deep)" }
            : { borderColor }),
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex gap-5 rounded-lg border bg-surface p-4 md:flex-col md:gap-0 md:p-5"
      >
        <motion.span
          aria-hidden
          style={{
            // Corner-cut octagon, not a circle: DESIGN.md bans "burbujas" and
            // asks for the isotipo's own faceted, angular language everywhere,
            // and this badge repeats 5 times — the site's most-visible place
            // to get that rule wrong.
            clipPath:
              "polygon(10px 0, 32px 0, 42px 10px, 42px 32px, 32px 42px, 10px 42px, 0 32px, 0 10px)",
            ...(reduceMotion
              ? { borderColor: "var(--color-orange)", color: "var(--color-orange)" }
              : { borderColor: numberColor, color: numberText }),
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex h-[42px] w-[42px] shrink-0 items-center justify-center border bg-background"
        >
          <Icon className="h-6 w-6" />
        </motion.span>

        <motion.div
          style={reduceMotion ? undefined : { opacity: bodyOpacity }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:mt-5"
        >
          <span aria-hidden className="text-xs font-medium text-foreground-secondary">
            {String(step.number).padStart(2, "0")}
          </span>
          <h3 className="mt-0.5 font-bold">{step.title[locale]}</h3>
          <p className="mt-2 text-sm text-foreground-secondary">
            {step.description[locale]}
          </p>
        </motion.div>
      </motion.div>
    </li>
  );
}
