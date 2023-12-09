import { test, expect } from "@playwright/test";

test("verify form field validations", async ({ page }) => {
  await page.goto("https://demo.nopcommerce.com/register?returnUrl=%2F");

  // store the form field locators
  const gender = await page.locator("#gender-male");
  const firstName = await page.locator("#FirstName");
  const firstNameError = await page.locator("#FirstName-error");
  const lastName = await page.locator("#LastName");
  const lastNameError = await page.locator("#LastName-error");

  const email = await page.locator("#Email");
  const password = await page.locator("#Password");
  const passwordConfirmation = await page.locator("#ConfirmPassword");

  const registerButton = await page.locator("#register-button");

  //   const firstNameInput = firstName.inputValue();
  //   await expect(firstNameInput).toEqual("");

  //   const lastNameInput = lastName.inputValue();
  //   await expect(lastNameInput).toEqual("");

  //   const emailInput = email.inputValue();
  //   await expect(emailInput).toEqual("");

  // click registration
  await registerButton.click();

  // assert fields exist on page or not
  await expect(gender).toBeVisible();

  // custom assertions
  if (gender == null) {
    throw new Error("Gender must be specified on page");
  }

  // default assertions - input fields exist on page
  await expect.soft(firstName).toBeVisible();
  await expect.soft(firstName).toBeEditable();
  await expect.soft(firstName).toBeTruthy();

  await expect(email).toBeVisible();

  // check error messages
  await expect.soft(firstNameError).toHaveText("First name is required.");
  await expect(lastNameError).toHaveText("Last name is required.");

  // fill the data fields
  await firstName.fill("james");
  await lastName.fill("doe");
  await email.fill("james@yahoo.com");

  const firstNameInput = await firstName.inputValue();
  await expect(firstNameInput).toEqual("james");

  const lastNameInput = await lastName.inputValue();
  await expect(lastNameInput).toEqual("doe");

  const emailInput = await email.inputValue();
  await expect(emailInput).toEqual("james@yahoo.com");
});

test.only("check input values", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  // xpath usage
  const username = page.locator("//input[@placeholder='Username']");
  const password = page.locator("//input[@placeholder='Password']");
  const login = page.locator("//button[normalize-space()='Login']");

  await username.fill("Admin");
  await password.fill("admin123");

  const usernameInput = await username.inputValue();
  await expect(usernameInput).toEqual("Admin");

  const passwordInput = await password.inputValue();
  await expect(passwordInput).toEqual("admin123");
});

test.only("check placeholders exist or not", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  // xpath usage
  const username = page.locator("//input[@placeholder='Username']");
  const password = page.locator("//input[@placeholder='Password']");
  const login = page.locator("//button[normalize-space()='Login']");

  const usernamePlaceholder = await username.getAttribute("placeholder");
  const passwordPlaceholder = await password.getAttribute("placeholder");

  expect(usernamePlaceholder).toEqual("Username");
  expect(passwordPlaceholder).toEqual("Password");
});
