import { SignUp } from "@clerk/nextjs";
import { chromium, request, expect } from "@playwright/test";
import { test as base } from "@playwright/test";

// Define a new fixture
export const test = base.extend({
  // Extend the `page` fixture to include login logic
  page: async ({ page }, use) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByLabel("Email address or username").click();
    await page.getByLabel("Email address or username").fill("testuser");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.getByLabel("Password", { exact: true }).click();
    await page.getByLabel("Password", { exact: true }).fill("BHBH678yrhu43");
    await page.getByRole("button", { name: "Continue", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: "All Questions" })
    ).toBeVisible();

    // Now use the page in the test with the user logged in
    await use(page);
  },
});
