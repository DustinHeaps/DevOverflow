import { expect } from "@playwright/test";
import { test } from "./loginWithClerk";

test("Answer a question", async ({ page }) => {
  await page.getByTestId("question-list").getByRole("heading").first().click();
  await page
    .getByRole("link", {
      name: "Anchor scrolling position is wrong because of dynamic content",
      exact: true,
    })
    .click();
  await page
    .frameLocator('iframe[title="Rich Text Area"]')
    .getByLabel("Rich Text Area. Press ALT-0")
    .fill(" frnf. frtej ghjtrg trg tnfenc");
  await page.getByRole("button", { name: "Submit" }).click();
});

test("Upvote an answer", async ({ page }) => {
  await page.getByTestId("question-list").getByRole("heading").first().click();

  const upvoteButton = page
    .getByRole("article")
    .getByRole("img", { name: "upvote" })
    .first();

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

test("Downvote an answer", async ({ page }) => {
  await page.getByTestId("question-list").getByRole("heading").first().click();

  const downvoteButton = page
    .getByRole("article")
    .getByRole("img", { name: "downvote" })
    .first();

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
