import en from '../../../src/i18n/en/en';
import {
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE,
    LOGIN_FORGOT_PASSWORD_PLACEHOLDER, LOGIN_SIGN_UP_TEXT, LOGIN_WRONG_PASSWORD_OR_USERNAME
} from '../../../src/i18n/i18n.keys';
import {APPLICATION_NAME} from '../../../src/application.constants';
import {setLocation} from '../utils/utils';
import {
    attemptLoginWithCredentials,
    navigateToLoginScreen,
    waitForSplashAnimationToFinish
} from '../../support/action/actions';
import {
    expectDashboardHeaderIsVisibleWithDistanceLabel,
    expectLoginErrorTextToBeVisibleWithText,
    expectLoginScreenToBeVisibleWithTexts
} from '../../support/assert/assertions';

describe('Login Screen - [en]', () => {

    it('should open the login screen and show error if login was not successful [en]', async () => {
        await device.launchApp({
            newInstance: true,
            permissions: {
                location: 'always'
            },
        });
        await device.reloadReactNative();
        await setLocation(37.785834, -122.406417, device);
        await waitForSplashAnimationToFinish('application-container');

        await navigateToLoginScreen();
        await expectLoginScreenToBeVisibleWithTexts(APPLICATION_NAME, en[LOGIN_FORGOT_PASSWORD_PLACEHOLDER], en[LOGIN_SIGN_UP_TEXT]);
        await attemptLoginWithCredentials('testuser1', 'wrongpassword');
        await expectLoginErrorTextToBeVisibleWithText(en[LOGIN_WRONG_PASSWORD_OR_USERNAME]);
    });

    it('should open the login screen and redirect to previous screen if login was successful [en]', async () => {
        await device.launchApp({
            newInstance: true,
            permissions: {
                location: 'always'
            },
        });
        await device.reloadReactNative();
        await setLocation(37.785834, -122.406417, device);
        await waitForSplashAnimationToFinish('application-container');

        await navigateToLoginScreen();
        await expectLoginScreenToBeVisibleWithTexts(APPLICATION_NAME, en[LOGIN_FORGOT_PASSWORD_PLACEHOLDER], en[LOGIN_SIGN_UP_TEXT]);
        await attemptLoginWithCredentials('testuser1', 'password');
        await expectDashboardHeaderIsVisibleWithDistanceLabel(en[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 30 km');
    });
});

