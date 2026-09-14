// One continuous diagonal lattice behind the whole page, not a copy per
// section. Each section previously drew its own patch of this pattern
// (HeroBackground, SectionBackdrop) — every section starts its background
// tiling fresh at its own top edge, so at every section boundary the
// diagonals jump out of phase with each other, a visible seam ("se nota
// mucho el corte"). `position: fixed` ties this single layer to the
// viewport instead of the document, so there is nothing to misalign: it
// never moves, and every section just shows through the same unbroken
// pattern rather than owning a piece of it.
export function PageGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.09]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(55deg, var(--color-foreground-secondary) 0 1px, transparent 1px 64px), repeating-linear-gradient(-55deg, var(--color-foreground-secondary) 0 1px, transparent 1px 90px)",
      }}
    />
  );
}
