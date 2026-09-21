import Image from "next/image";
import type { Service } from "@/data/services";
import { HeadsetIcon } from "@/components/ui/icons";

// One small demonstrative visual per service. Where Tomás supplied a real
// screenshot (`public/services`), that photo IS the visual — it already
// carries its own UI chrome, so it's shown as-is rather than wrapped in a
// second fake browser frame. The three services without one yet (software a
// medida, seguridad en cobros, soporte) fall back to a built mockup, same
// flat shapes (chrome bars, chips, tiles) the site already uses elsewhere,
// never a stock photo. Every service still gets a distinct little "scene" so
// the section reads as showing the work, not just naming it (Tomás's brief:
// "algo mas demostrativo").
export function ServiceVisual({ service }: { service: Service }) {
  if (service.image) {
    return (
      <Frame>
        <Image
          src={service.image}
          alt=""
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 90vw, 380px"
        />
      </Frame>
    );
  }

  switch (service.id) {
    case "custom-software":
      return <CodeVisual />;
    case "payment-security":
      return <PaymentVisual />;
    case "ongoing-support":
      return <SupportVisual />;
    default:
      return null;
  }
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-36 overflow-hidden rounded-md border border-border bg-background/60">
      {children}
    </div>
  );
}

// Editor mockup with syntax-highlight-style coloring (not just neutral gray
// bars) so it reads as "real code," not a generic wireframe placeholder —
// the one service this section can't show a client screenshot for, since
// the code itself IS the deliverable, not a UI to photograph.
function CodeVisual() {
  const LINE_TOKENS = [
    [{ w: 14, c: "text-orange-deep/70" }, { w: 22, c: "text-foreground-secondary/60" }],
    [{ w: 8, c: "text-cyan-deep/60" }, { w: 34, c: "text-foreground-secondary/50" }],
    [{ w: 46, c: "text-foreground-secondary/60" }],
    [{ w: 10, c: "text-orange-deep/70" }, { w: 12, c: "text-foreground-secondary/50" }, { w: 20, c: "text-green/60" }],
    [{ w: 30, c: "text-foreground-secondary/40" }],
    [{ w: 6, c: "text-cyan-deep/60" }, { w: 38, c: "text-foreground-secondary/55" }],
  ];
  return (
    <Frame>
      <div className="flex h-6 items-center gap-1.5 border-b border-border/70 px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="ml-2 rounded-sm bg-border/60 px-2 py-0.5 text-[8px] text-foreground-secondary">
          negocio.ts
        </span>
      </div>
      <div className="flex h-[calc(100%-1.5rem)] flex-col justify-center gap-2 px-4 font-mono">
        {LINE_TOKENS.map((tokens, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-3 shrink-0 text-right text-[7px] text-foreground-secondary/30">
              {i + 1}
            </span>
            {tokens.map((t, j) => (
              <span
                key={j}
                className={`h-1.5 rounded-full bg-current ${t.c}`}
                style={{ width: `${t.w}px` }}
              />
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

// Card + verified-lock composition, closer to a real checkout moment (brand
// stripe, masked line, amount) than the earlier bare wireframe rectangle.
function PaymentVisual() {
  return (
    <Frame>
      <div className="flex h-full items-center justify-center">
        <div className="relative h-[72px] w-32 overflow-hidden rounded-md border border-border bg-gradient-to-br from-surface to-background shadow-sm">
          <div className="h-2.5 w-full bg-gradient-to-r from-orange-deep to-orange" />
          <div className="p-2.5">
            <span className="block h-1.5 w-16 rounded-full bg-border" />
            <div className="mt-3 flex items-end justify-between">
              <span className="block h-1.5 w-10 rounded-full bg-border" />
              <span className="text-[8px] font-bold text-foreground-secondary">$$$$</span>
            </div>
          </div>
          <span className="absolute -right-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-green text-background">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="m5 12.5 4.5 4.5L19 7" />
            </svg>
          </span>
        </div>
      </div>
    </Frame>
  );
}

// Chat mockup with an avatar + timestamp, reading as a real support thread
// rather than two bare speech-bubble shapes.
function SupportVisual() {
  return (
    <Frame>
      <div className="flex h-full flex-col justify-center gap-2 px-4">
        <div className="flex items-end gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-border text-[7px] font-bold text-foreground-secondary">
            VOS
          </span>
          <span className="max-w-[70%] rounded-md rounded-bl-sm border border-border bg-surface px-3 py-1.5 text-[9px] text-foreground-secondary">
            ¿Se puede ajustar esto?
          </span>
        </div>
        <div className="flex items-end justify-end gap-2">
          <span className="max-w-[70%] rounded-md rounded-br-sm bg-orange px-3 py-1.5 text-[9px] font-medium text-[#431407]">
            Dale, lo vemos ahora
          </span>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-deep text-[7px] font-bold text-white">
            TR
          </span>
        </div>
        <span className="mt-1 flex items-center gap-1.5 pl-7 text-[9px] text-foreground-secondary">
          <HeadsetIcon className="h-3 w-3" />
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          En línea
        </span>
      </div>
    </Frame>
  );
}
