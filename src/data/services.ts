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
      es: "Construimos sistemas para tu forma de trabajar, no al revés.",
      en: "We build systems around how you work, not the other way around.",
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
      es: "Desarrollamos apps que funcionan donde trabajás, incluso sin internet.",
      en: "We build apps that work wherever you do business, even without internet.",
    },
  },
  {
    id: "saas",
    icon: "cloud",
    title: { es: "Productos SaaS", en: "SaaS products" },
    description: {
      es: "Diseñamos plataformas multi-cliente pensadas para escalar y venderse por suscripción.",
      en: "We design multi-client platforms built to scale and sell by subscription.",
    },
  },
  {
    id: "design",
    icon: "palette",
    title: { es: "Diseño e identidad", en: "Design & identity" },
    description: {
      es: "Cuidamos cada interfaz y marca: logo, paleta, tipografía y experiencia.",
      en: "We take care of every interface and brand: logo, palette, typography and experience.",
    },
  },
];
