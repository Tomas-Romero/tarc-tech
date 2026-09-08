"use client";

import { useId, useMemo, useState } from "react";
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

  const active = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-6 py-24">
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

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {visible.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.06}>
            <ProjectCard
              project={project}
              dict={dict}
              locale={locale}
              onOpen={() => setOpenId(project.id)}
            />
          </Reveal>
        ))}
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

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-cyan px-2.5 py-0.5 text-xs font-medium text-cyan">
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

function ProjectCard({
  project,
  dict,
  locale,
  onOpen,
}: {
  project: Project;
  dict: Dictionary;
  locale: Locale;
  onOpen: () => void;
}) {
  const isInDevelopment = project.status === "en-desarrollo";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col rounded-lg border border-border bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:border-orange-deep"
    >
      <MockupFrame
        src={project.images[0]}
        alt={`${project.name} — ${project.tagline[locale]}`}
        note={isInDevelopment ? dict.projects.inDevelopmentNote : undefined}
      />

      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold">{project.name}</h3>
        {isInDevelopment && <StatusBadge label={dict.projects.inDevelopment} />}
      </div>

      <p className="mt-1 text-sm text-foreground-secondary">
        {project.tagline[locale]}
      </p>

      <StackBadges stack={project.stack} />

      <span className="mt-4 text-sm font-medium text-orange-deep">
        {dict.projects.openDetail}
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
          className="rounded-md bg-orange px-5 py-3 font-medium text-[#431407] transition-colors hover:bg-orange-hover"
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
