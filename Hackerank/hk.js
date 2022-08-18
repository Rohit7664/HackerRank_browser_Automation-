const puppeteer =  require("puppeteer");
const codeObj = require('./code');

const { answer } = require("./code");
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "pikol63229@ukgent.com";
const password = "9889590859";


let browserOpen = puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null
})

let Page;

browserOpen.then(function(browserObj) {
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;

}).then(function (newTab) {
    Page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;

} ).then(function() {
    let emailEntered = Page.type("input[id='input-1']", email, {delay: 50});
    return emailEntered;

}) .then(function () {
    let passwordEntered = Page.type("input[type='password']", password, {delay: 50});
    return passwordEntered;

}) .then(function() {
    let loginButtonClicked = Page.click("button[data-analytics='LoginPassword']", {delay: 50});
    return loginButtonClicked;

}) .then(function () {
    let clickOnCPromise = waitAndClick(".topic-card a[data-attr1= 'cpp']", Page);
    return clickOnCPromise;

}).then(function () {
    let getToEasy = waitAndClick('input[value="easy"]', Page);
    return getToEasy;

}).then(function (){
    let waitFor6Seconds = Page.waitFor//(3000);
    return waitFor6Seconds;

}).then(function () {
    let allChallangesPromise = Page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled", {delay: 50});
    return allChallangesPromise;

}).then(function (questionsArr) {
    console.log("number of  questions",questionsArr.length);
    let questionWillBeSolved = questionsSolver(Page,questionsArr[0],codeObj.answer[0] )
    return questionWillBeSolved;
})




function waitAndClick (selector, cPage) {
    return new Promise (function (resolve,  reject) {
        let waitForModelPromie = cPage.waitForSelector(selector);
        waitForModelPromie.then(function() {
            let clickModel =  cPage.click(selector);
            return clickModel;
        }) .then(function() {
            resolve();
        }).catch(function (error) {
            reject;
        })
    })
}



function questionsSolver(Page,question, answer) {
    return new Promise (function (resolve, reject) {
        let questionWillBeCLicked = question.click()
        return questionWillBeCLicked.then(function () {
            let EditorInFocusPromise = waitAndClick('.hr-monaco-editor', Page);
            return EditorInFocusPromise;

        }).then(function () {
            return waitAndClick('.checkbox-input',Page);

        }).then(function () {
            return Page.waitForSelector('text-area.custominput', Page);
        }).then(function () {
            return Page.type('text-area.custominput', answer, {delay: 10})
        })
    })
}