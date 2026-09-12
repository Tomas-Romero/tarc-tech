import { getDictionary, isLocale } from "@/i18n";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Solutions } from "@/components/sections/Solutions";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

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
      <Hero dict={dict} />
      <Services dict={dict} locale={locale} />
      <Solutions dict={dict} locale={locale} />
      <Process dict={dict} locale={locale} />
      <Projects dict={dict} locale={locale} />
      <About dict={dict} />
      <Faq dict={dict} locale={locale} />
      <FinalCta dict={dict} />
    </main>
  );
}
