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
//
// The spotlight itself never repaints: the gradient is a fixed background
// drawn once, centered on the blob, and the blob only ever moves via
// `transform` (a plain percentage translate of its own inset-0 box) — the
// original version rebuilt the `radial-gradient(...at x% y%...)` string on
// every spring tick, which is a paint-layer cost on every frame the cursor
// moves. This version costs the compositor only.
export function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Off-center on purpose: a dead-centered spotlight is the generic default.
  // Values are "percent across the container," matching the old API, but
  // now consumed as a transform offset from center (see translateX/Y below).
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

  // Percentage transforms resolve against the element's own box — since the
  // blob is `inset-0` (always exactly the container's size), "-50%" here
  // means "shift left by half the container's width," so the math lines up
  // exactly with the old "x% of container" mouse tracking with no size
  // measurement of our own to keep in sync on resize.
  const translateX = useTransform(x, (v) => `${v - 50}%`);
  const translateY = useTransform(y, (v) => `${v - 50}%`);

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
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          x: reduceMotion ? "0%" : translateX,
          y: reduceMotion ? "0%" : translateY,
          background: reduceMotion
            ? "none"
            : "radial-gradient(560px 380px at 50% 50%, var(--color-orange-deep) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
