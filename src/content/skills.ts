import type { SkillGroup } from "./types";

/** Skills from the resume's Core Competencies, grouped for the Skills page. */
export const skills: SkillGroup[] = [
  {
    id: "test-automation",
    title: "Test automation",
    description: "UI and API frameworks built for scale and maintainability.",
    skills: ["Playwright", "Cypress", "Selenium", "Postman", "REST Assured", "JMeter", "Locust"],
  },
  {
    id: "ai-in-testing",
    title: "AI in testing",
    description: "Using GenAI to speed up how tests and test data get written.",
    skills: ["AI-assisted test generation", "AI-generated test data", "Codex", "GenAI tooling"],
  },
  {
    id: "languages",
    title: "Languages & design",
    description: "Typed, reusable automation code.",
    skills: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Java",
      "Python",
      "SQL",
      "Page Object Model",
      "Factory pattern",
    ],
  },
  {
    id: "ci-cd",
    title: "CI/CD",
    description: "Fast, reliable feedback on every build.",
    skills: ["GitHub Actions", "Jenkins", "CircleCI", "GitLab CI"],
  },
  {
    id: "cloud",
    title: "Cloud & infrastructure",
    description: "Scalable, containerized test infrastructure.",
    skills: [
      "AWS (EC2, S3, Lambda)",
      "GCP",
      "Docker",
      "Microservices",
      "Containerized applications",
    ],
  },
  {
    id: "tools",
    title: "Tools & practices",
    description: "Test management, monitoring and ways of working.",
    skills: [
      "Jira",
      "TestRail",
      "Xray",
      "Zephyr",
      "Confluence",
      "Sentry",
      "Loggly",
      "Agile/Scrum",
      "TDD",
      "BDD",
    ],
  },
];
