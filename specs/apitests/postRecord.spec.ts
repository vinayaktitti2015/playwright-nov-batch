import { test, expect } from "@playwright/test";
import fs from "fs";
const payload = require("../../testdata/payload.json");

// let response;
test("should fetch the list of products", async ({ request }) => {
  const postMethod = await request.post("https://reqres.in/api/users", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${process.env.API_TOKEN}`,
    },
    data: {
      name: "morpheus",
      job: "Test Lead",
    },
  });

  try {
    expect(postMethod.status()).toBe(201);
    const response = await postMethod.json();

    console.log(response);
    expect(response.name).toBe("morpheus");
    expect(response.job).toBe("Test Lead");
  } catch (err) {
    throw new Error(err);
  }

  //   fs.writeFile("../../testdata/products.json", JSON.stringify(response), (err) => {
  //     if (err) {
  //       throw err;
  //     }
  //   });
});

test("should upload the payload from JSON file", async ({ request }) => {
  const postMethod = await request.post("https://reqres.in/api/users", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${process.env.API_TOKEN}`,
    },
    data: payload,
  });

  try {
    expect(postMethod.status()).toBe(201);
    const response = await postMethod.json();

    console.log(response);
    expect(response.name).toBe("morpheus");
    expect(response.job).toBe("Test Lead");
  } catch (err) {
    throw new Error(err);
  }

  //   fs.writeFile("../../testdata/products.json", JSON.stringify(response), (err) => {
  //     if (err) {
  //       throw err;
  //     }
  //   });
});
