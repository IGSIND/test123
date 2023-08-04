import test from '@lib/BaseTest';
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

/*Validation of Questions answered / Inprogress on the RHS of the Candidate page*/

test(`@Smoke Validation of Questions answered / Inprogress on the RHS of the Candidate page`, async ({ eluminaCadInvPage,webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(); 
    });

    await test.step('Candidate start the exam',async ()=> {
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

        await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[1]//span)[1]').click();
        await newPage.locator('//*[@class="proctoringImg"]').click();
        await newPage.locator('(//div[@class="candidate-name"]//div[1])[1]').click();
     
        const events=  newPage.locator('(//*[@class="title"])[5]');
        const questionScroll=newPage.locator('//div[@class="question-list scroll"]').scrollIntoViewIfNeeded();
        console.log(await events.textContent());

        /* for(let i=0;i<=events.length;i++)
        {
            //await events[i].
            let eventslist = await events[i].textContent();
            //console.log(eventslist);
        } */
    
        await newPage.waitForTimeout(5000);
        await newPage.screenshot({ path: 'screenshot.png', fullPage: true });
        await newPage.close();
        await page1.close();
    });

});