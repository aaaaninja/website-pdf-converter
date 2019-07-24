const puppeteer = require("puppeteer");

const clip_a_href = targetUrl => targetUrl.replace(/^https?:\/\/(.*?)(?:\/)/, "") // ドメイン部より後ろを全部引っこ抜く

const TARGET_URL = "https://www.dlsite.com/maniax/work/=/product_id/RJ258698.html"
const page_width = 1920;

(async () => {
const browser = await puppeteer.launch(
  { args: [ '--no-sandbox'
          , '--disable-setuid-sandbox'
          , '--window-size=1920,1080'
          ]
  , headless: true
  }
);
const page = await browser.newPage();
await page.setViewport({width: page_width, height: 1080})

await page.goto(TARGET_URL);
await page.click(`a[href="/${clip_a_href(TARGET_URL)}"`);

await page.addScriptTag({ path: '/home/aaaaninja/workspaces/2019-07-24/ppdoc/node_modules/moveto/dist/moveTo.min.js' });
//await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' });

await page.emulateMedia('screen');
const pageHeight = await page.evaluate(() => document.body.scrollHeight);
const pageWidth = await page.evaluate(() => document.body.scrollWidth);
console.log(pageHeight);
console.log(pageWidth);

await page.waitFor(20000);
await page._client.send( 'Input.synthesizeScrollGesture',{ x: 0, y: 0, xDistance: 0, yDistance: -700, repeatCount: 10, repeatDelayMs: 200});

await page.pdf(
  { path: 'hn.pdf'
  , width: page_width
  , height: pageHeight// + 200
  , displayHeaderFooter: true
  , printBackground: true
  }
);

await browser.close();
})();
