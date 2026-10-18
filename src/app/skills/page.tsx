import type { Metadata } from "next";
import { PageHeader, TagList } from "@/components/ui";
import { skills } from "@/content/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Test automation, AI-assisted testing, languages, CI/CD, cloud and tooling skills — Playwright, Cypress, Selenium, TypeScript, GitHub Actions, AWS and more.",
  alternates: { canonical: "/skills/" },
};

export default function SkillsPage() {
  return (
    <div className="container-page">
      <PageHeader eyebrow="Skills" title="The toolkit behind the test suites.">
        <p>Grouped by where they fit in the delivery pipeline.</p>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`skills-${group.id}`}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h2 id={`skills-${group.id}`} className="font-semibold tracking-tight">
              {group.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{group.description}</p>
            <div className="mt-5">
              <TagList items={group.skills} label={group.title} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
