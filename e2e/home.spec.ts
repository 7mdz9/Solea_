import { expect, test } from "@playwright/test";

test("home responds", async ({ request }) => {
  const response = await request.get("/");

  expect(response.ok()).toBe(true);
});
