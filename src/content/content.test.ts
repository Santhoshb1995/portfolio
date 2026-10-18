/**
 * Content integrity checks: these fail the build when an edit to a content file
 * introduces a bad date, a broken-looking link or a duplicate id.
 */
import { describe, expect, it } from "vitest";
import { isYearMonth, monthsBetween, sortByStartDesc } from "@/lib/dates";
import { isTodo } from "@/lib/todo";
import { experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import { site } from "./site";
import { skills } from "./skills";

const isHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

const expectUnique = (ids: string[]) => expect(new Set(ids).size).toBe(ids.length);

describe("profile", () => {
  it("has a valid email and https social links", () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(isHttpsUrl(profile.links.github)).toBe(true);
    expect(isHttpsUrl(profile.links.linkedin)).toBe(true);
  });

  it("links the resume from public/", () => {
    expect(profile.links.resume).toMatch(/^\/[\w-]+\.pdf$/);
  });

  it("keeps the phone number off the site", () => {
    expect(JSON.stringify(profile)).not.toMatch(/\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  });
});

describe("experience", () => {
  it("has unique ids", () => expectUnique(experience.map((r) => r.id)));

  it("uses valid YYYY-MM dates that end after they start", () => {
    for (const role of experience) {
      expect(isYearMonth(role.start), `${role.id} start`).toBe(true);
      if (role.end) expect(isYearMonth(role.end), `${role.id} end`).toBe(true);
      expect(() => monthsBetween(role.start, role.end)).not.toThrow();
    }
  });

  it("has at most one current role", () => {
    expect(experience.filter((r) => r.end === null).length).toBeLessThanOrEqual(1);
  });

  it("is listed newest first", () => {
    expect(experience.map((r) => r.id)).toEqual(sortByStartDesc(experience).map((r) => r.id));
  });

  it("gives every role highlights and every metric a value and label", () => {
    for (const role of experience) {
      expect(role.highlights.length, role.id).toBeGreaterThan(0);
      for (const metric of role.metrics) {
        expect(metric.value.trim(), role.id).not.toBe("");
        expect(metric.label.trim(), role.id).not.toBe("");
      }
    }
  });
});

describe("projects", () => {
  it("has unique ids", () => expectUnique(projects.map((p) => p.id)));

  it("fills in problem and stack for every card", () => {
    for (const project of projects) {
      expect(project.problem.trim(), project.id).not.toBe("");
      expect(project.stack.length, project.id).toBeGreaterThan(0);
    }
  });

  it("uses https URLs or explicit TODO placeholders for links", () => {
    for (const project of projects) {
      for (const link of [project.repo, project.live]) {
        expect(isTodo(link) || isHttpsUrl(link), `${project.id}: ${link}`).toBe(true);
      }
    }
  });

  it("only marks a project complete once it has a real result and repo", () => {
    for (const project of projects.filter((p) => p.status === "complete")) {
      expect(isTodo(project.result), project.id).toBe(false);
      expect(isTodo(project.repo), project.id).toBe(false);
    }
  });
});

describe("skills", () => {
  it("has unique group ids and no duplicate skills within a group", () => {
    expectUnique(skills.map((g) => g.id));
    for (const group of skills) expectUnique(group.skills);
  });
});

describe("site", () => {
  it("has an absolute site URL and trailing-slash nav links", () => {
    expect(isHttpsUrl(site.url)).toBe(true);
    for (const item of site.nav) expect(item.href).toMatch(/^\/[a-z-]+\/$/);
  });
});
