import {
    ON_CHECK_LOCATION_PERMISSION,
    ON_INITIALIZE_APPLICATION,
    ON_LOCATION_PERMISSION_CHECKED,
    ON_APPLICATION_SUCCESSFUL_LOGIN_PERSIST_USER,
    ON_WATCH_CURRENT_LOCATION,
    ON_UPDATE_CURRENT_LOCATION,
    ON_APPLICATION_MOUNTED
} from '../action-types/action-types';
import {LocationPermissionResponse} from 'expo-location';
import {Location} from '../../../../service/search-lost-dogs-service';
import {
    ApplicationInitializer,
    ApplicationPermission,
    ApplicationUser
} from '../../../reducers/application/application-reducer';

export const onApplicationMounted = () => {
    return {
        type: ON_APPLICATION_MOUNTED
    };
};

export const onInitializeApplication = (applicationInitializer: ApplicationInitializer) => {
    return {
        type: ON_INITIALIZE_APPLICATION,
        payload: applicationInitializer
    };
};

export const onCheckLocationPermission = (locationPermissionResponse?: LocationPermissionResponse) => {
    return {
      type: ON_CHECK_LOCATION_PERMISSION,
      payload: locationPermissionResponse
    };
};

export const onWatchCurrentLocation = () => {
    return {
        type: ON_WATCH_CURRENT_LOCATION
    };
};

export const onUpdateCurrentLocation = (currentLocation: Location) => {
    return {
        type: ON_UPDATE_CURRENT_LOCATION,
        payload: currentLocation
    };
};

export const onLocationPermissionChecked = (locationPermission: ApplicationPermission) => {
    return {
        type: ON_LOCATION_PERMISSION_CHECKED,
        payload: locationPermission
    };
};

export const onApplicationSuccessfulLoginPersistUser = (user: ApplicationUser) => {
    return {
        type: ON_APPLICATION_SUCCESSFUL_LOGIN_PERSIST_USER,
        payload: user
    };
};