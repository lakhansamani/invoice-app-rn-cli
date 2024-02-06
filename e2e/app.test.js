const {device, element, by} = require('detox');
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

describe('InvoiceApp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  const newInvoiceNumber = `IN${Date.now()}`;

  it('should login', async () => {
    await element(by.id('EmailInput')).typeText('test@gmail.com');
    await element(by.id('PasswordInput')).typeText('Test@123#');
    await element(by.id('LoginButton')).tap();
    await sleep(5000);
  });

  it('should have home screen', async () => {
    await sleep(5000);
    await expect(element(by.id('HomeScreenTitle'))).toBeVisible();
  });

  it('should add invoice', async () => {
    await element(by.text('Add Invoice')).tap();
    await element(by.id('InvoiceNumberInput')).replaceText(newInvoiceNumber);
    await sleep(1000);
    await element(by.id('InvoiceDateInput')).replaceText('2021-01-01');
    await sleep(1000);
    await element(by.id('InvoiceAmountInput')).replaceText('1000');
    await sleep(1000);
    await element(by.id('InvoiceNoteInput')).replaceText(
      `Test invoice ${newInvoiceNumber}`,
    );
    await sleep(1000);
    await element(by.id('AddInvoiceButton')).tap();
    await sleep(10000);
  });

  it('should have invoice in list', async () => {
    await expect(element(by.text(newInvoiceNumber))).toBeVisible();
  });

  afterAll(async () => {
    await element(by.text('Profile')).tap();
    await element(by.id('LogoutButton')).tap();
    await sleep(5000);
  });
});
