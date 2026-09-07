# TARC Tech — Brand Guidelines
*Software Development & Automation*

Final brand system, consolidated for handoff to design or development tools (Claude Code, Claude Cowork, Figma, etc.). Machine-readable versions of the same data live alongside this file: `tokens.json` and `tokens.css`.

---

## 1. Isotipo

**This is final, user-supplied artwork — not redrawn or reinterpreted.** `logo/isotipo-gradient.svg` and `logo/isotipo-gradient-reference.png` are used exactly as provided. Every other file in `/logo` (lockups, size exports, color variants) is generated directly from this SVG — resized or recolored, never redrawn.

**Meaning:** the core node. Represents connectivity, structure, and automation — a faceted "T" built from angular ribbon shapes: a wide arrow-shaped crossbar, two pointed accent flags, a two-strand stem converging to a point, flanked by two faceted angle-bracket chevrons (`<` `>`).

**Files provided** (`/logo`):
| File | Description |
|---|---|
| `isotipo-gradient.svg` | **Source of truth.** The exact file provided — untouched. |
| `isotipo-gradient-reference.png` | The exact reference PNG provided — untouched, kept for comparison. |
| `isotipo-solid-orange.svg` | Derived: flat `#F97316`, every facet the same color — for contexts that don't support many-color SVGs. |
| `isotipo-mono-black.svg` | Derived: flat `#18181B` silhouette — light backgrounds / single-color print. |
| `isotipo-mono-white.svg` | Derived: flat `#FAFAFA` silhouette — dark backgrounds / reversed use. |
| `png/isotipo-{16,32,64,128,256,512,1024}.png` | Transparent PNG exports of the gradient version, rasterized directly from the source SVG. |
| `png/isotipo-solid-orange-{32,128,512}.png`, `png/isotipo-mono-black-{…}.png`, `png/isotipo-mono-white-{…}.png` | Same size set for the derived variants. |
| `png/favicon.ico` | 16/32/64 multi-resolution favicon. |

**Construction rules:**
- Minimum size: 40px — this mark has fine facet detail and needs more room than a simple icon. Below that, use the mono silhouette or icon-only lockup, never the full lockup.
- Clear space: leave padding on every side at least equal to the width of one chevron arm.
- Do not recolor individual facets independently, stretch non-uniformly, rotate, or add effects beyond what's specified.

---

## 2. Logo Lockups

| File | Use |
|---|---|
| `lockup-horizontal-light.svg` / `.png` | Icon + wordmark side by side, for light surfaces. Standard/primary lockup. |
| `lockup-horizontal-dark.svg` / `.png` | Same, on a dark (`#09090B`) surface. |
| `lockup-vertical-light.svg` / `.png` | Icon above wordmark, compact — app splash screens, social profile headers. |
| `lockup-vertical-dark.svg` / `.png` | Same, dark surface. |
| `wordmark.svg` / `.png` | Text only, no icon — for contexts where the icon appears separately. |

These lockups embed the exact isotipo geometry (same paths as the source file, just scaled) plus the wordmark set in real Sansation Bold. They render correctly with no external font file needed for the icon; for the wordmark text to display as Sansation in a browser, load the Google Fonts import below (the lockup SVGs reference `font-family: Sansation` and fall back to Arial if it isn't loaded).

---

## 3. Typography System

**Load once, everywhere:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sansation:ital,wght@0,400;0,700;1,700&family=Fira+Sans:ital,wght@0,400;0,500;0,700&family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&display=swap" rel="stylesheet">
```
All three families are confirmed on Google Fonts — no self-hosting needed.

| Role | Family | Weight(s) | Notes |
|---|---|---|---|
| **Logotype** | Sansation | Bold (700) | Used *exclusively* for the "TARC Tech" wordmark — never for body or UI text. Designer: Bernd Montag, OFL license. |
| **Headings (H1–H3)** | Fira Sans | Bold (700) | |
| **Body / UI text** | Fira Sans | Regular (400), Medium (500) | High legibility in code and UI environments. Designer: Carrois Apostrophe / Mozilla, OFL license. |
| **Accent / contrast / keywords** | Fraunces — italic or roman | Weight ~500, optical size ~24–72 | A serif gives real typographic contrast against the two sans faces. Use italic for pull quotes and taglines (e.g. *"Automation that moves at the speed of thought."*), and roman (upright) for keyword highlights that shouldn't slant. Variable font — the "wonky" axis adds character at display sizes. |
| **Code / data** | JetBrains Mono | Regular, Medium | |

**Why a serif accent:** Sansation and Fira Sans are both geometric/humanist sans faces — pairing either with *their own* italic gives contrast in angle only. A distinct serif (Fraunces) gives contrast in structure (serifs vs. sans, stroke modulation vs. even weight), reading as a deliberate second voice for quotes and emphasis rather than plain styling.

---

## 4. Color Palette

### Primary orange set
| Swatch | Hex | Role |
|---|---|---|
| 🟧 | `#F97316` | **Primary base** — logo, primary buttons, active states. Use dark text (`#18181B`, or `#431407` for warmer contrast) on top — **white text fails contrast on this orange (~2.9:1)**. |
| 🟧 | `#EA580C` | **Hover / focus** — interactive states for buttons and links. |
| 🟨 | `#FFEDD5` | **Soft background** — alert/badge backgrounds in light mode. |
| 🟤 | `#C2410C` | **Glow / shadow / links** — shadows in dark mode, prominent link text color, and the button fill to use *if* white button text is required. |

### Complementary accents
| Swatch | Hex | Role |
|---|---|---|
| 🟦 | `#06B6D4` | **Technical cyan** — code variables, charts, secondary technical icons. Never a primary action color. |
| 🟩 | `#10B981` | **Success green** — semantic only: successful operations, system-online status. Never decorative. |

### Dark mode surfaces
| Swatch | Hex | Role |
|---|---|---|
| ⬛ | `#09090B` | Main background |
| ⬛ | `#18181B` | Surfaces — cards, nav |
| ⬛ | `#27272A` | Borders & dividers |
| ⬜ | `#FAFAFA` | Primary text |
| ⬜ | `#A1A1AA` | Secondary text |

### Light mode surfaces
| Swatch | Hex | Role |
|---|---|---|
| ⬜ | `#FAFAFA` | Main background |
| ⬜ | `#FFFFFF` | Surfaces |
| ⬜ | `#E4E4E7` | Borders |
| ⬛ | `#18181B` | Primary text |
| ⬛ | `#52525B` | Secondary text |

---

## 5. Component Reference

- **Primary action button:** `#F97316` fill, dark text, `border-radius: 8px`.
- **Text link:** `#C2410C` colored text, no underline by default.
- **Alert badge:** `#FFEDD5` fill (light mode) / `#09090B` fill with colored text (dark mode), pill radius.
- **System-online badge:** `#10B981` dot or text on dark surface.
- **Sync/info badge:** `#06B6D4` accent on dark surface.
- **Dark mode card:** `#18181B` surface, `#27272A` border, `#FAFAFA` primary text, `#A1A1AA` secondary text.
- **Light mode card:** `#FFFFFF` surface, `#E4E4E7` border, `#18181B` primary text, `#52525B` secondary text.
- **Code block:** dark surface, `JetBrains Mono`, syntax highlighting using `#06B6D4` for identifiers/keywords and `#F97316`/`#EA580C` sparingly for emphasis only.

---

## 6. Files in this handoff

```
tarc-tech/
├── brand-guidelines.md      ← this file
├── tokens.json              ← machine-readable tokens (colors, type, radii)
├── tokens.css               ← CSS custom properties + Google Fonts import, ready to import
└── logo/
    ├── isotipo-gradient.svg              ← SOURCE OF TRUTH, untouched
    ├── isotipo-gradient-reference.png    ← original reference PNG, untouched
    ├── isotipo-solid-orange.svg / -mono-black.svg / -mono-white.svg   ← derived
    ├── lockup-horizontal-{light,dark}.svg
    ├── lockup-vertical-{light,dark}.svg
    ├── wordmark.svg
    └── png/  (all of the above rasterized, plus favicon.ico)
```

**For Claude Code / Cowork:** load `tokens.css` (brings in colors, radii, and the three Google Fonts in one `@import`) plus `tokens.json` for anything that needs the raw values. Use `/logo` assets directly — the gradient SVG is safe to drop straight into a page or component. The button-contrast rule in §4 and the "never redraw the isotipo" note in §1 are the two hard constraints; everything else (layout, copy, page structure) is open.
