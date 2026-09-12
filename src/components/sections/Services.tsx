"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  motion,
  useScroll,
  useTransform,
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
  PaletteIcon,
} from "@/components/ui/icons";

const ICONS: Record<Service["icon"], ComponentType<{ className?: string }>> = {
  code: CodeIcon,
  workflow: WorkflowIcon,
  smartphone: SmartphoneIcon,
  cloud: CloudIcon,
  palette: PaletteIcon,
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
// visitor scrolls, then the page releases and carries on. Mobile keeps its
// thumb — a native snap carousel instead of hijacking the scroll, which the
// mid-range phone PRODUCT.md names as the judge would feel as jank.
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
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : "py-24"
        }
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.services.title}
          </h2>
          <p className="mt-4 max-w-xl text-foreground-secondary">
            {dict.services.intro}
          </p>
        </div>

        {pinned ? (
          <>
            <div className="mt-12 overflow-hidden px-12">
              <motion.div style={{ x, gap: GAP }} className="flex w-max">
                {services.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
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
        )}
      </div>
    </section>
  );
}

function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="mx-auto mt-10 h-px w-full max-w-6xl px-12">
      <div className="relative h-px w-full bg-border">
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
}: {
  ref?: (node: HTMLElement | null) => void;
  service: Service;
  locale: Locale;
  width: number;
  snap?: boolean;
  isActive?: boolean;
}) {
  const Icon = ICONS[service.icon];

  return (
    <article
      ref={ref}
      style={{ width }}
      className={`group relative shrink-0 overflow-hidden rounded-lg border bg-surface p-8 transition-colors duration-300 ${
        isActive ? "border-orange" : "border-border hover:border-orange"
      } ${snap ? "snap-start" : ""}`}
    >
      {/* The ember floods up from the base on hover — or on its own, once
          scroll (desktop pin) or swipe (mobile carousel) brings this card to
          the front. Same visual state either way: the panel heats rather
          than lifting, which is the world DESIGN.md commits to. */}
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom bg-orange transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
        }`}
      />

      <div className="relative flex h-full flex-col">
        <Icon
          className={`h-9 w-9 transition-colors duration-300 ${
            isActive ? "text-[#431407]" : "text-orange group-hover:text-[#431407]"
          }`}
        />

        <h3
          className={`mt-6 text-xl font-bold transition-colors duration-300 ${
            isActive ? "text-[#431407]" : "group-hover:text-[#431407]"
          }`}
        >
          {service.title[locale]}
        </h3>

        <p
          className={`mt-3 transition-colors duration-300 ${
            isActive
              ? "text-[#5a2410]"
              : "text-foreground-secondary group-hover:text-[#5a2410]"
          }`}
        >
          {service.description[locale]}
        </p>
      </div>
    </article>
  );
}
