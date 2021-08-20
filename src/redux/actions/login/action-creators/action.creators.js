import {
    ON_LOGIN_ATTEMPT_ERROR,
    ON_LOGIN_ATTEMPTED,
    ON_LOGIN_LOADING,
    ON_LOGIN_PASSWORD_CHANGED, ON_LOGIN_STOP_LOADING, ON_LOGIN_SUCCESS,
    ON_LOGIN_USERNAME_CHANGED
} from '../action-types/action.types';

export const onLoginUsernameChanged = (username) => {
    return {
        type: ON_LOGIN_USERNAME_CHANGED,
        payload: username
    }
};

export const onLoginPasswordChanged = (password) => {
    return {
        type: ON_LOGIN_PASSWORD_CHANGED,
        payload: password
    }
};

export const onLoginAttempted = (navigation) => {
    return {
        type: ON_LOGIN_ATTEMPTED,
        payload: navigation
    };
};

export const onLoginLoading = () => {
    return {
        type: ON_LOGIN_LOADING
    }
};

export const onLoginStopLoading = () => {
    return {
        type: ON_LOGIN_STOP_LOADING
    }
}

export const onLoginSuccess = () => {
    return {
        type: ON_LOGIN_SUCCESS
    }
}

export const onLoginAttemptError = (error) => {
    return {
        type: ON_LOGIN_ATTEMPT_ERROR,
        payload: error
    };
};