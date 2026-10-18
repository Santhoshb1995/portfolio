import { test as base } from "@e2e/shared/support/fixtures";
import { SkillsPage } from "./skills.page";

export const test = base.extend<{ skillsPage: SkillsPage }>({
  skillsPage: async ({ page }, use) => {
    await use(new SkillsPage(page));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { skills } from "@/content/skills";
