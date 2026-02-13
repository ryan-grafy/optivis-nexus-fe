const { firefox } = require('@playwright/test');

async function run() {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  
  console.log("Navigating to http://localhost:3000/ats/simulation/report...");
  try {
    await page.goto("http://localhost:3000/ats/simulation/report", { waitUntil: 'networkidle' });
  } catch (e) {
    console.error("Navigation failed:", e.message);
  }

  const currentUrl = page.url();
  console.log(`Current URL: ${currentUrl}`);

  if (currentUrl.includes("/ats/simulation/report")) {
    // Check scrolling
    // We look for a container that should have overflow-y: auto
    // Based on AppLayout structure in AGENTS.md:
    // Main Content (ml-[68px], flex-1, overflow-auto)
    const scrollInfo = await page.evaluate(() => {
      const main = document.querySelector('main') || document.body;
      const style = window.getComputedStyle(main);
      return {
        overflowY: style.overflowY,
        scrollHeight: main.scrollHeight,
        clientHeight: main.clientHeight,
        isScrollable: main.scrollHeight > main.clientHeight
      };
    });
    console.log("Scroll Info:", JSON.stringify(scrollInfo, null, 2));

    // Check nine-slice card
    const cardInfo = await page.evaluate(() => {
      const card = document.querySelector('.figma-nine-slice.figma-home-panel-middle');
      if (!card) return null;
      const style = window.getComputedStyle(card);
      return {
        classes: Array.from(card.classList),
        borderImageSource: style.borderImageSource,
        display: style.display
      };
    });
    console.log("Card Info:", JSON.stringify(cardInfo, null, 2));

    await page.screenshot({ path: "ats-report-verify.png", fullPage: true });
    console.log("Screenshot saved to ats-report-verify.png");
  } else {
    console.log("Redirected or blocked. Checking DOM for any rendered content...");
    const bodyContent = await page.evaluate(() => document.body.innerText.slice(0, 500));
    console.log("Body content snippet:", bodyContent);
    
    const cardExists = await page.evaluate(() => !!document.querySelector('.figma-nine-slice.figma-home-panel-middle'));
    console.log("Card exists in current DOM:", cardExists);
    
    await page.screenshot({ path: "ats-report-blocked.png" });
    console.log("Screenshot saved to ats-report-blocked.png");
  }

  await browser.close();
}

run().catch(console.error);
