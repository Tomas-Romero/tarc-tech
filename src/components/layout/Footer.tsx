import Link from "next/link";
import Image from "next/image";
import type { ComponentType } from "react";
import type { Dictionary, Locale } from "@/i18n";
import { navLinks } from "@/lib/nav-links";
import { social } from "@/lib/social";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/motion/Reveal";
import { FooterBrand } from "./FooterBrand";
import { MailIcon, MapPinIcon, ExternalLinkIcon } from "@/components/ui/icons";
import {
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/ui/brand-icons";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const iconLinkSources: {
    href: string | undefined;
    label: string;
    Icon: ComponentType<{ className?: string }>;
  }[] = [
    { href: waLink(dict.whatsapp.nav), label: "WhatsApp", Icon: WhatsAppIcon },
    { href: social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: social.github, label: "GitHub", Icon: GitHubIcon },
    { href: social.portfolio, label: "Portfolio", Icon: ExternalLinkIcon },
    { href: social.instagram, label: "Instagram", Icon: InstagramIcon },
  ];
  const iconLinks = iconLinkSources.flatMap((l) =>
    l.href ? [{ ...l, href: l.href }] : []
  );

  return (
    <footer className="border-t border-border">
      <Reveal repeat className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <Link
              href={`/${locale}#top`}
              className="group/logo flex items-center gap-2"
              aria-label="TARC Tech"
            >
              <Image
                src="/brand/isotipo.svg"
                alt=""
                width={28}
                height={28}
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-110 group-hover/logo:-rotate-6"
              />
              <span className="tarc-logotype text-lg">
                TARC <span className="text-orange">Tech</span>
              </span>
            </Link>

            {social.email && (
              <a
                href={`mailto:${social.email}`}
                className="group flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground"
              >
                <MailIcon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                {social.email}
              </a>
            )}

            <p className="flex items-center gap-2 text-sm text-foreground-secondary">
              <MapPinIcon className="h-4 w-4 shrink-0" />
              San Rafael, Mendoza, Argentina
            </p>
          </div>

          <nav aria-label={dict.nav.primaryNav}>
            <ul className="flex flex-wrap gap-x-6 gap-y-4 text-sm text-foreground-secondary">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/${locale}#${link.id}`}
                    className="tap-target-expand-sm transition-colors hover:text-foreground"
                  >
                    {dict.nav[link.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {iconLinks.length > 0 && (
            <ul className="flex flex-wrap gap-3">
              {iconLinks.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="group flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-deep hover:text-orange-deep"
                  >
                    <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>

      <div className="border-t border-border px-6 py-6 text-center text-xs text-foreground-secondary">
        © {year} TARC Tech — Tomas Agustin Romero Code
      </div>

      <FooterBrand />
    </footer>
  );
}
