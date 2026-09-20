import type { LocalizedText, LocalizedList } from "./projects";

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
  /** Short checklist shown under the description in the demonstrative card
   *  (PLAN §6.4 style, extended per Tomás's redesign brief) — what the
   *  offering itself includes, not a client claim, so it's safe to state
   *  plainly rather than needing a real example to point to. */
  highlights: LocalizedList;
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
    highlights: {
      es: ["Pensado para tu proceso real", "Sin módulos que no usás", "El código queda para vos"],
      en: ["Built around your real process", "No modules you'll never use", "The code stays yours"],
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
    highlights: {
      es: ["Reportes que se arman solos", "Datos que ya no cargás dos veces", "Alertas y avisos automáticos"],
      en: ["Reports that build themselves", "Data you never enter twice", "Automatic alerts and reminders"],
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
    highlights: {
      es: ["Modo offline real", "Para Android, iOS o escritorio", "Sincroniza cuando vuelve la conexión"],
      en: ["Real offline mode", "For Android, iOS or desktop", "Syncs the moment connection returns"],
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
    highlights: {
      es: ["Arquitectura multi-tenant", "Planes y suscripciones", "Pensado para crecer"],
      en: ["Multi-tenant architecture", "Plans and subscriptions", "Built to grow"],
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
    highlights: {
      es: ["Pasarelas reconocidas", "Datos nunca en tus manos", "Confirmación automática del pago"],
      en: ["Trusted payment gateways", "Card data never touches your hands", "Automatic payment confirmation"],
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
    highlights: {
      es: ["Respuesta directa por WhatsApp", "Mejoras después de la entrega", "Sin tickets ni intermediarios"],
      en: ["Direct answers over WhatsApp", "Improvements after delivery", "No tickets, no middlemen"],
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
    highlights: {
      es: ["Vos mismo editás el contenido", "Optimizado para buscadores", "Formulario de contacto integrado"],
      en: ["You edit the content yourself", "Optimized for search engines", "Built-in contact form"],
    },
  },
];
