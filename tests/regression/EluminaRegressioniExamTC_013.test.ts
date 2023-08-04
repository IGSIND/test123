import test from '@lib/BaseTest';

/**Validation of Candidate App Dashboard Details*/

test(`@Regression Validation of Candidate App Dashboard Details`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.candidateContentSectionValidation();
    });
    
});