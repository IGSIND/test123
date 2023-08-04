import test from '@lib/BaseTest';
//Validation of Candidate App Dashboard

test(`@Smoke Verify Validation of Candidate App Dashboard`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard();
        await eluminaCandPage.logoutClick();
    });
    
});