"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/i18n";
import { navLinks } from "@/lib/nav-links";
import { waLink } from "@/lib/whatsapp";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";

export function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const ctaHref = waLink(dict.whatsapp.nav);

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ height: "var(--nav-height)" }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link
          href={`/${locale}#top`}
          className="flex items-center gap-2"
          aria-label="TARC Tech"
        >
          <Image src="/brand/isotipo.svg" alt="" width={28} height={28} priority />
          <span className="tarc-logotype text-lg">TARC Tech</span>
        </Link>

        <nav aria-label={dict.nav.primaryNav} className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={`/${locale}#${link.id}`}
                  className="tap-target-expand text-foreground-secondary transition-colors hover:text-foreground"
                >
                  {dict.nav[link.labelKey]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleToggle locale={locale} label={dict.nav.languageLabel} />
          <ThemeToggle label={dict.nav.themeLabel} />
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center rounded-md bg-orange px-4 text-sm font-medium text-[#431407] transition-colors hover:bg-orange-hover"
          >
            {dict.nav.cta}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={dict.nav.openMenu}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
          <div className="flex h-[var(--nav-height)] items-center justify-between px-6">
            <span className="tarc-logotype text-lg">TARC Tech</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={dict.nav.closeMenu}
              className="flex h-11 w-11 items-center justify-center"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            <ul className="flex flex-col items-center gap-6 text-xl font-medium">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/${locale}#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="tap-target-expand-sm"
                  >
                    {dict.nav[link.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <LocaleToggle locale={locale} label={dict.nav.languageLabel} />
              <ThemeToggle label={dict.nav.themeLabel} />
            </div>
          </nav>

          <div
            className="p-6"
            style={{ paddingBottom: "max(2.5rem, calc(2.5rem + env(safe-area-inset-bottom)))" }}
          >
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-md bg-orange px-4 py-3 text-center font-medium text-[#431407] transition-colors hover:bg-orange-hover"
            >
              {dict.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
