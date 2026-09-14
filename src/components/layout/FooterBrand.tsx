"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

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
const VISIBLE_COUNT = LETTERS.filter((l) => l.char !== " ").length;

// The sign-off: the name at full width, wiped up into view the same strike
// language the hero uses, at the other end of the scroll — now letter by
// letter, like it's being typed out, instead of one flat wipe. Slower and
// more deliberate on purpose (Tomás wanted it to "call attention," not just
// register as done) — each glyph gets its own scroll-mapped window inside the
// same overall pass, and the windows overlap slightly so it reads as one
// continuous wave rather than a strobe of individual pops.
//
// Driven by scroll position (useScroll), not `whileInView`: this element
// sits at the document's own bottom edge, and an IntersectionObserver-based
// trigger there kept failing to fire — the browser has no more scroll room
// left to move it "into" a detection zone once you're already at the end of
// the page. Tying the reveal directly to scroll progress between "its top is
// most of the way up the viewport" and "its own bottom reaches the bottom of
// the viewport" sidesteps that: the second point is, by definition, exactly
// where scrolling maxes out for the last element on the page, so it always
// finishes right as you hit the true bottom — and starting the window at
// `80%` rather than `100%` (of viewport height) buys a longer runway for the
// letter-by-letter wave than the single-wipe version needed.
export function FooterBrand() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end end"],
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="select-none px-4 pb-6 pt-8 sm:px-6"
    >
      <p className="tarc-logotype whitespace-nowrap text-center text-[clamp(3rem,14vw,11rem)] leading-[0.9] tracking-[-0.03em] text-foreground">
        {reduceMotion ? (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            TARC <span className="text-orange">Tech</span>
          </motion.span>
        ) : (
          <LetterWave progress={scrollYProgress} />
        )}
      </p>
    </div>
  );
}

function LetterWave({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  let visibleIndex = -1;

  return (
    <>
      {LETTERS.map(({ char, accent }, i) => {
        if (char === " ") return <span key={i}>{char}</span>;
        visibleIndex += 1;
        // Windows overlap (width 0.22 against a 1/8 ≈ 0.125 step) so the
        // wave reads as continuous rather than each letter popping in
        // isolation once its neighbor finishes.
        const center = (visibleIndex + 0.5) / VISIBLE_COUNT;
        const start = Math.max(center - 0.11, 0);
        const end = Math.min(center + 0.11, 1);
        return (
          <Letter
            key={i}
            char={char}
            accent={accent}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </>
  );
}

function Letter({
  char,
  accent,
  progress,
  range,
}: {
  char: string;
  accent: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const reveal = useTransform(progress, range, [0, 1], { clamp: true });
  const clipPath = useTransform(reveal, (v) => `inset(${100 - v * 100}% 0 0 0)`);
  const y = useTransform(reveal, [0, 1], [22, 0]);

  return (
    <motion.span
      style={{ clipPath, y, display: "inline-block" }}
      className={accent ? "text-orange" : undefined}
    >
      {char}
    </motion.span>
  );
}
