"use client";

import { useId, useMemo, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { Dictionary, Locale } from "@/i18n";
import { projects, type Project } from "@/data/projects";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/motion/Reveal";
import { Modal } from "@/components/ui/Modal";
import { MockupFrame } from "@/components/ui/MockupFrame";

type Filter = "all" | "cliente" | "producto";

export function Projects({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const titleId = useId();

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: dict.projects.filterAll },
    { value: "cliente", label: dict.projects.filterClients },
    { value: "producto", label: dict.projects.filterOwn },
  ];

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.type === filter)),
    [filter]
  );
  const [featured, ...rest] = visible;

  const active = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="proyectos" className="relative overflow-hidden py-24">
      {/* Ambient backdrop: whichever project you're hovering shows through,
          heavily blurred and dimmed — the real screenshots themselves, never
          a stock image, doing double duty as atmosphere. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {projects
          .filter((p) => p.images[0])
          .map((p) => (
            <div
              key={p.id}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: hoveredImage === p.id ? 1 : 0 }}
            >
              <Image
                src={p.images[0]}
                alt=""
                fill
                className="scale-110 object-cover opacity-[0.14] blur-3xl"
                sizes="100vw"
              />
            </div>
          ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.projects.title}
          </h2>
          <p className="mt-4 max-w-xl text-foreground-secondary">
            {dict.projects.intro}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div role="group" aria-label={dict.projects.title} className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  aria-pressed={isActive}
                  className={`flex min-h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-orange bg-orange text-[#431407]"
                      : "border-border text-foreground-secondary hover:border-orange-deep hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {featured && (
          <Reveal delay={0.1} className="mt-10">
            <FeaturedProjectCard
              project={featured}
              dict={dict}
              locale={locale}
              onOpen={() => setOpenId(featured.id)}
              onHoverImage={setHoveredImage}
            />
          </Reveal>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06}>
              <ProjectCard
                project={project}
                dict={dict}
                locale={locale}
                onOpen={() => setOpenId(project.id)}
                onHoverImage={setHoveredImage}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setOpenId(null)}
        labelledBy={titleId}
        closeLabel={dict.projects.closeDetail}
      >
        {active && (
          <ProjectDetail
            project={active}
            dict={dict}
            locale={locale}
            titleId={titleId}
          />
        )}
      </Modal>
    </section>
  );
}

// Shared per-card motion: a spring-driven 3D tilt that follows the pointer
// (apple-design's "decorative mouse tracking" case — purely for delight, so
// it's exactly the kind of place a spring belongs) and a scroll-linked
// parallax on the screenshot inside, independent of the card's own reveal.
// Both collapse to nothing under reduced motion.
function useCardMotion(cardRef: RefObject<HTMLElement | null>) {
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 22, mass: 0.6 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 22, mass: 0.6 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-26, 26]);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
  }
  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return { rotateX: springRotateX, rotateY: springRotateY, imageY, onMouseMove, onMouseLeave };
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-cyan-deep px-2.5 py-0.5 text-xs font-medium text-cyan-deep">
      {label}
    </span>
  );
}

function StackBadges({ stack }: { stack: string[] }) {
  if (stack.length === 0) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground-secondary"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

// The lead project — image and copy side by side at real size instead of a
// grid cell, so the section opens with one confident statement rather than
// a wall of equal-weight thumbnails.
function FeaturedProjectCard({
  project,
  dict,
  locale,
  onOpen,
  onHoverImage,
}: {
  project: Project;
  dict: Dictionary;
  locale: Locale;
  onOpen: () => void;
  onHoverImage: (id: string | null) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const { rotateX, rotateY, imageY, onMouseMove, onMouseLeave } = useCardMotion(cardRef);
  const isInDevelopment = project.status === "en-desarrollo";

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onOpen}
      onMouseEnter={() => onHoverImage(project.id)}
      onMouseLeave={() => {
        onHoverImage(null);
        onMouseLeave();
      }}
      onMouseMove={onMouseMove}
      className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-border bg-surface text-left transition-[border-color,box-shadow] duration-300 hover:border-orange hover:shadow-[0_40px_80px_-32px_rgba(249,115,22,0.45)] md:flex-row"
      style={{ perspective: 1400 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:w-3/5"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-[-6%]">
          <Image
            src={project.images[0]}
            alt={`${project.name} — ${project.tagline[locale]}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </motion.div>
        {isInDevelopment && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <p className="px-6 text-center text-sm text-foreground-secondary">
              {dict.projects.inDevelopmentNote}
            </p>
          </div>
        )}
      </motion.div>

      <div className="relative flex flex-1 flex-col justify-center p-8 sm:p-10">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl font-bold sm:text-3xl">{project.name}</h3>
          {isInDevelopment && <StatusBadge label={dict.projects.inDevelopment} />}
        </div>
        <p className="mt-2 text-foreground-secondary">{project.tagline[locale]}</p>
        <StackBadges stack={project.stack} />
        <span className="relative mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-orange-deep">
          {dict.projects.openDetail}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </button>
  );
}

function ProjectCard({
  project,
  dict,
  locale,
  onOpen,
  onHoverImage,
}: {
  project: Project;
  dict: Dictionary;
  locale: Locale;
  onOpen: () => void;
  onHoverImage: (id: string | null) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const { rotateX, rotateY, imageY, onMouseMove, onMouseLeave } = useCardMotion(cardRef);
  const isInDevelopment = project.status === "en-desarrollo";

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onOpen}
      onMouseEnter={() => onHoverImage(project.id)}
      onMouseLeave={() => {
        onHoverImage(null);
        onMouseLeave();
      }}
      onMouseMove={onMouseMove}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-surface p-4 text-left transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-orange hover:shadow-[0_28px_56px_-24px_rgba(249,115,22,0.4)] active:translate-y-0 active:scale-[0.98]"
      style={{ perspective: 1200 }}
    >
      {/* Warm wash rising behind the content on hover — the same "heating up"
          language as the services/solutions hover, kept subtle here since a
          real screenshot already carries most of the visual weight. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--color-orange) 10%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="relative overflow-hidden rounded-md border border-border bg-background">
          <div className="flex h-7 items-center gap-1.5 border-b border-border px-3">
            <span className="h-1 w-10 rounded-full bg-border" />
            <span className="h-1 w-16 rounded-full bg-border" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            {project.images[0] ? (
              <motion.div style={{ y: imageY }} className="absolute inset-[-8%]">
                <Image
                  src={project.images[0]}
                  alt={`${project.name} — ${project.tagline[locale]}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4">
                <Image
                  src="/brand/isotipo-solid-orange.svg"
                  alt=""
                  width={56}
                  height={46}
                  className="h-auto w-12 opacity-20"
                />
                {isInDevelopment && (
                  <p className="text-center text-xs text-foreground-secondary">
                    {dict.projects.inDevelopmentNote}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="relative mt-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold">{project.name}</h3>
        {isInDevelopment && <StatusBadge label={dict.projects.inDevelopment} />}
      </div>

      <p className="relative mt-1 text-sm text-foreground-secondary">
        {project.tagline[locale]}
      </p>

      <div className="relative">
        <StackBadges stack={project.stack} />
      </div>

      <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-orange-deep">
        {dict.projects.openDetail}
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </button>
  );
}

function ProjectDetail({
  project,
  dict,
  locale,
  titleId,
}: {
  project: Project;
  dict: Dictionary;
  locale: Locale;
  titleId: string;
}) {
  const isInDevelopment = project.status === "en-desarrollo";
  const features = project.features[locale];

  return (
    <div className="pr-10">
      <div className="flex items-start gap-3">
        <h2 id={titleId} className="text-2xl font-bold">
          {project.name}
        </h2>
        {isInDevelopment && <StatusBadge label={dict.projects.inDevelopment} />}
      </div>
      <p className="mt-1 text-foreground-secondary">{project.tagline[locale]}</p>

      <div className="mt-6">
        <MockupFrame
          src={project.images[0]}
          alt={`${project.name} — ${project.tagline[locale]}`}
          note={isInDevelopment ? dict.projects.inDevelopmentNote : undefined}
        />
      </div>

      {project.problem && (
        <section className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-foreground-secondary">
            {dict.projects.problemLabel}
          </h3>
          <p className="mt-2">{project.problem[locale]}</p>
        </section>
      )}

      <section className="mt-6">
        <h3 className="text-sm font-bold uppercase tracking-wide text-foreground-secondary">
          {dict.projects.solutionLabel}
        </h3>
        <p className="mt-2">{project.solution[locale]}</p>
      </section>

      {features.length > 0 && (
        <section className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-foreground-secondary">
            {dict.projects.featuresLabel}
          </h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-foreground-secondary">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {project.stack.length > 0 && (
        <section className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-foreground-secondary">
            {dict.projects.stackLabel}
          </h3>
          <StackBadges stack={project.stack} />
        </section>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={waLink(
            dict.whatsapp.projectModal.replace("{project}", project.name)
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="tarc-cta-glow rounded-md bg-orange px-5 py-3 font-medium text-[#431407] hover:bg-orange-hover"
        >
          {dict.projects.wantSimilar}
        </a>

        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-5 py-3 font-medium transition-colors hover:border-orange-deep hover:text-orange-deep"
          >
            {dict.projects.visitSite}
          </a>
        )}
      </div>
    </div>
  );
}
