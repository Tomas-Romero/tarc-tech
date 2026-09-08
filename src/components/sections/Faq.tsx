import type { Dictionary, Locale } from "@/i18n";
import { faq } from "@/data/faq";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";

export function Faq({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const items: AccordionItem[] = faq.map((entry) => ({
    id: entry.id,
    title: entry.question[locale],
    content: (
      <p className="pr-8 text-foreground-secondary">{entry.answer[locale]}</p>
    ),
  }));

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.faq.title}
        </h2>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <Accordion items={items} />
      </Reveal>
    </section>
  );
}
