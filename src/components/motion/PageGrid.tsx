// One continuous diagonal lattice behind Hero…FAQ, not a copy per section.
// Each section previously drew its own patch of this pattern
// (HeroBackground, SectionBackdrop) — every section starts its background
// tiling fresh at its own top edge, so at every section boundary the
// diagonals jump out of phase with each other, a visible seam ("se nota
// mucho el corte"). One `absolute inset-0` layer, sized to its own wrapping
// container in page.tsx (Hero through Faq — not the final CTA's photo
// background, and not the footer, where Tomás doesn't want it showing),
// ties every section within that wrapper to the same unbroken pattern
// instead of each owning a misaligned piece of it.
export function PageGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-[0.09]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(55deg, var(--color-foreground-secondary) 0 1px, transparent 1px 64px), repeating-linear-gradient(-55deg, var(--color-foreground-secondary) 0 1px, transparent 1px 90px)",
      }}
    />
  );
}
