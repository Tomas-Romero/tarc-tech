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
import {
  isotipoArtwork,
  isotipoClips,
  isotipoOffset,
  isotipoViewBox,
} from "./isotipo-paths";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Motion thesis — "la forja facetada": the mark is struck into being, not
// slid into place. The brackets close first and frame the empty space, the
// crossbar drops into that frame, the stem rises to meet it, and the moment
// the last piece seats, the whole mark takes a heat pulse and the glow
// blooms and cools. Spring physics so each piece seats with real weight.
const SPRING = { type: "spring" as const, stiffness: 150, damping: 14, mass: 1 };

const ENTRANCE = {
  chevronLeft: {
    initial: { x: -150, opacity: 0, rotate: -14, scale: 0.9 },
    transition: { ...SPRING, delay: 0 },
  },
  chevronRight: {
    initial: { x: 150, opacity: 0, rotate: 14, scale: 0.9 },
    transition: { ...SPRING, delay: 0.06 },
  },
  crossbar: {
    initial: { y: -120, opacity: 0, rotate: -4 },
    transition: { ...SPRING, delay: 0.26 },
  },
  stem: {
    initial: { y: 110, opacity: 0, scaleY: 0.8 },
    transition: { ...SPRING, delay: 0.42 },
  },
} as const;

const SETTLED = { x: 0, y: 0, opacity: 1, rotate: 0, scale: 1, scaleY: 1 };

// The stem lands last, so it owns the impact moment.
const IMPACT_KEY = "stem";

// Idle parallax depth per group: the brackets read as nearest, so they lead.
const PARALLAX_DEPTH = {
  crossbar: 6,
  stem: 4,
  chevronLeft: 13,
  chevronRight: 13,
};

const GROUPS = [
  ["chevronLeft", isotipoClips.chevronLeft],
  ["chevronRight", isotipoClips.chevronRight],
  ["crossbar", isotipoClips.crossbar],
  ["stem", isotipoClips.stem],
] as const;

export function HeroMark({
  className,
  onAssembled,
}: {
  className?: string;
  onAssembled?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [assembled, setAssembled] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<SVGAnimateElement>(null);

  useEffect(() => {
    setHasFinePointer(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  // Event-driven off the last piece actually seating, not a guessed timeout.
  function onImpact() {
    setAssembled(true);
    shimmerRef.current?.beginElement();
    onAssembled?.();
  }

  useEffect(() => {
    if (!reduceMotion) return;
    setAssembled(true);
    onAssembled?.();
    // onAssembled is a stable callback from the parent; re-running on its
    // identity would re-fire the impact.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

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
      <svg viewBox={isotipoViewBox} className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="hero-mark-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-orange)" stopOpacity="0.5" />
            <stop
              offset="55%"
              stopColor="var(--color-orange-deep)"
              stopOpacity="0.22"
            />
            <stop
              offset="100%"
              stopColor="var(--color-orange-deep)"
              stopOpacity="0"
            />
          </radialGradient>

          {/* The artwork, authored once and reused by every group — each
              group shows it through its own clip, so paint order and color
              stay exactly the source file's. */}
          <g id="hero-mark-art">{isotipoArtwork}</g>

          {GROUPS.map(([key, clip]) => (
            <clipPath key={key} id={`hero-mark-clip-${key}`}>
              {clip}
            </clipPath>
          ))}

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
                baseFrequency="0.011 0.045"
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
                  values="0;30;0"
                  dur="0.75s"
                  begin="indefinite"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.16 1 0.3 1; 0.7 0 0.84 0"
                  keyTimes="0; 0.28; 1"
                />
              </feDisplacementMap>
            </filter>
          )}
        </defs>

        {/* Heat bloom: swells on impact, then cools to a low resting ember. */}
        <motion.circle
          cx="323"
          cy="266"
          r="250"
          fill="url(#hero-mark-glow)"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={
            assembled && !reduceMotion
              ? { opacity: [0, 1, 0.32], scale: [0.75, 1.06, 1] }
              : { opacity: reduceMotion ? 0.25 : 0, scale: 1 }
          }
          transition={{ duration: 1.1, times: [0, 0.22, 1], ease: EASE_OUT_EXPO }}
          style={{ transformOrigin: "323px 266px" }}
        />

        <g
          filter={reduceMotion ? undefined : "url(#hero-mark-shimmer)"}
          transform={`translate(${isotipoOffset.x},${isotipoOffset.y})`}
        >
          {GROUPS.map(([key]) => (
            <motion.g key={key} style={parallax[key]}>
              <motion.g
                initial={reduceMotion ? { opacity: 0 } : ENTRANCE[key].initial}
                animate={reduceMotion ? { opacity: 1 } : SETTLED}
                transition={
                  reduceMotion
                    ? { duration: 0.45, ease: "easeOut" }
                    : ENTRANCE[key].transition
                }
                onAnimationComplete={key === IMPACT_KEY ? onImpact : undefined}
                style={{ transformOrigin: "323px 266px" }}
              >
                <use
                  href="#hero-mark-art"
                  clipPath={`url(#hero-mark-clip-${key})`}
                />
              </motion.g>
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  );
}
