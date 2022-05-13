import { createReducer } from '@reduxjs/toolkit';
import {
    ON_LOGIN_ATTEMPT_ERROR,
    ON_LOGIN_LOADING,
    ON_LOGIN_PASSWORD_CHANGED, ON_LOGIN_STOP_LOADING, ON_LOGIN_SUCCESS,
    ON_LOGIN_USERNAME_CHANGED
} from '../../actions/login/action-types/action-types';

export interface LoginState {
    username: string;
    password: string;
    loading: boolean;
    error: string;
}

export const initialState: LoginState = {
    username: '',
    password: '',
    loading: false,
    error: '',
};

export const reducer = createReducer(initialState, {
    [ON_LOGIN_USERNAME_CHANGED]: (state, action) => {
        state.username = action.payload;
    },
    [ON_LOGIN_PASSWORD_CHANGED]: (state, action) => {
        state.password = action.payload;
    },
    [ON_LOGIN_LOADING]: (state) => {
        state.loading = true;
    },
    [ON_LOGIN_STOP_LOADING]: (state) => {
        state.loading = false;
    },
    [ON_LOGIN_SUCCESS]: (state) => {
        state.loading = false;
        state.username = '';
        state.password = '';
        state.error = '';
    },
    [ON_LOGIN_ATTEMPT_ERROR]: (state, action) => {
        state.error = action.payload;
    }
});