"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Dictionary, Locale } from "@/i18n";
import { solutions, type Solution } from "@/data/solutions";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/motion/Reveal";
import {
  RegisterIcon,
  StorefrontIcon,
  TrayIcon,
  BrowserIcon,
  BoltIcon,
} from "@/components/ui/icons";

const ICONS: Record<Solution["icon"], ComponentType<{ className?: string }>> = {
  register: RegisterIcon,
  storefront: StorefrontIcon,
  tray: TrayIcon,
  browser: BrowserIcon,
  bolt: BoltIcon,
};

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Replaces the pricing section entirely (PLAN §6.5, decision D3): the visitor
// recognises their own case and writes. Every panel carries its own pre-filled
// WhatsApp message, so an incoming message says which solution it came from.
//
// Built as a sticky index paired with full panels rather than an accordion:
// nothing is hidden behind a click, and the rail tracks where you are as you
// scroll — the section reads as a considered set, not a list.
export function Solutions({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);

  function goToPanel(i: number) {
    setActive(i);
    panelsRef.current[i]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }

  useEffect(() => {
    const nodes = panelsRef.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The panel closest to filling the middle band wins, so the rail never
        // flickers between two that are both partly visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = nodes.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="soluciones" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.solutions.title}
        </h2>
        <p className="mt-4 text-foreground-secondary">{dict.solutions.intro}</p>
      </Reveal>

      <div className="mt-14 gap-16 lg:grid lg:grid-cols-[13rem_1fr]">
        {/* Sticky index — desktop only; on mobile the panels speak for
            themselves and a rail would just cost vertical space. Clickable:
            it jumps the scroll to that panel instead of only reflecting it. */}
        <nav aria-label={dict.solutions.railLabel} className="hidden lg:block">
          <ol className="sticky top-[calc(var(--nav-height)+3rem)] space-y-1">
            {solutions.map((solution, i) => (
              <li key={solution.id}>
                <button
                  type="button"
                  onClick={() => goToPanel(i)}
                  className="group/rail relative flex min-h-11 w-full items-center rounded-md pl-5 pr-2 text-left transition-colors hover:bg-surface"
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 transition-colors duration-300 ${
                      i === active
                        ? "bg-orange"
                        : "bg-border group-hover/rail:bg-orange-deep"
                    }`}
                  />
                  <span
                    className={`block text-sm transition-colors duration-300 ${
                      i === active
                        ? "font-medium text-foreground"
                        : "text-foreground-secondary group-hover/rail:text-foreground"
                    }`}
                  >
                    {solution.title[locale]}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-8">
          {solutions.map((solution, i) => (
            <SolutionPanel
              key={solution.id}
              panelRef={(node) => {
                panelsRef.current[i] = node;
              }}
              solution={solution}
              dict={dict}
              locale={locale}
            />
          ))}

          {/* Closing card for everything the list doesn't cover — the one place
              in this section that gets the solid orange CTA. */}
          <Reveal delay={0.06}>
            <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
              <h3 className="text-lg font-bold sm:text-xl">
                {dict.solutions.fallbackTitle}
              </h3>
              <p className="mt-2 text-foreground-secondary">
                {dict.solutions.fallbackBody}
              </p>
              <a
                href={waLink(dict.whatsapp.finalCta)}
                target="_blank"
                rel="noopener noreferrer"
                className="tarc-cta-glow mt-5 inline-block rounded-md bg-orange px-5 py-3 font-medium text-[#431407] hover:bg-orange-hover"
              >
                {dict.solutions.fallbackCta}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SolutionPanel({
  panelRef,
  solution,
  dict,
  locale,
}: {
  panelRef: (node: HTMLElement | null) => void;
  solution: Solution;
  dict: Dictionary;
  locale: Locale;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = ICONS[solution.icon];

  return (
    <motion.article
      ref={panelRef}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      // Later trigger margin than a typical reveal on purpose: panels used to
      // fire almost as soon as the section came into view, so most of the
      // list appeared as a single batch instead of unfolding with the scroll.
      viewport={{ once: true, margin: "0px 0px -35% 0px" }}
      transition={{
        duration: reduceMotion ? 0.4 : 0.6,
        ease: EASE_OUT_EXPO,
        delay: reduceMotion ? 0 : 0.04,
      }}
      className="group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-orange sm:p-8"
    >
      {/* The left edge lights on hover — the same ember the services row uses,
          held to a hairline here so five panels in a column never shout. */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-orange transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      />

      <div className="flex gap-5">
        <span
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border text-orange transition-colors duration-300 group-hover:border-orange"
        >
          <Icon className="h-6 w-6" />
        </span>

        <div className="min-w-0">
          <h3 className="text-xl font-bold">{solution.title[locale]}</h3>

          <p className="mt-2 text-foreground-secondary">
            {solution.body[locale]}
          </p>

          <div className="mt-5">
            <a
              href={waLink(dict.whatsapp[solution.whatsappKey])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm font-medium transition-colors hover:border-orange-deep hover:text-orange-deep"
            >
              {dict.solutions.cta}
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
