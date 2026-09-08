import type { Dictionary } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { HeroBackground } from "@/components/motion/HeroBackground";
import { HeroMark } from "@/components/motion/HeroMark";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-[var(--nav-height)]"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 py-16 md:flex-row md:gap-16">
        <div className="flex flex-col items-center text-center md:w-[58%] md:items-start md:text-left">
          <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {dict.hero.titleParts.map((part, i) =>
              part.accent ? (
                <em key={i} className="tarc-accent-text">
                  {part.text}
                </em>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </h1>

          <p className="mt-6 max-w-md text-lg text-foreground-secondary">
            {dict.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink(dict.whatsapp.hero)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-orange px-6 py-3 text-center font-medium text-[#431407] transition-colors hover:bg-orange-hover"
            >
              {dict.hero.ctaPrimary}
            </a>
            <a
              href="#proyectos"
              className="rounded-md border border-border px-6 py-3 text-center font-medium transition-colors hover:border-orange-deep hover:text-orange-deep"
            >
              {dict.hero.ctaSecondary}
            </a>
          </div>

          <p className="mt-8 text-sm text-foreground-secondary">
            {dict.hero.signature}
          </p>
        </div>

        <div className="w-32 shrink-0 sm:w-48 md:w-[42%] md:max-w-md">
          <HeroMark className="block h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
