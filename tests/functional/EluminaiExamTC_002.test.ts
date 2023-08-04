import test from '@lib/BaseTest';

//Validation of Candidate App URL, Login Page 

 
test(`@Smoke Verify Validation of Candidate App URL, Login Page`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard();
        await eluminaCandPage.logoutClick();
    });
    
});