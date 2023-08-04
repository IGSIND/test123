import test from '@lib/BaseTest';

//Validation of user authentication by invalid Candidate Creadentials

test(`@Smoke Verify Validation of user authentication by invalid Candidate Creadentials`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with wrong password`, async () => {
        await eluminaCandPage.candidateInvalidLoginCredential();
    });
    
});