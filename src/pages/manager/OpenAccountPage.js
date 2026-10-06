import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.getByTestId('currency');
    this.customerDropdown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
  }

  async selectCustomer(customer) {
    await this.customerDropdown.selectOption(customer);
  }

  async assertCurencyExistsInDropdown(currency) {
    await expect(this.currencyDropdown).toContainText(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
