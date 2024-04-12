import { test, expect } from "@playwright/test";
require("dotenv").config();

test("Example test.", async ({ page }) => {
  // Navigate to the local development server where your React app is running
  await page.goto(process.env.REACT_APP_URL);

  // Wait for the app to load
  await page.waitForLoadState("domcontentloaded");

  // Example: Check if the title of the page matches your expectation
  const title = await page.title();
  expect(title).toBe("cs732-careless-crayfish");

  // Example: Check if a specific element with a certain text content is present
  const element = await page.$("h1");
  const textContent = await element.textContent();
  expect(textContent).toContain("Sign in");
});
