import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Location} from '../../../service/search-lost-dogs-service';
import {UserDetails} from '../../../service/user-service';
import {LocationPermissionResponse} from 'expo-location/src/Location.types';

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

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        initializeApplication: (state, action: PayloadAction<ApplicationInitializer>) => {
            const { payload } = action;
            const { user, permissions } = payload;
            state.applicationInitialized = true;
            state.user = user;
            state.permissions = permissions;
        },
        setApplicationLocationPermission: (state, action: PayloadAction<ApplicationPermission>) => {
            state.permissions.location = action.payload;
        },
        setApplicationLocation: (state, action: PayloadAction<Location>) => {
            const { payload } = action;
            state.location = {
                longitude: payload.longitude,
                latitude: payload.latitude,
                isPresent: true
            };
        },
        setApplicationUser: (state, action: PayloadAction<ApplicationUser>) => {
            state.user = action.payload;
        }
    }
});

const applicationReducer = applicationSlice.reducer;

export const {
    initializeApplication,
    setApplicationLocationPermission,
    setApplicationLocation,
    setApplicationUser
} = applicationSlice.actions;
export const applicationMounted = createAction('application/applicationMounted');
export const locationPermissionChecked = createAction<LocationPermissionResponse>('application/locationPermissionChecked');
export const watchCurrentLocation = createAction('application/watchCurrentLocation');
export default applicationReducer;