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

/**Validation of multiple Exams on the dashboard for different time (Say one in AM & another in PM) EluminaRegressioniProctorTC_017*/

/**AM */
test(`@Regression Verify Elumina Login fpr AM`, async ({ eluminaLoginPage,eluminaMultipleExamsForAMPage, eluminaProctorExam, webActions }) => {
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
        const newtab = await eluminaMultipleExamsForAMPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExamforProctoring();
        await newtab.createSection();
        await newtab.addMCQQuestions();
    });
});

test(`@Regression Verify Elumina Registration for AM`, async ({ eluminaLoginPage,eluminaProctorReg,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaProctorReg.iAuthorPageNavigations();
        await newtab.registrationTabNavigationforAM();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
    });
});

/**PM */

test(`@Regression Verify Elumina Login for PM`, async ({ eluminaLoginPage,eluminaMultipleExamsForPMPage, eluminaProctorExam, webActions }) => {
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
        const newtab = await eluminaMultipleExamsForPMPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExamforProctoring();
        await newtab.createSection();
        await newtab.addMCQQuestions();
    });
});

test(`@Regression Verify Elumina Registration for PM`, async ({ eluminaLoginPage,eluminaProctorReg,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaProctorReg.iAuthorPageNavigations();
            await newtab.registrationTabNavigationforPM();
            await newtab.addExistingUsersforMultiple();
            await newtab.downloadUserDetails();
    });
});

test(`@Regression Validation of Browser Reload option on Candidate Dashboard for AM EluminaRegressioniProctorTC_017`, async ({ eluminaProctorCand,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        eluminaProctorCand.candidateNavigateToURL();
        });
        await test.step(`Candidate Login to application`, async () => {
            await eluminaProctorCand.candidateLoginToApplications();
        });
    });

   