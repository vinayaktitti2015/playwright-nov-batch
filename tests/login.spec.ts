import { test, expect } from "@playwright/test";

test("valid login", async ({ page }) => {
  // fixture
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.getByPlaceholder("Username").click();
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Username").press("Tab");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("heading", { name: "Dashboard" }).click();

  // add assertions here
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
