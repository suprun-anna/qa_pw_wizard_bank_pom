import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastCustomerRow = page.getByRole('row').last();
    this.deleteButton = this.lastCustomerRow
      .getByRole('button', { name: 'Delete' });
    this.searchInputField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async assertCustomerIsPresentInTable(firstName, lastName, postalCode) {
    await expect(this.lastCustomerRow.getByRole('cell').nth(0)).toContainText(firstName);
    await expect(this.lastCustomerRow.getByRole('cell').nth(1)).toContainText(lastName);
    await expect(this.lastCustomerRow.getByRole('cell').nth(2)).toContainText(postalCode);
  }

  async assertCustomerHasNoAccountNumberInTable() {
    await expect(this.lastCustomerRow.getByRole('cell').nth(3)).toBeEmpty();
  }

  async assertCustomerHasAccountNumberInTable() {
    await expect(this.lastCustomerRow.getByRole('cell').nth(3)).not.toBeEmpty();
  }

  async assertCustomerAppearsOnceInTable(firstName, lastName, postalCode) {
    const customerRow = this.page.getByRole('row').filter({
      hasText: firstName,
    }).filter({
      hasText: lastName,
    }).filter({
      hasText: postalCode,
    });
    await expect(customerRow).toHaveCount(1);
  }

  async assertCustomerIsNotPresentInTable(firstName, lastName, postalCode) {
    const customerRow = this.page.getByRole('row').filter({
      hasText: firstName,
    }).filter({
      hasText: lastName,
    }).filter({
      hasText: postalCode,
    });
    await expect(customerRow).toHaveCount(0);
  }

  async fillSearchInputField(search) {
    await this.searchInputField.fill(search);
  }

  async assertNoOtherRowsArePresentInTable() {
    await expect(this.page.getByRole('row').nth(1)).toHaveCount(1);
  }
}
