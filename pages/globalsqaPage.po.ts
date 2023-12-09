import { expect, Page, Locator } from "@playwright/test";
const data = require("../testdata/formdata.json");
import "dotenv/config";

export class GlobalSQAPage {
  readonly page: Page;
  readonly profilePic: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly website: Locator;
  readonly experience: Locator;
  readonly expertise: Locator;
  readonly education: Locator;
  readonly alert: Locator;
  readonly comments: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profilePic = page.locator("input[name='file-553']");
    this.name = page.locator("#g2599-name");
    this.email = page.locator("#g2599-email");
    this.website = page.locator("#g2599-website");
    this.experience = page.locator("#g2599-experienceinyears");
    this.expertise = page.locator('[value="Automation Testing"]');
    this.education = page.locator('[value="Post Graduate"]');
    this.alert = page.locator('[onclick="myFunction()"]');
    this.comments = page.locator("#contact-form-comment-g2599-comment");
    this.submitButton = page.locator("button[type='submit']");
  }

  // stateless functions
  async goto(url: string) {
    await this.page.goto(url);
  }
  async formSubmission() {
    // upload files
    await this.profilePic.setInputFiles(data.profilePic);

    // input event
    await this.name.fill(data.name);
    await this.email.fill(data.email);
    await this.website.fill(data.website);

    // dropdown event
    await this.experience.selectOption(data.experience);

    // checkbox
    await this.expertise.check();

    // radio button
    await this.education.check();

    // alert box
    await this.alert.click();

    // switch to alerts
    this.page.on("dialog", async (dialog) => {
      await expect(dialog.message()).toEqual(
        "Do you really fill rest of the form?"
      );

      await dialog.accept();
      await dialog.accept();
    });

    // input comments
    await this.comments.fill(data.comments);

    // click event
    await this.submitButton.click();
  }
}
