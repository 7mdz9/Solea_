import { expect, test } from "@playwright/test";

const adminPassword =
  process.env.E2E_ADMIN_PASSWORD ??
  (() => {
    throw new Error("E2E_ADMIN_PASSWORD is required for admin tests.");
  })();

const menuItems = [
  ["Truffle Mushroom Toast on Milk Bread", "AED 38"],
  ["Roasted Leek, Feta & Spinach Quiche", "AED 34"],
  ["Tomato Tatin Puff", "AED 32"],
  ["Zaatar & Labneh Laminated Brioche", "AED 30"],
  ["Pistachio Raspberry Tart", "AED 36"],
  ["Coconut Strawberry Shortcake", "AED 32"],
  ["The Peanut", "AED 34"],
  ["Lemon Yuzu Madeleine", "AED 18"],
];

test("root redirects to menu", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/menu$/);
});

test("menu shows sections, all items, and inert cart flow", async ({
  page,
}) => {
  await page.goto("/menu", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "SAVORY" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "SWEET" })).toBeVisible();

  for (const [name, price] of menuItems) {
    await expect(page.getByText(name)).toBeVisible();
    await expect(page.getByText(price).first()).toBeVisible();
  }

  await page
    .locator("[data-menu-item-control]")
    .nth(0)
    .getByRole("button", {
      name: "Add to cart",
    })
    .click();
  await page
    .locator("[data-menu-item-control]")
    .nth(4)
    .getByRole("button", {
      name: "Add to cart",
    })
    .click();

  await expect(page.getByText("2 items")).toBeVisible();
  await expect(page.getByText("AED 74").first()).toBeVisible();

  await page.getByRole("button", { name: "View order" }).click();
  const drawer = page.getByRole("dialog", { name: "Your order" });
  await expect(drawer).toBeVisible();
  await expect(
    drawer.getByText("Truffle Mushroom Toast on Milk Bread"),
  ).toBeVisible();
  await expect(drawer.getByText("Pistachio Raspberry Tart")).toBeVisible();

  await drawer.getByRole("button", { name: "Increase" }).first().click();
  await expect(drawer.getByText("AED 112")).toBeVisible();
  await drawer.getByRole("button", { name: "Decrease" }).first().click();
  await expect(drawer.getByText("AED 74")).toBeVisible();

  const beforePayUrl = page.url();
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await drawer.getByRole("button", { name: "Pay" }).click();

  await expect(
    drawer.getByText(
      "Online payment is coming soon. Secure checkout will be available shortly — please pay at the counter for now. Thank you.",
    ),
  ).toBeVisible();
  await page.waitForTimeout(250);
  expect(page.url()).toBe(beforePayUrl);
  expect(requests.filter((url) => !url.includes("/_next/"))).toEqual([]);
});

test("admin QR is gated and exports PDF with credentials", async ({ page }) => {
  const blocked = await page.goto("/admin/qr", {
    waitUntil: "domcontentloaded",
  });

  expect(blocked?.status()).toBe(401);
  expect(blocked?.headers()["www-authenticate"]).toContain(
    'Basic realm="Solea Admin"',
  );

  await page.setExtraHTTPHeaders({
    Authorization:
      "Basic " + Buffer.from(`admin:${adminPassword}`).toString("base64"),
  });
  const allowed = await page.goto("/admin/qr", { waitUntil: "networkidle" });

  expect(allowed?.status()).toBe(200);
  await expect(page.getByText(/Menu QR Studio/i)).toBeVisible();

  await page.getByRole("button", { name: "Generate code" }).click();
  await expect(page.getByText("Added the menu code.")).toBeVisible();
  await expect(page.getByText("1 code")).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Export PDF" }).click(),
  ]);

  expect(download.suggestedFilename()).toBe("solea-qr-codes.pdf");
  await expect(page.getByText("Exported 12 copies to PDF.")).toBeVisible();
});
