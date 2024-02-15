import { test as setup, expect } from "@playwright/test";

setup("do login", async ({ page }) => {
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
});
