const { test, expect } = require("@playwright/test");

test.describe("SauceDemo Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/", { waitUntil: "networkidle" });
  });

  test("Successful login with valid credentials", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Verify navigation to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("Error message when user is locked out", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("locked_out_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });

  test("Error message when password is wrong", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("wrong_password");
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
});
