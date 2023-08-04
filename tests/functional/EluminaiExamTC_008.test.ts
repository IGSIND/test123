import test from '@lib/BaseTest';

//The candidate should be able to "Review" at any point of the exam time

test(`@Smoke Verify The candidate should be able to Review at any point of the exam time`, async ({ eluminaCandPage,eluminaCadInvPage,webActions }) => {
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
        await eluminaCandPage.candidateStartMCQ();
    });
    
    
});