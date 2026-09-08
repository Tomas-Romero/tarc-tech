import type { Dictionary } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { social } from "@/lib/social";
import { Reveal } from "@/components/motion/Reveal";
import { ChatIcon } from "@/components/ui/icons";

// The one sanctioned exception to "orange is never a section background"
// (DESIGN.md §Colors). Text on it is the dark ember, never white — white on
// #F97316 lands around 2.9:1 and fails AA, which PRODUCT.md calls out by name.
const ON_ORANGE = "#431407";

export function FinalCta({ dict }: { dict: Dictionary }) {
  return (
    <section id="contacto" className="px-6 py-24">
      <Reveal>
        <div
          className="mx-auto max-w-5xl rounded-lg bg-orange px-6 py-16 text-center sm:px-12"
          style={{ color: ON_ORANGE }}
        >
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.finalCta.title}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: ON_ORANGE }}>
            {dict.finalCta.subtitle}
          </p>

          <a
            href={waLink(dict.whatsapp.finalCta)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 items-center gap-2.5 rounded-md bg-background px-7 text-lg font-medium text-foreground transition-transform hover:-translate-y-0.5"
          >
            <ChatIcon className="h-5 w-5" />
            {dict.finalCta.button}
          </a>

          {social.email && (
            <p className="mt-8">
              <a
                href={`mailto:${social.email}`}
                className="font-medium underline underline-offset-4"
                style={{ color: ON_ORANGE }}
              >
                {social.email}
              </a>
            </p>
          )}

          <p className="mt-3 text-sm" style={{ color: ON_ORANGE }}>
            {dict.finalCta.location}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
