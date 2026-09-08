import type { LocalizedText } from "./projects";

export type FaqEntry = {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
};

// PLAN §6.9: four to six real questions, answering objections before they
// come up. Qualitative answers only — no pricing and no guaranteed
// timeframes. Every answer here restates something already documented in
// PRODUCT.md or the process steps; nothing is invented.
//
// NOTE: the plan also lists "¿Trabajás con proyectos ya empezados por otro?".
// It is deliberately not here — that answer is a business policy only Tomás
// can set, and inventing one would be putting words in his mouth.
export const faq: FaqEntry[] = [
  {
    id: "fuera-de-san-rafael",
    question: {
      es: "¿Trabajás con negocios de fuera de San Rafael?",
      en: "Do you work with businesses outside San Rafael?",
    },
    answer: {
      es: "Sí. Trabajo de forma remota con todo el país. El relevamiento, las devoluciones y el soporte funcionan igual por videollamada y WhatsApp.",
      en: "Yes. I work remotely across the country. Discovery, feedback and support all work the same over video calls and WhatsApp.",
    },
  },
  {
    id: "cuanto-tarda",
    question: {
      es: "¿Cuánto tarda un proyecto?",
      en: "How long does a project take?",
    },
    answer: {
      es: "Depende del alcance. Primero relevo tu negocio y recién ahí te doy una estimación concreta para tu caso, con el alcance claro por escrito.",
      en: "It depends on the scope. I get to know your business first, and only then give you a concrete estimate for your case, with the scope written down.",
    },
  },
  {
    id: "soporte-post-entrega",
    question: {
      es: "¿Cómo es el soporte después de la entrega?",
      en: "What happens after delivery?",
    },
    answer: {
      es: "Sigo disponible: mejoras, ajustes y respaldo. La entrega incluye la puesta en marcha acompañada, no es dejarte el sistema y desaparecer.",
      en: "I stay available: improvements, adjustments and backup. Delivery includes hands-on launch support — I don't hand it over and disappear.",
    },
  },
  {
    id: "cambios-durante",
    question: {
      es: "¿Puedo pedir cambios mientras se desarrolla?",
      en: "Can I ask for changes while it's being built?",
    },
    answer: {
      es: "Sí, y es parte del método. Vas viendo prototipos y me das feedback en el camino, justamente para que no haya sorpresas al final.",
      en: "Yes, and it's built into how I work. You see prototypes and give feedback along the way, precisely so there are no surprises at the end.",
    },
  },
  {
    id: "datos-y-seguridad",
    question: {
      es: "¿Qué pasa con mis datos y la seguridad?",
      en: "What about my data and security?",
    },
    answer: {
      es: "Los datos de tu negocio son tuyos. Dónde se alojan y quién accede a qué se define con vos durante el relevamiento, antes de escribir una línea de código.",
      en: "Your business's data is yours. Where it lives and who can access what is decided with you during discovery, before a line of code is written.",
    },
  },
];
