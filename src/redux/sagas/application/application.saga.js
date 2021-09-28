import { takeLatest, select, call, put } from 'redux-saga/effects';
import {
    ON_APPLICATION_MOUNTED,
    ON_CHECK_LOCATION_PERMISSION
} from '../../actions/application/action-types/action.types';
import { USER_ASYNC_STORAGE_KEY } from '../../../application.constants';
import {
    onInitializeApplication, onLocationPermissionChecked
} from '../../actions/application/action-creators/action.creators';
import {getItem} from '../../../util/async-storage/async.storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import moment from 'moment';

export function* applicationMountedWatcherSaga() {
    yield takeLatest([ON_APPLICATION_MOUNTED], applicationMountedSaga);
}

export function* onCheckLocationPermissionWatcherSaga() {
    yield takeLatest([ON_CHECK_LOCATION_PERMISSION], onCheckLocationPermissionSaga);
}

function* applicationMountedSaga() {
    const applicationInitialized = yield select((state) => state.application.applicationInitialized);

    if (!applicationInitialized) {
        const applicationInitializer = {};

        const locationPermission = yield Location.getPermissionsAsync();
        const cameraPermission = yield ImagePicker.getCameraPermissionsAsync();
        const mediaLibraryPermission = yield ImagePicker.getMediaLibraryPermissionsAsync();

        applicationInitializer.permissions = {
            location: {
                granted: locationPermission.granted,
                canAskAgain: locationPermission.canAskAgain,
                lastChecked: moment().milliseconds()
            },
            camera: {
                granted: cameraPermission.granted,
                canAskAgain: cameraPermission.canAskAgain
            },
            mediaLibrary: {
                granted: mediaLibraryPermission.granted,
                canAskAgain: mediaLibraryPermission.canAskAgain
            }
        };

        const applicationUser = yield call(getItem, USER_ASYNC_STORAGE_KEY);
        if (!applicationUser) {
            applicationInitializer.user = {
                isLoggedIn: false,
                token: null,
                username: null,
                password: null,
                isAdmin: false,
                isLocked: false,
                details: null
            };
        } else {
            const user = JSON.parse(applicationUser);
            applicationInitializer.user = {
                isLoggedIn: true,
                token: user.token,
                username: user.username,
                password: user.password,
                isAdmin: user.isAdmin,
                isLocked: user.isLocked,
                details: user.details
            };
        }

        yield put(onInitializeApplication(applicationInitializer));
    }
}

function* onCheckLocationPermissionSaga() {
    const location = yield select((state) => state.application.permissions.location);
    if (!location.granted) {
        const locationPermission = yield Location.getPermissionsAsync();
        yield put(onLocationPermissionChecked({
            granted: locationPermission.granted,
            canAskAgain: locationPermission.canAskAgain,
            lastChecked: moment().milliseconds()
        }));
    }
}