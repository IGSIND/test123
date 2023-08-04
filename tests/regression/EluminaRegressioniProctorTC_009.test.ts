import test from '@lib/Fixtures';
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

/**Validation of multiple candidate trying to login to same Exam*/

/*test(`@Rgression Verify Elumina Login`, async ({ eluminaLoginPage, eluminaProctorExam, webActions }) => {
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
        const newtab = await eluminaProctorExam.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExamforMultipleCandidates();
        await newtab.createSections();
        await newtab.addMCQQuestions();
    });
});

test(`@Regression Verify Elumina Registration`, async ({ eluminaLoginPage,eluminaProctorReg,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaProctorReg.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addMultipleUserDetails();
        await newtab.downloadMultipleUserDetails();
        await newtab.addExistingUsers();
    });
});      */

    
test(`@Regression Validation of Browser Reload option on Candidate Dashboard`, async ({ eluminaProctorCand,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        });
        await test.step(`Candidate Login to application`, async () => {
            await eluminaProctorCand.candidateLoginToApplications();
        });

        /*await test.step('Candidate start the exam',async ()=> {
            await eluminaProctorCand.clickOnAllLink();
     
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
             await newPage.locator('//div[@class="dropdown closed more-btn--width"]').click();
             await newPage.locator('//p[text()="Verify Identity"]').click();
             await newPage.locator('(//button[text()="Yes"])[1]').click();
             await newPage.waitForTimeout(5000);
             await newPage.close();
             await page1.close();
     
         });     */
         /*await test.step('Candidate start the exam',async ()=> {
           await eluminaProctorCand.enterInvigilatorPassword();
            await eluminaProctorCand.candidateStartMCQ();
        });    */
});
