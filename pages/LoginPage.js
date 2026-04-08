const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;

        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = '.error-message-container';
        this.logo = '//div[@class="login_logo"]';
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async clickLoginWithoutCredentials() {
        await this.page.click(this.loginButton);
    }

    async validateLoginPageLoaded() {
        await expect(this.page.locator(this.logo)).toBeVisible();
        await expect(this.page.locator(this.loginButton)).toBeVisible();
    }

    async validateErrorMessageContains(text) {
        await expect(this.page.locator(this.errorMessage)).toContainText(text);
    }

    getErrorMessage() {
        return this.page.locator(this.errorMessage);
    }
}

module.exports = { LoginPage };