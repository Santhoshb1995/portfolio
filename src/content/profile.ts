import type { Profile } from "./types";

/**
 * Who I am. Every claim here comes from SB_Resume.pdf (the source of truth)
 * or was confirmed directly. Edit freely — no UI code needs to change.
 */
export const profile: Profile = {
  name: "Santhosh Burugupally",
  role: "Senior SDET",
  location: "Vancouver, BC",
  email: "burugupallysanthosh@gmail.com",
  headline: "Senior SDET building reliable, AI-assisted test automation.",
  positioning:
    "8+ years turning enterprise SaaS releases into predictable, well-tested deliveries — and now heading toward Forward Deployed Engineering, where integrating systems and working closely with the people who use them matter as much as the code.",
  about: [
    "I'm a Senior SDET with 8+ years of quality engineering experience, currently at Global Relay. I design and maintain TypeScript test automation frameworks for enterprise-grade SaaS platforms — Playwright, Cypress and Selenium for the UI, automated REST API suites underneath, and all of it wired into CI/CD pipelines on GitHub Actions and Jenkins.",
    "Much of my work happens where systems meet: integrating test suites into delivery pipelines, building AWS and Docker test infrastructure, and partnering with product managers, developers and DevOps to turn requirements into testable acceptance criteria and clear go/no-go decisions.",
    "AI is now part of how I test. I use AI-assisted tools to generate test scripts and test data, and I'm building an LLM evaluation harness to bring the same regression discipline to AI features themselves.",
    "I also care about the people side of quality: mentoring engineers, reviewing automation code, and building a quality-first culture across teams.",
  ],
  lookingFor:
    "I'm moving toward Forward Deployed Engineering roles — bringing a quality-first mindset to integrating systems and shipping reliable software alongside customers.",
  links: {
    github: "https://github.com/Santhoshb1995",
    linkedin: "https://www.linkedin.com/in/santhosh-burugupally-4a79bb1a3/",
    resume: "/SB_Resume.pdf",
  },
  education: [
    {
      degree: "Master's in Software Engineering",
      school: "Concordia University",
      location: "Montreal, Canada",
    },
    {
      degree: "Bachelor's in Computer Science",
      school: "Sreenidhi Institute of Science and Technology",
      location: "Hyderabad, India",
    },
  ],
  certifications: [
    { name: "ISTQB Certified Tester – Foundation Level", status: "earned" },
    { name: "Cypress & Playwright Advanced Automation", status: "earned" },
    { name: "AWS Certified Cloud Practitioner", status: "in-progress" },
  ],
};
