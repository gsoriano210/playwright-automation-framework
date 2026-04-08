const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;

        // ID locators
        this.firstNameInput = '#first-name';
        this.lastNameInput = '#last-name';
        this.postalCodeInput = '#postal-code';
        this.continueButton = '#continue';
        this.cancelButton = '#cancel';
        this.finishButton = '#finish';

        // CSS locators
        this.errorMessage = '[data-test="error"]';
        this.checkoutTitle = '.title';
        this.completeHeader = '.complete-header';
        this.completeText = '.complete-text';

        // XPath locators
        this.summaryTitle = '//span[@class="title" and text()="Checkout: Overview"]';
        this.completeTitle = '//span[@class="title" and text()="Checkout: Complete!"]';
    }

    async validateCheckoutInformationPageLoaded() {
        await expect(this.page.locator(this.checkoutTitle)).toHaveText('Checkout: Your Information');
        await expect(this.page.locator(this.firstNameInput)).toBeVisible();
        await expect(this.page.locator(this.lastNameInput)).toBeVisible();
        await expect(this.page.locator(this.postalCodeInput)).toBeVisible();
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
    }

    async clickContinue() {
        await this.page.click(this.continueButton);
    }

    async clickCancel() {
        await this.page.click(this.cancelButton);
    }

    async validateCheckoutOverviewPageLoaded() {
        await expect(this.page.locator(this.summaryTitle)).toBeVisible();
    }

    async clickFinish() {
        await this.page.click(this.finishButton);
    }

    async validateOrderSuccess() {
        await expect(this.page.locator(this.completeTitle)).toBeVisible();
        await expect(this.page.locator(this.completeHeader)).toHaveText('Thank you for your order!');
        await expect(this.page.locator(this.completeText)).toBeVisible();
    }

    async validateErrorMessageContains(text) {
        await expect(this.page.locator(this.errorMessage)).toContainText(text);
    }
}

module.exports = { CheckoutPage };