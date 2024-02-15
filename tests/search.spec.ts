import { test, expect } from "@playwright/test";

test("Search for Questions", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Home" }).click();
  await page.getByPlaceholder("Search for questions").fill("anchor");
  await page.goto("/?q=anchor");
  const questionList = page.getByTestId("question-list");
  await expect(questionList).toHaveCount(1);

  // testing empty state
  await page.getByPlaceholder("Search for questions").fill("anchorfnjtrnvj");
  await page.goto("/?q=anchorfnjtrnvj");

  await expect(questionList).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: "There’s no question to show" })
  ).toBeVisible();
});

test("Search for Tags", async ({ page }) => {
  await page.goto("/tags");
  await page.getByPlaceholder("Search for tags").click();
  await page.getByPlaceholder("Search for tags").fill("Nextjs13");

  await page.goto("/tags/?q=Nextjs13");
  const tagList = page.getByTestId("tag-list");
  await expect(tagList).toHaveCount(1);

  // testing empty state
  await page.getByPlaceholder("Search for tags").fill("Nextjs13ggfttyh");
  await page.goto("/tags/?q=Nextjs13ggfttyh");
  await expect(
    page.getByRole("heading", { name: "No tags found" })
  ).toBeVisible();
});

test("Search for Users", async ({ page }) => {
  await page.goto("/community");
  await page.getByPlaceholder("Search for amazing minds").click();
  await page.getByPlaceholder("Search for amazing minds").fill("Dustin");

  await page.goto("/community/?q=Dustin");
  const userList = page.getByTestId("user-list");
  await expect(userList).toHaveCount(1);

  // testing empty state
  await page
    .getByPlaceholder("Search for amazing minds")
    .fill("Dustinfnjtrnvj");
  await page.goto("/community/?q=Dustinfnjtrnvj");
  await expect(
    page.getByRole("heading", { name: "No users found" })
  ).toBeVisible();
});

test("Search for jobs", async ({ page }) => {
  await page.goto("/jobs");

  await page.getByPlaceholder("Job Title, Company, or").click();
  await page.getByPlaceholder("Job Title, Company, or").fill("developer");

  await page.goto("/jobs/?q=developer");
  const jobsList = page.getByTestId("jobs-list");
  await expect(jobsList).toHaveCount(1);

  // testing empty state
  await page.getByPlaceholder("Job Title, Company, or").fill("developerz");
  await page.goto("/jobs/?q=developerz");
  await expect(
    page.getByRole("heading", { name: "No Jobs Found" })
  ).toBeVisible();
});
