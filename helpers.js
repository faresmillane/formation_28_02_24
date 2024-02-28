const wdio = require("webdriverio");
const config = require("./config");
let driver;

async function initDriver(){
    driver = await wdio.remote(config);
};

async function getElement(id){
    const element = await driver.$(`~${id}`);
    return element;
};

async function click(id){
    const element = await getElement(id);
    await element.click();
};

async function isPresent(id){
    const element = await getElement(id);
    if(element){
        console.log("element is present")
    };
};

async function quitDriver(){
    await driver.deleteSession();
};

async function takeScreenShot(){
    const screenshot = await driver.takeScreenshot();
    return screenshot;
};

module.exports = {
    initDriver,
    click,
    isPresent,
    quitDriver,
    takeScreenShot
}