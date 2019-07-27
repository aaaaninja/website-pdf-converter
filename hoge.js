const puppeteer = require("puppeteer");

const page_width = 1920;
const TARGET_URL = "https://book.dmm.co.jp/detail/b915awnmg00806/"
// https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js
const custom_device = puppeteer.devices["Pixel 2 XL"]; // テキトーに最新スマホのuser agentを拝借したい.
      custom_device.name = "custom_device";
      custom_device.viewport.width = page_width; // ただし横の長さは変える. (表示範囲を増やすため)


(async () => {
////////////////////////////////////////////////////////////////////////////////
const browser = await puppeteer.launch({
  args: [
    '--no-sandbox'
  , '--disable-setuid-sandbox'
  , '--window-size=1920,1080'
  ]
, headless: true
});
const page = await browser.newPage();
await page.emulate(custom_device);

await page.goto(TARGET_URL);
await page.addScriptTag({ url: "https://cdn.jsdelivr.net/npm/moveto@1.8.2/dist/moveTo.min.js" });
//await page.addScriptTag({ path: '/home/aaaaninja/workspaces/2019-07-24/ppdoc/node_modules/moveto/dist/moveTo.min.js' }); //await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' });

const pageHeight = await page.evaluate(() => document.body.scrollHeight);
const pageWidth = await page.evaluate(() => document.body.scrollWidth);
console.log(pageHeight);
console.log(pageWidth);

for (let i = 0; i < 5; i++) { // 5回逐次でloopするだけ......屈辱......
  await page.evaluate(() => (new MoveTo()).move(1000));
  await page.waitFor(2000);
}
await page.evaluate(() => scroll(0, 0));

console.log("hoge10000");
await page.waitFor(10000);
console.log("/hoge10000");

await page.pdf({
  path: 'hn.pdf'
, width: page_width
, height: pageHeight // + 200
, displayHeaderFooter: true
, printBackground: true
});

await browser.close();
////////////////////////////////////////////////////////////////////////////////
})();
