import { experience } from "../src/content/experience";
import { projects } from "../src/content/projects";
import { skills } from "../src/content/skills";
import { ROUTES, expect, test } from "./fixtures";

test.describe("every page loads", () => {
  for (const route of ROUTES) {
    test(`${route.path} renders with a heading, title and landmarks`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.h1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Santhosh Burugupally/);
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /^.{50,160}$/,
      );
    });
  }
});

test("home shows the positioning, CTAs and outcomes", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/Forward Deployed Engineering/).first()).toBeVisible();
  for (const name of ["Download resume", /^GitHub/, /^LinkedIn/, "Email"]) {
    await expect(page.getByRole("main").getByRole("link", { name })).toBeVisible();
  }
  await expect(page.getByRole("heading", { name: "Selected outcomes" })).toBeVisible();
});

test("experience lists every role from the content file, newest first", async ({ page }) => {
  await page.goto("/experience/");
  const roles = page.getByTestId("role");
  await expect(roles).toHaveCount(experience.length);
  for (const [index, role] of experience.entries()) {
    await expect(roles.nth(index).getByRole("heading", { level: 2 })).toHaveText(role.title);
    await expect(roles.nth(index)).toContainText(role.company);
  }
  await expect(roles.first()).toContainText("Present");
});

test("skills shows every group", async ({ page }) => {
  await page.goto("/skills/");
  for (const group of skills) {
    await expect(page.getByRole("heading", { level: 2, name: group.title })).toBeVisible();
  }
});

test("projects renders a card per project with all required fields", async ({ page }) => {
  await page.goto("/projects/");
  const cards = page.getByTestId("project-card");
  await expect(cards).toHaveCount(projects.length);
  for (const [index, project] of projects.entries()) {
    const card = cards.nth(index);
    await expect(card.getByRole("heading", { name: project.title })).toBeVisible();
    await expect(card).toContainText(project.status === "in-progress" ? "In progress" : "Complete");
    for (const field of ["Problem", "Stack", "Result"]) await expect(card).toContainText(field);
    await expect(card).toContainText(/Repo/);
    await expect(card).toContainText(/Live/);
  }
});

test("writing lists posts that open", async ({ page }) => {
  await page.goto("/writing/");
  const firstPost = page.getByTestId("post").first().getByRole("link");
  const title = await firstPost.textContent();
  await firstPost.click();
  await expect(page).toHaveURL(/\/writing\/[a-z0-9-]+\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(title ?? "");
});

test("contact page has a mailto link", async ({ page }) => {
  await page.goto("/contact/");
  await expect(page.getByRole("link", { name: /@gmail\.com/ })).toHaveAttribute(
    "href",
    /^mailto:[^@\s]+@[^@\s]+\.[a-z]+$/,
  );
});

test.describe("404", () => {
  // A separate page, so the expected 404 console error doesn't trip the fixture.
  test("unknown routes return the custom 404 page", async ({ browser }) => {
    const page = await browser.newPage();
    const response = await page.goto("/does-not-exist/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/didn't pass its tests/);
    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL(/\/$/);
    await page.close();
  });
});
