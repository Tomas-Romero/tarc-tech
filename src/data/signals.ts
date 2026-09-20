import type { LocalizedText } from "./projects";

export type Signal = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
};

// Generic, recognizable pain points — not claims about any specific client,
// so unlike `projects.ts` these are safe to write as plain marketing copy
// rather than needing a real case on record.
export const signals: Signal[] = [
  {
    id: "planillas",
    title: {
      es: "¿Todo termina en una planilla?",
      en: "Does everything end up in a spreadsheet?",
    },
    body: {
      es: "Ventas, stock y clientes repartidos en archivos sueltos que nadie termina de mantener al día.",
      en: "Sales, stock and customers scattered across loose files nobody keeps up to date.",
    },
  },
  {
    id: "datos-duplicados",
    title: {
      es: "¿Cargás los mismos datos más de una vez?",
      en: "Do you enter the same data more than once?",
    },
    body: {
      es: "La misma información pasada a mano entre sistemas que no se hablan entre sí.",
      en: "The same information copied by hand between systems that don't talk to each other.",
    },
  },
  {
    id: "tareas-repetidas",
    title: {
      es: "¿Las tareas se repiten todos los días?",
      en: "Do the same tasks repeat every day?",
    },
    body: {
      es: "Reportes, mensajes y controles que hacés a mano, semana tras semana, sin que nada quede automatizado.",
      en: "Reports, messages and checks you do by hand, week after week, with nothing automated.",
    },
  },
];
