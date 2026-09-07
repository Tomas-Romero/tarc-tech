import type { Dictionary } from "@/i18n";

export type NavLink = { id: string; labelKey: keyof Dictionary["nav"] };

// Anchor ids match what each section (Fases 2–8) will render as its id.
export const navLinks: NavLink[] = [
  { id: "servicios", labelKey: "services" },
  { id: "proceso", labelKey: "process" },
  { id: "proyectos", labelKey: "projects" },
  { id: "sobre-mi", labelKey: "about" },
  { id: "contacto", labelKey: "contact" },
];
