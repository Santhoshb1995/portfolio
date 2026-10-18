import { POST_URL, expect, test } from "./support/fixtures";

test("writing lists posts that open", async ({ writingPage }) => {
  await writingPage.goto();
  const title = await writingPage.openFirstPost();
  await expect(writingPage.page).toHaveURL(POST_URL);
  await expect(writingPage.heading).toHaveText(title);
});
