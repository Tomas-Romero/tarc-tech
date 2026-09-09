import type { Dictionary } from "@/i18n";
import { social } from "@/lib/social";
import { waLink } from "@/lib/whatsapp";
import { getPortraitMedia } from "@/lib/about-media";
import { Reveal } from "@/components/motion/Reveal";
import { AboutPortrait } from "@/components/motion/AboutPortrait";
import { ChatIcon, ExternalLinkIcon } from "@/components/ui/icons";

// The stack the secondary (technical) audience scans for — PLAN §6.8's
// optional "en qué trabajo" row. Real tools only, straight from the plan.
const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node",
  "PostgreSQL",
  "Supabase",
  "Tailwind",
];

export function About({ dict }: { dict: Dictionary }) {
  const media = getPortraitMedia();

  // Profile links render only once their URL is actually configured — a
  // missing one is left out rather than shipped as a dead link.
  const profileLinks = [
    { href: social.linkedin, label: "LinkedIn" },
    { href: social.portfolio, label: "Portfolio" },
    { href: social.github, label: "GitHub" },
  ].filter((l): l is { href: string; label: string } => Boolean(l.href));

  return (
    <section id="sobre-mi" className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
        <div className="flex justify-center md:w-1/3 md:justify-start">
          <AboutPortrait media={media} placeholder={dict.about.portraitPending} />
        </div>

        <div className="md:flex-1">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {dict.about.title}
            </h2>
            <p className="mt-6 text-lg text-foreground-secondary">
              {dict.about.bio}
            </p>
            <p className="mt-4 text-lg text-foreground-secondary">
              {dict.about.method}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="mt-10 text-sm font-bold uppercase tracking-wide text-foreground-secondary">
              {dict.about.stackLabel}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs text-foreground-secondary"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink(dict.whatsapp.nav)}
                target="_blank"
                rel="noopener noreferrer"
                className="tarc-cta-glow flex min-h-11 items-center gap-2 rounded-md bg-orange px-5 font-medium text-[#431407] hover:bg-orange-hover"
              >
                <ChatIcon className="h-5 w-5" />
                {dict.about.whatsapp}
              </a>

              {profileLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2 rounded-md border border-border px-5 font-medium transition-colors hover:border-orange-deep hover:text-orange-deep"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
