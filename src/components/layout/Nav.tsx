"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { Dictionary, Locale } from "@/i18n";
import { navLinks } from "@/lib/nav-links";
import { waLink } from "@/lib/whatsapp";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever nav link's section currently owns the
  // middle of the viewport, so the nav finally says where you are on this
  // long single-page scroll — it never did before.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
          className="group/logo flex items-center gap-2"
          aria-label="TARC Tech"
        >
          <Image
            src="/brand/isotipo.svg"
            alt=""
            width={28}
            height={28}
            priority
            className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-110 group-hover/logo:-rotate-6"
          />
          <span className="tarc-logotype text-lg">
            TARC <span className="text-orange">Tech</span>
          </span>
        </Link>

        <nav aria-label={dict.nav.primaryNav} className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={`/${locale}#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`tap-target-expand group/link relative inline-block py-1 transition-colors ${
                      isActive ? "text-foreground" : "text-foreground-secondary hover:text-foreground"
                    }`}
                  >
                    {dict.nav[link.labelKey]}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-orange transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleToggle locale={locale} label={dict.nav.languageLabel} />
          <ThemeToggle label={dict.nav.themeLabel} />
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="tarc-cta-glow flex min-h-11 items-center rounded-md bg-orange px-4 text-sm font-medium text-[#431407] hover:bg-orange-hover"
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.28, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
          >
            <div className="flex h-[var(--nav-height)] items-center justify-between px-6">
              <span className="tarc-logotype text-lg">
                TARC <span className="text-orange">Tech</span>
              </span>
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
                className="tarc-cta-glow block w-full rounded-md bg-orange px-4 py-3 text-center font-medium text-[#431407] hover:bg-orange-hover"
              >
                {dict.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
