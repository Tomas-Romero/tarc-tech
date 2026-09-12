type IconProps = { className?: string };

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M4 12.5c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.15 0-2.24-.24-3.23-.68L4 21l1.3-4.4A7.96 7.96 0 0 1 4 12.5Z" />
    </svg>
  );
}

export function RegisterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M3.5 20.5V10l3-4.5h11l3 4.5v10.5z" />
      <path d="M3.5 10h17" />
      <path d="M9 14h6" />
      <path d="M9 17.5h3" />
    </svg>
  );
}

export function StorefrontIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M4 10v10.5h16V10" />
      <path d="M2.5 10 4.6 4.5h14.8L21.5 10a3 3 0 0 1-5.8.9 3 3 0 0 1-5.8 0 3 3 0 0 1-5.8-.9Z" />
      <path d="M9.5 20.5V15h5v5.5" />
    </svg>
  );
}

export function TrayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M3 15.5h18a6.5 6.5 0 0 0-6.5-6.5h-5A6.5 6.5 0 0 0 3 15.5Z" />
      <path d="M2 19h20" />
      <path d="M12 9V5.5" />
      <path d="M10 5.5h4" />
    </svg>
  );
}

export function BrowserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9.5h18" />
      <path d="M6.5 7h2" />
      <path d="M7 13.5h7" />
      <path d="M7 16.5h4" />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M13.5 2.5 5 13.5h5.5L9.5 21.5 19 10.5h-6z" />
    </svg>
  );
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M13.5 5.5h5v5M18 6l-7.5 7.5" />
      <path d="M18.5 14v4.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 6 5.5h4.5" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M5 9.5l7 6 7-6" />
    </svg>
  );
}

export function CodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M8.5 7.5 3.5 12l5 4.5M15.5 7.5l5 4.5-5 4.5M13.5 5.5l-3 13" />
    </svg>
  );
}

export function WorkflowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <rect x="3" y="4" width="6" height="5" rx="1" />
      <rect x="15" y="4" width="6" height="5" rx="1" />
      <rect x="9" y="15" width="6" height="5" rx="1" />
      <path d="M6 9v3a2 2 0 0 0 2 2h1M18 9v3a2 2 0 0 1-2 2h-1M12 15v-1" />
    </svg>
  );
}

export function SmartphoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.2" />
      <path d="M10.5 18.5h3" />
    </svg>
  );
}

export function CloudIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M7 18.5a4.5 4.5 0 0 1-.5-8.98A5.5 5.5 0 0 1 17.2 8.3 4 4 0 0 1 17 16.5v0" />
      <path d="M7 18.5h10" />
    </svg>
  );
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M12 3a9 8 0 1 0 0 16c1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8h2.1c1.8 0 3.3-1.5 3.3-3.3C19.5 5.8 16.1 3 12 3Z" />
      <circle cx="7.7" cy="10.3" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.8" cy="6.8" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// The five "Cómo trabajamos" step icons — one per step, none reused
// elsewhere on the site, so the timeline reads as its own small set.

export function EarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M8.5 13.5c0-3.9 2.5-7 6-7s5.5 2.8 5.5 6c0 2.6-1.6 3.6-2.7 4.7-.8.8-1.3 1.6-1.3 2.8a2.3 2.3 0 0 1-4.6 0v-.7" />
      <path d="M8.5 13.5c0 2 .7 3 2 4" />
      <path d="M12.5 9.8c1.4 0 2.5 1.2 2.5 3" />
    </svg>
  );
}

export function LightbulbIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6.5 6.5 0 0 0-3.8 11.8c.5.4.8 1 .8 1.7v.5h6v-.5c0-.7.3-1.3.8-1.7A6.5 6.5 0 0 0 12 3Z" />
      <path d="M12 6.5c-1.7 0-3 1.3-3 3" />
    </svg>
  );
}

export function HammerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M13.5 6.5 17 3l4 4-3.5 3.5" />
      <path d="M15 5 8 12" />
      <rect
        x="2.5"
        y="14.5"
        width="4.5"
        height="10"
        rx="1"
        transform="rotate(-45 4.75 19.5)"
      />
      <path d="M10.5 10 3 17.5" />
    </svg>
  );
}

export function RocketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M12 2.5c2.5 1.6 4 4.6 4 8.5 0 2.7-.7 4.8-1.4 6.2h-5.2C8.7 15.8 8 13.7 8 11c0-3.9 1.5-6.9 4-8.5Z" />
      <circle cx="12" cy="10" r="1.6" />
      <path d="M9.4 17.2 7 21l2.8-1.2" />
      <path d="M14.6 17.2 17 21l-2.8-1.2" />
      <path d="M8 13.5c-1.8.5-2.8 1.8-3 4 1.9.3 3.3-.4 4-1.7" />
      <path d="M16 13.5c1.8.5 2.8 1.8 3 4-1.9.3-3.3-.4-4-1.7" />
    </svg>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M12 3.5 5 6v5.5c0 4.6 2.9 7.8 7 9 4.1-1.2 7-4.4 7-9V6Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6.5 8-6.5" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden>
      <path d="M12 21.5c4-4 7-7.9 7-11.5a7 7 0 1 0-14 0c0 3.6 3 7.5 7 11.5Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
