"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  motionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { HeroMark } from "./HeroMark";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LETTERS: { char: string; accent: boolean }[] = [
  { char: "T", accent: false },
  { char: "A", accent: false },
  { char: "R", accent: false },
  { char: "C", accent: false },
  { char: " ", accent: false },
  { char: "T", accent: true },
  { char: "e", accent: true },
  { char: "c", accent: true },
  { char: "h", accent: true },
];

// How far (in px) the cursor's influence reaches from a letter's own center,
// and how much lift/scale a letter gets at zero distance — a magnetic-type
// hover (apple-design's "decorative mouse tracking"), so the name that just
// struck itself into place keeps answering to the cursor afterwards instead
// of going inert the moment the entrance animation ends.
const RADIUS = 60;
const LIFT_PX = 14;
const SCALE_MAX = 0.32;

// The mark and the name are one gesture, not two stacked elements: the
// wordmark is struck in — wiped left to right like a stamp — at the exact
// frame the mark's last piece seats, and an ember rule draws under it as the
// heat bleeds off. Once struck, each letter also answers to the cursor on its
// own — a small magnetic lift, heaviest on whichever glyph the pointer is
// nearest — so the name stays alive instead of going static after the intro.
export function HeroBrand() {
  const reduceMotion = useReducedMotion();
  const [struck, setStruck] = useState(false);

  const onAssembled = useCallback(() => setStruck(true), []);

  return (
    <div className="flex w-full flex-col items-center">
      {/* The mark stays small and narrow on its own — the wordmark below it
          is sized and laid out independently now, so it can run "TARC Tech"
          on one line instead of inheriting the mark's own narrow width and
          wrapping onto two ("TARC" / "Tech" stacked, which read as broken). */}
      <HeroMark className="block h-auto w-28 sm:w-32" onAssembled={onAssembled} />

      <div className="mt-5 sm:mt-6">
        <motion.p
          className="tarc-logotype whitespace-nowrap py-2 text-center text-[clamp(1.75rem,7vw,4rem)] leading-none tracking-tight text-foreground"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { clipPath: "inset(0 100% 0 0)", opacity: 1 }
          }
          animate={
            reduceMotion
              ? { opacity: struck ? 1 : 0 }
              : { clipPath: struck ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }
          }
          transition={{ duration: reduceMotion ? 0.4 : 0.62, ease: EASE_OUT_EXPO }}
        >
          <MagneticWordmark active={struck && !reduceMotion} />
        </motion.p>

        <motion.div
          aria-hidden
          className="mx-auto mt-3 h-px w-full max-w-[14rem] origin-left bg-gradient-to-r from-orange via-orange-deep to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={struck ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.3 : 0.7,
            delay: reduceMotion ? 0 : 0.18,
            ease: EASE_OUT_EXPO,
          }}
        />
      </div>
    </div>
  );
}

function MagneticWordmark({ active }: { active: boolean }) {
  // Plain (non-hook) motion values: letters render via .map(), and creating
  // them through useMotionValue would call a hook inside a loop. `motionValue`
  // is the same primitive without the hook-rules constraint.
  const rawX = useMemo(() => motionValue(0), []);
  const rawActive = useMemo(() => motionValue(0), []);
  const cursorX = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.5 });
  const hover = useSpring(rawActive, { stiffness: 220, damping: 26 });

  function onMouseMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (!active) return;
    // Viewport-relative (plain clientX), matching how each letter measures
    // its own center below — not relative to the container's own box. The
    // container has no `position` of its own, so `offsetLeft`-style
    // measurements on its children actually resolve against whichever
    // positioned ancestor is nearest (Hero's own `position: relative`
    // section), a different frame than a container-relative cursor position
    // would be — the mismatch left every letter comparing distances between
    // two coordinate systems that didn't agree, so the falloff was always
    // ~0 and nothing visibly lifted.
    rawX.set(e.clientX);
    rawActive.set(1);
  }
  function onMouseLeave() {
    rawActive.set(0);
  }

  return (
    <span
      onMouseMove={active ? onMouseMove : undefined}
      onMouseLeave={active ? onMouseLeave : undefined}
      className="inline-block"
    >
      {LETTERS.map((letter, i) =>
        letter.char === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <MagneticLetter
            key={i}
            char={letter.char}
            accent={letter.accent}
            cursorX={cursorX}
            hover={hover}
          />
        )
      )}
    </span>
  );
}

function MagneticLetter({
  char,
  accent,
  cursorX,
  hover,
}: {
  char: string;
  accent: boolean;
  cursorX: MotionValue<number>;
  hover: MotionValue<number>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const centerXRef = useRef(0);

  useEffect(() => {
    function measure() {
      const el = ref.current;
      if (!el) return;
      // Viewport-relative, the same frame `onMouseMove` above reads the
      // cursor in — `offsetLeft` would measure against this letter's nearest
      // positioned ancestor instead, which is Hero's own section, not the
      // small inline wordmark container.
      const rect = el.getBoundingClientRect();
      centerXRef.current = rect.left + rect.width / 2;
    }
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  const falloff = useTransform([cursorX, hover], (values) => {
    const [cx, h] = values as [number, number];
    const dist = Math.abs(cx - centerXRef.current);
    return Math.max(0, 1 - dist / RADIUS) * h;
  });
  const y = useTransform(falloff, (f) => -f * LIFT_PX);
  const scale = useTransform(falloff, (f) => 1 + f * SCALE_MAX);

  return (
    <motion.span
      ref={ref}
      style={{ y, scale, display: "inline-block" }}
      className={accent ? "text-orange" : undefined}
    >
      {char}
    </motion.span>
  );
}
