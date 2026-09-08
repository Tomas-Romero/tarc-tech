import type { LocalizedText } from "./projects";
import type { Dictionary } from "@/i18n";

export type Solution = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  /** Real project this solution has actually shipped as — omitted when none. */
  example?: string;
  /** Which pre-filled WhatsApp message this panel's CTA opens with, so an
   *  incoming message says which solution it came from (PLAN §6.5 / §8). */
  whatsappKey: keyof Dictionary["whatsapp"];
};

// Real content only — see PLAN-LANDING-TARC-TECH.md §6.5. No pricing, in any
// form, in any language (closed decision D3).
export const solutions: Solution[] = [
  {
    id: "ventas-stock",
    title: {
      es: "Sistema de ventas y stock",
      en: "Sales and inventory system",
    },
    body: {
      es: "Para kioscos, comercios y distribuidoras.",
      en: "For kiosks, shops and distributors.",
    },
    example: "KiosControl",
    whatsappKey: "solutionSales",
  },
  {
    id: "tienda-online",
    title: {
      es: "Tienda online y catálogo digital",
      en: "Online store and digital catalog",
    },
    body: {
      es: "Con panel para cargar productos sin saber programar.",
      en: "With an admin panel to load products without writing code.",
    },
    example: "Modas Vanina",
    whatsappKey: "solutionStore",
  },
  {
    id: "gastronomico",
    title: {
      es: "Gestión gastronómica",
      en: "Restaurant management",
    },
    body: {
      es: "Pedidos, cocina, mozos y caja conectados.",
      en: "Orders, kitchen, waiters and register, all connected.",
    },
    example: "Sistema Gastronómico",
    whatsappKey: "solutionFood",
  },
  {
    id: "web-institucional",
    title: {
      es: "Web institucional o de servicios",
      en: "Company or services website",
    },
    body: {
      es: "Presencia profesional que genera contactos.",
      en: "A professional presence that brings in contacts.",
    },
    example: "GatheringHR",
    whatsappKey: "solutionWeb",
  },
  {
    id: "automatizaciones",
    title: {
      es: "Automatizaciones a medida",
      en: "Custom automation",
    },
    body: {
      es: "Reportes, integraciones y tareas repetitivas resueltas solas.",
      en: "Reports, integrations and repetitive tasks, handled on their own.",
    },
    whatsappKey: "solutionAutomation",
  },
];
