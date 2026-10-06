import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager cannot add customer when all fields are empty', async ({
  page,
}) => {
  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  2. Leave First Name, Last Name and Postal Code empty.
  3. Click [Add Customer].
  4. Assert the form stays on the add customer page.
  5. Assert the empty fields are invalid and block submit.
  */

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.clickAddCustomerFormButton();
  await addCustomerPage.assertAddCustomerPageIsOpen();
  await addCustomerPage.assertInputFieldIsInvalidBecauseEmpty(
    addCustomerPage.firstNameInputField,
  );
  await addCustomerPage.assertInputFieldIsInvalidBecauseEmpty(
    addCustomerPage.lastNameInputField,
  );
  await addCustomerPage.assertInputFieldIsInvalidBecauseEmpty(
    addCustomerPage.postalCodeInputField,
  );
});

test('Assert manager cannot add customer when First Name is empty', async ({
  page,
}) => {
  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  2. Leave First Name empty.
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Assert the form stays on the add customer page.
  7. Assert First Name is invalid and blocks submit.
  */

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillLastNameInputField(faker.person.lastName());
  await addCustomerPage.fillPostalCodeInputField(faker.location.zipCode());
  await addCustomerPage.clickAddCustomerFormButton();
  await addCustomerPage.assertAddCustomerPageIsOpen();
  await addCustomerPage.assertInputFieldIsInvalidBecauseEmpty(
    addCustomerPage.firstNameInputField,
  );
});

test('Assert manager cannot add customer when Last Name is empty', async ({
  page,
}) => {
  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  2. Fill the First Name.
  3. Leave Last Name empty.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Assert the form stays on the add customer page.
  7. Assert Last Name is invalid and blocks submit.
  */

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameInputField(faker.person.firstName());
  await addCustomerPage.fillPostalCodeInputField(faker.location.zipCode());
  await addCustomerPage.clickAddCustomerFormButton();
  await addCustomerPage.assertAddCustomerPageIsOpen();
  await addCustomerPage.assertInputFieldIsInvalidBecauseEmpty(
    addCustomerPage.lastNameInputField,
  );
});

test('Assert manager cannot add customer when Postal Code is empty', async ({
  page,
}) => {
  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  2. Fill the First Name.
  3. Fill the Last Name.
  4. Leave Postal Code empty.
  5. Click [Add Customer].
  6. Assert the form stays on the add customer page.
  7. Assert Postal Code is invalid and blocks submit.
  */

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameInputField(faker.person.firstName());
  await addCustomerPage.fillLastNameInputField(faker.person.lastName());
  await addCustomerPage.clickAddCustomerFormButton();
  await addCustomerPage.assertAddCustomerPageIsOpen();
  await addCustomerPage.assertInputFieldIsInvalidBecauseEmpty(
    addCustomerPage.postalCodeInputField,
  );
});
