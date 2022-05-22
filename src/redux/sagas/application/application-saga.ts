import { takeLatest, select, call, put } from 'redux-saga/effects';
import {E2E_MOCK_LOCATION, USER_ASYNC_STORAGE_KEY} from '../../../application.constants';
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
    applicationMounted,
    ApplicationPermission,
    ApplicationUser,
    initializeApplication,
    locationPermissionChecked,
    setApplicationLocation,
    setApplicationLocationPermission, watchCurrentLocation
} from '../../reducers/application/application-reducer';
import {PayloadAction} from '@reduxjs/toolkit';

export function* applicationMountedWatcherSaga() {
    yield takeLatest([applicationMounted.type], applicationMountedSaga);
}

export function* onCheckLocationPermissionWatcherSaga() {
    yield takeLatest([locationPermissionChecked.type], onCheckLocationPermissionSaga);
}

export function* onWatchCurrentLocationWatcherSaga() {
    yield takeLatest([watchCurrentLocation.type], onWatchCurrentLocationSaga);
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
                yield put(watchCurrentLocation());
            } else {
                yield put(setApplicationLocation({
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

        yield put(initializeApplication(applicationInitializer));
    }
}

function* onCheckLocationPermissionSaga(action: PayloadAction<LocationPermissionResponse | undefined>) {
    const location: ApplicationPermission = yield select((state: RootState) => state.application.permissions.location);
    if (!location.granted) {
        const locationPermission = action.payload;
        if (locationPermission) {
            yield put(setApplicationLocationPermission({
                granted: locationPermission.granted,
                canAskAgain: locationPermission.canAskAgain,
                lastChecked: moment().milliseconds()
            }));

            if (locationPermission.granted) {
                if (ENV.GET_DEVICE_LOCATION) {
                    yield put(watchCurrentLocation());
                } else {
                    yield put(setApplicationLocation({
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
    yield put(setApplicationLocation({
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