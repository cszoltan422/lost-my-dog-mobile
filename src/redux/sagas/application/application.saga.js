import { takeLatest, select, call, put } from 'redux-saga/effects';
import {
    ON_APPLICATION_MOUNTED,
    ON_CHECK_LOCATION_PERMISSION, ON_WATCH_CURRENT_LOCATION
} from '../../actions/application/action-types/action.types';
import {E2E_MOCK_LOCATION, USER_ASYNC_STORAGE_KEY} from '../../../application.constants';
import {
    onInitializeApplication, onLocationPermissionChecked, onUpdateCurrentLocation, onWatchCurrentLocation
} from '../../actions/application/action-creators/action.creators';
import {getItem} from '../../../util/async-storage/async.storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import moment from 'moment';
import {LocationAccuracy} from "expo-location";
import ENV from "../../../environmnent.config";

export function* applicationMountedWatcherSaga() {
    yield takeLatest([ON_APPLICATION_MOUNTED], applicationMountedSaga);
}

export function* onCheckLocationPermissionWatcherSaga() {
    yield takeLatest([ON_CHECK_LOCATION_PERMISSION], onCheckLocationPermissionSaga);
}

export function* onWatchCurrentLocationWatcherSaga() {
    yield takeLatest([ON_WATCH_CURRENT_LOCATION], onWatchCurrentLocationSaga);
}

function* applicationMountedSaga() {
    const applicationInitialized = yield select((state) => state.application.applicationInitialized);

    if (!applicationInitialized) {
        const applicationInitializer = {};

        const locationPermission = yield Location.getPermissionsAsync();
        const cameraPermission = yield ImagePicker.getCameraPermissionsAsync();
        const mediaLibraryPermission = yield ImagePicker.getMediaLibraryPermissionsAsync();

        if (locationPermission.granted) {
            if (ENV.GET_DEVICE_LOCATION) {
                yield put(onWatchCurrentLocation());
            } else {
                yield put(onUpdateCurrentLocation({
                    longitude: E2E_MOCK_LOCATION.longitude,
                    latitude: E2E_MOCK_LOCATION.latitude
                }))
            }
        }

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

        if (locationPermission.granted) {
            if (ENV.GET_DEVICE_LOCATION) {
                yield put(onWatchCurrentLocation());
            } else {
                yield put(onUpdateCurrentLocation({
                    longitude: E2E_MOCK_LOCATION.longitude,
                    latitude: E2E_MOCK_LOCATION.latitude
                }))
            }
        }
    }
}

function* onWatchCurrentLocationSaga() {
    const res = yield call(connect);
    yield put(onUpdateCurrentLocation({
        longitude: res.coords.longitude,
        latitude: res.coords.latitude
    }));
}

function connect() {
    return new Promise(resolve => {
        Location.watchPositionAsync({
            accuracy: LocationAccuracy.High,
            timeInterval: 5000,
            distanceInterval: 10
        }, location => {
            resolve(location);
        });
    });
}