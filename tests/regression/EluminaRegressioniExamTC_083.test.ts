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

//Validation of Invigilator Dashboard

test(`@Regression Verify Validation of Invigilator Dashboard`, async ({ eluminaInvPage, webActions }) => {
   
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });
    
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        //await newtab.iAuthorPageVerification();
        await newtab.invDashboardValidations();
        //await newtab.validateExamStatus();
        
    });
});

//Validation of "Start Exam" (All Candidates)
test(`@Regression Validation of invigilator remotely start the Exam for candidate EluminaRegressioniExamTC_086`, async ({ eluminaCandPage,eluminaCadInvPage,eluminaProctorCand,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCadInvPage.candidateStartExamsValidationInv();
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
        await newPage.locator('//span[@class="thtext"]//input[@type="checkbox"]').click();
        await newPage.locator('//div[@title="Start Exam for all Candidates"]').click();
        await newPage.locator('(//button[text()="Yes"])[2]').click();
        await newPage.waitForTimeout(3000);
        await newPage.close();
        await page1.close();
    });
    await test.step(`Redirected to Candidate page`, async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaCandPage.examSectionValidation();        
    });
});