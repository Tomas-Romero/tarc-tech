---
target: Hero section
total_score: 27
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 0
target_identity: "file:C:\\Users\\Lenovo\\Documents\\Programacion\\Proyectos\\TARC Tech\\src\\components\\sections\\Hero.tsx"
target_fingerprint: "sha256:e383dc33a26f59964408d66bed9aa49b8630b7738af9226caacd967e8904d465"
target_path: "C:\\Users\\Lenovo\\Documents\\Programacion\\Proyectos\\TARC Tech\\src\\components\\sections\\Hero.tsx"
timestamp: 2026-09-07T23-55-47Z
slug: src-components-sections-hero-tsx
closed: true
---
Method: dual-agent (A: a7cc231c9a5e8ad48 - B: aef83ffcf1a5928fb)

# Critique - Hero Section (TARC Tech)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Hover/focus clear; nothing else needs status here |
| 2 | Match System / Real World | 4 | Rioplatense voice, no jargon |
| 3 | User Control and Freedom | 3 | Two CTAs give a real alternate path |
| 4 | Consistency and Standards | 3 | Buttons match DESIGN.md primary/secondary spec exactly |
| 5 | Error Prevention | 4 | No inputs in this surface |
| 6 | Recognition Rather Than Recall | 4 | Self-evident, no memory burden |
| 7 | Flexibility and Efficiency | n/a | Marketing hero - no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 2 | Mobile ordering inverts hierarchy (see P0) |
| 9 | Error Recovery | 4 | No error states possible here |
| 10 | Help and Documentation | n/a | Not applicable to a landing hero |
| Total | | 27/32 | Good (84%) |

## Design Specificity Verdict

LLM assessment (Assessment A): Genuinely authored, not category-interchangeable. The faceted isotipo assembly, the event-driven heat-shimmer, and the light-theme treatment all read as bespoke to TARC Tech's "forja facetada" identity.

Deterministic scan (Assessment B): The static CLI detector came back clean. The browser-injected detector flagged 2 anti-patterns on HeroBackground.tsx: radial-halo and codex-grid-background.

Tension: Assessment A praised this background as restrained/specific; Assessment B's detector flags its shape as generic regardless of brand color. Both true at once - brief-authorized (DESIGN.md/PLAN S6.2 explicitly call for it), not a mistake, but worth a distinctiveness pass on execution.

Visual overlays: injection succeeded and produced console findings, but no persistent overlay is open now - Assessment B closed its tab as part of cleanup.

## Overall Impression

Desktop is the strongest version of this hero - the assembly lands as a genuine "wow" beside a legible message. Mobile falls apart: flex-col-reverse puts the 450px animated mark above the headline, so the primary audience scrolls past a wordless animation before reaching the sentence that tells her what this is.

## What's Working

- Event-driven shimmer trigger (HeroMark.tsx onChevronSettled): fires off Motion's actual onAnimationComplete, not a guessed timeout.
- Light theme: verified live, has its own warm ground and glow tint, not a dimmed dark mode.
- Restraint in HeroBackground.tsx: grid at 7% opacity, glow at 30%, degrades correctly under reduced motion and touch.

## Priority Issues

[P0] Mobile buries the value proposition below the fold. Hero.tsx's flex-col-reverse renders the ~450px HeroMark before the text block on 375x812; H1 doesn't clear the fold. Contradicts PRODUCT.md's own judge ("el celular de gama media es el juez") and the 30-second-comprehension mandate. Fix: shrink mobile mark footprint and/or stop reversing stack order below md. Suggested command: /impeccable adapt.

[P2] Grid+glow background pattern-matches a generic AI-landing-page tell. Flagged by browser detector as codex-grid-background + radial-halo. Brief-authorized, but a uniform checkerboard + centered glow is a stock shape. Fix: break grid uniformity (irregular/faceted spacing echoing the isotipo's low-poly facets) or bias the glow off-center. Suggested command: /impeccable delight or /impeccable bolder.

[P2] English hero never uses the Fraunces accent. en.json's titleParts has no accent segment; DESIGN.md's "Fraunces once per section" rule goes unused in /en. Fix: add an accented phrase to the EN title. Suggested command: /impeccable typeset.

[P3] Dead, contradictory utility classes. Hero.tsx: className="tarc-accent-text not-italic italic" stacks conflicting Tailwind italic utilities on top of the class's own font-style. Fix: delete both utility classes. Suggested command: /impeccable polish.

## Persona Red Flags

Jordan (confused first-timer): sees an unlabeled orange shape assembling with no words on load.

Casey (distracted mobile user): must scroll past ~450px of animation before reaching the sentence that tells her what this is.

Riley (stress tester): at ~785px width, Nav's "Sobre mi" wraps mid-phrase and crowds the ES/EN toggle (Nav.tsx, adjacent to Hero, out of strict scope).

## Minor Observations

- Signature line is a quiet, effective trust cue in both languages.
- Nav wrap issue at ~785px worth a dedicated /impeccable adapt pass on Nav.tsx.
- Unused preload warning for brand/isotipo.svg and expected WHATSAPP_PHONE-not-set warnings, not defects.

## Questions to Consider

- Should the assembly ever be allowed to displace the headline on mobile, or must it always run beside/behind the text?
- Is a multi-second spring assembly right for a sub-minute mobile session, or would a snappier version serve Jordan/Casey without losing Riley's desktop wow?
