import { test, expect } from "@playwright/test";

const userData = [
  {
    username: "Admin1",
    password: "admin123",
  },
  {
    username: "Admin2",
    password: "admin1234",
  },
  {
    username: "Admin3",
    password: "admin123",
  },
];

userData.forEach((data) => {
  test(`verify login with multiple sets of credentials ${data.username}`, async ({
    page,
  }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );

    await page.locator('[name="username"]').fill(data.username);
    await page.locator('[name="password"]').fill(data.password);
    await page.locator('[type="submit"]').click();
    await expect(page.locator(".oxd-alert-content-text")).toHaveText(
      "Invalid credentials"
    );
  });
});
