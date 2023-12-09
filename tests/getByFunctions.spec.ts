import { test, expect } from "@playwright/test";

// test suite
test.describe("get by functions usage suite", () => {
  // test cases
  test("getByAlt function usage", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/");

    const altLabel = page.getByAltText("Picture for category Electronics");
    await expect(altLabel).toBeVisible();

    await page.close();
  });

  test("getByText function usage", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/");

    const textLabel = page.getByText("Computers").first();
    await expect(textLabel).toBeVisible();

    const textHREF = await page
      .getByText("Computers")
      .first()
      .getAttribute("href");
    expect(textHREF).toContain("/laptops");

    const srcLink = await page
      .getByAltText("nopCommerce demo store")
      .getAttribute("src");
    expect(srcLink).toContain(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/logo.png"
    );

    await page.close();
  });

  test("getByTestID attribute usage", async ({ page }) => {
    await page.goto("https://www.iproperty.com.my/");

    try {
      // if static popup appears in the page then close the popup
      await page.locator(".ab-close-button").click();
    } catch (e) {
      console.warn(e);
    }

    await page.getByTestId("select-area").getByText("Selangor").click();
    await page.getByTestId("minPrice").click();

    // intermittent popup appears in the page
    const popupPromise = await page.waitForEvent("popup");
    const popup = popupPromise;
    await popup.close();
  });
});
