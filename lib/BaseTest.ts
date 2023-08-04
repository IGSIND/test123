import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { ElementsPage } from '@pages/ElementsPage';
import { AlertsFrameWindowsPage } from '@pages/AlertsFrameWindowsPage';
import { WidgetsPage } from '@pages/WidgetsPage';
import { InteractionsPage } from '@pages/InteractionsPage';
import { WebActions } from '@lib/WebActions';
import { EluminaLoginPage } from '@pages/EluminaLoginPage';
import { EluminaHomePage } from '@pages/EluminaHomePage';
import { EluminaExamPage } from '@pages/EluminaExamPage';
import { EluminaRegistrationPage } from '@pages/EluminaRegistrationPage';
import { EluminaCandidatePage } from '@pages/EluminaCandidatePage';
import { EluminaExamInvPage } from '@pages/EluminaExamInvPage';
import { EluminaRegistrationInvPage } from '@pages/EluminaRegistrationInvPage';
import { EluminaInvCandidatePage } from '@pages/EluminaInvCandidatePage';
import { EluminaInvPage } from '@pages/EluminaInvPage';
import { EluminaCandidateRevieweAndSubmitPage } from '@pages/EluminaCandidateRevieweAndSubmitPage';
import { EluminaProctorExamPage } from '@pages/EluminaProctorExamPage';
import { EluminaRegistrationForProctoringPage } from '@pages/EluminaRegistrationForProctoringPage';
import { EluminaProctorCandidatePage } from '@pages/EluminaProctorCandidatePage';
import { EluminaIGLiveMonitorPage } from '@pages/EluminaIGLiveMonitorPage';
import { EluminaMultipleExamsForAMPage } from '@pages/EluminaMultipleExamsForAMPage';
import { EluminaMultipleExamsForPMPage } from '@pages/EluminaMultipleExamsForPMPage';
import { EluminaMinimalTimeExamPage } from '@pages/EluminaMinimalTimeExamPage';
import { commonPages } from '@pages/commonPages';

const test = baseTest.extend<{
    webActions: WebActions;
    commonPages: commonPages;
    loginPage: LoginPage;
    elementsPage: ElementsPage;
    alertsFrameWindowsPage: AlertsFrameWindowsPage;
    widgetsPage: WidgetsPage;
    interactionsPage: InteractionsPage;
    eluminaLoginPage: EluminaLoginPage;
    eluminaHomePage: EluminaHomePage;
    eluminaExamPage: EluminaExamPage;
    eluminaRegPage: EluminaRegistrationPage;
    eluminaCandPage: EluminaCandidatePage;
    eluminExamianvPage: EluminaExamInvPage;
    eluminaRegInvPage: EluminaRegistrationInvPage;
    eluminaCadInvPage:EluminaInvCandidatePage;
    eluminaInvPage:EluminaInvPage;
    eluminaCandidateRevieweAndSubmitPage:EluminaCandidateRevieweAndSubmitPage;
    eluminaProctorExam:EluminaProctorExamPage;
    eluminaProctorReg:EluminaRegistrationForProctoringPage;
    eluminaProctorCand:EluminaProctorCandidatePage;
    eluminaLiveMonitorPage:EluminaIGLiveMonitorPage;
    eluminaMultipleExamsForAMPage:EluminaMultipleExamsForAMPage;
    eluminaMultipleExamsForPMPage:EluminaMultipleExamsForPMPage;
    eluminaMinimalTimeExamPage:EluminaMinimalTimeExamPage;
}>({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    commonPages: async ({ page, context }, use) => {
        await use(new commonPages(page, context));
    },
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },
    elementsPage: async ({ page, context }, use) => {
        await use(new ElementsPage(page, context));
    },
    alertsFrameWindowsPage: async ({ page, context }, use) => {
        await use(new AlertsFrameWindowsPage(page, context));
    },
    widgetsPage: async ({ page, context }, use) => {
        await use(new WidgetsPage(page, context));
    },
    interactionsPage: async ({ page, context }, use) => {
        await use(new InteractionsPage(page, context));
    },
    eluminaLoginPage: async ({ page, context }, use) => {
        await use(new EluminaLoginPage(page, context));
    },
    eluminaHomePage: async ({ page, context }, use) => {
        await use(new EluminaHomePage(page, context));
    },
    eluminaExamPage: async ({ page, context }, use) => {
        await use(new EluminaExamPage(page, context));
    },
    eluminaRegPage: async ({ page, context }, use) => {
        await use(new EluminaRegistrationPage(page, context));
    },
    eluminaCandPage: async ({ page, context }, use) => {
        await use(new EluminaCandidatePage(page, context));
    },
    eluminExamianvPage: async ({ page, context }, use) => {
        await use(new EluminaExamInvPage(page, context));
    },
    eluminaRegInvPage: async ({ page, context }, use) => {
        await use(new EluminaRegistrationInvPage(page, context));
    },
    eluminaCadInvPage: async ({ page, context }, use) => {
        await use(new EluminaInvCandidatePage(page, context));
    },
    eluminaInvPage: async ({ page, context }, use) => {
        await use(new EluminaInvPage(page, context));
    },
    eluminaCandidateRevieweAndSubmitPage: async ({ page, context }, use) => {
        await use(new EluminaCandidateRevieweAndSubmitPage(page, context));
    },
    eluminaProctorExam: async ({ page, context }, use) => {
        await use(new EluminaProctorExamPage(page, context));
    },
    eluminaProctorReg: async ({ page, context }, use) => {
        await use(new EluminaRegistrationForProctoringPage(page, context));
    },
    eluminaProctorCand: async ({ page, context }, use) => {
        await use(new EluminaProctorCandidatePage(page, context));
    },
    eluminaLiveMonitorPage: async ({ page, context }, use) => {
        await use(new EluminaIGLiveMonitorPage(page, context));
    },
    eluminaMultipleExamsForAMPage: async ({ page, context }, use) => {
        await use(new EluminaMultipleExamsForAMPage(page, context));
    },
    eluminaMultipleExamsForPMPage: async ({ page, context }, use) => {
        await use(new EluminaMultipleExamsForPMPage(page, context));
    },
    eluminaMinimalTimeExamPage: async ({ page, context }, use) => {
        await use(new EluminaMinimalTimeExamPage(page, context));
    }
})

export default test;