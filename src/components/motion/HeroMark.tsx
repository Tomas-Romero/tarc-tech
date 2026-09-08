"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useAnimationFrame,
} from "motion/react";
import { isotipoGroups } from "./isotipo-paths";

// Assembly choreography (PLAN §6.2): the crossbar+wings drop in from a
// diagonal first, the stem rises into place next, then both chevrons close
// in from the sides together. Spring physics (not a tween) so each piece
// settles with a small, tactile overshoot — metal easing into place, not a
// slide that stops on cue.
const SPRING = { type: "spring" as const, stiffness: 140, damping: 13, mass: 1 };

const ENTRANCE = {
  crossbar: {
    initial: { x: -60, y: -46, opacity: 0, rotate: -6 },
    animate: { x: 0, y: 0, opacity: 1, rotate: 0 },
    transition: { ...SPRING, delay: 0 },
  },
  stem: {
    initial: { y: 70, opacity: 0, scaleY: 0.85 },
    animate: { y: 0, opacity: 1, scaleY: 1 },
    transition: { ...SPRING, delay: 0.16 },
  },
  chevronLeft: {
    initial: { x: -70, opacity: 0, rotate: -10 },
    animate: { x: 0, opacity: 1, rotate: 0 },
    transition: { ...SPRING, delay: 0.3 },
  },
  chevronRight: {
    initial: { x: 70, opacity: 0, rotate: 10 },
    animate: { x: 0, opacity: 1, rotate: 0 },
    transition: { ...SPRING, delay: 0.3 },
  },
};

// Per-group idle-parallax depth: chevrons read as closer/foreground, so they
// drift a little more than the crossbar/stem once assembly finishes.
const PARALLAX_DEPTH = {
  crossbar: 5,
  stem: 5,
  chevronLeft: 11,
  chevronRight: 11,
};

export function HeroMark({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [assembled, setAssembled] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<SVGAnimateElement>(null);
  const chevronsSettled = useRef(0);

  useEffect(() => {
    setHasFinePointer(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  // Fires once BOTH chevrons (the last piece to lock) have actually settled
  // — event-driven off Motion's own callback, not a guessed timeout, so the
  // heat shimmer + glow always land exactly when the mark finishes, spring
  // physics or not.
  function onChevronSettled() {
    chevronsSettled.current += 1;
    if (chevronsSettled.current !== 2) return;
    setAssembled(true);
    shimmerRef.current?.beginElement();
  }

  useEffect(() => {
    if (reduceMotion) setAssembled(true);
  }, [reduceMotion]);

  // Normalized [-1, 1] pointer offset from the mark's own center.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 18 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!hasFinePointer || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  // No fine pointer (touch/mobile): drift slowly and automatically instead.
  useAnimationFrame((t) => {
    if (hasFinePointer || reduceMotion) return;
    rawX.set(Math.sin(t / 3000) * 0.5);
    rawY.set(Math.cos(t / 4000) * 0.5);
  });

  const parallax = {
    crossbar: {
      x: useTransform(springX, (v) => v * PARALLAX_DEPTH.crossbar),
      y: useTransform(springY, (v) => v * PARALLAX_DEPTH.crossbar),
    },
    stem: {
      x: useTransform(springX, (v) => v * PARALLAX_DEPTH.stem),
      y: useTransform(springY, (v) => v * PARALLAX_DEPTH.stem),
    },
    chevronLeft: {
      x: useTransform(springX, (v) => v * PARALLAX_DEPTH.chevronLeft),
      y: useTransform(springY, (v) => v * PARALLAX_DEPTH.chevronLeft),
    },
    chevronRight: {
      x: useTransform(springX, (v) => v * PARALLAX_DEPTH.chevronRight),
      y: useTransform(springY, (v) => v * PARALLAX_DEPTH.chevronRight),
    },
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      <svg viewBox="0 0 680 680" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="hero-mark-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-orange-deep)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-orange-deep)" stopOpacity="0" />
          </radialGradient>

          {/* Heat-shimmer (North Star: "la forja facetada" — metal caliente
              sobre grafito frío). A single displacement pulse, begun
              imperatively the instant the last piece settles — not looped,
              not decorative background noise. */}
          {!reduceMotion && (
            <filter
              id="hero-mark-shimmer"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.05"
                numOctaves="2"
                seed="7"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              >
                <animate
                  ref={shimmerRef}
                  attributeName="scale"
                  values="0;26;0"
                  dur="0.7s"
                  begin="indefinite"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.16 1 0.3 1; 0.7 0 0.84 0"
                  keyTimes="0; 0.3; 1"
                />
              </feDisplacementMap>
            </filter>
          )}
        </defs>

        <motion.circle
          cx="340"
          cy="340"
          r="260"
          fill="url(#hero-mark-glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: assembled && !reduceMotion ? [0, 0.7, 0] : 0 }}
          transition={{ duration: 0.5, times: [0, 0.35, 1] }}
        />

        <g filter={reduceMotion ? undefined : "url(#hero-mark-shimmer)"}>
          {(
            [
              ["crossbar", isotipoGroups.crossbar],
              ["stem", isotipoGroups.stem],
              ["chevronLeft", isotipoGroups.chevronLeft],
              ["chevronRight", isotipoGroups.chevronRight],
            ] as const
          ).map(([key, content]) => (
            <motion.g key={key} style={parallax[key]}>
              <motion.g
                initial={reduceMotion ? { opacity: 0 } : ENTRANCE[key].initial}
                animate={reduceMotion ? { opacity: 1 } : ENTRANCE[key].animate}
                transition={
                  reduceMotion
                    ? { duration: 0.4, ease: "easeOut" }
                    : ENTRANCE[key].transition
                }
                onAnimationComplete={
                  key === "chevronLeft" || key === "chevronRight"
                    ? onChevronSettled
                    : undefined
                }
              >
                {content}
              </motion.g>
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  );
}
