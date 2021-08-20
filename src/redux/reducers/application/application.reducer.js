import { createReducer } from '@reduxjs/toolkit';
import {
    ON_LOCATION_PERMISSION_CHECKED,
    ON_INITIALIZE_APPLICATION, ON_APPLICATION_SUCCESSFUL_LOGIN_PERSIST_USER
} from '../../actions/application/action-types/action.types';
import moment from 'moment';

export const initialState = {
    applicationInitialized: false,
    user: {
        isLoggedIn: false,
        token: null,
        isAdmin: false,
        isLocked: false,
        details: null
    },
    permissions: {
        location: {
            granted: false,
            canAskAgain: false,
            lastChecked: moment().milliseconds()
        },
        camera: {
            granted: false,
            canAskAgain: false,
        },
        mediaLibrary: {
            granted: false,
            canAskAgain: false
        },
    }
};

export const reducer = createReducer(initialState, {
    [ON_INITIALIZE_APPLICATION]: (state, action) => {
        state.applicationInitialized = true;
        state.user = {
            isLoggedIn: action.payload.user.isLoggedIn,
            token: action.payload.user.token,
            isAdmin: action.payload.user.isAdmin,
            isLocked: action.payload.user.isLocked,
            details: action.payload.user.details
        };
        state.permissions = {
            location: action.payload.permissions.location,
            camera: action.payload.permissions.camera,
            mediaLibrary: action.payload.permissions.camera
        };
    },
    [ON_LOCATION_PERMISSION_CHECKED]: (state, action) => {
        state.permissions.location = action.payload;
    },
    [ON_APPLICATION_SUCCESSFUL_LOGIN_PERSIST_USER]: (state, action) => {
        state.user = {
            isLoggedIn: true,
            token: action.payload.token,
            isAdmin: action.payload.isAdmin,
            isLocked: action.payload.isLocked,
            details: action.payload.details
        };
    }
});