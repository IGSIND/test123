import test from '@lib/BaseTest';

//Validation of Browser Reload option on Candidate Dashboard

test(`@Regression Verify Validation of Browser Reload option on Candidate Dashboard`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.refreshPage();
    });
    
});