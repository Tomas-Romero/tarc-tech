"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  useReducedMotion,
  motion,
} from "motion/react";

// Subtle technical grid + a soft orange spotlight that follows the cursor
// (desktop) or drifts slowly on its own (mobile / no fine pointer). PLAN
// §6.2: "una grilla técnica sutil ... con un gradiente naranja que
// reacciona a la posición del mouse (en mobile, movimiento lento automático)."
export function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Off-center on purpose: a dead-centered spotlight is the generic default.
  const rawX = useMotionValue(38);
  const rawY = useMotionValue(32);
  const x = useSpring(rawX, { stiffness: 40, damping: 20 });
  const y = useSpring(rawY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduceMotion) return;
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!hasFinePointer) return;

    function onMove(e: MouseEvent) {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(((e.clientX - rect.left) / rect.width) * 100);
      rawY.set(((e.clientY - rect.top) / rect.height) * 100);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion, rawX, rawY]);

  useAnimationFrame((t) => {
    if (reduceMotion) return;
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (hasFinePointer) return;
    rawX.set(38 + Math.sin(t / 5000) * 14);
    rawY.set(32 + Math.cos(t / 6000) * 10);
  });

  // An ellipse, not a circle — a perfectly round centered spotlight is the
  // generic default this is deliberately avoiding.
  const background = useTransform([x, y], ([xv, yv]) =>
    reduceMotion
      ? "none"
      : `radial-gradient(640px 420px at ${xv}% ${yv}%, var(--color-orange-deep) 0%, transparent 60%)`
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Faceted lattice, not an orthogonal checkerboard — two diagonal line
          sets crossing at the isotipo's own angles ("aristas antes que
          blandura"), not the generic SaaS grid-background default. */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(55deg, var(--color-foreground-secondary) 0 1px, transparent 1px 64px), repeating-linear-gradient(-55deg, var(--color-foreground-secondary) 0 1px, transparent 1px 90px)",
        }}
      />
      <motion.div className="absolute inset-0 opacity-30" style={{ background }} />
    </div>
  );
}
