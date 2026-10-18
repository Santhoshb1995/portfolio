import type { Metadata } from "next";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/icons";
import { PageHeader, TagList } from "@/components/ui";
import { projects } from "@/content/projects";
import type { ReactNode } from "react";
import type { Project, Todo } from "@/content/types";
import { isUsableLink } from "@/lib/todo";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "SDET projects in progress: a Playwright UI framework, an API test suite, a GitHub Actions pipeline, k6 performance testing and an LLM evaluation harness.",
  path: "/projects/",
});

const statusLabel: Record<Project["status"], string> = {
  "in-progress": "In progress",
  complete: "Complete",
};

function ProjectLink({
  href,
  label,
  project,
  icon,
}: {
  href: string | Todo;
  label: string;
  project: string;
  icon: ReactNode;
}) {
  if (!isUsableLink(href)) {
    // Placeholder: plain text, so the link checker never sees a dead href.
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-muted">
        {icon}
        {label} coming soon
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
    >
      {icon}
      {label}
      <span className="sr-only"> for {project} (opens in a new tab)</span>
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <div className="container-page">
      <PageHeader eyebrow="Projects" title="Quality engineering, in public.">
        <p>
          A set of SDET projects I’m building to show how I approach UI, API, pipeline, performance
          and LLM testing end to end.
        </p>
      </PageHeader>

      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id} data-testid="project-card">
            <article
              aria-labelledby={`${project.id}-title`}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 id={`${project.id}-title`} className="font-semibold tracking-tight">
                  {project.title}
                </h2>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-xs ${project.status === "complete" ? "bg-accent text-accent-fg" : "bg-accent-soft text-accent"}`}
                >
                  {statusLabel[project.status]}
                </span>
              </div>

              <dl className="mt-4 flex flex-1 flex-col gap-4 text-sm">
                <div>
                  <dt className="font-mono text-xs tracking-wide text-muted uppercase">Problem</dt>
                  <dd className="mt-1 text-fg">{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-wide text-muted uppercase">Stack</dt>
                  <dd className="mt-2">
                    <TagList items={project.stack} label={`${project.title} stack`} />
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-wide text-muted uppercase">Result</dt>
                  <dd className={`mt-1 ${isUsableLink(project.result) ? "text-fg" : "text-muted"}`}>
                    {isUsableLink(project.result)
                      ? project.result
                      : "Results will be published when the project ships."}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
                <ProjectLink
                  href={project.repo}
                  label="Repo"
                  project={project.title}
                  icon={<GitHubIcon className="size-4" />}
                />
                <ProjectLink
                  href={project.live}
                  label="Live"
                  project={project.title}
                  icon={<ArrowUpRightIcon className="size-4" />}
                />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
