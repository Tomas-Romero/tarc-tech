"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type { Dictionary, Locale } from "@/i18n";
import { services, type Service } from "@/data/services";
import {
  CodeIcon,
  WorkflowIcon,
  SmartphoneIcon,
  CloudIcon,
  CardLockIcon,
  HeadsetIcon,
  BuildingIcon,
} from "@/components/ui/icons";

const ICONS: Record<Service["icon"], ComponentType<{ className?: string }>> = {
  code: CodeIcon,
  workflow: WorkflowIcon,
  smartphone: SmartphoneIcon,
  cloud: CloudIcon,
  cardLock: CardLockIcon,
  headset: HeadsetIcon,
  building: BuildingIcon,
};

const CARD_W = 380;
const GAP = 24;
// Extra scroll distance so the row doesn't race past — Tomás felt the first
// version rushed through the cards before he could read them. PACE stretches
// how much scrolling one pixel of horizontal travel costs, and HOLD_OUT_VH
// keeps the last card on screen for a beat before the page continues.
const PACE = 1.7;
const HOLD_OUT_VH = 0.5;

// Desktop: the section pins and the row of services travels sideways as the
// visitor scrolls, then the page releases and carries on. Deliberately
// drops out of the site's light theme while pinned — a dark, glass-and-glow
// "engine room" that only exists for the length of this scroll-hijack, then
// hands straight back to the page's own theme the instant it releases.
// Tomás asked for this section to feel drastically more alive on desktop and
// explicitly cleared changing the page's own mood to get there; it doesn't
// follow the user's light/dark toggle because it isn't a persistent surface
// — it's a staged moment, like FinalCta's own sanctioned exception to
// "orange is never a background."
//
// Mobile keeps its thumb — a native snap carousel instead of hijacking the
// scroll, which the mid-range phone PRODUCT.md names as the judge would feel
// as jank — and stays on the page's normal light/dark theme, unchanged.
export function Services({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [travel, setTravel] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Desktop: which card is centered in the pinned track right now — driven
  // by scroll position, not just hover, so each item ignites on its own
  // timing as it arrives, the same visual state a mouse hover triggers.
  const [activeIndex, setActiveIndex] = useState(0);
  // Mobile: same idea, but tracked via the carousel's own horizontal scroll
  // instead of the page's vertical one.
  const [carouselActive, setCarouselActive] = useState(0);

  useEffect(() => {
    // 1024px, not 768px: a portrait tablet at 768px only has room to show
    // about 1.8 of the 380px cards mid-pin — a worse reveal than either the
    // desktop pin (full cards) or the mobile carousel (one full card at a
    // time). Matches the breakpoint Solutions already uses for its own
    // desktop-only rail, so "tablet" gets one consistent treatment.
    const query = window.matchMedia("(min-width: 1024px)");
    function sync() {
      // Pinning is a desktop affordance, and it is dropped entirely under
      // reduced motion — a scroll the visitor cannot predict is exactly what
      // that preference asks us not to do.
      const on = query.matches && !reduceMotion;
      setPinned(on);
      if (!on) return setTravel(0);
      const trackWidth = services.length * CARD_W + (services.length - 1) * GAP;
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
  // and then holds in place for the remainder — that held beat is the pause
  // the rushed version was missing.
  const moveFrac = scrollDistance > 0 ? (travel * PACE) / scrollDistance : 1;
  const x = useTransform(scrollYProgress, [0, moveFrac], [0, -travel], {
    clamp: true,
  });
  const trackProgress = useTransform(scrollYProgress, [0, moveFrac], [0, 1], {
    clamp: true,
  });

  useMotionValueEvent(trackProgress, "change", (v) => {
    const idx = Math.round(v * (services.length - 1));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  // Mobile carousel: the card nearest the container's center counts as
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
      id="servicios"
      ref={sectionRef}
      // The extra height IS the scroll runway: while the sticky child is
      // stuck, scrolling it is what moves the row (paced slower than a 1:1
      // pixel mapping, plus a hold-out beat once every card has arrived).
      style={pinned ? { height: `calc(100vh + ${scrollDistance}px)` } : undefined}
    >
      {pinned ? (
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-zinc-950">
          <EngineRoomBackdrop progress={trackProgress} />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {dict.services.title}
            </h2>
            <p className="mt-4 max-w-xl text-white/60">{dict.services.intro}</p>
          </div>

          <div className="relative z-10 mt-12 overflow-hidden px-12">
            <motion.div style={{ x, gap: GAP }} className="flex w-max">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  locale={locale}
                  width={CARD_W}
                  isActive={i === activeIndex}
                  trackProgress={trackProgress}
                  index={i}
                  count={services.length}
                />
              ))}
            </motion.div>
          </div>
          <div className="relative z-10">
            <ScrollProgress progress={trackProgress} />
          </div>
        </div>
      ) : (
        <div className="py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {dict.services.title}
            </h2>
            <p className="mt-4 max-w-xl text-foreground-secondary">
              {dict.services.intro}
            </p>
          </div>

          {/* Mobile / reduced motion: a snap carousel the thumb controls. */}
          <div
            ref={carouselRef}
            className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                service={service}
                locale={locale}
                width={300}
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

// The "engine room": a faceted dark grid (same diagonal lattice angle
// PageGrid uses elsewhere, just inverted for a dark surface) plus a warm
// spotlight that drifts across as the track scrolls — tied to `progress`
// rather than the mouse, so the light itself narrates how far through the
// row you are.
function EngineRoomBackdrop({ progress }: { progress: MotionValue<number> }) {
  const spotlightX = useTransform(progress, [0, 1], ["20%", "80%"]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(55deg, #ffffff 0 1px, transparent 1px 64px), repeating-linear-gradient(-55deg, #ffffff 0 1px, transparent 1px 90px)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          x: spotlightX,
          translateX: "-50%",
          background:
            "radial-gradient(680px 480px at 50% 40%, var(--color-orange-deep) 0%, transparent 62%)",
          opacity: 0.35,
        }}
      />
      {/* Bottom vignette so the card row still reads as grounded, not
          floating in a void. */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="mx-auto mt-10 h-px w-full max-w-6xl px-12">
      <div className="relative h-px w-full bg-white/15">
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-0 origin-left bg-orange"
        />
      </div>
    </div>
  );
}

function ServiceCard({
  ref,
  service,
  locale,
  width,
  snap,
  isActive,
  trackProgress,
  index,
  count,
}: {
  ref?: (node: HTMLElement | null) => void;
  service: Service;
  locale: Locale;
  width: number;
  snap?: boolean;
  isActive?: boolean;
  /** Only passed for the desktop pinned track — lets this card compute how
   *  close IT is to centered, as a continuous 0–1 value, instead of only
   *  knowing the single nearest-index winner. Without this, every card
   *  outside the active one sat fully cold until the instant the rounded
   *  index ticked over to it — no in-between, no matter how much further
   *  scrolling it took to actually arrive. */
  trackProgress?: MotionValue<number>;
  index?: number;
  count?: number;
}) {
  const Icon = ICONS[service.icon];
  const hoverLit = useMotionValue(isActive ? 1 : 0);

  // Triangular falloff around this card's own ideal center: 1 exactly at its
  // center position in the track, fading to 0 by the time the halfway point
  // to either neighbor is reached — continuous, so the highlight visibly
  // migrates from one card to the next as the track keeps moving instead of
  // snapping the moment a rounded index changes.
  const idealCenter = trackProgress && count && count > 1 ? (index ?? 0) / (count - 1) : 0;
  const falloff = trackProgress && count ? 2 * (count - 1) : 1;
  const scrollCloseness = useTransform(trackProgress ?? hoverLit, (v) =>
    trackProgress ? Math.max(0, 1 - Math.abs(v - idealCenter) * falloff) : v
  );
  const lit = useTransform([scrollCloseness, hoverLit], (values: number[]) =>
    Math.max(values[0], values[1])
  );

  const borderColorDark = useTransform(lit, [0, 1], ["rgba(255,255,255,0.12)", "var(--color-orange)"]);
  const borderColorLight = useTransform(lit, [0, 1], ["var(--color-border)", "var(--color-orange)"]);
  const emberScale = useTransform(lit, [0, 1], [0, 1]);
  const iconColorDark = useTransform(lit, [0, 1], ["var(--color-orange)", "#431407"]);
  const iconColorLight = useTransform(lit, [0, 1], ["var(--color-orange)", "#431407"]);
  const titleColorDark = useTransform(lit, [0, 1], ["#ffffff", "#431407"]);
  const titleColorLight = useTransform(lit, [0, 1], ["var(--color-foreground)", "#431407"]);
  const bodyColorDark = useTransform(lit, [0, 1], ["rgba(255,255,255,0.65)", "#5a2410"]);
  const bodyColorLight = useTransform(lit, [0, 1], ["var(--color-foreground-secondary)", "#5a2410"]);
  const glow = useTransform(lit, [0, 1], [
    "0 0 0px rgba(234,88,12,0)",
    "0 12px 48px -8px rgba(234,88,12,0.55)",
  ]);

  const borderColor = trackProgress ? borderColorDark : borderColorLight;
  const iconColor = trackProgress ? iconColorDark : iconColorLight;
  const titleColor = trackProgress ? titleColorDark : titleColorLight;
  const bodyColor = trackProgress ? bodyColorDark : bodyColorLight;

  return (
    <motion.article
      ref={ref}
      style={
        trackProgress
          ? { width, borderColor, boxShadow: glow }
          : { width }
      }
      onMouseEnter={() => hoverLit.set(1)}
      onMouseLeave={() => hoverLit.set(trackProgress ? 0 : isActive ? 1 : 0)}
      className={`group relative shrink-0 overflow-hidden rounded-lg border p-8 backdrop-blur-xl transition-colors duration-300 ${
        trackProgress
          ? "bg-white/[0.04]"
          : `bg-surface ${isActive ? "border-orange" : "border-border hover:border-orange"}`
      } ${snap ? "snap-start" : ""}`}
    >
      {/* The ember floods up from the base on hover — or on its own, once
          scroll (desktop pin) or swipe (mobile carousel) brings this card to
          the front. Same visual state either way: the panel heats rather
          than lifting, which is the world DESIGN.md commits to. On the
          pinned track its height now tracks scroll continuously; the mobile
          carousel keeps the simpler on/off class swap since swipe arrival
          there is already a discrete, IntersectionObserver-driven event. */}
      <motion.span
        aria-hidden
        style={trackProgress ? { scaleY: emberScale } : undefined}
        className={`absolute inset-0 origin-bottom bg-orange ${
          trackProgress
            ? ""
            : `transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
              }`
        }`}
      />

      <div className="relative flex h-full flex-col">
        <motion.div style={trackProgress ? { color: iconColor } : undefined}>
          <Icon
            className={`h-9 w-9 ${
              trackProgress
                ? ""
                : `transition-colors duration-300 ${
                    isActive ? "text-[#431407]" : "text-orange group-hover:text-[#431407]"
                  }`
            }`}
          />
        </motion.div>

        <motion.h3
          style={trackProgress ? { color: titleColor } : undefined}
          className={`mt-6 text-xl font-bold ${
            trackProgress
              ? ""
              : `transition-colors duration-300 ${isActive ? "text-[#431407]" : "group-hover:text-[#431407]"}`
          }`}
        >
          {service.title[locale]}
        </motion.h3>

        <motion.p
          style={trackProgress ? { color: bodyColor } : undefined}
          className={`mt-3 ${
            trackProgress
              ? ""
              : `transition-colors duration-300 ${
                  isActive ? "text-[#5a2410]" : "text-foreground-secondary group-hover:text-[#5a2410]"
                }`
          }`}
        >
          {service.description[locale]}
        </motion.p>
      </div>
    </motion.article>
  );
}
