import {
  test,
  expect,
  chromium,
  firefox,
  webkit,
  Browser,
} from "@playwright/test";

test("should switch to the table", async ({ browser }) => {
  // browser context switch
  //const browser = await chromium.launch();
  //let browser: Browser;

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://phptravels.com/demo");

  const [newTab] = await Promise.all([
    context.waitForEvent("page"),
    page.getByText("Login").first().click(),
  ]);

  // switch to the new tab
  await newTab.waitForLoadState("load");
  await newTab.bringToFront();

  // after switch to the new tab and dp the events
  await newTab.locator("#inputEmail").fill("admin@yahoo.com");
  await newTab.locator("#inputPassword").fill("admin@yahoo.com");
  await newTab.locator("#login").click();

  // close the tab
  await newTab.close();

  // switch to main page
  await expect(page.getByText("Instant demo request form")).toBeVisible();
});
