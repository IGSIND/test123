import test from '@lib/BaseTest';

//Validation of the following in the Exam Section Exam name, Candidate name, Exam timer, no of questions as per exam created

test(`@Smoke Verify Validation of the following in the Exam Section
Exam name, Candidate name, Exam timer, no of questions as per exam created`, async ({ eluminaCandPage,eluminaCadInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.examSectionValidation();
    });
    
});