const { test, expect } = require('@playwright/test');

test('reproduce error', async ({ page }) => {
  page.on('pageerror', error => {
    console.log('--- PAGE ERROR ---');
    console.log(error.message);
    console.log(error.stack);
    console.log('------------------');
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('--- CONSOLE ERROR ---');
      console.log(msg.text());
      console.log('----------------------');
    }
  });

  await page.goto('http://localhost:3001/ats/simulation');
  const applyButton = page.getByRole('button', { name: 'Apply' });
  await applyButton.click();
  await page.waitForTimeout(10000);
});
