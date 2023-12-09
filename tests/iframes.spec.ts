import { test, expect } from "@playwright/test";

test.describe("iframe suite", function () {
  test.beforeEach("open browser", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/frames");
  });

  test.afterEach("close browser", async ({ page }) => {
    await page.close();
  });

  test("should switch to iframe mode and enter the contents", async ({
    page,
  }) => {
    async function getIframe() {
      return await page.frameLocator("#mce_0_ifr");
    }

    await page.getByText("iFrame").click();
    await page.frameLocator("#mce_0_ifr").locator("#tinymce").clear();
    await page
      .frameLocator("#mce_0_ifr")
      .locator("#tinymce")
      .fill("playwright comments");
  });
});
