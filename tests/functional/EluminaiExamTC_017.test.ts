import test from '@lib/BaseTest';

//Invigilator filters candidate based on Location

test(`@Smoke Verify Elumina Invigilator Dashboard`, async ({ eluminaInvPage, webActions }) => {
    await test.step('Invigilator logging into application', async () => {
        await eluminaInvPage.invigilatorLogin();
    });

    await test.step('Invigilator filters candidate based on Location', async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.ClickOnExamLink();
        await newtab.selectLocation1();
        await newtab.logoutClick();
    });
});