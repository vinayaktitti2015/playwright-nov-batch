import { test, expect } from "@playwright/test";
import { GlobalSQAPage } from "../../pages/globalsqaPage.po";
const data = require("../../testdata/formdata.json");
test.describe("form submission", function () {
  const BASE_URL = process.env.URL;
  test("should fill the form", async ({ page }) => {
    const globalsqaPage = new GlobalSQAPage(page);
    await globalsqaPage.goto(BASE_URL || "");
    await globalsqaPage.formSubmission();

    // verify assertions
    await this.page.waitForLoadState("domcontentloaded");
    const message = this.page.getByText(data.message);
    await expect(message).toBeVisible();
  });
});
