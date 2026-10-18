import { MIN_PDF_BYTES, expect, test } from "./support/fixtures";

test.describe("resume download", () => {
  test("the link points at the PDF and offers a download", async ({
    sitePage,
    resumeLink,
    resumeApi,
  }) => {
    await sitePage.goto("/");
    await expect(resumeLink.link).toHaveAttribute("href", resumeApi.path);
    await expect(resumeLink.link).toHaveAttribute("download");
  });

  test("the PDF is served with the right type and real PDF bytes", async ({ resumeApi }) => {
    const file = await resumeApi.fetch();
    expect(file.status).toBe(200);
    expect(file.contentType).toContain("application/pdf");
    expect(file.body.subarray(0, 5).toString()).toBe("%PDF-");
    expect(file.body.length).toBeGreaterThan(MIN_PDF_BYTES);
  });

  test("clicking it downloads the file", async ({ sitePage, resumeLink, resumeApi }) => {
    await sitePage.goto("/contact/");
    const download = await resumeLink.download();
    expect(download.suggestedFilename()).toBe(resumeApi.filename);
    expect(await download.failure()).toBeNull();
  });
});
