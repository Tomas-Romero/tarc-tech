import type { MetadataRoute } from "next";
import { locales } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
  }));
}
