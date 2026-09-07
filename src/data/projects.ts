export type LocalizedText = { es: string; en: string };
export type LocalizedList = { es: string[]; en: string[] };

export type Project = {
  id: string;
  name: string;
  type: "cliente" | "producto";
  status?: "en-desarrollo";
  tagline: LocalizedText;
  /** Omitted (not left invented) when the real problem statement is still owed by the project owner. */
  problem?: LocalizedText;
  solution: LocalizedText;
  features: LocalizedList;
  /** Empty until confirmed — see PLAN-LANDING-TARC-TECH.md §16. */
  stack: string[];
  /** Real screenshots, once reviewed and provided. Empty is honest, not a bug. */
  images: string[];
  externalUrl?: string;
  /** A named, real detail worth surfacing in the card/modal (e.g. KiosControl's mascot "Kio"). */
  mascot?: string;
};

// Real content only — see PLAN-LANDING-TARC-TECH.md §7. Do not add projects,
// clients, testimonials, or metrics beyond what's documented there.
export const projects: Project[] = [
  {
    id: "modas-vanina",
    name: "Modas Vanina",
    type: "cliente",
    tagline: {
      es: "Catálogo digital de indumentaria, perfumería y cremas",
      en: "Digital catalog for a clothing, perfume and skincare store",
    },
    problem: {
      es: "La tienda no tenía forma de mostrar su catálogo online ni de recibir consultas ordenadas; la dueña no tiene conocimientos técnicos.",
      en: "The store had no way to show its catalog online or receive organized inquiries; the owner has no technical background.",
    },
    solution: {
      es: "Sitio tipo catálogo con detalle de producto en ventana emergente, lista de productos que arma la consulta directa por WhatsApp, sección de ubicación y contacto, y un panel de administración simple para que la dueña cargue, edite, oculte y destaque productos sin ayuda. Además, rebranding completo de la marca: logo, paleta y tipografía.",
      en: "A catalog-style site with product detail in a popup window, a product list that builds a direct WhatsApp inquiry, a location/contact section, and a simple admin panel so the owner can add, edit, hide and feature products without help. Also included a full brand rebrand: logo, palette and typography.",
    },
    features: {
      es: [
        "Detalle de producto en ventana emergente",
        "Consulta directa por WhatsApp armada desde el catálogo",
        "Panel de administración simple, sin conocimientos técnicos",
        "Rebranding completo: logo, paleta y tipografía",
        "Diseño y animaciones optimizados para mobile",
        "Sin precios visibles, por decisión de la clienta",
      ],
      en: [
        "Product detail in a popup window",
        "Direct WhatsApp inquiry built from the catalog",
        "Simple admin panel, no technical knowledge required",
        "Full rebrand: logo, palette and typography",
        "Design and animations optimized for mobile",
        "No visible pricing, by the client's choice",
      ],
    },
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    images: [],
  },
  {
    id: "gatheringhr",
    name: "GatheringHR",
    type: "cliente",
    tagline: {
      es: "Sitio web para una consultora de reclutamiento y RRHH",
      en: "Website for a recruiting and HR consultancy",
    },
    // TODO: falta que Tomás complete el problema concreto del cliente (PLAN §7.2 / §16).
    solution: {
      es: "Presencia web profesional para captar contactos.",
      en: "A professional web presence to generate contacts.",
    },
    features: {
      // TODO: falta la lista de funcionalidades — a completar con Tomás (PLAN §7.2 / §16).
      es: [],
      en: [],
    },
    stack: ["JavaScript", "SCSS", "Tailwind CSS"],
    images: [],
  },
  {
    id: "kioscontrol",
    name: "KiosControl",
    type: "producto",
    tagline: {
      es: "Sistema de punto de venta modular para kioscos y comercios",
      en: "Modular point-of-sale system for kiosks and small shops",
    },
    problem: {
      es: "Los comercios chicos llevan ventas y stock a mano o con planillas, pierden control y no tienen datos para decidir.",
      en: "Small shops track sales and stock by hand or in spreadsheets, losing control and any data to decide with.",
    },
    solution: {
      es: "POS modular con gestión de ventas y stock, modo offline para seguir vendiendo sin internet, impresión térmica de tickets y arquitectura multi-tenant.",
      en: "A modular POS with sales and stock management, an offline mode to keep selling without internet, thermal ticket printing, and multi-tenant architecture.",
    },
    features: {
      es: [
        "Gestión de ventas y stock",
        "Modo offline",
        "Impresión térmica de tickets",
        "Arquitectura multi-tenant",
      ],
      en: [
        "Sales and stock management",
        "Offline mode",
        "Thermal ticket printing",
        "Multi-tenant architecture",
      ],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    images: [],
    mascot: "Kio",
  },
  {
    id: "sistema-gastronomico",
    name: "Sistema Gastronómico",
    type: "producto",
    status: "en-desarrollo",
    tagline: {
      es: "Sistema integral de gestión para rotiserías y restaurantes",
      en: "End-to-end management system for restaurants and food shops",
    },
    solution: {
      es: "Módulos de menú/catálogo para el cliente final, panel de administración, POS de caja, panel de mozos y pantalla de cocina (KDS), pensado como SaaS multi-tenant, offline-first, con impresión térmica y roles/permisos.",
      en: "Menu/catalog modules for the end customer, an admin panel, a cash-register POS, a waiter panel and a kitchen display screen (KDS), designed as a multi-tenant, offline-first SaaS with thermal printing and roles/permissions.",
    },
    features: {
      es: [
        "Menú/catálogo para el cliente final",
        "Panel de administración",
        "POS de caja",
        "Panel de mozos",
        "Pantalla de cocina (KDS)",
        "Offline-first",
        "Impresión térmica",
        "Roles y permisos",
      ],
      en: [
        "End-customer menu/catalog",
        "Admin panel",
        "Cash-register POS",
        "Waiter panel",
        "Kitchen display screen (KDS)",
        "Offline-first",
        "Thermal printing",
        "Roles and permissions",
      ],
    },
    // TODO: stack a confirmar (PLAN §7.4).
    stack: [],
    images: [],
  },
];
