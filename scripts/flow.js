const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const context = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await context.newPage();
  const dir = process.argv[2];

  page.on('console', (msg) => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.log('PAGEERROR:', err.message));

  await page.goto('http://localhost:8730/index.html');
  await page.waitForTimeout(300);

  // fill player names
  const inputs = await page.locator('.player-input-row input').all();
  await inputs[0].fill('Freja');
  await inputs[1].fill('Oscar');
  await page.click('#toCategory');
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${dir}/2-category.png` });

  // pick geografi (has image questions)
  await page.click('[data-cat="geografi"]');
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${dir}/3-options.png` });

  // set difficulty svaer (has image Q), length 5, timer on
  await page.click('[data-diff="svaer"]');
  await page.click('[data-len="5"]');
  await page.click('#timerToggle');
  await page.screenshot({ path: `${dir}/4-options-set.png` });

  await page.click('#startQuiz');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${dir}/5-quiz-q1.png` });

  // answer first question (click first option)
  await page.locator('.option').first().click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${dir}/6-quiz-reveal.png` });

  // go through remaining questions quickly
  for (let i = 0; i < 4; i++) {
    await page.click('#nextQuestion');
    await page.waitForTimeout(150);
    await page.locator('.option').first().click();
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${dir}/7-before-end.png` });
  await page.click('#nextQuestion');
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${dir}/8-end.png` });

  await browser.close();
})();
