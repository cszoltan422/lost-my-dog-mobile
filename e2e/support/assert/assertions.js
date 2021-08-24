export const expectLocationPermissionTitleTextToBeVisibleWithText = async (text) => {
    await expect(element(by.id('location-permission-title-text'))).toBeVisible();
    await expect(element(by.id('location-permission-title-text'))).toHaveText(text);
};

export const expectLocationPermissionButtonToBeVisible = async () => {
    await expect(element(by.id('location-permission-button'))).toBeVisible();
};

export const expectLocationPermissionDescriptionTextToBeVisibleWithText = async (text) => {
    await expect(element(by.id('location-permission-description-text'))).toBeVisible();
    await expect(element(by.id('location-permission-description-text'))).toHaveText(text);
};

export const expectLocationPermissionButtonNotToBeFocused = async () => {
    await expect(element(by.id('location-permission-button'))).not.toBeFocused();
};

export const expectLoginScreenToBeVisibleWithTexts = async (appName, forgotPasswordText, signUpText) => {
    await expect(element(by.id('login-screen-application-name-text'))).toBeVisible();
    await expect(element(by.id('login-screen-application-name-text'))).toHaveText(appName);
    await expect(element(by.id('login-screen-login-error-text'))).not.toBeVisible();
    await expect(element(by.id('login-screen-username-text-input'))).toBeVisible();
    await expect(element(by.id('login-screen-password-text-input'))).toBeVisible();
    await expect(element(by.id('login-screen-forgot-password-text'))).toBeVisible();
    await expect(element(by.id('login-screen-forgot-password-text'))).toBeVisible(forgotPasswordText);
    await expect(element(by.id('login-screen-login-button'))).toBeVisible();
    await expect(element(by.id('login-screen-signup-text'))).toBeVisible();
    await expect(element(by.id('login-screen-signup-text'))).toBeVisible(signUpText);
};

export const expectLoginErrorTextToBeVisibleWithText = async (text) => {
    await expect(element(by.id('login-screen-login-error-text'))).toBeVisible();
    await expect(element(by.id('login-screen-login-error-text'))).toHaveText(text);
};

export const expectDashboardHeaderIsVisibleWithDistanceLabel = async (text) => {
    await expect(element(by.id('dashboard-header-tabs-container'))).toBeVisible();
    await expect(element(by.id('dashboard-header-tabs-lost-button'))).toBeVisible();
    await expect(element(by.id('dashboard-header-tabs-found-button'))).toBeVisible();
    await expect(element(by.id('dashboard-header-slider-container'))).toBeVisible();
    await expect(element(by.id('dashboard-header-slider'))).toBeVisible();
    await expect(element(by.id('dashboard-header-slider-distance-text'))).toBeVisible();
    await expect(element(by.id('dashboard-header-slider-distance-text'))).toHaveText(text);
};

export const expectDashboardListContainerIsVisibleWithText = async (text) => {
    await expect(element(by.id('dashboard-list-container'))).toBeVisible();
    await expect(element(by.id('dashboard-list-end-reached-indicator-container'))).toBeVisible();
    await expect(element(by.id('dashboard-list-end-reached-indicator-text'))).toBeVisible();
    await expect(element(by.id('dashboard-list-end-reached-indicator-text'))).toHaveText(text);
};

export const expectDashboardListItemAtIndexIsVisibleWithValues = async (index, dogName, dogBreed, dateLost) => {
    await expect(element(by.id(`dashboard-list-item-container-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-header-container-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-header-image-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-header-dog-name-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-header-dog-name-${index}`))).toHaveText(dogName);
    await expect(element(by.id(`dashboard-list-item-header-dog-breed-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-header-dog-breed-${index}`))).toHaveText(dogBreed);
    await expect(element(by.id(`dashboard-list-item-details-container-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-details-city-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-details-date-lost-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-details-date-lost-${index}`))).toHaveText(dateLost);
};