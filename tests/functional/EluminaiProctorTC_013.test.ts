import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';
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

/**Verify the candidate should be able to "Review" at any point of the exam time */

test(`@iProctorlink Verify The candidate should be able to "Review" at any point of the exam time`, async ({ eluminaProctorCand,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
   
    eluminaProctorCand.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaProctorCand.clickOnAllLink();
        // await eluminaCadInvPage.candidateStartExamsValidationInv();
 
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
         //await newPage.waitForTimeout(5000);
         await newPage.locator('//span[@class="thtext"]//input[@type="checkbox"]').click();
         await newPage.locator('//div[@class="dropdown closed more-btn--width"]').click();
         await newPage.locator('//p[text()="Verify Identity"]').click();
         await newPage.locator('(//button[text()="Yes"])[1]').click();
         await newPage.waitForTimeout(5000);
       
         await newPage.close();
         await page1.close();
 
     });
     await test.step('Candidate start the exam',async ()=> {
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaProctorCand.candidateStartMCQ();
    });
});