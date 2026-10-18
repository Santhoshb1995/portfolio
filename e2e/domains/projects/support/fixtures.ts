import { test as base } from "@e2e/shared/support/fixtures";
import { ProjectsPage } from "./projects.page";

export const test = base.extend<{ projectsPage: ProjectsPage }>({
  projectsPage: async ({ page }, use) => {
    await use(new ProjectsPage(page));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { projects } from "@/content/projects";
export { CARD_FIELDS, STATUS_LABEL } from "./projects.data";
