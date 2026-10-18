import { expect, skills, test } from "./support/fixtures";

test("skills shows every group", async ({ skillsPage }) => {
  await skillsPage.goto();
  for (const group of skills) await expect(skillsPage.groupHeading(group.title)).toBeVisible();
});
