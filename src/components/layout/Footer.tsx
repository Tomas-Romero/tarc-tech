import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/i18n";
import { navLinks } from "@/lib/nav-links";
import { social } from "@/lib/social";
import { FooterBrand } from "./FooterBrand";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const links = [
    { href: social.linkedin, label: "LinkedIn" },
    { href: social.github, label: "GitHub" },
    { href: social.portfolio, label: "Portfolio" },
    { href: social.instagram, label: "Instagram" },
  ].filter((link): link is { href: string; label: string } => Boolean(link.href));

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-2">
          <Image src="/brand/isotipo.svg" alt="" width={28} height={28} />
          <span className="sr-only">TARC Tech</span>
        </div>

        <nav aria-label={dict.nav.primaryNav}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground-secondary">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={`/${locale}#${link.id}`}
                  className="transition-colors hover:text-foreground"
                >
                  {dict.nav[link.labelKey]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {(links.length > 0 || social.email) && (
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground-secondary">
            {social.email && (
              <li>
                <a
                  href={`mailto:${social.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {social.email}
                </a>
              </li>
            )}
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-border px-6 py-6 text-center text-xs text-foreground-secondary">
        © {year} TARC Tech — Tomas Agustin Romero Code
      </div>

      <FooterBrand />
    </footer>
  );
}
