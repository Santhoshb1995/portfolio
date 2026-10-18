import type { Metric, Role } from "@/content/types";

export interface Outcome extends Metric {
  company: string;
}

/** The lead metric from each role that has one, newest role first — used for the home page highlights. */
export function featuredOutcomes(roles: readonly Role[], limit = 3): Outcome[] {
  return roles
    .flatMap((role) => {
      const [lead] = role.metrics;
      return lead ? [{ ...lead, company: role.company }] : [];
    })
    .slice(0, limit);
}
