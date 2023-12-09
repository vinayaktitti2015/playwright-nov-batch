import { test, expect, Page } from "@playwright/test";
import moment from "moment";
test("should fill the date", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo"
  );

  let date = "10/10/2015";
  await page.locator("#birthday").fill(date);
  await page.waitForTimeout(3000);
});

// Function to select a date from the date picker
async function selectStartDate(page: Page, dateToSelect: string) {
  await page.click("//input[@placeholder='Start date']");

  const mmYY = page.locator(
    "(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]"
  );
  const prev = page.locator(
    "(//table[@class='table-condensed']//th[@class='prev'])[1]"
  );
  const next = page.locator(
    "(//table[@class='table-condensed']//th[@class='next'])[1]"
  );

  // let dateToSelect: string = "May 2019";
  const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();
  console.log("this month? " + thisMonth);
  while ((await mmYY.textContent()) != dateToSelect) {
    if (thisMonth) {
      await prev.click();
    } else {
      await next.click();
    }
  }
  await page.click("//td[@class='day'][text()='4']");
}

async function selectEndDate(page: Page, dateToSelect: string) {
  await page.click("//input[@placeholder='End date']");

  const mmYY = page.locator(
    "(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]"
  );
  const prev = page.locator(
    "(//table[@class='table-condensed']//th[@class='prev'])[1]"
  );
  const next = page.locator(
    "(//table[@class='table-condensed']//th[@class='next'])[1]"
  );

  // let dateToSelect: string = "May 2019";
  const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();
  console.log("this month? " + thisMonth);
  while ((await mmYY.textContent()) != dateToSelect) {
    if (thisMonth) {
      await prev.click();
    } else {
      await next.click();
    }
  }
  await page.click("//td[@class='day'][text()='4']");
}

test.only("should select the date by using widget", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo"
  );

  //const selectedDate = new Date(2015, 10, 15);
  await selectStartDate(page, "May 2015");
  await page.waitForTimeout(3000);

  await selectEndDate(page, "July 2024");

  await page.locator('#header').click()
  await page.waitForTimeout(5000);
});
