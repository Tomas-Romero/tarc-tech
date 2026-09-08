import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fontVariables } from "@/lib/fonts";
import { locales, isLocale, getDictionary, type Locale } from "@/i18n";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { LoadingScreen } from "@/components/motion/LoadingScreen";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: { es: "/es", en: "/en", "x-default": "/es" },
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
