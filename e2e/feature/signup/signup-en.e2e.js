import {
    closeInputView,
    navigateToSignupScreen, pressSignupButton, scrollOnViewByIdTo, typeToSignupInputFieldValue,
    waitForSplashAnimationToFinish
} from '../../support/action/actions';
import {
    EMAIL_EXISTS, LOGIN_FORGOT_PASSWORD_PLACEHOLDER, LOGIN_SIGN_UP_TEXT,
    SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER, SIGNUP_CONFIRM_PASSWORD_VALIDATION_ERROR,
    SIGNUP_EMAIL_PLACEHOLDER,
    SIGNUP_EMAIL_VALIDATION_ERROR,
    SIGNUP_FIRST_NAME_PLACEHOLDER,
    SIGNUP_FIRST_NAME_VALIDATION_ERROR,
    SIGNUP_LAST_NAME_PLACEHOLDER, SIGNUP_LAST_NAME_VALIDATION_ERROR,
    SIGNUP_PASSWORD_PLACEHOLDER, SIGNUP_PASSWORD_VALIDATION_ERROR,
    SIGNUP_USERNAME_PLACEHOLDER,
    SIGNUP_USERNAME_VALIDATION_ERROR, USER_NAME_EXISTS
} from "../../../src/i18n/i18n.keys";
import {
    expectLoginScreenToBeVisibleWithTexts,
    expectSignupAttemptHasFailedWithReason,
    expectSignupScreenInputHasNoError,
    expectSignupScreenInputsHasError, expectSignupScreenServerErrorIsNotVisible,
    signupScreenToBeVisibleWithTexts
} from "../../support/assert/assertions";
import {APPLICATION_NAME} from "../../../src/application.constants";
import en from "../../../src/i18n/en/en";

describe('Signup Screen - [en]', () => {

    it('it should open the signup screen and show error if the user submits empty form', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            }
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await navigateToSignupScreen();
        await signupScreenToBeVisibleWithTexts(
            APPLICATION_NAME,
            en[SIGNUP_USERNAME_PLACEHOLDER],
            en[SIGNUP_EMAIL_PLACEHOLDER],
            en[SIGNUP_FIRST_NAME_PLACEHOLDER],
            en[SIGNUP_LAST_NAME_PLACEHOLDER],
            en[SIGNUP_PASSWORD_PLACEHOLDER],
            en[SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER]
        );

        await pressSignupButton();
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-username-text-input-error-icon',
                errorLabelTestID: 'signup-screen-username-text-input-error',
                errorText: en[SIGNUP_USERNAME_VALIDATION_ERROR],
            },
            {
                iconTestID: 'signup-screen-email-text-input-error-icon',
                errorLabelTestID: 'signup-screen-email-text-input-error',
                errorText: en[SIGNUP_EMAIL_VALIDATION_ERROR],
            },
            {
                iconTestID: 'signup-screen-first-name-text-input-error-icon',
                errorLabelTestID: 'signup-screen-first-name-text-input-error',
                errorText: en[SIGNUP_FIRST_NAME_VALIDATION_ERROR],
            },
            {
                iconTestID: 'signup-screen-last-name-text-input-error-icon',
                errorLabelTestID: 'signup-screen-last-name-text-input-error',
                errorText: en[SIGNUP_LAST_NAME_VALIDATION_ERROR],
            },
            {
                iconTestID: 'signup-screen-password-text-input-error-icon',
                errorLabelTestID: 'signup-screen-password-text-input-error',
                errorText: en[SIGNUP_PASSWORD_VALIDATION_ERROR],
            },
        ]);
        await expectSignupScreenServerErrorIsNotVisible();
    });

    it('it should open the signup screen and validate the username field [en]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            }
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await navigateToSignupScreen();
        await signupScreenToBeVisibleWithTexts(
            APPLICATION_NAME,
            en[SIGNUP_USERNAME_PLACEHOLDER],
            en[SIGNUP_EMAIL_PLACEHOLDER],
            en[SIGNUP_FIRST_NAME_PLACEHOLDER],
            en[SIGNUP_LAST_NAME_PLACEHOLDER],
            en[SIGNUP_PASSWORD_PLACEHOLDER],
            en[SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER]
        );
        await expectSignupScreenServerErrorIsNotVisible();

        await typeToSignupInputFieldValue('signup-screen-username-text-input', 'text with spaces');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-username-text-input-error-icon',
                errorLabelTestID: 'signup-screen-username-text-input-error',
                errorText: en[SIGNUP_USERNAME_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-username-text-input', 'u$sername');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-username-text-input-error-icon',
                errorLabelTestID: 'signup-screen-username-text-input-error',
                errorText: en[SIGNUP_USERNAME_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-username-text-input', 'usernamewith????');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-username-text-input-error-icon',
                errorLabelTestID: 'signup-screen-username-text-input-error',
                errorText: en[SIGNUP_USERNAME_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-username-text-input', 'nan');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-username-text-input-error-icon',
                errorLabelTestID: 'signup-screen-username-text-input-error',
                errorText: en[SIGNUP_USERNAME_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-username-text-input', 'testuser');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputHasNoError('signup-screen-username-text-input-error-icon');
    });

    it('it should open the signup screen and validate the email field [en]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            }
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await navigateToSignupScreen();
        await signupScreenToBeVisibleWithTexts(
            APPLICATION_NAME,
            en[SIGNUP_USERNAME_PLACEHOLDER],
            en[SIGNUP_EMAIL_PLACEHOLDER],
            en[SIGNUP_FIRST_NAME_PLACEHOLDER],
            en[SIGNUP_LAST_NAME_PLACEHOLDER],
            en[SIGNUP_PASSWORD_PLACEHOLDER],
            en[SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER]
        );
        await expectSignupScreenServerErrorIsNotVisible();

        await typeToSignupInputFieldValue('signup-screen-username-text-input', 'testuser');

        await typeToSignupInputFieldValue('signup-screen-email-text-input', 'text with spaces');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-email-text-input-error-icon',
                errorLabelTestID: 'signup-screen-email-text-input-error',
                errorText: en[SIGNUP_EMAIL_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-email-text-input', 'notanemail');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-email-text-input-error-icon',
                errorLabelTestID: 'signup-screen-email-text-input-error',
                errorText: en[SIGNUP_EMAIL_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-email-text-input', 'test????@user1.com');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-email-text-input-error-icon',
                errorLabelTestID: 'signup-screen-email-text-input-error',
                errorText: en[SIGNUP_EMAIL_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-email-text-input', 'test@user1.com');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputHasNoError('signup-screen-email-text-input-error-icon');
    });

    it('it should open the signup screen and validate the first name field [en]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            }
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await navigateToSignupScreen();
        await signupScreenToBeVisibleWithTexts(
            APPLICATION_NAME,
            en[SIGNUP_USERNAME_PLACEHOLDER],
            en[SIGNUP_EMAIL_PLACEHOLDER],
            en[SIGNUP_FIRST_NAME_PLACEHOLDER],
            en[SIGNUP_LAST_NAME_PLACEHOLDER],
            en[SIGNUP_PASSWORD_PLACEHOLDER],
            en[SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER]
        );
        await expectSignupScreenServerErrorIsNotVisible();

        await typeToSignupInputFieldValue('signup-screen-username-text-input', 'testuser');
        await typeToSignupInputFieldValue('signup-screen-email-text-input', 'test@user1.com');

        await typeToSignupInputFieldValue('signup-screen-first-name-text-input', 'nan');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-first-name-text-input-error-icon',
                errorLabelTestID: 'signup-screen-first-name-text-input-error',
                errorText: en[SIGNUP_FIRST_NAME_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-first-name-text-input', 'Test????');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-first-name-text-input-error-icon',
                errorLabelTestID: 'signup-screen-first-name-text-input-error',
                errorText: en[SIGNUP_FIRST_NAME_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-first-name-text-input', 'Test');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputHasNoError('signup-screen-first-name-text-input-error-icon');
    });

    it('it should open the signup screen and validate the last name field [en]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            }
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await navigateToSignupScreen();
        await signupScreenToBeVisibleWithTexts(
            APPLICATION_NAME,
            en[SIGNUP_USERNAME_PLACEHOLDER],
            en[SIGNUP_EMAIL_PLACEHOLDER],
            en[SIGNUP_FIRST_NAME_PLACEHOLDER],
            en[SIGNUP_LAST_NAME_PLACEHOLDER],
            en[SIGNUP_PASSWORD_PLACEHOLDER],
            en[SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER]
        );
        await expectSignupScreenServerErrorIsNotVisible();

        await typeToSignupInputFieldValue('signup-screen-username-text-input', 'testuser');
        await typeToSignupInputFieldValue('signup-screen-email-text-input', 'test@user1.com');
        await typeToSignupInputFieldValue('signup-screen-first-name-text-input', 'Test');

        await typeToSignupInputFieldValue('signup-screen-last-name-text-input', 'nan');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-last-name-text-input-error-icon',
                errorLabelTestID: 'signup-screen-last-name-text-input-error',
                errorText: en[SIGNUP_LAST_NAME_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-last-name-text-input', 'User????');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-last-name-text-input-error-icon',
                errorLabelTestID: 'signup-screen-last-name-text-input-error',
                errorText: en[SIGNUP_LAST_NAME_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-last-name-text-input', 'User');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputHasNoError('signup-screen-last-name-text-input-error-icon');
    });

    it('it should open the signup screen and validate the password field [en]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            }
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await navigateToSignupScreen();
        await signupScreenToBeVisibleWithTexts(
            APPLICATION_NAME,
            en[SIGNUP_USERNAME_PLACEHOLDER],
            en[SIGNUP_EMAIL_PLACEHOLDER],
            en[SIGNUP_FIRST_NAME_PLACEHOLDER],
            en[SIGNUP_LAST_NAME_PLACEHOLDER],
            en[SIGNUP_PASSWORD_PLACEHOLDER],
            en[SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER]
        );
        await expectSignupScreenServerErrorIsNotVisible();

        await typeToSignupInputFieldValue('signup-screen-username-text-input', 'testuser');
        await typeToSignupInputFieldValue('signup-screen-email-text-input', 'test@user1.com');
        await typeToSignupInputFieldValue('signup-screen-first-name-text-input', 'Test');
        await typeToSignupInputFieldValue('signup-screen-last-name-text-input', 'User');

        await typeToSignupInputFieldValue('signup-screen-password-text-input', 'password????');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-password-text-input-error-icon',
                errorLabelTestID: 'signup-screen-password-text-input-error',
                errorText: en[SIGNUP_PASSWORD_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-password-text-input', 'ALLUPPERCASE123');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-password-text-input-error-icon',
                errorLabelTestID: 'signup-screen-password-text-input-error',
                errorText: en[SIGNUP_PASSWORD_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-password-text-input', 'alllowercase123');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-password-text-input-error-icon',
                errorLabelTestID: 'signup-screen-password-text-input-error',
                errorText: en[SIGNUP_PASSWORD_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-password-text-input', 'noNumbers');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-password-text-input-error-icon',
                errorLabelTestID: 'signup-screen-password-text-input-error',
                errorText: en[SIGNUP_PASSWORD_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-password-text-input', 'Short12');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-password-text-input-error-icon',
                errorLabelTestID: 'signup-screen-password-text-input-error',
                errorText: en[SIGNUP_PASSWORD_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-password-text-input', 'Password123');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputHasNoError('signup-screen-password-text-input-error-icon');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-confirm-password-text-input-error-icon',
                errorLabelTestID: 'signup-screen-confirm-password-text-input-error',
                errorText: en[SIGNUP_CONFIRM_PASSWORD_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-confirm-password-text-input', 'Password12');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputsHasError([
            {
                iconTestID: 'signup-screen-confirm-password-text-input-error-icon',
                errorLabelTestID: 'signup-screen-confirm-password-text-input-error',
                errorText: en[SIGNUP_CONFIRM_PASSWORD_VALIDATION_ERROR],
            }
        ]);

        await typeToSignupInputFieldValue('signup-screen-confirm-password-text-input', 'Password123');
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupScreenInputHasNoError('signup-screen-confirm-password-text-input-error-icon');
    });

    it('it should open the signup screen and validate the signup attempt in the backend [en]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            }
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await navigateToSignupScreen();
        await signupScreenToBeVisibleWithTexts(
            APPLICATION_NAME,
            en[SIGNUP_USERNAME_PLACEHOLDER],
            en[SIGNUP_EMAIL_PLACEHOLDER],
            en[SIGNUP_FIRST_NAME_PLACEHOLDER],
            en[SIGNUP_LAST_NAME_PLACEHOLDER],
            en[SIGNUP_PASSWORD_PLACEHOLDER],
            en[SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER]
        );
        await expectSignupScreenServerErrorIsNotVisible();

        await typeToSignupInputFieldValue('signup-screen-username-text-input', 'testuser');
        await typeToSignupInputFieldValue('signup-screen-email-text-input', 'test@user1.com');
        await typeToSignupInputFieldValue('signup-screen-first-name-text-input', 'Test');
        await typeToSignupInputFieldValue('signup-screen-last-name-text-input', 'User');
        await typeToSignupInputFieldValue('signup-screen-password-text-input', 'Password123');
        await typeToSignupInputFieldValue('signup-screen-confirm-password-text-input', 'Password123');

        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');

        await expectSignupScreenInputHasNoError('signup-screen-username-text-input-error-icon');
        await expectSignupScreenInputHasNoError('signup-screen-email-text-input-error-icon');
        await expectSignupScreenInputHasNoError('signup-screen-first-name-text-input-error-icon');
        await expectSignupScreenInputHasNoError('signup-screen-last-name-text-input-error-icon');
        await expectSignupScreenInputHasNoError('signup-screen-password-text-input-error-icon');
        await expectSignupScreenInputHasNoError('signup-screen-confirm-password-text-input-error-icon');
        await expectSignupAttemptHasFailedWithReason(en[USER_NAME_EXISTS]);

        await typeToSignupInputFieldValue('signup-screen-username-text-input', `testuser${new Date().getTime()}`);
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'down');
        await expectSignupAttemptHasFailedWithReason(en[EMAIL_EXISTS]);

        await typeToSignupInputFieldValue('signup-screen-email-text-input', `test${new Date().getTime()}@user.com`);
        await closeInputView('signup-screen-scroll-view');
        await scrollOnViewByIdTo('signup-screen-scroll-view', 'up');
        await pressSignupButton();
        await expectLoginScreenToBeVisibleWithTexts(APPLICATION_NAME, en[LOGIN_FORGOT_PASSWORD_PLACEHOLDER], en[LOGIN_SIGN_UP_TEXT]);
    });
});

