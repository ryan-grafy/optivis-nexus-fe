const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

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

  try {
    console.log('Navigating to http://localhost:3001/ats/simulation...');
    await page.goto('http://localhost:3001/ats/simulation', { waitUntil: 'networkidle' });
    
    console.log('Page loaded. Looking for Apply button...');
    const applyButton = page.getByRole('button', { name: 'Apply' });
    await applyButton.waitFor({ state: 'visible' });
    
    console.log('Clicking Apply button...');
    await applyButton.click();
    
    console.log('Waiting for 10 seconds for potential errors...');
    await page.waitForTimeout(10000);
    
    await page.screenshot({ path: 'after_apply.png' });
  } catch (e) {
    console.error('Script failed:', e);
  } finally {
    await browser.close();
  }
})();
