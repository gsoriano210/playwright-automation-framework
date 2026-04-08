class InventoryPage {
    constructor(page) {
        this.page = page;
        this.title = '.title';
        this.addBackpackButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
        this.cartBadge = '.shopping_cart_badge';
    }

    getTitle() {
        return this.page.locator(this.title);
    }

    async addBackpackToCart() {
        await this.page.click(this.addBackpackButton);
    }

    getCartBadge() {
        return this.page.locator(this.cartBadge);
    }
}

module.exports = { InventoryPage };