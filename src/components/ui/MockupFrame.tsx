import Image from "next/image";

// Browser frame built in CSS, never as an image (DESIGN.md §Components).
// Sober on purpose: one minimal bar, no decorative macOS traffic lights.
//
// When a project has no real screenshot yet, this shows a branded panel —
// never a fabricated or stock mockup (PLAN §0.3, §15 R5). `note` carries the
// honest line for a project that is still being built.
export function MockupFrame({
  src,
  alt,
  note,
}: {
  src?: string;
  alt?: string;
  note?: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <div className="flex h-7 items-center gap-1.5 border-b border-border px-3">
        <span className="h-1 w-10 rounded-full bg-border" />
        <span className="h-1 w-16 rounded-full bg-border" />
      </div>

      <div className="relative aspect-[16/10]">
        {src ? (
          <Image src={src} alt={alt ?? ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4">
            <Image
              // Solid orange rather than a mono silhouette: the watermark has
              // to read on both the light default and the dark theme.
              src="/brand/isotipo-solid-orange.svg"
              alt=""
              width={56}
              height={46}
              className="h-auto w-12 opacity-20"
            />
            {note && (
              <p className="text-center text-xs text-foreground-secondary">
                {note}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
