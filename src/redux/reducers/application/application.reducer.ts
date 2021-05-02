import { createReducer } from '@reduxjs/toolkit';
import { ON_INITIALIZE_APPLICATION } from '../../actions/application/action-types/action.types';

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
    permissions: {
        location: false,
        camera: false,
        mediaLibrary: false
    }
};

export const reducer = createReducer(initialState, {
    [ON_INITIALIZE_APPLICATION]: (state, action) => {
        state.applicationInitialized = true;
        state.loginRequired = action.payload.loginRequired;
        state.user = {
            isPresent: action.payload.isPresent,
            isLoggedIn: action.payload.isLoggedIn,
            token: action.payload.token,
            isAdmin: action.payload.isAdmin,
            isLocked: action.payload.isLocked,
            details: action.payload.details
        };
        state.permissions = {
            location: action.payload.permissions.location,
            camera: action.payload.permissions.camera,
            mediaLibrary: action.payload.permissions.camera
        };
    }
});