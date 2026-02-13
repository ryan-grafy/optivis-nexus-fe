const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`CONSOLE ERROR: ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    console.log(`PAGE ERROR: ${err.message}`);
    console.log(err.stack);
  });

  try {
    console.log('Navigating to http://localhost:3000/ats/simulation...');
    await page.goto('http://localhost:3000/ats/simulation', { waitUntil: 'networkidle' });
    
    console.log('Waiting for hydration...');
    await page.waitForTimeout(5000);

    const tabs = await page.$$('[role="tab"]');
    console.log(`Found ${tabs.length} tabs`);
    for (let i = 0; i < tabs.length; i++) {
      console.log(`Clicking tab ${i}...`);
      await tabs[i].click();
      await page.waitForTimeout(2000);
    }

    await page.screenshot({ path: 'error_repro.png' });
    
  } catch (e) {
    console.log(`SCRIPT ERROR: ${e.message}`);
  } finally {
    await browser.close();
  }
})();
