import test from '@lib/BaseTest';

/**Validation of Sign out at Exam Start Page*/

test(`@Regression Validation of Sign out at Exam Start Page`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateLoginToAppStartExamandSignout();
    });
    
});