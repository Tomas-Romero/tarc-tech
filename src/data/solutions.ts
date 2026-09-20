import type { LocalizedText } from "./projects";
import type { Dictionary } from "@/i18n";

export type Solution = {
  id: string;
  icon: "register" | "sliders" | "storefront" | "tray" | "browser" | "bolt";
  title: LocalizedText;
  body: LocalizedText;
  /** Real project this solution has actually shipped as — omitted when none.
   *  No longer shown with an "Ejemplo:" label in the UI, but kept as real
   *  data rather than deleted. */
  example?: string;
  /** Which pre-filled WhatsApp message this panel's CTA opens with, so an
   *  incoming message says which solution it came from (PLAN §6.5 / §8). */
  whatsappKey: keyof Dictionary["whatsapp"];
};

// Real content only — see PLAN-LANDING-TARC-TECH.md §6.5. No pricing, in any
// form, in any language (closed decision D3). Each body now covers what it
// is, who it's for, and the concrete problem it solves — not just a
// one-line audience tag.
export const solutions: Solution[] = [
  {
    id: "ventas-stock",
    icon: "register",
    title: {
      es: "Sistemas de ventas y stock",
      en: "Sales and inventory systems",
    },
    body: {
      es: "Un sistema para llevar el control diario de tu comercio: qué vendés, qué tenés en stock y qué necesitás reponer. Pensado para kioscos, comercios y distribuidoras que hoy anotan todo a mano o en planillas sueltas, y terminan perdiendo tiempo — o plata — por no saber qué tienen en el momento que lo necesitan.",
      en: "A system to run your shop's daily control: what you sell, what you have in stock, and what needs restocking. Built for kiosks, shops and distributors that still track everything by hand or in loose spreadsheets, and end up losing time — or money — from not knowing what they have when they need it.",
    },
    example: "KiosControl",
    whatsappKey: "solutionSales",
  },
  {
    id: "sistema-medida",
    icon: "sliders",
    title: {
      es: "Sistemas a medida",
      en: "Custom-built systems",
    },
    body: {
      es: "Si tu negocio funciona distinto y ninguna idea de esta lista describe exactamente tu caso, igual podemos ayudarte: relevamos cómo trabajás hoy y construimos el sistema alrededor de ese proceso puntual, en vez de forzarte a adaptarte vos a un programa genérico.",
      en: "If your business runs differently and none of these ideas quite describes your case, we can still help: we look at how you actually work today and build the system around that specific process, instead of making you adapt to a generic program.",
    },
    whatsappKey: "solutionCustom",
  },
  {
    id: "tienda-online",
    icon: "storefront",
    title: {
      es: "Tiendas online y catálogos digitales",
      en: "Online stores and digital catalogs",
    },
    body: {
      es: "Una tienda online con un panel simple para cargar y editar productos vos mismo, sin depender de nadie ni saber programar. Ideal si vendés indumentaria, productos o servicios y hoy dependés solo de redes sociales, perdiendo pedidos por no tener un catálogo ordenado y siempre actualizado.",
      en: "An online store with a simple panel to add and edit products yourself, no coding and no depending on anyone. Ideal if you sell clothing, products or services and currently rely only on social media, losing orders from not having an organized, always up-to-date catalog.",
    },
    example: "Modas Vanina",
    whatsappKey: "solutionStore",
  },
  {
    id: "gastronomico",
    icon: "tray",
    title: {
      es: "Gestión gastronómica",
      en: "Restaurant management",
    },
    body: {
      es: "Un sistema pensado para restaurantes, rotiserías y cualquier negocio de comida: menú y comandas digitales, gestión de pedidos (en el salón, para llevar o por delivery), pedidos que llegan directo a cocina y caja, sin perderse entre papeles ni idas y vueltas. Para locales donde hoy las comandas de papel generan demoras, errores y pedidos que se traspapelan, afectando directamente al cliente.",
      en: "A system built for restaurants, food shops and any food business: digital menu and order tickets, order management (dine-in, takeout or delivery), orders that go straight to the kitchen and register with nothing lost on paper along the way. For places where paper tickets currently cause delays, mistakes and lost orders that end up affecting the customer.",
    },
    example: "Sistema Gastronómico",
    whatsappKey: "solutionFood",
  },
  {
    id: "web-institucional",
    icon: "browser",
    title: {
      es: "Web institucionales",
      en: "Company websites",
    },
    body: {
      es: "Un sitio institucional que genera una primera impresión profesional y convierte visitas en contactos reales. Para empresas y consultoras que todavía no tienen presencia web, o tienen una desactualizada, y pierden oportunidades frente a quien busca información antes de decidir con quién trabajar.",
      en: "A company website that creates a professional first impression and turns visits into real contacts. For businesses and consultancies that don't yet have a web presence — or have an outdated one — and lose opportunities to whoever people find first when deciding who to work with.",
    },
    example: "GatheringHR",
    whatsappKey: "solutionWeb",
  },
  {
    id: "automatizaciones",
    icon: "bolt",
    title: {
      es: "Automatizaciones",
      en: "Automation",
    },
    body: {
      es: "Reportes, integraciones entre sistemas y tareas repetitivas que dejan de hacerse a mano. Para cualquier negocio donde alguien pierde horas por semana copiando datos entre planillas o armando el mismo informe una y otra vez, en vez de dedicar ese tiempo a lo que realmente hace crecer el negocio.",
      en: "Reports, integrations between systems, and repetitive tasks that stop being done by hand. For any business where someone loses hours every week copying data between spreadsheets or building the same report over and over, instead of spending that time on what actually grows the business.",
    },
    whatsappKey: "solutionAutomation",
  },
];
