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

//Validation of Proctoring Completed Exam candidate > Video fragments, screenshots.

test(`@Regression Validation of Proctoring Completed Exam candidate > Video fragments, screenshots.`, async ({ eluminaCandPage,eluminaLoginPage,eluminaProctorExam,eluminaProctorCand,eluminaProctorReg,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaProctorReg.iAuthorPageNavigations();
            await newtab.registrationTabNavigationByClickCreateExam();
            await newtab.clickOnLiveMonitorAdmin();
            await newtab.clickOnImageandCadidate();
            await newtab.verifyTimeVideofragment();
            await newtab.verifyTimeScreenshotst();

        });
    
        });
       
});