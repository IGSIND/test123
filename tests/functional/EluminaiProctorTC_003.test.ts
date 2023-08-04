import test from '@lib/BaseTest';

/*To verify candidates login and to start the exam*/

test(`@Smoke Verify CandidatesInvExam`, async ({ eluminaCadInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with valid password`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications();
        await eluminaCadInvPage.logoutClick();
    });
});