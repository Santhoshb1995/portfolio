import { describe, expect, it } from "vitest";
import type { Role } from "@/content/types";
import { featuredOutcomes } from "./experience";

const role = (company: string, metrics: Role["metrics"]): Role => ({
  id: company.toLowerCase(),
  title: "SDET",
  company,
  location: "Remote",
  start: "2020-01",
  end: null,
  summary: "",
  highlights: ["x"],
  metrics,
  stack: [],
});

describe("featuredOutcomes", () => {
  const roles = [
    role("A", [
      { value: "94%", label: "faster" },
      { value: "2", label: "ignored" },
    ]),
    role("B", []),
    role("C", [{ value: "80%", label: "less" }]),
    role("D", [{ value: "50%", label: "quicker" }]),
  ];

  it("takes the lead metric of each role, skipping roles without metrics", () => {
    expect(featuredOutcomes(roles)).toEqual([
      { value: "94%", label: "faster", company: "A" },
      { value: "80%", label: "less", company: "C" },
      { value: "50%", label: "quicker", company: "D" },
    ]);
  });

  it("respects the limit", () => {
    expect(featuredOutcomes(roles, 1).map((o) => o.company)).toEqual(["A"]);
    expect(featuredOutcomes([])).toEqual([]);
  });
});
