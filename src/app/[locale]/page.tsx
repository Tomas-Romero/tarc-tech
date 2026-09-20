import { getDictionary, isLocale } from "@/i18n";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Signals } from "@/components/sections/Signals";
import { Services } from "@/components/sections/Services";
import { Solutions } from "@/components/sections/Solutions";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageGrid } from "@/components/motion/PageGrid";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <main>
      {/* The diagonal grid backdrop stops here on purpose — Tomás doesn't
          want it behind the final CTA's own photo background or the
          footer, so the wrapper (and the grid inside it) ends with Faq. */}
      <div className="relative">
        <PageGrid />
        <Hero dict={dict} />
        <Signals dict={dict} locale={locale} />
        <Services dict={dict} locale={locale} />
        <Solutions dict={dict} locale={locale} />
        <Process dict={dict} locale={locale} />
        <Projects dict={dict} locale={locale} />
        <Faq dict={dict} locale={locale} />
      </div>
      <FinalCta dict={dict} />
    </main>
  );
}
