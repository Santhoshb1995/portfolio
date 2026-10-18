import type { Project } from "./types";

/**
 * Planned SDET projects. Fill in `result`, `repo` and `live` as each one ships,
 * then flip `status` to "complete". Anything still starting with "TODO:" is
 * shown on the site as "Coming soon" rather than a broken link.
 */
export const projects: Project[] = [
  {
    id: "playwright-framework",
    title: "Playwright UI framework",
    status: "in-progress",
    problem:
      "UI suites get slow and flaky as they grow. This is a reference framework showing how I structure Playwright for scale: page objects, fixtures, parallel workers and readable reports.",
    stack: ["Playwright", "TypeScript", "Page Object Model", "GitHub Actions"],
    result: "TODO: Playwright framework result",
    repo: "TODO: Playwright framework repo URL",
    live: "TODO: Playwright framework report/live URL",
  },
  {
    id: "api-test-suite",
    title: "API test suite",
    status: "in-progress",
    problem:
      "APIs break quietly when contracts drift. This suite covers functional, negative and schema-contract tests for a REST API, runnable locally and in CI.",
    stack: ["TypeScript", "Playwright API testing", "JSON Schema"],
    result: "TODO: API test suite result",
    repo: "TODO: API test suite repo URL",
    live: "TODO: API test suite report/live URL",
  },
  {
    id: "github-actions-pipeline",
    title: "GitHub Actions CI/CD pipeline",
    status: "in-progress",
    problem:
      "Tests only help if they run on every change and report fast. This pipeline shows lint, type-check, sharded parallel tests, caching and published reports.",
    stack: ["GitHub Actions", "Playwright", "Node.js"],
    result: "TODO: CI/CD pipeline result",
    repo: "TODO: CI/CD pipeline repo URL",
    live: "TODO: CI/CD pipeline live URL",
  },
  {
    id: "k6-performance",
    title: "Performance testing with k6",
    status: "in-progress",
    problem:
      "Performance regressions are usually found by users first. This project defines load, stress and soak scenarios with p95 thresholds that fail the build when breached.",
    stack: ["k6", "JavaScript", "GitHub Actions"],
    result: "TODO: k6 performance testing result",
    repo: "TODO: k6 performance testing repo URL",
    live: "TODO: k6 performance testing report/live URL",
  },
  {
    id: "llm-eval-harness",
    title: "LLM evaluation harness",
    status: "in-progress",
    problem:
      "LLM features change behaviour without a code change. This harness applies regression-testing discipline to them: versioned test sets, scored evaluations and CI gates.",
    stack: ["TypeScript", "LLM APIs", "Vitest", "GitHub Actions"],
    result: "TODO: LLM evaluation harness result",
    repo: "TODO: LLM evaluation harness repo URL",
    live: "TODO: LLM evaluation harness live URL",
  },
];
