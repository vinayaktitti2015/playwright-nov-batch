import { test, expect } from "@playwright/test";
const testdata = require("../testdata/formdata.json");
import { faker } from "@faker-js/faker";

// test suite
test.describe("global sqa test", () => {
  // hooks
  test.beforeEach(async ({ page }) => {
    await page.goto("/samplepagetest/");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  // test cases
  test("should fill the form successfully", async ({ page }) => {
    const profilePic = page.locator("input[name='file-553']");
    const name = page.locator("#g2599-name");
    const email = page.locator("#g2599-email");
    const website = page.locator("#g2599-website");
    const experience = page.locator("#g2599-experienceinyears");
    const expertise = page.locator('[value="Automation Testing"]');
    const education = page.locator('[value="Post Graduate"]');
    const alert = page.locator('[onclick="myFunction()"]');
    const comments = page.locator("#contact-form-comment-g2599-comment");
    const submit = page.locator("button[type='submit']");

    // upload files
    await profilePic.setInputFiles(testdata.profilePic);

    const fullName = faker.person.fullName();
    console.log(fullName);
    const emailData = faker.internet.email();
    console.log(emailData);
    const websiteData = faker.internet.url();
    console.log(websiteData);

    // input event
    await name.fill(fullName);
    await email.fill(emailData);
    await website.fill(websiteData);

    // dropdown event
    await experience.selectOption(testdata.experience);

    // checkbox
    await expertise.check();

    // radio button
    await education.check();

    // alert box
    await alert.click();

    // switch to alerts
    page.on("dialog", async (dialog) => {
      await expect(dialog.message()).toEqual(
        "Do you really fill rest of the form?"
      );

      await dialog.accept();
      await dialog.accept();
    });

    // input comments
    await comments.fill(testdata.comments);

    // click event
    await submit.click();

    // verify assertions
    await page.waitForLoadState("domcontentloaded");
    const message = page.getByText(testdata.message);
    await expect(message).toBeVisible();
  });
});

/**
 * test suite
 * hooks/pre-conditions
 * test cases
 * post-conditions
 */
