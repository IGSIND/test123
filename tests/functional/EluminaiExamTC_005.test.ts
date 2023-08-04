import test from '@lib/BaseTest';

//Validation of password entered after clicking on "Start Exam"


test(`@Smoke Verify Validation of password entered after clicking on "Start Exam"`, async ({ eluminaCadInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
        await eluminaCadInvPage.logoutClick();
    });
    
});