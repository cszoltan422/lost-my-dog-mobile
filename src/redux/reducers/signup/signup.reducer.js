import { createReducer } from '@reduxjs/toolkit';
import validator from 'validator';
import {
    EMOJI_REGEX,
    SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY,
    SIGNUP_EMAIL_TEXT_INPUT_KEY,
    SIGNUP_FIRST_NAME_TEXT_INPUT_KEY,
    SIGNUP_LAST_NAME_TEXT_INPUT_KEY,
    SIGNUP_PASSWORD_TEXT_INPUT_KEY,
    SIGNUP_USERNAME_TEXT_INPUT_KEY
} from '../../../application.constants';
import {
    ON_SIGNUP_ATTEMPT_ERROR,
    ON_SIGNUP_INPUT_VALUE_CHANGED, ON_SIGNUP_LOADING, ON_SIGNUP_STOP_LOADING, ON_SIGNUP_SUCCESS,
    ON_SIGNUP_VALIDATION_ERROR
} from '../../actions/signup/action-types/action.types';

export const initialState = {
    isValid: true,
    isLoading: false,
    error: '',
    inputs: {
        [SIGNUP_USERNAME_TEXT_INPUT_KEY]: {
            label: 'general.username',
            labelTestID: 'signup-screen-username-text-input-label',
            inputTestID: 'signup-screen-username-text-input',
            errorLabelTestID: 'signup-screen-username-text-input-error',
            errorIconTestID: 'signup-screen-username-text-input-error-icon',
            value: '',
            autoCapitalize: 'none',
            secureTextEntry: false,
            autoCompleteType: 'username',
            keyboardType: 'default',
            validationErrorKey: 'signUp.userNameInvalid',
            isValid: true,
            validator: (value) =>
                !/\s/g.test(value) &&
                !EMOJI_REGEX.test(value) &&
                value.replace(/\s/g, '').match(/^[a-zA-Z0-9]+$/) &&
                value.replace(/\s/g, '').length > 4
        },
        [SIGNUP_EMAIL_TEXT_INPUT_KEY]: {
            label: 'general.emailAddress',
            labelTestID: 'signup-screen-email-text-input-label',
            inputTestID: 'signup-screen-email-text-input',
            errorLabelTestID: 'signup-screen-email-text-input-error',
            errorIconTestID: 'signup-screen-email-text-input-error-icon',
            value: '',
            autoCapitalize: 'none',
            secureTextEntry: false,
            autoCompleteType: 'email',
            keyboardType: 'email-address',
            validationErrorKey: 'general.emailInvalid',
            isValid: true,
            validator: (value) =>
                !/\s/g.test(value) &&
                !EMOJI_REGEX.test(value) &&
                validator.isEmail(value.replace(/\s/g, ''))
        },
        [SIGNUP_FIRST_NAME_TEXT_INPUT_KEY]: {
            label: 'general.firstName',
            labelTestID: 'signup-screen-first-name-text-input-label',
            inputTestID: 'signup-screen-first-name-text-input',
            errorLabelTestID: 'signup-screen-first-name-text-input-error',
            errorIconTestID: 'signup-screen-first-name-text-input-error-icon',
            value: '',
            autoCapitalize: 'words',
            secureTextEntry: false,
            autoCompleteType: 'name',
            keyboardType: 'default',
            validationErrorKey: 'signUp.emptyFirstName',
            isValid: true,
            validator: (value) => !EMOJI_REGEX.test(value) && value.length >= 4
        },
        [SIGNUP_LAST_NAME_TEXT_INPUT_KEY]: {
            label: 'general.lastName',
            labelTestID: 'signup-screen-last-name-text-input-label',
            inputTestID: 'signup-screen-last-name-text-input',
            errorLabelTestID: 'signup-screen-last-name-text-input-error',
            errorIconTestID: 'signup-screen-last-name-text-input-error-icon',
            value: '',
            autoCapitalize: 'words',
            secureTextEntry: false,
            autoCompleteType: 'name',
            keyboardType: 'default',
            validationErrorKey: 'signUp.emptyLastName',
            isValid: true,
            validator: (value) => !EMOJI_REGEX.test(value) && value.length >= 4
        },
        [SIGNUP_PASSWORD_TEXT_INPUT_KEY]: {
            label: 'general.password',
            labelTestID: 'signup-screen-password-text-input-label',
            inputTestID: 'signup-screen-password-text-input',
            errorLabelTestID: 'signup-screen-password-text-input-error',
            errorIconTestID: 'signup-screen-password-text-input-error-icon',
            value: '',
            autoCapitalize: 'none',
            secureTextEntry: true,
            autoCompleteType: 'password',
            keyboardType: 'default',
            validationErrorKey: 'signUp.passwordInvalid',
            isValid: true,
            validator: (value) => !EMOJI_REGEX.test(value) && validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0,
                returnScore: false,
                pointsPerUnique: 1,
                pointsPerRepeat: 0.5,
                pointsForContainingLower: 10,
                pointsForContainingUpper: 10,
                pointsForContainingNumber: 10,
                pointsForContainingSymbol: 0
            })
        },
        [SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY]: {
            label: 'signUp.confirmPassword',
            labelTestID: 'signup-screen-confirm-password-text-input-label',
            inputTestID: 'signup-screen-confirm-password-text-input',
            errorLabelTestID: 'signup-screen-confirm-password-text-input-error',
            errorIconTestID: 'signup-screen-confirm-password-text-input-error-icon',
            value: '',
            autoCapitalize: 'none',
            secureTextEntry: true,
            autoCompleteType: 'password',
            keyboardType: 'default',
            validationErrorKey: 'signUp.passwordsNotMatching',
            isValid: true,
            validator: null
        },
    }
};

export const reducer = createReducer(initialState, {
    [ON_SIGNUP_INPUT_VALUE_CHANGED]: (state, action) => {
        state.inputs[action.payload.inputKey].value = action.payload.value;
        state.inputs[action.payload.inputKey].isValid = true;
        state.isValid = true;
    },
    [ON_SIGNUP_VALIDATION_ERROR]: (state, action) => {
        state.inputs[action.payload].isValid = false;
        state.isValid = false;
    },
    [ON_SIGNUP_SUCCESS]: (state) => {
        state.isValid = true;
        state.isLoading = false;
        state.error = '';
        Object.keys(state.inputs).forEach((inputKey) => {
            state.inputs[inputKey].value = '';
        });
    },
    [ON_SIGNUP_LOADING]: (state) => {
        state.isLoading = true;
    },
    [ON_SIGNUP_STOP_LOADING]: (state) => {
        state.isLoading = false;
    },
    [ON_SIGNUP_ATTEMPT_ERROR]: (state, action) => {
        state.error = action.payload;
        state.isValid = false;
    }
});