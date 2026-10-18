import { test as base } from "@e2e/shared/support/fixtures";
import { ResumeLink } from "./resume-link.component";
import { ResumeApi } from "./resume.api";

export const test = base.extend<{ resumeLink: ResumeLink; resumeApi: ResumeApi }>({
  resumeLink: async ({ page }, use) => {
    await use(new ResumeLink(page));
  },
  resumeApi: async ({ request }, use) => {
    await use(new ResumeApi(request));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { MIN_PDF_BYTES } from "./resume.data";
