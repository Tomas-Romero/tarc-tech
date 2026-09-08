import type { Dictionary } from "@/i18n";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";

// Real clients only (projects.ts entries typed "cliente") — see
// PRODUCT.md §Evidence. Text badges for now: no logo files exist yet
// (PLAN §16 pending items). Swap for real logo images once provided,
// without changing this structure (grayscale → color on hover, marquee
// on mobile).
export function Trust({ dict }: { dict: Dictionary }) {
  const clients = projects.filter((p) => p.type === "cliente");
  if (clients.length === 0) return null;

  const track = [...clients, ...clients];

  return (
    <section className="border-y border-border py-10">
      <Reveal className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm text-foreground-secondary">
          {dict.trust.title}
        </p>

        <div className="mt-6 overflow-hidden sm:overflow-visible">
          <div className="tarc-marquee-track flex w-max gap-10 sm:w-full sm:flex-wrap sm:justify-center">
            {track.map((client, i) => (
              <span
                key={`${client.id}-${i}`}
                aria-hidden={i >= clients.length}
                className={`whitespace-nowrap text-lg font-bold text-foreground-secondary opacity-60 grayscale transition-all hover:text-foreground hover:opacity-100 hover:grayscale-0 ${
                  i >= clients.length ? "sm:hidden" : ""
                }`}
              >
                {client.name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
