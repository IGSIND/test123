import test from '@lib/BaseTest';

/**Validation of user authentication by valid Candidate Creadentials */

test(`@Regression Validation of user authentication by valid Candidate Creadentials`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard();
    });
});
