import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fontVariables } from "@/lib/fonts";
import { locales, isLocale, getDictionary, type Locale } from "@/i18n";
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

// Dark is the default theme (PLAN §3 D9); this inline script runs before
// paint so an explicit "light" choice in localStorage never flashes dark
// first. Absence of the key (or "dark") needs no attribute — :root is
// already dark by default.
const themeInitScript = `(function(){try{var t=localStorage.getItem('tarc-theme');if(t==='light'){document.documentElement.dataset.theme='light';}}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${fontVariables} antialiased`}>{children}</body>
    </html>
  );
}

export type { Locale };
