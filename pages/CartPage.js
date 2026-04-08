const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;

        // CSS locators
        this.cartTitle = '.title';
        this.cartItem = '.cart_item';
        this.checkoutButton = '#checkout';
        this.continueShoppingButton = '#continue-shopping';

        // XPath locators
        this.firstCartItemName = '(//div[@class="inventory_item_name"])[1]';
        this.firstCartItemPrice = '(//div[@class="inventory_item_price"])[1]';
        this.firstRemoveButton = '(//button[contains(text(),"Remove")])[1]';
    }

    async validateCartPageLoaded() {
        await expect(this.page).toHaveURL(/cart/);
        await expect(this.page.locator(this.cartTitle)).toHaveText('Your Cart');
    }

    async validateCartItemCount(expectedCount) {
        await expect(this.page.locator(this.cartItem)).toHaveCount(expectedCount);
    }

    async validateFirstCartItemNameIsVisible() {
        await expect(this.page.locator(this.firstCartItemName)).toBeVisible();
    }

    async validateFirstCartItemPriceIsVisible() {
        await expect(this.page.locator(this.firstCartItemPrice)).toBeVisible();
    }

    async clickCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    async clickContinueShopping() {
        await this.page.locator(this.continueShoppingButton).click();
    }

    async removeFirstCartItem() {
        await this.page.locator(this.firstRemoveButton).click();
    }

    async getFirstCartItemName() {
        return await this.page.locator(this.firstCartItemName).textContent();
    }

    async getFirstCartItemPrice() {
        return await this.page.locator(this.firstCartItemPrice).textContent();
    }
}

module.exports = { CartPage };