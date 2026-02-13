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
    console.log('Navigating to http://localhost:3005/ats/simulation...');
    await page.goto('http://localhost:3005/ats/simulation', { waitUntil: 'networkidle' });
    
    console.log('Page loaded. Looking for Apply button...');
    const applyButton = page.getByRole('button', { name: 'Apply' });
    await applyButton.waitFor({ state: 'visible' });
    
    console.log('Clicking Apply button...');
    await applyButton.click();
    
    console.log('Waiting for API response (5s)...');
    await page.waitForTimeout(5000);
    
    console.log('Switching to Reduction View...');
    const reductionTab = page.getByRole('button', { name: 'Reduction View' });
    if (await reductionTab.isVisible()) {
        await reductionTab.click();
        await page.waitForTimeout(2000);
    } else {
        console.log('Reduction View tab not visible');
    }
    
    console.log('Switching back to Compare View...');
    const compareTab = page.getByRole('button', { name: 'Compare View' });
    if (await compareTab.isVisible()) {
        await compareTab.click();
        await page.waitForTimeout(2000);
    }

    console.log('Switching to Reduction View again...');
    if (await reductionTab.isVisible()) {
        await reductionTab.click();
        await page.waitForTimeout(2000);
    }
    
    console.log('Final wait for potential errors...');
    await page.waitForTimeout(5000);
    
    await page.screenshot({ path: 'repro_final.png' });
  } catch (e) {
    console.error('Script failed:', e);
  } finally {
    await browser.close();
  }
})();
