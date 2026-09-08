import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fontVariables } from "@/lib/fonts";
import { locales, isLocale, getDictionary, type Locale } from "@/i18n";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { LoadingScreen } from "@/components/motion/LoadingScreen";
import { JsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const OG_LOCALE: Record<Locale, string> = { es: "es_AR", en: "en_US" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  // No domain yet (PLAN §3 D13) — metadataBase stays unset until one exists
  // rather than assuming one; Next falls back to the request origin.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: "TARC Tech",
      locale: OG_LOCALE[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

// Light is the default theme (owner's instruction, reversing PLAN §3 D9);
// this inline script runs before paint so an explicit "dark" choice in
// localStorage never flashes light first. Absence of the key (or "light")
// needs no attribute — :root is already light by default.
const themeInitScript = `(function(){try{var t=localStorage.getItem('tarc-theme');if(t==='dark'){document.documentElement.dataset.theme='dark';}}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd dict={dict} locale={locale} />
      </head>
      <body className={`${fontVariables} antialiased`}>
        <LoadingScreen />
        <Nav locale={locale} dict={dict} />
        {children}
        <Footer locale={locale} dict={dict} />
        <WhatsAppFab dict={dict} />
      </body>
    </html>
  );
}

export type { Locale };
