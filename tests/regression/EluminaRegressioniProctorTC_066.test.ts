import test from '@lib/BaseTest';

/**Validation of filter as Invigilator - Location & Venue */

test(`@Regression Validation of filter as Invigilator - Location & Venue`, async ({ eluminaInvPage,webActions }) => {
   
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });
    
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.selectLocation();
        
    });
});