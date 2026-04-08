const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { testData } = require('../utils/testData');

test.describe('Login Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.validateLoginPageLoaded();
        await loginPage.login(testData.validUser.username, testData.validUser.password);

        await inventoryPage.validateInventoryPageLoaded();
    });

    test('should show error with locked out user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.validateLoginPageLoaded();
        await loginPage.login(testData.lockedOutUser.username, testData.lockedOutUser.password);

        await loginPage.validateErrorMessageContains(testData.errorMessages.lockedOutUser);
    });

    test('should show error with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);

        await loginPage.validateErrorMessageContains(testData.errorMessages.invalidCredentials);
    });

    test('should show error when username and password are empty', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.clickLoginWithoutCredentials();

        await loginPage.validateErrorMessageContains(testData.errorMessages.usernameRequired);
    });

    test('should show error when password is missing', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await page.fill('#user-name', testData.validUser.username);
        await page.click('#login-button');

        await loginPage.validateErrorMessageContains(testData.errorMessages.passwordRequired);
    });
});