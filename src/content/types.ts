/**
 * Shared content types. Every content file in this folder is typed against these,
 * so `npm run typecheck` catches missing or misspelled fields.
 */

/** A placeholder that still needs real content. Render-safe: the UI hides or softens it. */
export type Todo = `TODO: ${string}`;

/** `YYYY-MM`, e.g. `"2025-12"`. Validated by unit tests. */
export type YearMonth = `${number}-${number}`;

export interface Link {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  /** Short hero headline. */
  headline: string;
  /** One-sentence positioning statement under the headline. */
  positioning: string;
  /** About page paragraphs. */
  about: string[];
  /** What I'm looking for next — shown on About and Contact. */
  lookingFor: string;
  links: {
    github: string;
    linkedin: string;
    /** Path under `public/`. */
    resume: string;
  };
  education: Education[];
  certifications: Certification[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
}

export interface Certification {
  name: string;
  status: "earned" | "in-progress";
}

export interface Metric {
  /** The headline figure, e.g. `"~94%"`. */
  value: string;
  /** What the figure means, e.g. `"faster full regression"`. */
  label: string;
}

export interface Role {
  /** Stable id used for React keys and test selectors. */
  id: string;
  title: string;
  company: string;
  location: string;
  start: YearMonth;
  /** `null` means current role. */
  end: YearMonth | null;
  /** One-line context shown under the title. */
  summary: string;
  /** Outcome-focused bullets. */
  highlights: string[];
  /** Confirmed numbers only. Leave empty rather than estimate. */
  metrics: Metric[];
  stack: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export type ProjectStatus = "in-progress" | "complete";

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  problem: string;
  stack: string[];
  /** What the project achieved. A `Todo` until it ships. */
  result: string | Todo;
  repo: string | Todo;
  live: string | Todo;
}

export interface PostMeta {
  title: string;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  summary: string;
  /** Drafts are excluded from production builds. */
  draft?: boolean;
}
