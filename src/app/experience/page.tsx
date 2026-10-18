import type { Metadata } from "next";
import { PageHeader, TagList } from "@/components/ui";
import { experience } from "@/content/experience";
import { formatDuration, formatRange, monthsBetween } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "8+ years of SDET and QA automation experience across enterprise SaaS — outcomes, metrics and stack for each role.",
  path: "/experience/",
});

export default function ExperiencePage() {
  return (
    <div className="container-page">
      <PageHeader eyebrow="Experience" title="8+ years making releases predictable.">
        <p>
          From Selenium suites to parallel Playwright pipelines and AI-assisted test generation —
          focused on outcomes, with the numbers where I have them.
        </p>
      </PageHeader>

      <ol className="relative space-y-14 border-l border-border pl-6 sm:pl-10">
        {experience.map((role) => (
          <li key={role.id} data-testid="role" className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-2 -left-[29px] size-2.5 rounded-full ring-4 ring-bg sm:-left-[45px] ${role.end === null ? "bg-accent" : "bg-border"}`}
            />
            <article aria-labelledby={`${role.id}-title`}>
              <p className="font-mono text-xs text-muted">
                <time dateTime={role.start}>{formatRange(role.start, role.end)}</time>
                <span aria-hidden="true"> · </span>
                <span className="sr-only">, </span>
                {formatDuration(monthsBetween(role.start, role.end))}
              </p>
              <h2 id={`${role.id}-title`} className="mt-2 text-xl font-semibold tracking-tight">
                {role.title}
              </h2>
              <p className="text-muted">
                {role.company} · {role.location}
              </p>
              <p className="mt-3 text-fg">{role.summary}</p>

              {role.metrics.length > 0 ? (
                <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {role.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-border bg-surface p-4"
                    >
                      <dt className="sr-only">{metric.label}</dt>
                      <dd className="text-2xl font-semibold tracking-tight text-accent">
                        {metric.value}
                      </dd>
                      <dd className="mt-1 text-xs leading-snug text-muted">{metric.label}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-fg marker:text-accent">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className="mt-5">
                <TagList items={role.stack} label={`${role.company} stack`} />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
