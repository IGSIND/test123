import test from '@lib/BaseTest';

//Invigilator marks attendance for all candidate

test(`@Smoke Verify Elumina Invigilator Dashboard`, async ({ eluminaInvPage, webActions }) => {
    await test.step('Invigilator logging into application', async () => {
        await eluminaInvPage.invigilatorLogin();
    });

    await test.step('Invigilator marks attendance for all candidate', async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.ClickOnExamLink();
        await newtab.markAllAttendance();
    });
});