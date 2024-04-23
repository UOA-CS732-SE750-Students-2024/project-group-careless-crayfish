import { test, expect } from "@playwright/test";
require("dotenv").config();

console.log(`REACT_APP_URL: ${process.env.REACT_APP_URL}`);

async function skipSignIn(page) {
  // Skip signin
  const signInButton = await page.$("#skip-sign-in");
  if (signInButton) {
    await signInButton.click();
  }

  // Wait for the app to load
  await page.waitForLoadState("domcontentloaded");

  // Wait for 3 seconds
  await page.waitForTimeout(3000);

}

test("Landing page", async ({ page }) => {
  // Navigate to the local development server where your React app is running
  await page.goto(process.env.REACT_APP_URL+"/landing");

  // Wait for the app to load
  await page.waitForLoadState("domcontentloaded");

  // Skip signin
  await skipSignIn(page);

  // Check if a specific element is present
  const element = await page.$("#landing-restaurant");

  // Expect element exist
  expect(element).toBeTruthy();
});

test("Recommendation Options page", async ({ page }) => {
  // Navigate to the local development server where your React app is running
  await page.goto(process.env.REACT_APP_URL+"/recommend/restaurant-options");

  // Wait for the app to load
  await page.waitForLoadState("domcontentloaded");

  // Skip signin
  await skipSignIn(page);

  // Check if a specific element is present
  const element = await page.$("#age-group-label");
  // Expect element exist
  expect(element).toBeTruthy();
});

test("Restaurant recommendation page", async ({ page }) => {
  // Navigate to the local development server where your React app is running
  await page.goto(process.env.REACT_APP_URL+"/recommend/restaurants/auckland");

  // Wait for the app to load
  await page.waitForLoadState("domcontentloaded");

  // Skip signin
  await skipSignIn(page);

  // Check if a specific element is present
  const element = await page.$(".restaurant-element-button");

  // Expect element exist
  expect(element).toBeTruthy();
});