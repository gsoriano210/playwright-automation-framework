const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('invalid login shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'wrong_password');

    await expect(loginPage.getErrorMessage()).toContainText('Epic sadface');
});