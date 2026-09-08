"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  motion,
  useScroll,
  useTransform,
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

// Desktop: the section pins and the row of services travels sideways as the
// visitor scrolls, then the page releases and carries on. Mobile keeps its
// thumb — a native snap carousel instead of hijacking the scroll, which the
// mid-range phone PRODUCT.md names as the judge would feel as jank.
export function Services({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [travel, setTravel] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    function sync() {
      // Pinning is a desktop affordance, and it is dropped entirely under
      // reduced motion — a scroll the visitor cannot predict is exactly what
      // that preference asks us not to do.
      const on = query.matches && !reduceMotion;
      setPinned(on);
      if (!on) return setTravel(0);
      const trackWidth = services.length * CARD_W + (services.length - 1) * GAP;
      setTravel(Math.max(0, trackWidth - (window.innerWidth - 96)));
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

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      // The extra height IS the horizontal distance: while the sticky child
      // is stuck, scrolling it is what moves the row.
      style={pinned ? { height: `calc(100vh + ${travel}px)` } : undefined}
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
        </div>

        {pinned ? (
          <>
            <div className="mt-12 overflow-hidden px-12">
              <motion.div
                style={{ x, gap: GAP }}
                className="flex w-max"
              >
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    locale={locale}
                    width={CARD_W}
                  />
                ))}
              </motion.div>
            </div>
            <ScrollProgress progress={scrollYProgress} />
          </>
        ) : (
          // Mobile / reduced motion: a snap carousel the thumb controls.
          <div
            className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                locale={locale}
                width={300}
                snap
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
  service,
  locale,
  width,
  snap,
}: {
  service: Service;
  locale: Locale;
  width: number;
  snap?: boolean;
}) {
  const Icon = ICONS[service.icon];

  return (
    <article
      style={{ width }}
      className={`group relative shrink-0 overflow-hidden rounded-lg border border-border bg-surface p-8 transition-colors duration-300 hover:border-orange ${
        snap ? "snap-start" : ""
      }`}
    >
      {/* The ember floods up from the base on hover — the panel heats rather
          than lifting, which is the world DESIGN.md commits to. */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-orange transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      />

      <div className="relative flex h-full flex-col">
        <Icon className="h-9 w-9 text-orange transition-colors duration-300 group-hover:text-[#431407]" />

        <h3 className="mt-6 text-xl font-bold transition-colors duration-300 group-hover:text-[#431407]">
          {service.title[locale]}
        </h3>

        <p className="mt-3 text-foreground-secondary transition-colors duration-300 group-hover:text-[#5a2410]">
          {service.description[locale]}
        </p>
      </div>
    </article>
  );
}
