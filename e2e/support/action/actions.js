export const pressLocationPermissionButton = async () => {
    await element(by.id('location-permission-button')).tap();
};

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
