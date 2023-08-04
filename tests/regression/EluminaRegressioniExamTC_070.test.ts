import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';
const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));

let testData = qaTestData;
if (process.env.ENV == 'dev') {
    testData = devTestData;
}
else if(process.env.ENV == 'p7'){
    testData = p7TestData;
} 
else if(process.env.ENV == 'production'){
    testData = productionTestData;
} 
else if(process.env.ENV == 'qa'){
    testData = qaTestData;
} 
else if(process.env.ENV == 'sandbox'){
    testData = sandboxTestData;
} 
else if(process.env.ENV == 'staging'){
    testData = stagingTestData;
}

//Validation of Invigilator Dashboard after the Exam Completion by candidate (With in the specified time line)
test(`@Regression Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createCommonExam();
        await newtab.clickonNextBtnInExam();
        await newtab.createSection();
        await newtab.addMCQQuestions();
    });
});

test(`@Regression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage,eluminaRegPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
        await newtab.addExistingUsers();
    });
});      

test(`@Regression Verify Validation of Invigilator Dashboard after the Exam Completion by candidate (With in the specified time line)`, async ({eluminaCandPage, eluminaCadInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime3();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();

        
    });   
    await test.step('Candidate start the exam',async ()=> {
       await eluminaCandPage.verifyExamDashboardTimer();

        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testData.invigilatorUsername);
        await page1.locator('(//input)[2]').type(testData.invigilatorPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
          ]);
          
        
          await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
       
          //await newPage.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//input').click();
          await newPage.locator('//span[@class="thtext"]//input[@type="checkbox"]').click();
          await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[5]').click();
          await newPage.locator('(//button[text()="Yes"])[2]').click();
          await newPage.waitForTimeout(5000);
        
        await eluminaCadInvPage.againCandidateLogin();

        await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[7]//div').click()
        await newPage.waitForTimeout(8000);
         await newPage.locator('//span[@class="thtext"]//input[@type="checkbox"]').click();
         await newPage.locator('//div[@title="Resume Exam for all Candidates"]').click();
         await newPage.locator('(//button[text()="Yes"])[2]').click();
         await newPage.waitForTimeout(3000);
       //await eluminaCandPage.candidateStartMCQAndSubmit();
         await newPage.close();
        await page1.close();

    });
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaCandPage.candidateStartMCQAndSubmit();
        await eluminaCandPage.confirmationOkBtn();

    });


});