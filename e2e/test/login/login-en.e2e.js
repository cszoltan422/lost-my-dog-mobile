import en from "../../../src/i18n/en/en";
import {
    LOGIN_FORGOT_PASSWORD_PLACEHOLDER, LOGIN_SIGN_UP_TEXT, LOGIN_WRONG_PASSWORD_OR_USERNAME
} from "../../../src/i18n/i18n.keys";
import {APPLICATION_NAME} from "../../../src/application.constants";
import {setLocation} from "../utils/utils";

describe('Login Screen - [en]', () => {

    it('should open the login screen and show error if login was not successful [en]', async () => {
        await setLocation(37.785834, 122.406417, device);
        await device.launchApp({
            permissions: {
                location: 'always'
            },
        });
        //await device.setLocation(37.785834, 122.406417);

        await expect(element(by.id('floating-action-button'))).toBeVisible();
        await element(by.id('floating-action-button')).tap();
        await expect(element(by.id('floating-action-button-new-submission-option'))).toBeVisible();
        await element(by.id('floating-action-button-new-submission-option')).tap();

        await expect(element(by.id('login-screen-application-name-text'))).toBeVisible();
        await expect(element(by.id('login-screen-application-name-text'))).toHaveText(APPLICATION_NAME);
        await expect(element(by.id('login-screen-login-error-text'))).not.toBeVisible();
        await expect(element(by.id('login-screen-username-text-input'))).toBeVisible();
        await expect(element(by.id('login-screen-password-text-input'))).toBeVisible();
        await expect(element(by.id('login-screen-forgot-password-text'))).toBeVisible();
        await expect(element(by.id('login-screen-forgot-password-text'))).toBeVisible(en[LOGIN_FORGOT_PASSWORD_PLACEHOLDER]);
        await expect(element(by.id('login-screen-login-button'))).toBeVisible();
        await expect(element(by.id('login-screen-signup-text'))).toBeVisible();
        await expect(element(by.id('login-screen-signup-text'))).toBeVisible(en[LOGIN_SIGN_UP_TEXT]);

        await element(by.id('login-screen-username-text-input')).typeText('testuser1');
        await element(by.id('login-screen-password-text-input')).typeText('wrongpassword');
        await element(by.id('login-screen-login-button')).tap();

        await expect(element(by.id('login-screen-login-error-text'))).toBeVisible();
        await expect(element(by.id('login-screen-login-error-text'))).toHaveText(en[LOGIN_WRONG_PASSWORD_OR_USERNAME]);
    });

    it('should open the login screen and redirect to previous screen if login was successful [en]', async () => {
        await setLocation(37.785834, 122.406417, device);
        await device.launchApp({
            permissions: {
                location: 'always'
            },
        });
        //await device.setLocation(37.785834, 122.406417);

        await expect(element(by.id('dashboard-header-tabs-container'))).toBeVisible();
        await expect(element(by.id('floating-action-button'))).toBeVisible();
        await element(by.id('floating-action-button')).tap();
        await expect(element(by.id('floating-action-button-new-submission-option'))).toBeVisible();
        await element(by.id('floating-action-button-new-submission-option')).tap();

        await expect(element(by.id('login-screen-application-name-text'))).toBeVisible();
        await expect(element(by.id('login-screen-application-name-text'))).toHaveText(APPLICATION_NAME);
        await expect(element(by.id('login-screen-login-error-text'))).not.toBeVisible();
        await expect(element(by.id('login-screen-username-text-input'))).toBeVisible();
        await expect(element(by.id('login-screen-password-text-input'))).toBeVisible();
        await expect(element(by.id('login-screen-forgot-password-text'))).toBeVisible();
        await expect(element(by.id('login-screen-forgot-password-text'))).toBeVisible(en[LOGIN_FORGOT_PASSWORD_PLACEHOLDER]);
        await expect(element(by.id('login-screen-login-button'))).toBeVisible();
        await expect(element(by.id('login-screen-signup-text'))).toBeVisible();
        await expect(element(by.id('login-screen-signup-text'))).toBeVisible(en[LOGIN_SIGN_UP_TEXT]);

        await element(by.id('login-screen-username-text-input')).typeText('testuser1');
        await element(by.id('login-screen-password-text-input')).typeText('password');
        await element(by.id('login-screen-login-button')).tap();

        await expect(element(by.id('dashboard-header-tabs-container'))).toBeVisible();
        await expect(element(by.id('floating-action-button'))).toBeVisible();
        await element(by.id('floating-action-button')).tap();
        await expect(element(by.id('floating-action-button-new-submission-option'))).toBeVisible();
        await element(by.id('floating-action-button-new-submission-option')).tap();
        await expect(element(by.id('login-screen-application-name-text'))).not.toBeVisible();
    });
});

