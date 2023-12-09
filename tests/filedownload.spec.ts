import { test, expect } from "@playwright/test";
import * as fs from "fs";
test("download the file from the website", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/download");

  // download promise
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    await page.getByText("example.json").click(),
  ]);

  // file name
  const fileName = download.suggestedFilename();
  const filePath = "downloads/" + fileName;
  await download.saveAs(filePath);
  expect(fs.existsSync(filePath)).toBe(true);

  const expected = {
    name: "Using fixtures to represent data",
    email: "hello@cypress.io",
    body: "Fixtures are a great way to mock data for responses to routes",
  };

  fs.readFile("../downloads/example.json", (err, actualData) => {
    //if (err) throw new Error();
    // const actual = JSON.stringify(actualData);
    // expect(actual).toEqual(JSON.stringify(expected));

    console.log(actualData);
  });

  await page.close();
});
