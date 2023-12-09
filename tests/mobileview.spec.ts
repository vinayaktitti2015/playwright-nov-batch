import { test, expect } from "@playwright/test";

test("check orangeHRM login on diff mobiles", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator('[name="username"]').fill("Admin");
  await page.locator('[name="password"]').fill("admin123");
  await page.locator('[type="submit"]').click();
  await expect(page.getByText("Dashboard").last()).toBeVisible();
});
