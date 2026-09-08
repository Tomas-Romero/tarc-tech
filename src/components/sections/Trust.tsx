import type { Dictionary, Locale } from "@/i18n";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";

// Real clients only (projects.ts entries typed "cliente") — see
// PRODUCT.md §Evidence. No logo files exist yet (PLAN §16 pending item), so
// each client gets a faceted letter-mark placeholder instead of a blank
// wordmark — same corner-cut geometry as the Process step badges, echoing
// the isotipo rather than the generic rounded-square-icon pattern DESIGN.md
// warns against. Swap the mark for a real logo image once provided.
//
// Static, not a marquee: with only two real clients, an infinite scroll
// implies a stream of names that isn't there — the opposite of the site's
// own honesty standard. A confident static pair says as much as is true.
export function Trust({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const clients = projects.filter((p) => p.type === "cliente");
  if (clients.length === 0) return null;

  return (
    <section className="border-y border-border py-14">
      <Reveal className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-medium text-foreground-secondary">
          {dict.trust.title}
        </p>

        <div className="mt-8 flex flex-wrap items-stretch justify-center gap-5">
          {clients.map((client) => (
            <div
              key={client.id}
              className="group flex items-center gap-4 rounded-lg border border-border bg-surface px-6 py-4 grayscale transition-all duration-300 hover:grayscale-0 hover:border-orange-deep"
            >
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-orange bg-orange/10 text-sm font-bold text-orange-deep"
                style={{
                  clipPath:
                    "polygon(9px 0, 27px 0, 36px 9px, 36px 27px, 27px 36px, 9px 36px, 0 27px, 0 9px)",
                }}
              >
                {client.name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}
              </span>

              <div className="text-left">
                <p className="font-bold text-foreground">{client.name}</p>
                <p className="text-sm text-foreground-secondary">
                  {client.tagline[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
