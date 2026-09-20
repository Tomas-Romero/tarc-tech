import type { ComponentType } from "react";
import type { Dictionary, Locale } from "@/i18n";
import { services, type Service } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceVisual } from "@/components/ui/ServiceVisual";
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

const OCTAGON =
  "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)";

// Rebuilt from the ground up (Tomás's brief: "un cambio total... algo mas
// demostrativo"), replacing the old scroll-hijacked dark "engine room" pin
// with a plain, theme-aware grid of cards that each show a small mockup of
// the actual thing being offered, plus a short checklist — closer to how a
// product page sells a feature than a slide deck names one. No forced dark
// surface anymore, so this section now follows the page's own light/dark
// theme like everything else, and one identical layout serves both desktop
// and mobile (a wrapping grid needs no separate carousel).
export function Services({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="servicios" className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.services.title}
          </h2>
          <p className="mt-4 max-w-xl text-foreground-secondary">
            {dict.services.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 0.06}>
              <ServiceCard service={service} locale={locale} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  locale,
  index,
}: {
  service: Service;
  locale: Locale;
  index: number;
}) {
  const Icon = ICONS[service.icon];
  const highlights = service.highlights[locale];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface p-5 transition-colors duration-300 hover:border-orange">
      <span
        aria-hidden
        style={{ clipPath: OCTAGON }}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-border bg-background text-xs font-bold text-foreground-secondary transition-colors duration-300 group-hover:border-orange group-hover:text-orange-deep"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <ServiceVisual id={service.id} />

      <div className="mt-5 flex items-center gap-2 text-orange">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-3 text-lg font-bold">{service.title[locale]}</h3>
      <p className="mt-2 text-sm text-foreground-secondary">
        {service.description[locale]}
      </p>

      <ul className="mt-4 space-y-2 border-t border-border pt-4">
        {highlights.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}
