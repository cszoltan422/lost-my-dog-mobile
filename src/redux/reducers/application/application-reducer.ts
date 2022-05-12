import {createReducer} from '@reduxjs/toolkit';
import {
    ON_APPLICATION_SUCCESSFUL_LOGIN_PERSIST_USER,
    ON_INITIALIZE_APPLICATION,
    ON_LOCATION_PERMISSION_CHECKED,
    ON_UPDATE_CURRENT_LOCATION,
} from '../../actions/application/action-types/action-types';
import {Location} from '../../../service/search-lost-dogs-service';
import {UserDetails} from '../../../service/user-service';

export interface ApplicationUser {
    token: string;
    username: string;
    password: string;
    isAdmin: boolean;
    isLocked: boolean;
    isLoggedIn: boolean;
    details?: UserDetails;
}

export interface ApplicationInitializer {
    user: ApplicationUser,
    permissions: ApplicationPermissions,
}

export interface ApplicationPermission {
    granted: boolean;
    canAskAgain: boolean;
    lastChecked: number;
}

export interface ApplicationLocation extends Location {
    isPresent: boolean;
}

export interface ApplicationPermissions {
    location: ApplicationPermission,
    camera: ApplicationPermission,
    mediaLibrary: ApplicationPermission,
}

export interface ApplicationState {
    applicationInitialized: boolean;
    user: ApplicationUser;
    location: ApplicationLocation,
    permissions: ApplicationPermissions,
}

export const initialState: ApplicationState = {
    applicationInitialized: false,
    user: {
        token: '',
        username: '',
        password: '',
        isLoggedIn: false,
        isAdmin: false,
        isLocked: false,
        details: undefined,
    },
    location: {
        longitude: 0,
        latitude: 0,
        isPresent: false,
    },
    permissions: {
        location: {
            granted: false,
            canAskAgain: false,
            lastChecked: -1
        },
        camera: {
            granted: false,
            canAskAgain: false,
            lastChecked: -1
        },
        mediaLibrary: {
            granted: false,
            canAskAgain: false,
            lastChecked: -1
        }
    }
};

export const reducer = createReducer(initialState, {
    [ON_INITIALIZE_APPLICATION]: (state, action) => {
        const { payload } = action;
        const { user, permissions } = payload;
        state.applicationInitialized = true;
        state.user = user;
        state.permissions = permissions;
    },
    [ON_LOCATION_PERMISSION_CHECKED]: (state, action) => {
        state.permissions.location = action.payload;
    },
    [ON_UPDATE_CURRENT_LOCATION]: (state, action) => {
        const { payload } = action;
        state.location = {
            longitude: payload.longitude,
            latitude: payload.latitude,
            isPresent: true
        };
    },
    [ON_APPLICATION_SUCCESSFUL_LOGIN_PERSIST_USER]: (state, action) => {
        state.user = action.payload;
    }
});