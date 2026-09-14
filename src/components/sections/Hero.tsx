import type { Dictionary } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { HeroBackground } from "@/components/motion/HeroBackground";
import { HeroBrand } from "@/components/motion/HeroBrand";
import { HeroSignature } from "@/components/motion/HeroSignature";

// Centered, stacked composition (mark → wordmark → headline → subtitle →
// CTAs → signature) instead of the previous side-by-side layout — one
// column at every width, so there's no responsive reordering to reason
// about. The mark sits small above the wordmark rather than large beside
// the copy: it's the opening beat, not competing for the same visual
// weight as the headline underneath it.
export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-[var(--nav-height)]"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-16 text-center">
        <div className="w-28 sm:w-32">
          <HeroBrand />
        </div>

        <h1 className="mt-10 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
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
            className="tarc-cta-glow rounded-md bg-orange px-6 py-3 text-center font-medium text-[#431407] hover:bg-orange-hover"
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

        <HeroSignature
          prefix={dict.hero.signaturePrefix}
          name={dict.hero.signatureName}
          suffix={dict.hero.signatureSuffix}
        />
      </div>
    </section>
  );
}
