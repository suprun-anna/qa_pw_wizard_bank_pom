import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert success alert is shown when manager adds a customer', async ({
  page,
}) => {
  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  2. Fill the First Name.
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Assert the alert contains 'Customer added successfully with customer id'.
  */

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameInputField(firstName);
  await addCustomerPage.fillLastNameInputField(lastName);
  await addCustomerPage.fillPostalCodeInputField(postCode);
  await addCustomerPage.clickAddCustomerFormButtonAndAssertAlertContains(
    'Customer added successfully with customer id',
  );
});

test('Assert manager cannot add duplicate customer', async ({ page }) => {
  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  2. Fill the First Name.
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Fill the same First Name, Last Name and Postal Code again.
  7. Click [Add Customer].
  8. Assert the alert contains
    'Please check the details. Customer may be duplicate.'
  9. Click [Customers] button.
  10. Assert this customer appears in the table only once.
  */

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameInputField(firstName);
  await addCustomerPage.fillLastNameInputField(lastName);
  await addCustomerPage.fillPostalCodeInputField(postCode);
  await addCustomerPage.clickAddCustomerFormButtonAndAcceptAlert();

  await addCustomerPage.fillFirstNameInputField(firstName);
  await addCustomerPage.fillLastNameInputField(lastName);
  await addCustomerPage.fillPostalCodeInputField(postCode);
  await addCustomerPage.clickAddCustomerFormButtonAndAssertAlertContains(
    'Please check the details. Customer may be duplicate.',
  );
  await addCustomerPage.clickCustomersButton();

  const customersListPage = new CustomersListPage(page);
  await customersListPage.assertCustomerAppearsOnceInTable(
    firstName,
    lastName,
    postCode,
  );
});
