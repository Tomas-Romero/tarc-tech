import type { ComponentType } from "react";
import type { Dictionary } from "@/i18n";
import { social } from "@/lib/social";
import { waLink } from "@/lib/whatsapp";
import { getPortraitMedia } from "@/lib/about-media";
import { Reveal } from "@/components/motion/Reveal";
import { AboutPortrait } from "@/components/motion/AboutPortrait";
import { ExternalLinkIcon } from "@/components/ui/icons";
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  NodeIcon,
  ExpressIcon,
  PostgresIcon,
  SupabaseIcon,
  TailwindIcon,
  SassIcon,
  ViteIcon,
  GitIcon,
  VercelIcon,
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/ui/brand-icons";

// The stack the secondary (technical) audience scans for — PLAN §6.8's
// optional "en qué trabajo" row. Real tools only, straight from the code
// this project itself is built with (Next.js/TS/Tailwind/Motion) plus
// Tomás's stated toolkit.
const STACK: { name: string; Icon: ComponentType<{ className?: string }> }[] = [
  { name: "React", Icon: ReactIcon },
  { name: "Next.js", Icon: NextjsIcon },
  { name: "TypeScript", Icon: TypeScriptIcon },
  { name: "JavaScript", Icon: JavaScriptIcon },
  { name: "Node.js", Icon: NodeIcon },
  { name: "Express", Icon: ExpressIcon },
  { name: "PostgreSQL", Icon: PostgresIcon },
  { name: "Supabase", Icon: SupabaseIcon },
  { name: "Tailwind CSS", Icon: TailwindIcon },
  { name: "Sass", Icon: SassIcon },
  { name: "Vite", Icon: ViteIcon },
  { name: "Git", Icon: GitIcon },
  { name: "Vercel", Icon: VercelIcon },
];

export function About({ dict }: { dict: Dictionary }) {
  const media = getPortraitMedia();

  // Profile links render only once their URL is actually configured — a
  // missing one is left out rather than shipped as a dead link. LinkedIn and
  // GitHub get their real brand marks; Portfolio has no official mark of its
  // own, so it keeps the generic external-link glyph.
  const profileLinkSources: {
    href: string | undefined;
    label: string;
    Icon: ComponentType<{ className?: string }>;
  }[] = [
    { href: social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: social.portfolio, label: "Portfolio", Icon: ExternalLinkIcon },
    { href: social.github, label: "GitHub", Icon: GitHubIcon },
  ];
  const profileLinks = profileLinkSources.flatMap((l) => (l.href ? [{ ...l, href: l.href }] : []));

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
              {STACK.map(({ name, Icon }) => (
                <li
                  key={name}
                  className="group flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-foreground-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-deep hover:text-foreground"
                >
                  <Icon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14}>
            <h3 className="mt-10 text-sm font-bold uppercase tracking-wide text-foreground-secondary">
              {dict.about.contactLabel}
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={waLink(dict.whatsapp.nav)}
                target="_blank"
                rel="noopener noreferrer"
                className="tarc-cta-glow group flex min-h-11 items-center gap-2 rounded-md bg-orange px-5 font-medium text-[#431407] hover:bg-orange-hover"
              >
                <WhatsAppIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                {dict.about.whatsapp}
              </a>

              {profileLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-center gap-2 rounded-md border border-border px-5 font-medium transition-colors hover:border-orange-deep hover:text-orange-deep"
                >
                  <link.Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
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
