const { expect } = require('@playwright/test');

class InventoryPage {
    constructor(page) {
        this.page = page;

        // CSS locator
        this.inventoryItems = '.inventory_item';

        // ID locators
        this.sortDropdown = '.product_sort_container';

        // CSS locators
        this.cartBadge = '.shopping_cart_badge';
        this.cartLink = '.shopping_cart_link';
        this.inventoryTitle = '.title';

        // XPath locators
        this.firstAddToCartButton = '(//button[contains(text(),"Add to cart")])[1]';
        this.firstRemoveButton = '(//button[contains(text(),"Remove")])[1]';
        this.firstItemName = '(//div[@class="inventory_item_name "])[1]';
        this.firstItemPrice = '(//div[@class="inventory_item_price"])[1]';
    }

    async validateInventoryPageLoaded() {
        await expect(this.page).toHaveURL(/inventory/);
        await expect(this.page.locator(this.inventoryTitle)).toHaveText('Products');
        await expect(this.page.locator(this.inventoryItems).first()).toBeVisible();
    }

    async validateProductCount(expectedCount) {
        await expect(this.page.locator(this.inventoryItems)).toHaveCount(expectedCount);
    }

    async addFirstProductToCart() {
        await this.page.locator(this.firstAddToCartButton).click();
    }

    async removeFirstProductFromCart() {
        await this.page.locator(this.firstRemoveButton).click();
    }

    async validateCartBadgeCount(expectedCount) {
        await expect(this.page.locator(this.cartBadge)).toHaveText(expectedCount);
    }

    async openCart() {
        await this.page.locator(this.cartLink).click();
    }

    async sortByVisibleText(text) {
        await this.page.locator(this.sortDropdown).selectOption({ label: text });
    }

    async validateFirstProductNameIsVisible() {
        await expect(this.page.locator(this.firstItemName)).toBeVisible();
    }

    async validateFirstProductPriceIsVisible() {
        await expect(this.page.locator(this.firstItemPrice)).toBeVisible();
    }

    async getFirstProductName() {
        return await this.page.locator(this.firstItemName).textContent();
    }

    async getFirstProductPrice() {
        return await this.page.locator(this.firstItemPrice).textContent();
    }

    async validateCartBadgeIsHidden() {
        await expect(this.page.locator(this.cartBadge)).toHaveCount(0);
    }
}

module.exports = { InventoryPage };