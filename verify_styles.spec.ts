import { test, expect } from '@playwright/test';

test('verify simulation page styles', async ({ page }) => {
  await page.goto('http://localhost:3000/ats/simulation');
  await page.waitForSelector('main');

  const styles = await page.evaluate(() => {
    const findPanel = (text: string) => {
      const elements = Array.from(document.querySelectorAll('div, section, aside'));
      return elements.find(el => el.textContent?.includes(text) && window.getComputedStyle(el).borderImageSource !== 'none');
    };

    const left = findPanel('Simulation Settings');
    const right = findPanel('Simulation Report') || findPanel('Results');

    const getInfo = (el: Element | null | undefined) => {
      if (!el) return { error: 'Not found' };
      const style = window.getComputedStyle(el);
      const firstChild = el.firstElementChild;
      const childStyle = firstChild ? window.getComputedStyle(firstChild) : null;

      return {
        borderImageSource: style.borderImageSource,
        padding: style.padding,
        paddingTop: style.paddingTop,
        paddingRight: style.paddingRight,
        paddingBottom: style.paddingBottom,
        paddingLeft: style.paddingLeft,
        childPadding: childStyle ? childStyle.padding : 'N/A',
        childPaddingTop: childStyle ? childStyle.paddingTop : 'N/A',
        className: el.className
      };
    };

    return {
      left: getInfo(left),
      right: getInfo(right),
      leftFrameByAsset: getInfo(Array.from(document.querySelectorAll('*')).find(el => window.getComputedStyle(el).borderImageSource.includes('frame-panel-left.png'))),
      middleFrameByAsset: getInfo(Array.from(document.querySelectorAll('*')).find(el => window.getComputedStyle(el).borderImageSource.includes('frame-panel-middle.png')))
    };
  });

  console.log('STYLE_VERIFICATION_RESULTS:', JSON.stringify(styles, null, 2));
  await page.screenshot({ path: 'tmp/verification_screenshot.png', fullPage: true });
});
