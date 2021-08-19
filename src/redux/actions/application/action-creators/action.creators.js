import {
    ON_CHECK_LOCATION_PERMISSION,
    ON_APPLICATION_MOUNTED,
    ON_INITIALIZE_APPLICATION, ON_LOCATION_PERMISSION_CHECKED
} from '../action-types/action.types'

export const onApplicationMounted = () => {
    return {
        type: ON_APPLICATION_MOUNTED
    }
};

export const onInitializeApplication = (applicationInitializer) => {
    return {
        type: ON_INITIALIZE_APPLICATION,
        payload: applicationInitializer
    }
};

export const onCheckLocationPermission = () => {
    return {
      type: ON_CHECK_LOCATION_PERMISSION
    };
};

export const onLocationPermissionChecked = (locationPermission) => {
    return {
        type: ON_LOCATION_PERMISSION_CHECKED,
        payload: locationPermission
    };
};