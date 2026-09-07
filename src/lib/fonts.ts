import { Sansation, Fira_Sans, Fraunces } from "next/font/google";

// Self-hosted via next/font at build time — DESIGN.md forbids a <link>/@import
// to Google Fonts at runtime. Roles per DESIGN.md §Typography:
// Sansation = logotype only, Fira Sans = everything else, Fraunces = rare accent.

export const sansation = Sansation({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
  variable: "--font-sansation",
  display: "swap",
});

export const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
  variable: "--font-fira-sans",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

export const fontVariables = `${sansation.variable} ${firaSans.variable} ${fraunces.variable}`;
