import { getDictionary, isLocale } from "@/i18n";
import { notFound } from "next/navigation";
import { waLink } from "@/lib/whatsapp";

// Phase 0 placeholder: proves fonts, tokens, dark-default theme, and the
// i18n dictionary are wired correctly. The real Hero (with its high-impact
// isotipo animation) is Phase 2 — built via /impeccable shape + overdrive,
// against DESIGN.md, not sketched ahead of that here.
export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
        {dict.hero.titleParts.map((part, i) =>
          part.accent ? (
            <em key={i} className="tarc-accent-text not-italic italic">
              {part.text}
            </em>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </h1>
      <p className="max-w-xl text-foreground-secondary">
        {dict.hero.subtitle}
      </p>
      <a
        href={waLink(dict.whatsapp.hero)}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-orange px-6 py-3 font-medium text-[#431407] transition-colors hover:bg-orange-hover"
      >
        {dict.hero.ctaPrimary}
      </a>
      <p className="text-sm text-foreground-secondary">
        {dict.hero.signature}
      </p>
    </main>
  );
}
