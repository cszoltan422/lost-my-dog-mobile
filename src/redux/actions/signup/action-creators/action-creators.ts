import {
    ON_SIGNUP_ATTEMPT_ERROR,
    ON_SIGNUP_ATTEMPTED,
    ON_SIGNUP_INPUT_VALUE_CHANGED, ON_SIGNUP_LOADING, ON_SIGNUP_STOP_LOADING, ON_SIGNUP_SUCCESS,
    ON_SIGNUP_VALIDATION_ERROR
} from '../action-types/action-types';

export const onSignupInputValueChanged = (inputKey: string, value: string) => {
    return {
        type: ON_SIGNUP_INPUT_VALUE_CHANGED,
        payload: {
            inputKey: inputKey,
            value: value
        }
    };
};

export const onSignupAttempted = (navigation: any) => {
    return {
        type: ON_SIGNUP_ATTEMPTED,
        payload: navigation
    };
};

export const onSignupValidationError = (inputKey: string) => {
    return {
        type: ON_SIGNUP_VALIDATION_ERROR,
        payload: inputKey
    };
};

export const onSignupSuccess = () => {
    return {
        type: ON_SIGNUP_SUCCESS
    };
};

export const onSignupLoading = () => {
    return {
        type: ON_SIGNUP_LOADING
    };
};

export const onSignupStopLoading = () => {
    return {
        type: ON_SIGNUP_STOP_LOADING
    };
};

export const onSignupAttemptError = (error: string) => {
    return {
        type: ON_SIGNUP_ATTEMPT_ERROR,
        payload: error
    };
};