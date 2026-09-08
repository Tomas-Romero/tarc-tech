import { getDictionary, isLocale } from "@/i18n";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Services } from "@/components/sections/Services";

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
      <Trust dict={dict} />
      <Services dict={dict} locale={locale} />
    </main>
  );
}
