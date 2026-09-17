const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/LoginPage");

test.describe("SauceDemo Login Tests", () => {
  let loginPage;

  // Runs before EVERY test block below
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // 1. Positive Test Case
  test("Successful login with valid credentials", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    // Assertion: Check if header contains "Products"
    await expect(page.locator(".title")).toHaveText("Products");
  });

  // 2. Negative Test Case 1
  test("Error message when user is locked out", async () => {
    await loginPage.login("locked_out_user", "secret_sauce");
    // Assertion: Verify error message
    await expect(loginPage.errorMessage).toContainText(
      "Sorry, this user has been locked out.",
    );
  });

  // 3. Negative Test Case 2
  test("Error message when password is wrong", async () => {
    await loginPage.login("standard_user", "wrong_password");
    // Assertion: Verify invalid password message
    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match",
    );
  });
});
