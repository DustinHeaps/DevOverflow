import { expect } from "@playwright/test";
import { test } from "./loginWithClerk";

test("Edit profile", async ({ page }) => {
  await page.getByRole("link", { name: "Profile Profile" }).click();
  await page.getByRole("button", { name: "Edit Profile" }).click();
  await page.getByPlaceholder("Your name").click();
  await page.getByPlaceholder("Your name").fill("Joerffrfnjfenfje");
  await page.getByPlaceholder("Your username").click();
  await page.getByPlaceholder("Your username").fill("testuser");

  await page.getByPlaceholder("What's special about you?").click();
  await page
    .getByPlaceholder("What's special about you?")
    .fill("fnrejknfjkernfjkernjffewrewrwer");

  await page.getByRole("button", { name: "Save" }).click();

  await expect(
    page.locator("li", { hasText: "Profile updated successfully" })
  ).toBeVisible();
});
