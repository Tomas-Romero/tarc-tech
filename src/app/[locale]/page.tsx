import { getDictionary, isLocale } from "@/i18n";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";

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
    </main>
  );
}
