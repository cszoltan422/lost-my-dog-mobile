import { createReducer } from '@reduxjs/toolkit';
import validator from 'validator';
import {
    SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY,
    SIGNUP_EMAIL_TEXT_INPUT_KEY,
    SIGNUP_FIRST_NAME_TEXT_INPUT_KEY,
    SIGNUP_LAST_NAME_TEXT_INPUT_KEY,
    SIGNUP_PASSWORD_TEXT_INPUT_KEY,
    SIGNUP_USERNAME_TEXT_INPUT_KEY
} from '../../../application.constants';
import {
    SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER,
    SIGNUP_CONFIRM_PASSWORD_VALIDATION_ERROR,
    SIGNUP_EMAIL_PLACEHOLDER,
    SIGNUP_EMAIL_VALIDATION_ERROR,
    SIGNUP_FIRST_NAME_PLACEHOLDER,
    SIGNUP_FIRST_NAME_VALIDATION_ERROR,
    SIGNUP_LAST_NAME_PLACEHOLDER, SIGNUP_LAST_NAME_VALIDATION_ERROR,
    SIGNUP_PASSWORD_PLACEHOLDER,
    SIGNUP_PASSWORD_VALIDATION_ERROR,
    SIGNUP_USERNAME_PLACEHOLDER,
    SIGNUP_USERNAME_VALIDATION_ERROR
} from '../../../i18n/i18n.keys';
import {
    ON_SIGNUP_ATTEMPT_ERROR,
    ON_SIGNUP_INPUT_VALUE_CHANGED, ON_SIGNUP_LOADING, ON_SIGNUP_STOP_LOADING, ON_SIGNUP_SUCCESS,
    ON_SIGNUP_VALIDATION_ERROR
} from '../../actions/signup/action-types/action.types';

export const initialState = {
    isValid: true,
    isLoading: false,
    error: {},
    inputs: {
        [SIGNUP_USERNAME_TEXT_INPUT_KEY]: {
            label: SIGNUP_USERNAME_PLACEHOLDER,
            labelTestID: 'signup-screen-username-text-input-label',
            inputTestID: 'signup-screen-username-text-input',
            value: '',
            autoCapitalize: 'none',
            secureTextEntry: false,
            autoCompleteType: 'username',
            keyboardType: 'default',
            validationErrorKey: SIGNUP_USERNAME_VALIDATION_ERROR,
            isValid: true,
            validator: (value) => value.replace(/\s/g, '').match(/^[a-zA-Z0-9]+$/) && value.replace(/\s/g, '').length > 4
        },
        [SIGNUP_PASSWORD_TEXT_INPUT_KEY]: {
            label: SIGNUP_PASSWORD_PLACEHOLDER,
            labelTestID: 'signup-screen-password-text-input-label',
            inputTestID: 'signup-screen-password-text-input',
            value: '',
            autoCapitalize: 'none',
            secureTextEntry: true,
            autoCompleteType: 'password',
            keyboardType: 'default',
            validationErrorKey: SIGNUP_PASSWORD_VALIDATION_ERROR,
            isValid: true,
            validator: (value) => validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 0 })
        },
        [SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY]: {
            label: SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER,
            labelTestID: 'signup-screen-confirm-password-text-input-label',
            inputTestID: 'signup-screen-confirm-password-text-input',
            value: '',
            autoCapitalize: 'none',
            secureTextEntry: true,
            autoCompleteType: 'password',
            keyboardType: 'default',
            validationErrorKey: SIGNUP_CONFIRM_PASSWORD_VALIDATION_ERROR,
            isValid: true,
            validator: (value) => validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 0 })
        },
        [SIGNUP_EMAIL_TEXT_INPUT_KEY]: {
            label: SIGNUP_EMAIL_PLACEHOLDER,
            labelTestID: 'signup-screen-email-text-input-label',
            inputTestID: 'signup-screen-email-text-input',
            value: '',
            autoCapitalize: 'none',
            secureTextEntry: false,
            autoCompleteType: 'email',
            keyboardType: 'email-address',
            validationErrorKey: SIGNUP_EMAIL_VALIDATION_ERROR,
            isValid: true,
            validator: (value) => validator.isEmail(value)
        },
        [SIGNUP_FIRST_NAME_TEXT_INPUT_KEY]: {
            label: SIGNUP_FIRST_NAME_PLACEHOLDER,
            labelTestID: 'signup-screen-first-name-text-input-label',
            inputTestID: 'signup-screen-first-name-text-input',
            value: '',
            autoCapitalize: 'words',
            secureTextEntry: false,
            autoCompleteType: 'name',
            keyboardType: 'default',
            validationErrorKey: SIGNUP_FIRST_NAME_VALIDATION_ERROR,
            isValid: true,
            validator: (value) => value.length > 4
        },
        [SIGNUP_LAST_NAME_TEXT_INPUT_KEY]: {
            label: SIGNUP_LAST_NAME_PLACEHOLDER,
            labelTestID: 'signup-screen-last-name-text-input-label',
            inputTestID: 'signup-screen-last-name-text-input',
            value: '',
            autoCapitalize: 'words',
            secureTextEntry: false,
            autoCompleteType: 'name',
            keyboardType: 'default',
            validationErrorKey: SIGNUP_LAST_NAME_VALIDATION_ERROR,
            isValid: true,
            validator: (value) => value.length > 4
        },
    }
};

export const reducer = createReducer(initialState, {
    [ON_SIGNUP_INPUT_VALUE_CHANGED]: (state, action) => {
        state.inputs[action.payload.inputKey].value = action.payload.value;
        state.inputs[action.payload.inputKey].isValid = true;
    },
    [ON_SIGNUP_VALIDATION_ERROR]: (state, action) => {
        state.inputs[action.payload.type].isValid = false;
        state.isValid = false;
    },
    [ON_SIGNUP_SUCCESS]: (state) => {
        state.isValid = true;
        state.isLoading = false;
        state.error = {};
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