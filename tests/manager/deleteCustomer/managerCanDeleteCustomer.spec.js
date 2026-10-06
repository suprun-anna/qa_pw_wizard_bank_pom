import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();
  const addCustomerPage = new AddCustomerPage(page);
  
  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameInputField(firstName);
  await addCustomerPage.fillLastNameInputField(lastName);
  await addCustomerPage.fillPostalCodeInputField(postalCode);
  await addCustomerPage.clickAddCustomerFormButton();
  await page.reload();
});

test('Assert manager can delete customer', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */

  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.clickDeleteButton();
  await customersListPage.assertCustomerIsNotPresentInTable(firstName, lastName, postalCode);
  await page.reload();
  await customersListPage.assertCustomerIsNotPresentInTable(firstName, lastName, postalCode);
});
