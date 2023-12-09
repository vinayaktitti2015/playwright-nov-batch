import { test, expect } from "@playwright/test";
import fs from "fs";

// let response;
test("should fetch the list of products", async ({ request }) => {
  const getProducts = await request.get("https://dummyjson.com/products", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${process.env.API_TOKEN}`,
    },
  });
  expect(getProducts.status()).toBe(200);
  const response = await getProducts.json();

  console.log(response);
  expect(response.products[0].title).toBe("iPhone 9");
  expect(response.products[0].description).toBe(
    "An apple mobile which is nothing like apple"
  );
  expect(response.products[0].price).toBe(549);

  fs.writeFileSync("../../testdata/products.json", response);
});
