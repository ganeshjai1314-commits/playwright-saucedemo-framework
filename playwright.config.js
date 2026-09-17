const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  reporter: "html", // Tells Playwright to save an HTML report
  use: {
    headless: false, // Runs all UI tests in a visible browser automatically
    launchOptions: {
      slowMo: 1000, // Pauses 1000ms (1 second) between every action
    },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});
