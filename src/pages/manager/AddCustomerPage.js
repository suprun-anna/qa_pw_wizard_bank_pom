import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.customersButton = page.getByRole('button', {
      name: 'Customers'
    });

    this.firstNameInputField = page.getByPlaceholder('First Name');
    this.lastNameInputField = page.getByPlaceholder('Last Name');
    this.postalCodeInputField = page.getByPlaceholder('Post Code');
    this.addCustomerFormButton = page.getByRole('form')
      .getByRole('button', {
        name: 'Add Customer'
      });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstNameInputField(firstName) {
    await this.firstNameInputField.fill(firstName);
  }

  async fillLastNameInputField(lastName) {
    await this.lastNameInputField.fill(lastName);
  }

  async fillPostalCodeInputField(postalCode) {
    await this.postalCodeInputField.fill(postalCode);
  }

  async clickAddCustomerFormButton() {
    await this.addCustomerFormButton.click();
  }

  async clickAddCustomerFormButtonAndAcceptAlert() {
    const dialogPromise = new Promise((resolve) => {
      this.page.once('dialog', async (dialog) => {
        await dialog.accept();
        resolve();
      });
    });

    await this.clickAddCustomerFormButton();
    await dialogPromise;
  }

  async clickAddCustomerFormButtonAndAssertAlertContains(expectedText) {
    const dialogPromise = new Promise((resolve) => {
      this.page.once('dialog', async (dialog) => {
        resolve(dialog.message());
        await dialog.accept();
      });
    });

    await this.clickAddCustomerFormButton();
    expect(await dialogPromise).toContain(expectedText);
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertAddCustomerPageIsOpen() {
    await expect(this.page).toHaveURL(/#\/manager\/addCust/);
  }

  async assertInputFieldIsInvalidBecauseEmpty(inputField) {
    await expect(inputField).toHaveValue('');
    await expect(inputField).toHaveJSProperty('validity.valueMissing', true);
    await expect(inputField).toHaveJSProperty('validity.valid', false);
  }
}
