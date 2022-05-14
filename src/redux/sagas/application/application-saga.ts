import { takeLatest, select, call, put } from 'redux-saga/effects';
import {
    ON_APPLICATION_MOUNTED,
    ON_CHECK_LOCATION_PERMISSION, ON_WATCH_CURRENT_LOCATION
} from '../../actions/application/action-types/action-types';
import {E2E_MOCK_LOCATION, USER_ASYNC_STORAGE_KEY} from '../../../application.constants';
import {
    onInitializeApplication, onLocationPermissionChecked, onUpdateCurrentLocation, onWatchCurrentLocation
} from '../../actions/application/action-creators/action-creators';
import {getItem} from '../../../util/async-storage/async.storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import moment from 'moment';
import {LocationAccuracy} from 'expo-location';
import ENV from '../../../environmnent.config';
import {RootState} from '../../store/store';
import {LocationObject, LocationPermissionResponse} from 'expo-location/src/Location.types';
import {CameraPermissionResponse, MediaLibraryPermissionResponse} from 'expo-image-picker/src/ImagePicker.types';
import {
    ApplicationInitializer,
    ApplicationPermission,
    ApplicationUser
} from '../../reducers/application/application-reducer';
import {PayloadAction} from '@reduxjs/toolkit';

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
    const applicationInitialized: boolean = yield select((state: RootState) => state.application.applicationInitialized);

    if (!applicationInitialized) {
        const locationPermission: LocationPermissionResponse = yield Location.getForegroundPermissionsAsync();
        const cameraPermission: CameraPermissionResponse = yield ImagePicker.getCameraPermissionsAsync();
        const mediaLibraryPermission: MediaLibraryPermissionResponse = yield ImagePicker.getMediaLibraryPermissionsAsync();
        const applicationUser: string = yield call(getItem, USER_ASYNC_STORAGE_KEY);

        let user: ApplicationUser = {
            isLoggedIn: false,
            token: '',
            username: '',
            password: '',
            isAdmin: false,
            isLocked: false,
            details: undefined
        };

        if (applicationUser) {
            const parsedUser: ApplicationUser = JSON.parse(applicationUser);
            user = {
                ...parsedUser,
                isLoggedIn: true
            };
        }

        if (locationPermission.granted) {
            if (ENV.GET_DEVICE_LOCATION) {
                yield put(onWatchCurrentLocation());
            } else {
                yield put(onUpdateCurrentLocation({
                    longitude: E2E_MOCK_LOCATION.longitude,
                    latitude: E2E_MOCK_LOCATION.latitude
                }));
            }
        }

        const applicationInitializer: ApplicationInitializer = {
            permissions: {
                location: {
                    granted: locationPermission.granted,
                    canAskAgain: locationPermission.canAskAgain,
                    lastChecked: moment().milliseconds()
                },
                camera: {
                    granted: cameraPermission.granted,
                    canAskAgain: cameraPermission.canAskAgain,
                    lastChecked: moment().milliseconds()
                },
                mediaLibrary: {
                    granted: mediaLibraryPermission.granted,
                    canAskAgain: mediaLibraryPermission.canAskAgain,
                    lastChecked: moment().milliseconds()
                }
            },
            user: user
        };

        yield put(onInitializeApplication(applicationInitializer));
    }
}

function* onCheckLocationPermissionSaga(action: PayloadAction<LocationPermissionResponse | undefined>) {
    const location: ApplicationPermission = yield select((state: RootState) => state.application.permissions.location);
    if (!location.granted) {
        const locationPermission = action.payload;
        if (locationPermission) {
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
                    }));
                }
            }
        }
    }
}

function* onWatchCurrentLocationSaga() {
    const res: LocationObject = yield call(watchPositionAsync);
    yield put(onUpdateCurrentLocation({
        longitude: res.coords.longitude,
        latitude: res.coords.latitude
    }));
}

function watchPositionAsync() {
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