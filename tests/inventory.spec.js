const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Inventory Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('should display inventory page correctly', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.validateInventoryPageLoaded();
        await inventoryPage.validateProductCount(6);
        await inventoryPage.validateFirstProductNameIsVisible();
        await inventoryPage.validateFirstProductPriceIsVisible();
    });

    test('should add first product to cart successfully', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addFirstProductToCart();
        await inventoryPage.validateCartBadgeCount('1');
        await inventoryPage.openCart();

        await cartPage.validateCartPageLoaded();
        await cartPage.validateCartItemCount(1);
        await cartPage.validateFirstCartItemNameIsVisible();
        await cartPage.validateFirstCartItemPriceIsVisible();
    });

    test('should remove first product from inventory page', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addFirstProductToCart();
        await inventoryPage.validateCartBadgeCount('1');

        await inventoryPage.removeFirstProductFromCart();
        await inventoryPage.validateCartBadgeIsHidden();

        await test.step('Validate cart badge is no longer visible', async () => {
            await page.waitForTimeout(500);
        });
    });

    test('should sort products by Name (A to Z)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortByVisibleText('Name (A to Z)');
        await inventoryPage.validateFirstProductNameIsVisible();
    });

    test('should sort products by Price (low to high)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortByVisibleText('Price (low to high)');
        await inventoryPage.validateFirstProductPriceIsVisible();
    });
});