import test from '@lib/BaseTest';

//Invigilator marks attendance for individual candidate

test(`@Smoke Verify Elumina Invigilator Dashboard`, async ({ eluminaInvPage, webActions }) => {
    await test.step('Invigilator logging into application', async () => {
        await eluminaInvPage.invigilatorLogin();
    });

    await test.step('Invigilator marks attendance for individual candidate', async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.ClickOnExamLink();
        await newtab.isPresentYes();
        await newtab.logoutClick();

    });
});