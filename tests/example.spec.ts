import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://localhost:3000/sign-in");

  await page.getByTestId("sign-in-google-btn").click();
  await page.waitForURL(/^https:\/\/accounts\.google\.com\/.*/);

  await page.fill('input[name="identifier"]', "oskar.eriksson@my-team.com");

  await page.getByText("Next").click();

  await page.waitForURL(/^https:\/\/accounts\.google\.com\/.*/);

  await page.fill('input[name="password"]', "@%3#!5&p9)NqC)3");

  await page.getByText("Next").click();

  await page.waitForURL(/^http:\/\/localhost:3000\/.*/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});
