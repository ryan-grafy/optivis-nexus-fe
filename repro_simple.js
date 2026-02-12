const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch({ 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
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

    console.log('Navigating...');
    await page.goto('http://localhost:3001/ats/simulation', { waitUntil: 'networkidle' });
    
    console.log('Clicking Apply...');
    const applyButton = await page.waitForSelector('button:has-text("Apply")');
    await applyButton.click();
    
    console.log('Waiting...');
    await page.waitForTimeout(5000);
    
    await browser.close();
  } catch (e) {
    console.error('FAILED:', e);
  }
})();
