class LoginPage {
  constructor(page) {
    this.page = page;
    // HTML Locators for elements on SauceDemo
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Action 1: Open SauceDemo site
  async navigate() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  // Action 2: Fill credentials and click login
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
