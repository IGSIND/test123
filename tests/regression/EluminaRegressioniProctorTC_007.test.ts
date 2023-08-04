import test from '@lib/BaseTest';

/**Validation of Candidate App Dashboard*/

test(`@Regression Verify Validation of Candidate App Dashboard`, async ({ eluminaCadInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications();
    });
    
});