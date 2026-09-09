---
target: src/app/[locale]/page.tsx (homepage)
total_score: 29
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\Lenovo\\Documents\\Programacion\\Proyectos\\TARC Tech\\src\\app\\[locale]\\page.tsx"
target_fingerprint: "sha256:631e46a018fa10ee1d33fa2eb72737680470b802cc1c5f05b09b1b7b75132ce7"
target_path: "C:\\Users\\Lenovo\\Documents\\Programacion\\Proyectos\\TARC Tech\\src\\app\\[locale]\\page.tsx"
timestamp: 2026-09-08T21-00-12Z
slug: src-app-locale-page-tsx
closed: true
---
Method: dual-agent (A: aae0648b916ad0102 · B: a3c70fa072cb20755)

## Design Health Score
Heuristics 7 and 10 scored n/a (Persuade landing, no power-user path, FAQ absorbs docs role). Applicable max = 32.

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Nav never highlights current section on this long single-page scroll |
| 2 | Match System / Real World | 4 | Plain rioplatense Spanish, concrete examples, zero jargon |
| 3 | User Control and Freedom | 3 | Services pinned horizontal scroll is scroll-hijacking while active on desktop |
| 4 | Consistency and Standards | 3 | Process step-badges are filled circles — DESIGN.md bans "burbujas" |
| 5 | Error Prevention | 4 | No forms to fill wrong; FAQ preempts real objections |
| 6 | Recognition Rather Than Recall | 4 | Every WhatsApp CTA pre-filled with exactly what prompted it |
| 7 | Flexibility and Efficiency | n/a | No power-user path expected on this surface |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained, one idea per block, disciplined palette |
| 9 | Error Recovery | 4 | No error states exist to fail (static site) |
| 10 | Help and Documentation | n/a | FAQ covers this role |
| Total | | 29/32 (91%) | Excellent band |

## Design Specificity Verdict
Genuinely authored, not a reskin. Hero isotipo assembly (spring physics + heat-bloom + turbulence shimmer) mirrored by FooterBrand's cropped wordmark stamp — one authored bookend spanning the page. Per-section pre-filled WhatsApp messages and real rioplatense copy voice make this un-repointable to another freelancer via find-and-replace.

Deterministic scan: impeccable detect --json src came back clean, zero findings, exit 0, across 46 files. Browser overlay surfaced findings across 5 views, but every substantive one was a false positive on verification:
- dark-glow: confirmed to be the detector flagging its own injected banner's status-dot glow.
- cramped-padding on final-CTA WhatsApp link: uses min-h-14 items-center flex-centering, not actually cramped.
- body-text-viewport-edge x4 on mobile (Services cards "off-screen"): independently re-verified — false positive. Mobile Services is a working overflow-x-auto horizontal carousel (scrollWidth 1644 vs clientWidth 375); scrolling it 348px brings card 2 fully into view as designed. Detector can't see overflow-auto scrollability.
- repeating-stripes-gradient (advisory): real, 5% opacity hero crosshatch texture — restrained, plausibly intentional, borderline not a defect.

No code-level structural defects survived verification.

## Overall Impression
Best moments are real craft: hero/footer motion bookend, context-aware WhatsApp CTAs, disciplined palette. Biggest gap: Proyectos (the intended strongest trust signal) is currently the weakest section because every screenshot is a placeholder.

## What's Working
1. Hero/footer motion bookend — spring-physics assembly + heat-bloom + turbulence shimmer, mirrored by a giant cropped wordmark stamp at the document's bottom edge.
2. Context-aware WhatsApp CTAs — every CTA's pre-filled message says exactly what prompted it.
3. Content honesty as a design discipline — no fabricated logos/testimonials, honest "En desarrollo" badge, conditional profile links. Zero automated findings corroborates the same care in code.

## Priority Issues

[P0] Projects section shows placeholder mockups on every card, contradicting the site's own #1 design principle.
Why it matters: PRODUCT.md states a real screenshot convinces more than adjectives, and a section that can't show something real should be shortened. Proyectos currently has zero real proof at the moment a skeptical visitor forms their "is this guy legit" judgment.
Fix: Get real (redacted if needed) screenshots into project.images before shipping as finished; otherwise shorten the section per the same principle.
Suggested command: /impeccable harden

[P1] Hero's signature motion moment plays below the fold on mobile, hiding it from the primary audience.
Why it matters: mid-range phone is the named judge, one-handed, sub-minute session. The hero mark assembly is the one deliberate exception to "movement explains," but at 375x812 headline+subtitle+two CTAs+signature fill the whole first viewport.
Fix: Tighten mobile hero vertical rhythm or reorder mark-above-text on small screens so the assembly plays within the first fold.
Suggested command: /impeccable layout

[P1] "En desarrollo" status badge fails WCAG AA contrast in light theme.
Why it matters: --tarc-cyan #06b6d4 at 12px on white/#fafafa computes to ~2.4:1, under the 4.5:1 AA floor. PRODUCT.md commits to AA and already mitigated this exact risk for orange, but not for cyan.
Fix: Add a darker cyan token (~cyan-700, #0E7490) for text/border-on-light use, mirroring the orange pattern.
Suggested command: /impeccable harden

[P2] Trust section is a thin beat right after the hero's peak, running an infinite marquee for only 2 real clients.
Why it matters: two grey wordmarks in empty space reads as blank, not evidence, right after the site's boldest moment. The marquee (mobile only, correctly gated) implies a stream of clients that doesn't match having only 2.
Fix: Give the two names more visual presence and reconsider the marquee for just 2 items.
Suggested command: /impeccable polish

[P2] Process timeline's step-number badges are filled circles, contradicting DESIGN.md's own explicit rule against "burbujas."
Why it matters: repeated 5 times, it's the system disagreeing with its own written rule in its most-repeated small component.
Fix: Swap for an angular shape consistent with the isotipo's geometry.
Suggested command: /impeccable polish

## Persona Red Flags

Jordan (confused first-timer): never sees the hero forge-assembly before scrolling past it on phone; reaches Proyectos expecting proof and finds placeholders; Trust bar may not register as evidence given fast skim.

Riley (stress tester): finds the cyan AA contrast failure; notices Process badges contradict DESIGN.md's own rule; tried to break the Services mobile carousel as a scroll-hijack edge case — confirmed it's a correct, functional swipe carousel, not broken.

Casey (distracted mobile user): WhatsApp FAB only appears ~60% of a viewport past the hero; substantial scroll investment before reaching any evidence.

## Minor Observations
- Reduced-motion coverage is unusually thorough across every motion component.
- WhatsApp FAB correctly uses WhatsApp green per DESIGN.md's one sanctioned exception.
- CTA pair styling (solid vs outline) is consistent everywhere.
- Solutions ships as expanded panels + sticky rail rather than the accordion DESIGN.md's Components section still documents — a deliberate later call, but DESIGN.md is stale there.

## Questions to Consider
1. Does shipping Proyectos with placeholder cards actively work against "proof before promise," or is an honest placeholder state still better than hiding the section?
2. If the hero's forge-assembly is the one deliberate exception to "movement explains" but plays below the fold on mobile, is the brand introducing itself to most visitors or only to desktop reviewers?
3. With only two real clients, is a looping marquee the honest choice, or does it ask for more theater than the evidence supports?
