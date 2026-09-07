import type { LocalizedText } from "./projects";

export type ProcessStep = {
  id: string;
  number: number;
  title: LocalizedText;
  description: LocalizedText;
};

// Real content only — see PLAN-LANDING-TARC-TECH.md §6.6.
export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    number: 1,
    title: { es: "Relevamiento", en: "Discovery" },
    description: {
      es: "Entiendo tu negocio y detecto qué te falta realmente.",
      en: "I get to know your business and find out what's really missing.",
    },
  },
  {
    id: "proposal",
    number: 2,
    title: { es: "Propuesta", en: "Proposal" },
    description: {
      es: "Te presento una solución concreta con alcance claro.",
      en: "I present a concrete solution with a clear scope.",
    },
  },
  {
    id: "iterative-development",
    number: 3,
    title: { es: "Desarrollo iterativo", en: "Iterative development" },
    description: {
      es: "Vas viendo prototipos y me das feedback en el camino. Nada de sorpresas al final.",
      en: "You see prototypes and give feedback along the way. No surprises at the end.",
    },
  },
  {
    id: "delivery",
    number: 4,
    title: { es: "Entrega", en: "Delivery" },
    description: {
      es: "Sistema funcionando, con la puesta en marcha acompañada.",
      en: "A working system, with hands-on launch support.",
    },
  },
  {
    id: "support",
    number: 5,
    title: { es: "Soporte y mantenimiento", en: "Support & maintenance" },
    description: {
      es: "Sigo disponible: mejoras, ajustes y respaldo.",
      en: "I stay available: improvements, adjustments, and backup.",
    },
  },
];
