import { createReducer } from '@reduxjs/toolkit';
import { ON_INITIALIZE_APPLICATION } from '../../actions/application/action-types/action.types';
import handleInitializeApplication from './handler/handleInitializeApplication';

export const initialState = {
    applicationInitialized: false,
    loginRequired: false,
    user: {
        isPresent: false,
        isLoggedIn: false,
        token: null,
        isAdmin: false,
        isLocked: false,
        details: null
    },
};

export const reducer = createReducer(initialState, {
    [ON_INITIALIZE_APPLICATION]: (state, action) => {
        handleInitializeApplication(state, action);
    }
});