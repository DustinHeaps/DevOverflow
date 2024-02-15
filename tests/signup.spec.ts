import { test, expect } from "@playwright/test";

test("User Signup", async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('test+clerk_test@test.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('BHBH678yrhu43');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByLabel('Enter verification code.').fill('424242');

  await expect(page.getByRole('heading', { name: 'All Questions' })).toBeVisible();


});

