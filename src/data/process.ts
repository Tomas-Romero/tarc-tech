import type { LocalizedText } from "./projects";

export type ProcessStep = {
  id: string;
  number: number;
  icon: "ear" | "lightbulb" | "hammer" | "rocket" | "shield";
  title: LocalizedText;
  description: LocalizedText;
};

// Real content only — see PLAN-LANDING-TARC-TECH.md §6.6. Step names read as
// verbs on purpose ("Escuchamos", not "Relevamiento") — the plural, active
// voice the rest of the work-facing copy uses.
export const processSteps: ProcessStep[] = [
  {
    id: "listen",
    number: 1,
    icon: "ear",
    title: { es: "Escuchamos", en: "We listen" },
    description: {
      es: "Relevamos tu negocio a fondo antes de proponer nada: cómo trabajás hoy y qué te está frenando.",
      en: "We get to know your business in depth before proposing anything: how you work today and what's holding you back.",
    },
  },
  {
    id: "propose",
    number: 2,
    icon: "lightbulb",
    title: { es: "Proponemos", en: "We propose" },
    description: {
      es: "Te presentamos una solución concreta, con alcance y expectativas claras desde el primer día.",
      en: "We present a concrete solution, with clear scope and expectations from day one.",
    },
  },
  {
    id: "build",
    number: 3,
    icon: "hammer",
    title: { es: "Construimos", en: "We build" },
    description: {
      es: "Desarrollo iterativo: vas viendo el avance real y nos das feedback en el camino. Nada de sorpresas al final.",
      en: "Iterative development: you see real progress and give us feedback along the way. No surprises at the end.",
    },
  },
  {
    id: "launch",
    number: 4,
    icon: "rocket",
    title: { es: "Lanzamos", en: "We launch" },
    description: {
      es: "Sistema funcionando en producción, con la puesta en marcha acompañada de principio a fin.",
      en: "A working system in production, with hands-on launch support from start to finish.",
    },
  },
  {
    id: "support",
    number: 5,
    icon: "shield",
    title: { es: "Acompañamos", en: "We support" },
    description: {
      es: "Seguimos disponibles después de la entrega: mejoras, ajustes y respaldo cuando lo necesites.",
      en: "We stay available after delivery: improvements, adjustments and backup whenever you need them.",
    },
  },
];
