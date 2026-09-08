import type { Dictionary, Locale } from "@/i18n";
import { services } from "@/data/services";
import { social } from "@/lib/social";

// PLAN §11: ProfessionalService/LocalBusiness for the business, Person for
// Tomás, linked via @id fragments (no absolute IDs needed — schema.org
// allows relative graph references, which matters while there's no domain
// yet, D13). Every field here is a real fact already documented elsewhere
// (env-configured contact links, the approved service copy) — nothing is
// invented for the sake of filling out the schema.
export function JsonLd({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const sameAs = [social.linkedin, social.github, social.portfolio, social.instagram].filter(
    (url): url is string => Boolean(url),
  );
  const serviceType = services[0].title[locale];

  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": "#business",
      name: "TARC Tech",
      url: `${base}/${locale}`,
      description: dict.meta.description,
      serviceType,
      areaServed: {
        "@type": "AdministrativeArea",
        name: "San Rafael, Mendoza, Argentina",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Rafael",
        addressRegion: "Mendoza",
        addressCountry: "AR",
      },
      ...(social.email ? { email: social.email } : {}),
      founder: { "@id": "#person" },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "Person",
      "@id": "#person",
      name: "Tomás Romero",
      jobTitle: "Full-stack developer",
      worksFor: { "@id": "#business" },
      ...(social.portfolio ? { url: social.portfolio } : {}),
      ...(sameAs.length ? { sameAs } : {}),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // JSON.stringify of static, server-derived data only — nothing here
      // ever carries visitor input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
