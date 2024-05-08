const { test, expect } = require("@playwright/test");
require("dotenv").config();

test("test can login, see landing page and generate recommendations.", async ({
  page,
}) => {
  await page.goto(`${process.env.REACT_APP_URL}`);
  await page.evaluate(() => localStorage.clear());
  await page.evaluate(() => sessionStorage.clear());
  // Wait for the element containing the text "Google SSO Sign In" to be visible

  await page.waitForSelector("#google-sso-button");
  await page.click("#google-sso-button");

  await expect(page.getByText("Restaurant")).toBeTruthy();
  await expect(page.getByText("Club")).toBeTruthy();
  await expect(page.getByText("Art And History")).toBeTruthy();
  await expect(
    page.getByText("Searching for an outdoor spot to work out?")
  ).toBeTruthy();
  await expect(page.getByText("Movie")).toBeTruthy();
  await expect(
    page.getByText("Recommend me a awesome movie to watch!")
  ).toBeTruthy();
  await expect(page.getByText("Find me ...")).toBeTruthy();
  await expect(page.getByText("Mark Zhu")).toBeTruthy();
  await expect(page.getByText("Recommendation")).toBeTruthy();
  // can go to recommendation page for restaurant
  await page.click("#restaurant-recommendation-button");

  await expect(page.getByText("Select Dining Preferences")).toBeTruthy();
  await expect(page.getByText("Choose Your Dining Options")).toBeTruthy();
  await expect(page.getByText("Go Back")).toBeTruthy();
  await expect(page.getByText("Go Forward")).toBeTruthy();

  await expect(page.getByText("Mark Zhu")).toBeTruthy();

  // generate recommendations
  await page.click("#get-recommended-restaurant");
  await expect(
    page.getByText("Restaurant Recommendations for Auckland City")
  ).toBeTruthy();
  await expect(page.getByText("The French Cafe")).toBeTruthy();
  await expect(page.getByText("240 Parnell Road, Parnell")).toBeTruthy();
  await expect(page.getByText("Mexico")).toBeTruthy();
  await expect(page.getByText("210 Quay Street, Auckland CBD")).toBeTruthy();
  await expect(page.getByText("Coco's Cantina")).toBeTruthy();
  await expect(page.getByText("96 Symonds Street, Eden Terrace")).toBeTruthy();
  await expect(page.getByText("The Engine Room")).toBeTruthy();
  await expect(
    page.getByText("12 Customs Street East, Auckland CBD")
  ).toBeTruthy();

  //header
  await page.click("#demo-positioned-button");
  await expect(page.getByText("profile")).toBeTruthy();
  await expect(page.getByText("logout")).toBeTruthy();
});

test("test can login, see landing page, generate recommendations", async ({
  page,
}) => {
  await page.goto(`${process.env.REACT_APP_URL}`);
  await page.evaluate(() => localStorage.clear());
  await page.evaluate(() => sessionStorage.clear());
  // Wait for the element containing the text "Google SSO Sign In" to be visible

  await page.waitForSelector("#google-sso-button");
  await page.click("#google-sso-button");

  await expect(page.getByText("Restaurant")).toBeTruthy();
  await expect(page.getByText("Club")).toBeTruthy();
  await expect(page.getByText("Art And History")).toBeTruthy();
  await expect(
    page.getByText("Searching for an outdoor spot to work out?")
  ).toBeTruthy();
  await expect(page.getByText("Movie")).toBeTruthy();
  await expect(
    page.getByText("Recommend me a awesome movie to watch!")
  ).toBeTruthy();
  await expect(page.getByText("Find me ...")).toBeTruthy();
  await expect(page.getByText("Mark Zhu")).toBeTruthy();
  await expect(page.getByText("Recommendation")).toBeTruthy();
  // can go to recommendation page for restaurant
  await page.click("#restaurant-recommendation-button");

  await expect(page.getByText("Select Dining Preferences")).toBeTruthy();
  await expect(page.getByText("Choose Your Dining Options")).toBeTruthy();
  await expect(page.getByText("Go Back")).toBeTruthy();
  await expect(page.getByText("Go Forward")).toBeTruthy();

  await expect(page.getByText("Mark Zhu")).toBeTruthy();

  // generate recommendations
  await page.click("#get-recommended-restaurant");
  await expect(
    page.getByText("Restaurant Recommendations for Auckland City")
  ).toBeTruthy();
  await expect(page.getByText("The French Cafe")).toBeTruthy();
  await expect(page.getByText("240 Parnell Road, Parnell")).toBeTruthy();
  await expect(page.getByText("Mexico")).toBeTruthy();
  await expect(page.getByText("210 Quay Street, Auckland CBD")).toBeTruthy();
  await expect(page.getByText("Coco's Cantina")).toBeTruthy();
  await expect(page.getByText("96 Symonds Street, Eden Terrace")).toBeTruthy();
  await expect(page.getByText("The Engine Room")).toBeTruthy();
  await expect(
    page.getByText("12 Customs Street East, Auckland CBD")
  ).toBeTruthy();

  //header
  await page.click("#demo-positioned-button");
  await expect(page.getByText("profile")).toBeTruthy();
  await expect(page.getByText("logout")).toBeTruthy();
});
