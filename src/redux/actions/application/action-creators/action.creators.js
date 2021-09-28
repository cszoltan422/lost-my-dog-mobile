import {
    ON_CHECK_LOCATION_PERMISSION,
    ON_APPLICATION_MOUNTED,
    ON_INITIALIZE_APPLICATION,
    ON_LOCATION_PERMISSION_CHECKED,
    ON_APPLICATION_SUCCESSFUL_LOGIN_PERSIST_USER, ON_WATCH_CURRENT_LOCATION, ON_UPDATE_CURRENT_LOCATION
} from '../action-types/action.types';

export const onApplicationMounted = () => {
    return {
        type: ON_APPLICATION_MOUNTED
    };
};

export const onInitializeApplication = (applicationInitializer) => {
    return {
        type: ON_INITIALIZE_APPLICATION,
        payload: applicationInitializer
    };
};

export const onCheckLocationPermission = () => {
    return {
      type: ON_CHECK_LOCATION_PERMISSION
    };
};

export const onWatchCurrentLocation = () => {
    return {
        type: ON_WATCH_CURRENT_LOCATION
    }
};

export const onUpdateCurrentLocation = (currentLocation) => {
    return {
        type: ON_UPDATE_CURRENT_LOCATION,
        payload: currentLocation
    }
};

export const onLocationPermissionChecked = (locationPermission) => {
    return {
        type: ON_LOCATION_PERMISSION_CHECKED,
        payload: locationPermission
    };
};

export const onApplicationSuccessfulLoginPersistUser = (user) => {
    return {
        type: ON_APPLICATION_SUCCESSFUL_LOGIN_PERSIST_USER,
        payload: user
    };
};