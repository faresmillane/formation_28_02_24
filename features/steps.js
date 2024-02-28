const { Before, After, AfterStep , Given, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);
const selectors = require('../selectors');
const helpers = require('../helpers');

Before(async function () {
  await helpers.initDriver();
 });

Given(/^I access in the "(.*)"."(.*)"$/, async function (screen, element) {
  await helpers.isPresent(selectors[screen][element]);
  this.attach(new Buffer.from(`element verification is: ${selectors[screen][element]}`, 'utf8'), 'text/xml')
});

Given(/^I click in the  "(.*)"."(.*)" button$/, async function (screen, element) {
    await helpers.click(selectors[screen][element]);
    this.attach(new Buffer.from(`I click in : ${selectors[screen][element]} element`, 'utf8'), 'text/xml');
  });

After(async function () {
  await helpers.quitDriver();
});

AfterStep( async function () {
  await helpers.takeScreenShot().then(screenshot => {
    this.attach(new Buffer.from(screenshot, 'base64'), 'image/png');
  })
 });