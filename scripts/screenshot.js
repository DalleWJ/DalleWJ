const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const context = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await context.newPage();
  const out = process.argv[2] || '/tmp/shot.png';
  await page.goto('http://localhost:8730/index.html');
  await page.waitForTimeout(400);
  await page.screenshot({ path: out });
  await browser.close();
})();
