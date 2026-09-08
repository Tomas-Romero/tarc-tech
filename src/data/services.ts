import type { LocalizedText } from "./projects";

export type Service = {
  id: string;
  icon: "code" | "workflow" | "smartphone" | "cloud" | "palette";
  title: LocalizedText;
  description: LocalizedText;
};

// Real content only — see PLAN-LANDING-TARC-TECH.md §6.4.
export const services: Service[] = [
  {
    id: "custom-software",
    icon: "code",
    title: { es: "Software a medida", en: "Custom software" },
    description: {
      es: "Sistemas hechos para tu forma de trabajar, no al revés.",
      en: "Systems built around how you work, not the other way around.",
    },
  },
  {
    id: "automation",
    icon: "workflow",
    title: { es: "Sistemas y automatizaciones", en: "Systems & automation" },
    description: {
      es: "Eliminamos el trabajo repetitivo: planillas, cargas manuales, reportes.",
      en: "We eliminate repetitive work: spreadsheets, manual entry, reports.",
    },
  },
  {
    id: "apps",
    icon: "smartphone",
    title: { es: "Apps mobile y de escritorio", en: "Mobile & desktop apps" },
    description: {
      es: "Aplicaciones que funcionan donde trabajás, incluso sin internet.",
      en: "Applications that work wherever you do business, even without internet.",
    },
  },
  {
    id: "saas",
    icon: "cloud",
    title: { es: "Productos SaaS", en: "SaaS products" },
    description: {
      es: "Plataformas multi-cliente pensadas para escalar y venderse por suscripción.",
      en: "Multi-client platforms built to scale and sell by subscription.",
    },
  },
  {
    id: "design",
    icon: "palette",
    title: { es: "Diseño e identidad", en: "Design & identity" },
    description: {
      es: "Interfaces y marca cuidadas: logo, paleta, tipografía y experiencia.",
      en: "Thoughtful interfaces and branding: logo, palette, typography and experience.",
    },
  },
];
