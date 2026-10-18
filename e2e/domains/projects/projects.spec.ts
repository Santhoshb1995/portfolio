import { CARD_FIELDS, STATUS_LABEL, expect, projects, test } from "./support/fixtures";

test("projects renders a card per project with all required fields", async ({ projectsPage }) => {
  await projectsPage.goto();
  await expect(projectsPage.cards).toHaveCount(projects.length);

  for (const [index, project] of projects.entries()) {
    const card = projectsPage.card(index);
    await expect(card.title(project.title)).toBeVisible();
    await expect(card.root).toContainText(STATUS_LABEL[project.status]);
    for (const field of CARD_FIELDS) await expect(card.root).toContainText(field);
  }
});
