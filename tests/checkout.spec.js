const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { testData } = require('../utils/testData');

test.describe('Checkout Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
    });

    test('should complete checkout successfully', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await inventoryPage.addFirstProductToCart();
        await inventoryPage.openCart();

        await cartPage.validateCartPageLoaded();
        await cartPage.clickCheckout();

        await checkoutPage.validateCheckoutInformationPageLoaded();
        await checkoutPage.fillCheckoutInformation(
            testData.checkoutInfo.firstName,
            testData.checkoutInfo.lastName,
            testData.checkoutInfo.postalCode
        );
        await checkoutPage.clickContinue();

        await checkoutPage.validateCheckoutOverviewPageLoaded();
        await checkoutPage.clickFinish();
        await checkoutPage.validateOrderSuccess();
    });

    test('should show error when checkout information is empty', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await inventoryPage.addFirstProductToCart();
        await inventoryPage.openCart();
        await cartPage.clickCheckout();
        await checkoutPage.clickContinue();

        await checkoutPage.validateErrorMessageContains(testData.errorMessages.firstNameRequired);
    });
});