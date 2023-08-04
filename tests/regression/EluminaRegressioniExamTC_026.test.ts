import test from '@lib/BaseTest';

//Validation of Browser Reload option after Exam Starts

test(`@Regression Verify Validation of Browser Reload option after Exam Starts`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.refreshPage();
    });
    
    
});