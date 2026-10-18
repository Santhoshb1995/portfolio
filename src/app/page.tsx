import Link from "next/link";
import { ContactLinks } from "@/components/contact-links";
import { ArrowUpRightIcon } from "@/components/icons";
import { SectionHeading } from "@/components/ui";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { featuredOutcomes } from "@/lib/experience";

export default function HomePage() {
  const outcomes = featuredOutcomes(experience);

  return (
    <div className="container-page">
      <section aria-labelledby="intro" className="pt-20 pb-16 sm:pt-32 sm:pb-24">
        <p className="animate-rise font-mono text-xs tracking-widest text-accent uppercase">
          {profile.role} · {profile.location}
        </p>
        <h1
          id="intro"
          className="animate-rise mt-4 max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance [--delay:60ms] sm:text-6xl"
        >
          {profile.headline}
        </h1>
        <p className="animate-rise mt-6 max-w-2xl text-lg text-pretty text-muted [--delay:120ms] sm:text-xl">
          {profile.positioning}
        </p>
        <div className="animate-rise mt-10 [--delay:180ms]">
          <ContactLinks />
        </div>
      </section>

      {outcomes.length > 0 ? (
        <section aria-labelledby="outcomes" className="border-t border-border py-14">
          <SectionHeading id="outcomes">Selected outcomes</SectionHeading>
          <dl className="mt-8 grid gap-8 sm:grid-cols-3">
            {outcomes.map((outcome) => (
              <div key={`${outcome.company}-${outcome.label}`}>
                <dt className="sr-only">{outcome.label}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-accent">
                  {outcome.value}
                </dd>
                <dd className="mt-2 text-sm text-fg">{outcome.label}</dd>
                <dd className="mt-1 font-mono text-xs text-muted">{outcome.company}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/experience/"
            className="mt-10 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
          >
            See full experience <ArrowUpRightIcon className="size-4" />
          </Link>
        </section>
      ) : null}

      <section aria-labelledby="building" className="border-t border-border py-14">
        <SectionHeading id="building">Currently building</SectionHeading>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id} className="flex items-baseline gap-3 text-fg">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
              {project.title}
            </li>
          ))}
        </ul>
        <Link
          href="/projects/"
          className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
        >
          View projects <ArrowUpRightIcon className="size-4" />
        </Link>
      </section>
    </div>
  );
}
