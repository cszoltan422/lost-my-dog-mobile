import { createReducer } from '@reduxjs/toolkit';
import {
    ON_LOCATION_PERMISSION_CHECKED,
    ON_INITIALIZE_APPLICATION, ON_APPLICATION_SUCCESSFUL_LOGIN_PERSIST_USER, ON_UPDATE_CURRENT_LOCATION
} from '../../actions/application/action-types/action-types';
import moment from 'moment';

export const initialState = {
    applicationInitialized: false,
    user: {
        isLoggedIn: false,
        token: null,
        isAdmin: false,
        isLocked: false,
        username: null,
        password: null,
        details: null
    },
    location: {
        longitude: 0,
        latitude: 0,
        isPresent: false
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
            username: action.payload.user.username,
            password: action.payload.user.password,
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
    [ON_UPDATE_CURRENT_LOCATION]: (state, action) => {
        state.location = {
            longitude: action.payload.longitude,
            latitude: action.payload.latitude,
            isPresent: true
        };
    },
    [ON_APPLICATION_SUCCESSFUL_LOGIN_PERSIST_USER]: (state, action) => {
        state.user = {
            isLoggedIn: true,
            token: action.payload.token,
            username: action.payload.username,
            password: action.payload.password,
            isAdmin: action.payload.isAdmin,
            isLocked: action.payload.isLocked,
            details: action.payload.details
        };
    }
});