import { expect, experience, test } from "./support/fixtures";

test("experience lists every role from the content file, newest first", async ({
  experiencePage,
}) => {
  await experiencePage.goto();
  await expect(experiencePage.roles).toHaveCount(experience.length);

  for (const [index, role] of experience.entries()) {
    const entry = experiencePage.role(index);
    await expect(entry.title).toHaveText(role.title);
    await expect(entry.root).toContainText(role.company);
  }
  await expect(experiencePage.role(0).root).toContainText("Present");
});
