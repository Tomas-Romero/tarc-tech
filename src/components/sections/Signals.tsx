import type { ComponentType } from "react";
import type { Dictionary, Locale } from "@/i18n";
import { signals, type Signal } from "@/data/signals";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/motion/Reveal";
import { SectionBackdrop } from "@/components/motion/SectionBackdrop";
import { SpreadsheetIcon, DuplicateIcon, RepeatIcon } from "@/components/ui/icons";

const OCTAGON =
  "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)";

const ICONS: Record<Signal["icon"], ComponentType<{ className?: string }>> = {
  spreadsheet: SpreadsheetIcon,
  duplicate: DuplicateIcon,
  repeat: RepeatIcon,
};

// The hook right after Hero: recognizable pain before the pitch, so a
// visitor sees themselves in the page before being told what we sell them.
// Feeds straight into Services/Solutions, which answer each of these.
export function Signals({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="senales" className="relative overflow-hidden py-24">
      <SectionBackdrop />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.signals.title}
          </h2>
          <p className="mt-4 text-foreground-secondary">{dict.signals.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {signals.map((signal, i) => {
            const Icon = ICONS[signal.icon];
            return (
              <Reveal key={signal.id} delay={i * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-lg border border-foreground/10 bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_24px_-16px_rgba(0,0,0,0.16)] transition-colors duration-300 hover:border-orange">
                  <span
                    aria-hidden
                    style={{ clipPath: OCTAGON }}
                    className="flex h-9 w-9 items-center justify-center border border-orange-deep/50 text-orange-deep transition-colors duration-300 group-hover:border-orange group-hover:bg-orange group-hover:text-[#431407]"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{signal.title[locale]}</h3>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    {signal.body[locale]}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.24} className="mt-10 text-center">
          <a
            href={waLink(dict.whatsapp.signals)}
            target="_blank"
            rel="noopener noreferrer"
            className="tarc-cta-glow inline-flex min-h-11 items-center rounded-md bg-orange px-6 font-medium text-[#431407] hover:bg-orange-hover"
          >
            {dict.signals.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
