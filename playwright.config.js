// playwright.config.js
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: process.env.CI ? 1 : undefined, // Forces 1 worker on CI to avoid rate limiting
  use: {
    baseURL: "https://www.saucedemo.com",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
