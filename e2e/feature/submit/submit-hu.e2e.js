import {
    attemptLoginWithCredentials, clickOnSubmitScreenSubmitButton,
    navigateToLoginScreen,
    navigateToSubmitFormScreen,
    scrollOnViewByIdTo, toggleSwitch,
    waitForSplashAnimationToFinish
} from "../../support/action/actions";
import {
    expectDashboardHeaderIsVisibleWithDistanceLabel,
    expectImagePickerToBeVisible, expectInputFormErrorsToBeVisible,
    expectInputFormWithDefaultLabelsToBeVisible,
    expectInputFormWithExtraLabelsToBeVisible,
    expectLocationPickerToBeVisible,
    expectLoginScreenToBeVisibleWithTexts,
    expectSubmitScreenSubmitButtonToBeVisible
} from "../../support/assert/assertions";
import {
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE,
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_BREED_LABEL_TITLE, DETAILS_DOG_CHIP_NUMBER,
    DETAILS_DOG_COLOR_LABEL_TITLE,
    DETAILS_DOG_HAS_CHIP,
    DETAILS_DOG_NAME_LABEL_TITLE,
    DETAILS_DOG_SEX_LABEL_TITLE,
    DETAILS_DOG_STATUS_LABEL_TITLE, DETAILS_INPUT_REQUIRED,
    DETAILS_SUBMITTER_EMAIL_ADDRESS,
    DETAILS_SUBMITTER_PHONE_NUMBER, LOCATION_PICKER_CURRENT_COORDINATES, LOCATION_PICKER_INFO_DESCRIPTION,
    LOGIN_FORGOT_PASSWORD_PLACEHOLDER,
    LOGIN_SIGN_UP_TEXT
} from "../../../src/i18n/i18n.keys";
import {APPLICATION_NAME} from "../../../src/application.constants";
import hu from "../../../src/i18n/hu/hu";

describe('Submit Screen - [hu]', () => {

    it('login with user - [hu]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            },
            languageAndLocale: {
                language: 'hu',
                locale: 'hu'
            }
        });
        await device.reloadReactNative();

        await waitForSplashAnimationToFinish('application-container');

        await navigateToLoginScreen();
        await expectLoginScreenToBeVisibleWithTexts(APPLICATION_NAME, hu[LOGIN_FORGOT_PASSWORD_PLACEHOLDER], hu[LOGIN_SIGN_UP_TEXT]);
        await attemptLoginWithCredentials('testuser1', 'password');
        await expectDashboardHeaderIsVisibleWithDistanceLabel(hu[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 30 km');
    });

    it('it should open the submit screen for logged in users and display the input form - [hu]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            },
            languageAndLocale: {
                language: 'hu',
                locale: 'hu'
            }
        });
        await device.reloadReactNative();

        await waitForSplashAnimationToFinish('application-container');

        await navigateToSubmitFormScreen();

        await expectImagePickerToBeVisible();
        await expectInputFormWithDefaultLabelsToBeVisible(
            `${hu[DETAILS_DOG_NAME_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_BREED_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_SEX_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_COLOR_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_STATUS_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_AGE_LABEL_TITLE]}*`,
            hu[DETAILS_DOG_HAS_CHIP],
            hu[DETAILS_SUBMITTER_EMAIL_ADDRESS],
            hu[DETAILS_SUBMITTER_PHONE_NUMBER],
        );

        await scrollOnViewByIdTo('details-screen-scroll-view', 'up');
        await expectLocationPickerToBeVisible(hu[LOCATION_PICKER_INFO_DESCRIPTION], hu[LOCATION_PICKER_CURRENT_COORDINATES]);
        await expectSubmitScreenSubmitButtonToBeVisible();

        await scrollOnViewByIdTo('details-screen-scroll-view', 'down');
        await toggleSwitch('details-screen-dog-has-chip-toggle-input');
        await expectInputFormWithExtraLabelsToBeVisible(
            `${hu[DETAILS_DOG_NAME_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_BREED_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_SEX_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_COLOR_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_STATUS_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_AGE_LABEL_TITLE]}*`,
            hu[DETAILS_DOG_HAS_CHIP],
            hu[DETAILS_DOG_CHIP_NUMBER],
            hu[DETAILS_SUBMITTER_EMAIL_ADDRESS],
            hu[DETAILS_SUBMITTER_PHONE_NUMBER],
        );
    });

    it('it should open the submit screen and validate the form inputs - [hu]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            },
            languageAndLocale: {
                language: 'hu',
                locale: 'hu'
            }
        });
        await device.reloadReactNative();

        await waitForSplashAnimationToFinish('application-container');

        await navigateToSubmitFormScreen();

        await expectImagePickerToBeVisible();
        await expectInputFormWithDefaultLabelsToBeVisible(
            `${hu[DETAILS_DOG_NAME_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_BREED_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_SEX_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_COLOR_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_STATUS_LABEL_TITLE]}*`,
            `${hu[DETAILS_DOG_AGE_LABEL_TITLE]}*`,
            hu[DETAILS_DOG_HAS_CHIP],
            hu[DETAILS_SUBMITTER_EMAIL_ADDRESS],
            hu[DETAILS_SUBMITTER_PHONE_NUMBER],
        );

        await scrollOnViewByIdTo('details-screen-scroll-view', 'up');
        await expectLocationPickerToBeVisible(hu[LOCATION_PICKER_INFO_DESCRIPTION], hu[LOCATION_PICKER_CURRENT_COORDINATES]);
        await expectSubmitScreenSubmitButtonToBeVisible();
        await clickOnSubmitScreenSubmitButton();
        await scrollOnViewByIdTo('details-screen-scroll-view', 'down');
        await expectInputFormErrorsToBeVisible(hu[DETAILS_INPUT_REQUIRED]);
    });
})