import type { Dictionary, Locale } from "@/i18n";
import { solutions } from "@/data/solutions";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";

// Replaces the pricing section entirely (PLAN §6.5, decision D3): the visitor
// recognises their own case and writes. Every panel carries its own pre-filled
// WhatsApp message, so an incoming message says which solution it came from.
export function Solutions({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const items: AccordionItem[] = solutions.map((solution) => ({
    id: solution.id,
    title: solution.title[locale],
    content: (
      <div className="flex flex-col items-start gap-4 pr-8">
        <p className="text-foreground-secondary">{solution.body[locale]}</p>

        {solution.example && (
          <p className="text-sm text-foreground-secondary">
            {dict.solutions.exampleLabel}:{" "}
            <span className="font-medium text-foreground">{solution.example}</span>
          </p>
        )}

        <a
          href={waLink(dict.whatsapp[solution.whatsappKey])}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-orange-deep hover:text-orange-deep"
        >
          {dict.solutions.cta}
        </a>
      </div>
    ),
  }));

  return (
    <section id="soluciones" className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.solutions.title}
        </h2>
        <p className="mt-4 text-foreground-secondary">{dict.solutions.intro}</p>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <Accordion items={items} />
      </Reveal>

      {/* Closing card for everything the list doesn't cover — the one place
          in this section that gets the solid orange CTA. */}
      <Reveal delay={0.14}>
        <div className="mt-10 rounded-lg border border-border bg-surface p-6 sm:p-8">
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
            className="mt-5 inline-block rounded-md bg-orange px-5 py-3 font-medium text-[#431407] transition-colors hover:bg-orange-hover"
          >
            {dict.solutions.fallbackCta}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
