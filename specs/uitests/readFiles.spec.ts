import { test, expect } from "@playwright/test";
var fs = require("fs");

test("should read the files in the directory", async ({ page }) => {
  fs.readFile("../testdata/formdata.json", function (err, data) {
    try {
      const jsonData = JSON.parse(data);
      console.log("read data: " + jsonData.name + " " + jsonData.email);
    } catch (parseError) {
      throw new Error(parseError);
    }
  });
});

test.only("should write the contents to the file", async ({ page }) => {
  fs.writeFile(
    "../testdata/user.txt",
    'Playwright tests',
    function (err, data) {
      if (err) {
        throw err;
      }
    }
  );
});
