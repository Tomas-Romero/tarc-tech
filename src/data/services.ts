import type { LocalizedText } from "./projects";

export type Service = {
  id: string;
  icon:
    | "code"
    | "workflow"
    | "smartphone"
    | "cloud"
    | "cardLock"
    | "headset"
    | "building";
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
    id: "payment-security",
    icon: "cardLock",
    title: { es: "Seguridad en cobros online", en: "Secure online payments" },
    description: {
      es: "Integramos pasarelas de pago seguras y confiables para que tus clientes compren tranquilos.",
      en: "We integrate secure, reliable payment gateways so your customers can buy with confidence.",
    },
  },
  {
    id: "ongoing-support",
    icon: "headset",
    title: { es: "Soporte y evolución continua", en: "Ongoing support & evolution" },
    description: {
      es: "Acompañamos tu producto después del lanzamiento, iterando junto a tu equipo.",
      en: "We stay with your product after launch, iterating together with your team.",
    },
  },
  {
    id: "business-web",
    icon: "building",
    title: { es: "Web empresariales · pymes", en: "Business & SMB websites" },
    description: {
      es: "Sitios modernos, autogestionables y optimizados para convertir visitas en clientes.",
      en: "Modern, self-manageable sites optimized to turn visits into customers.",
    },
  },
];
