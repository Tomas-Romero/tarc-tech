import type { ComponentType } from "react";
import type { Dictionary, Locale } from "@/i18n";
import { services, type Service } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
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

export function Services({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.services.title}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map((service, i) => {
          const Icon = ICONS[service.icon];
          return (
            <Reveal key={service.id} delay={i * 0.07}>
              <div className="h-full rounded-lg border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-orange-deep">
                <Icon className="h-8 w-8 text-orange" />
                <h3 className="mt-4 text-lg font-bold">
                  {service.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-foreground-secondary">
                  {service.description[locale]}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
