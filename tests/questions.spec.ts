import { expect } from "@playwright/test";
import { test } from "./loginWithClerk";

test("Create a question", async ({ page }) => {
  await page.getByRole("button", { name: "Ask a Question" }).click();
  await page.getByLabel("Question Title *").click();
  await page.getByLabel("Question Title *").fill("why does this also happen ");
  await page
    .frameLocator('iframe[title="Rich Text Area"]')
    .locator("html")
    .click();

  await page.getByLabel("Insert/edit code sample").click();
  await page.getByLabel("Language").click();
  await page.getByText("JavaScript").click();
  await page.getByLabel("Code view").click();
  await page
    .getByLabel("Code view")
    .fill(
      "const { chromium } = require('@playwright/test');\n\nasync function globalSetup() {\n  const browser = await chromium.launch();\n  const page = await browser.newPage();\n  await page.goto('https://yourapp.com/login');\n  await page.fill('input[name=\"username\"]', 'yourUsername');\n  await page.fill('input[name=\"password\"]', 'yourPassword');\n  await page.click('text=Login');"
    );

  await page.getByRole("button", { name: "Save" }).click();
  await page.getByPlaceholder("Add tags...").click();
  await page.getByPlaceholder("Add tags...").fill("HTML");
  await page.getByPlaceholder("Add tags...").press("Enter");
  await page.getByPlaceholder("Add tags...").fill("CSS");
  await page.getByPlaceholder("Add tags...").press("Enter");
  await page.getByPlaceholder("Add tags...").fill("ReactJS");
  await page.getByPlaceholder("Add tags...").press("Enter");
  await page.locator("form").click();
  await page
    .frameLocator('iframe[title="Rich Text Area"]')
    .locator("html")
    .click();
  await page.getByRole("button", { name: "Ask a Question" }).click();

  await expect(
    page.getByRole("heading", { name: "All Questions" })
  ).toBeVisible();
});

test("Edit a question", async ({ page }) => {
  await page.getByRole("link", { name: "Profile Profile" }).click();
  await page.getByRole("img", { name: "Edit" }).first().click();
  await page.getByLabel("Question Title *").click();
  await page.getByLabel("Question Title *").fill("jnjhbhjnjjhjjhn bhjbbbbhj ");
  await page.getByRole("button", { name: "Edit Question" }).click();

  await expect(
    page.locator("li", { hasText: "Question edited successfully" })
  ).toBeVisible();
});

test("delete a question", async ({ page }) => {
  await page.getByRole("link", { name: "Profile Profile" }).click();
  await page.getByRole("img", { name: "Delete" }).first().click();
});

test("Upvote a question", async ({ page }) => {
  await page.getByTestId("question-list").getByRole("heading").first().click();

  const upvoteButton = page.locator("img#upvote").first();
  const src = await upvoteButton.getAttribute("src");

  await upvoteButton.click();

  const upvoteLocator = await page.locator("p#upvotes").first().innerHTML();
  let totalUpvotes = Number(upvoteLocator);

  if (src === "/assets/icons/upvote.svg") {
    await expect(
      page.locator("li", { hasText: "Upvote Successful" })
    ).toBeVisible();
    expect(totalUpvotes).toBe(totalUpvotes++);
  } else {
    await expect(
      page.locator("li", { hasText: "Upvote Removed" })
    ).toBeVisible();
    expect(totalUpvotes).toBe(totalUpvotes--);
  }
});

test("Downvote a question", async ({ page }) => {
  await page.getByTestId("question-list").getByRole("heading").first().click();

  const downvoteButton = page.locator("img#downvote").first();
  const src = await downvoteButton.getAttribute("src");

  await downvoteButton.click();

  const downvoteLocator = await page.locator("p#downvotes").first().innerHTML();
  let totalDownvotes = Number(downvoteLocator);

  if (src === "/assets/icons/downvote.svg") {
    await expect(
      page.locator("li", { hasText: "Downvote Successful" })
    ).toBeVisible();
    expect(totalDownvotes).toBe(totalDownvotes++);
  } else {
    await expect(
      page.locator("li", { hasText: "Downvote Removed" })
    ).toBeVisible();
    expect(totalDownvotes).toBe(totalDownvotes--);
  }
});

test("Save question to collection", async ({ page }) => {
  await page.goto("/");
  page.getByTestId("question-list").getByRole("heading").first().click();

  const saveButton = page.locator("img#saved").first();
  const src = await saveButton.getAttribute("src");

  await saveButton.click();

  if (src === "/assets/icons/star-red.svg") {
    await expect(
      page.locator("li", { hasText: "Question saved in your collection" })
    ).toBeVisible();
  } else {
    await expect(
      page.locator("li", { hasText: "Question removed from your collection" })
    ).toBeVisible();
  }
});
