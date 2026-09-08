"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { PortraitMedia } from "@/lib/about-media";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The portrait, with the orange accent frame PLAN §6.8 asks for. The animated
// version plays muted and looping, and pauses under prefers-reduced-motion
// (PRODUCT.md is explicit that the animated photo is included in that rule).
export function AboutPortrait({
  media,
  placeholder,
}: {
  media: PortraitMedia;
  placeholder: string;
}) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) video.pause();
    else void video.play().catch(() => {});
  }, [reduceMotion, media]);

  return (
    <motion.div
      className="relative w-full max-w-xs"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduceMotion ? 0.4 : 0.6, ease: EASE_OUT_EXPO }}
    >
      {/* Accent edge rather than a glow: DESIGN.md wants depth from border and
          surface, not diffuse shadow. */}
      <div className="absolute -inset-1.5 rounded-lg border border-orange/40" aria-hidden />

      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-surface">
        {media?.kind === "video" && (
          <video
            ref={videoRef}
            src={media.src}
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        )}

        {media?.kind === "image" && (
          <Image
            src={media.src}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 20rem"
          />
        )}

        {!media && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4">
            <Image
              src="/brand/isotipo-solid-orange.svg"
              alt=""
              width={64}
              height={52}
              className="h-auto w-14 opacity-20"
            />
            <p className="text-center text-xs text-foreground-secondary">
              {placeholder}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
