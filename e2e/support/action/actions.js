export const navigateToLoginScreen = async () => {
    await expect(element(by.id('floating-action-button'))).toBeVisible();
    await element(by.id('floating-action-button')).tap();
    await expect(element(by.id('floating-action-button-new-submission-option'))).toBeVisible();
    await element(by.id('floating-action-button-new-submission-option')).tap();
};

export const attemptLoginWithCredentials = async (username, password) => {
    await element(by.id('login-screen-username-text-input')).typeText(username);
    await element(by.id('login-screen-password-text-input')).typeText(password);
    await element(by.id('login-screen-login-button')).tap();
};

export const pressDashboardHeaderFoundTabButton = async () => {
    await element(by.id('dashboard-header-tabs-found-button')).tap();
};

export const swipeDashboardHeaderSlider = async (direction, speed, percentage) => {
    await element(by.id('dashboard-header-slider')).swipe(direction, speed, percentage);
};

export const pressOnItemInDashboardListAtIndex = async (index) => {
    await element(by.id(`dashboard-list-item-container-${index}`)).tap();
};

export const scrollOnViewByIdTo = async (elementId, direction) => {
    await element(by.id(elementId)).swipe(direction);
};

export const waitForSplashAnimationToFinish = async (elementToWaitFor) => {
    await waitFor(element(by.id(elementToWaitFor))).toBeVisible().withTimeout(6000);
};

export const navigateToSignupScreen = async () => {
    await expect(element(by.id('floating-action-button'))).toBeVisible();
    await element(by.id('floating-action-button')).tap();
    await expect(element(by.id('floating-action-button-new-submission-option'))).toBeVisible();
    await element(by.id('floating-action-button-new-submission-option')).tap();
    await element(by.id('login-screen-signup-text')).tap();
};

export const closeInputView = async (elementToTap) => {
    await element(by.id(elementToTap)).tap();
};

export const pressSignupButton = async () => {
    await element(by.id('signup-screen-signup-button')).tap();
};

export const typeToSignupInputFieldValue = async (inputField, value) => {
    await element(by.id(inputField)).clearText();
    await element(by.id(inputField)).typeText(value);
};