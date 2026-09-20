import type { Service } from "@/data/services";
import { ShieldCheckIcon, HeadsetIcon } from "@/components/ui/icons";

// One small demonstrative mockup per service — built from the same flat
// shapes (chrome bars, chips, tiles) the site already uses for its browser
// and phone frames elsewhere, never a stock photo or an invented product
// screenshot. Every service gets a distinct little "scene" so the section
// reads as showing the work, not just naming it (Tomás's brief: "algo mas
// demostrativo"), while staying inside DESIGN.md's own vocabulary — angular
// corners, zinc + a single orange accent, no bubbles or soft shadows.
export function ServiceVisual({ id }: { id: Service["id"] }) {
  switch (id) {
    case "custom-software":
      return <CodeVisual />;
    case "automation":
      return <AutomationVisual />;
    case "apps":
      return <AppsVisual />;
    case "saas":
      return <SaasVisual />;
    case "payment-security":
      return <PaymentVisual />;
    case "ongoing-support":
      return <SupportVisual />;
    case "business-web":
      return <WebVisual />;
    default:
      return null;
  }
}

// Shared chrome strip — the same "three dots + tab" language ProjectCard's
// browser mockup already uses, so every card in this row and the projects
// grid read as one consistent device-frame vocabulary.
function Chrome({ tint = false }: { tint?: boolean }) {
  return (
    <div className="flex h-6 items-center gap-1.5 border-b border-border/70 px-3">
      <span className={`h-1.5 w-1.5 rounded-full ${tint ? "bg-orange/50" : "bg-border"}`} />
      <span className={`h-1.5 w-1.5 rounded-full ${tint ? "bg-orange/50" : "bg-border"}`} />
      <span className={`h-1.5 w-1.5 rounded-full ${tint ? "bg-orange/50" : "bg-border"}`} />
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-36 overflow-hidden rounded-md border border-border bg-background/60">
      {children}
    </div>
  );
}

function CodeVisual() {
  const lines = [40, 70, 55, 85, 30, 62];
  return (
    <Frame>
      <Chrome />
      <div className="flex h-[calc(100%-1.5rem)] flex-col justify-center gap-2 px-4">
        {lines.map((w, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full ${i === 3 ? "bg-orange/70" : "bg-border"}`}
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </Frame>
  );
}

function AutomationVisual() {
  return (
    <Frame>
      <div className="flex h-full items-center justify-center gap-3 px-4">
        <div className="flex h-12 w-16 flex-col items-center justify-center gap-1 rounded-md border border-border bg-surface text-[9px] font-medium text-foreground-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground-secondary/50" />
          Evento
        </div>
        <span className="h-px w-6 border-t border-dashed border-orange-deep/60" />
        <div className="flex h-12 w-16 flex-col items-center justify-center gap-1 rounded-md border border-orange bg-orange/10 text-[9px] font-medium text-orange-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          Regla
        </div>
        <span className="h-px w-6 border-t border-dashed border-orange-deep/60" />
        <div className="flex h-12 w-16 flex-col items-center justify-center gap-1 rounded-md border border-border bg-surface text-[9px] font-medium text-foreground-secondary">
          <ShieldCheckIcon className="h-3.5 w-3.5 text-green" />
          Listo
        </div>
      </div>
    </Frame>
  );
}

function AppsVisual() {
  return (
    <Frame>
      <div className="relative flex h-full items-center justify-center">
        {/* Desktop window peeking behind, mobile frame in front — echoes
            "mobile y de escritorio" without needing two separate cards. */}
        <div className="absolute h-16 w-24 -translate-x-3 -translate-y-4 rounded-sm border border-border/70 bg-surface/80">
          <div className="flex h-3 items-center gap-1 border-b border-border/70 px-1.5">
            <span className="h-0.5 w-0.5 rounded-full bg-border" />
            <span className="h-0.5 w-0.5 rounded-full bg-border" />
          </div>
        </div>
        <div className="relative h-28 w-16 translate-x-3 rounded-lg border border-border bg-surface shadow-sm">
          <div className="mx-auto mt-1.5 h-1 w-4 rounded-full bg-border" />
          <div className="mt-3 space-y-1.5 px-2">
            <span className="block h-6 rounded-sm bg-orange/20" />
            <span className="block h-2 w-2/3 rounded-full bg-border" />
            <span className="block h-2 w-1/2 rounded-full bg-border" />
          </div>
        </div>
      </div>
    </Frame>
  );
}

function SaasVisual() {
  const bars = [40, 65, 50, 85];
  return (
    <Frame>
      <div className="flex h-full">
        <div className="flex w-8 flex-col items-center gap-2 border-r border-border/70 py-3">
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
        </div>
        <div className="flex flex-1 items-end gap-2 px-4 pb-4 pt-6">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`w-3.5 rounded-t-sm ${i === bars.length - 1 ? "bg-orange" : "bg-border"}`}
              style={{ height: `${h}%` }}
            />
          ))}
          <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-[9px] font-medium text-foreground-secondary">
            Plan Pro
          </span>
        </div>
      </div>
    </Frame>
  );
}

function PaymentVisual() {
  return (
    <Frame>
      <div className="flex h-full items-center justify-center">
        <div className="relative h-16 w-28 rounded-md border border-border bg-surface p-2">
          <span className="block h-2.5 w-6 rounded-sm bg-orange/50" />
          <span className="mt-3 block h-1 w-3/4 rounded-full bg-border" />
          <span className="mt-1.5 block h-1 w-1/2 rounded-full bg-border" />
          <span className="absolute -right-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-orange bg-background text-orange-deep">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="5" y="11" width="14" height="9" rx="1.5" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </span>
        </div>
      </div>
    </Frame>
  );
}

function SupportVisual() {
  return (
    <Frame>
      <div className="flex h-full flex-col justify-center gap-2 px-4">
        <span className="w-2/3 rounded-md rounded-bl-sm border border-border bg-surface px-3 py-1.5 text-[9px] text-foreground-secondary">
          ¿Se puede ajustar esto?
        </span>
        <span className="ml-auto w-2/3 rounded-md rounded-br-sm bg-orange px-3 py-1.5 text-[9px] font-medium text-[#431407]">
          Dale, lo vemos ahora
        </span>
        <span className="flex items-center gap-1.5 text-[9px] text-foreground-secondary">
          <HeadsetIcon className="h-3 w-3" />
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          En línea
        </span>
      </div>
    </Frame>
  );
}

function WebVisual() {
  return (
    <Frame>
      <Chrome tint />
      <div className="flex h-[calc(100%-1.5rem)] flex-col items-center justify-center gap-2.5 px-4">
        <span className="h-2 w-2/5 rounded-full bg-border" />
        <span className="h-1.5 w-3/5 rounded-full bg-border" />
        <span className="mt-1 rounded-md bg-orange px-4 py-1.5 text-[9px] font-medium text-[#431407]">
          Contactanos
        </span>
      </div>
    </Frame>
  );
}
