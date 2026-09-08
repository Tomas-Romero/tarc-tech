import type { Dictionary } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { HeroBackground } from "@/components/motion/HeroBackground";
import { HeroBrand } from "@/components/motion/HeroBrand";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-[var(--nav-height)]"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 py-10 md:flex-row md:gap-16 md:py-16">
        {/* Mark comes first in DOM/visual order on mobile so the hero's one
            deliberate motion moment plays inside the first viewport instead
            of firing (and finishing) off-screen while the visitor is still
            reading the headline above it — its assembly animation runs once
            on mount, not on scroll-into-view, so being below the fold meant
            most visitors never saw it move at all. Desktop keeps the
            original text-then-mark reading order. */}
        <div className="order-last flex flex-col items-center text-center md:order-none md:w-[58%] md:items-start md:text-left">
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

        <div className="order-first w-40 shrink-0 sm:w-60 md:order-none md:w-[42%] md:max-w-md">
          <HeroBrand />
        </div>
      </div>
    </section>
  );
}
