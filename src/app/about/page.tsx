import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/ui";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}: ${profile.role} focused on reliable, AI-assisted test automation.`,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  const [lead, ...rest] = profile.about;

  return (
    <div className="container-page">
      <PageHeader
        eyebrow="About"
        title="Quality engineering, from frameworks to release decisions."
      >
        <p>{lead}</p>
      </PageHeader>

      <div className="max-w-2xl space-y-5 text-base leading-relaxed text-pretty text-fg">
        {rest.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <aside
        aria-label="What I'm looking for"
        className="mt-12 max-w-2xl rounded-2xl border border-accent/30 bg-accent-soft p-6"
      >
        <p className="font-mono text-xs tracking-widest text-accent uppercase">Next</p>
        <p className="mt-2 text-fg">{profile.lookingFor}</p>
      </aside>

      <div className="mt-16 grid gap-12 sm:grid-cols-2">
        <section aria-labelledby="education">
          <SectionHeading id="education">Education</SectionHeading>
          <ul className="mt-5 space-y-4">
            {profile.education.map((item) => (
              <li key={item.degree}>
                <p className="font-medium text-fg">{item.degree}</p>
                <p className="text-sm text-muted">
                  {item.school} · {item.location}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="certifications">
          <SectionHeading id="certifications">Certifications</SectionHeading>
          <ul className="mt-5 space-y-3">
            {profile.certifications.map((cert) => (
              <li key={cert.name} className="flex flex-wrap items-baseline gap-x-2 text-fg">
                {cert.name}
                {cert.status === "in-progress" ? (
                  <span className="font-mono text-xs text-muted">(in progress)</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
