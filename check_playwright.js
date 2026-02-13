const { firefox } = require('playwright');

(async () => {
  try {
    console.log('Launching Firefox...');
    const browser = await firefox.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('BROWSER ERROR:', msg.text());
      }
    });

    page.on('pageerror', error => {
      console.log('PAGE ERROR:', error.message);
      console.log('STACK:', error.stack);
    });

    console.log('Navigating to http://localhost:3003/ats/simulation...');
    await page.goto('http://localhost:3003/ats/simulation');
    
    console.log('Waiting for hydration...');
    await page.waitForTimeout(5000);

    console.log('Clicking Apply button...');
    const applyButton = page.locator('button:has-text("Apply")');
    if (await applyButton.count() > 0) {
        await applyButton.click();
    } else {
        console.log('Apply button not found');
    }

    console.log('Waiting for error...');
    await page.waitForTimeout(5000);

    await browser.close();
  } catch (error) {
    console.error('Execution Error:', error);
  }
})();
