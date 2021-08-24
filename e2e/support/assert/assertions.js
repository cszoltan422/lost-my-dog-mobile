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

export const expectDetailsScreenTopSectionIsVisible = async () => {
    await expect(element(by.id('details-screen-image'))).toBeVisible();
    await expect(element(by.id('details-screen-description-text'))).toBeVisible();
};

export const expectDetailsScreenDogDetailsAreVisibleWithLabels = async (labels) => {
    await expect(element(by.id('details-screen-dog-name-text-label'))).toBeVisible();
    await expect(element(by.id('details-screen-dog-name-text-label'))).toHaveText(labels.dogName);

    await expect(element(by.id('details-screen-dog-breed-text-label'))).toBeVisible();
    await expect(element(by.id('details-screen-dog-breed-text-label'))).toHaveText(labels.dogBreed);

    await expect(element(by.id('details-screen-dog-gender-text-label'))).toBeVisible();
    await expect(element(by.id('details-screen-dog-gender-text-label'))).toHaveText(labels.gender);

    await expect(element(by.id('details-screen-dog-color-text-label'))).toBeVisible();
    await expect(element(by.id('details-screen-dog-color-text-label'))).toHaveText(labels.color);

    await expect(element(by.id('details-screen-dog-status-text-label'))).toBeVisible();
    await expect(element(by.id('details-screen-dog-status-text-label'))).toHaveText(labels.status);

    await expect(element(by.id('details-screen-dog-age-text-label'))).toBeVisible();
    await expect(element(by.id('details-screen-dog-age-text-label'))).toHaveText(labels.dogAge);

    await expect(element(by.id('details-screen-dog-location-text-label'))).toBeVisible();
    await expect(element(by.id('details-screen-dog-location-text-label'))).toHaveText(labels.location);

    await expect(element(by.id('details-screen-dog-date-lost-text-label'))).toBeVisible();
    await expect(element(by.id('details-screen-dog-date-lost-text-label'))).toHaveText(labels.dateLost);
};

export const expectActionsButtonsToBeVisible = async () => {
    await expect(element(by.id('details-screen-send-email-button'))).toBeVisible();
    await expect(element(by.id('details-screen-call-owner-button'))).toBeVisible();
};

export const expectMapsViewWithMarkerToBeVisible = async () => {
    await expect(element(by.id('map-view-container'))).toBeVisible();
    await expect(element(by.id('map-view-marker'))).toBeVisible();
};