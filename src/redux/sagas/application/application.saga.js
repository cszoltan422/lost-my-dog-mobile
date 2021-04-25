import { takeLatest, select, call, put, delay } from 'redux-saga/effects';
import { ON_APPLICATION_MOUNTED } from '../../actions/application/action-types/action.types';
import { USER_ASYNC_STORAGE_KEY } from '../../../application.constants';
import { onInitializeApplication } from '../../actions/application/action-creators/action.creators';
import { getItem } from '../../../util/async-storage/async.storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export function* applicationMountedWatcherSaga() {
    yield takeLatest([ON_APPLICATION_MOUNTED], applicationMountedSaga);
}

function* applicationMountedSaga() {
    const applicationInitialized = yield select((state) => state.application.applicationInitialized);

    if (!applicationInitialized) {
        const applicationInitializer = {};

        const locationPermission = yield Location.getPermissionsAsync();
        const cameraPermission = yield ImagePicker.getCameraPermissionsAsync();
        const mediaLibraryPermission = yield ImagePicker.getMediaLibraryPermissionsAsync();

        applicationInitializer.permissions = {
            location: locationPermission.granted,
            camera: cameraPermission.granted,
            mediaLibrary: mediaLibraryPermission.granted
        }

        const applicationUser = yield call(getItem, USER_ASYNC_STORAGE_KEY);
        if (!applicationUser) {
            applicationInitializer.loginRequired = true;
            applicationInitializer.user = {
                isPresent: false,
                isLoggedIn: false,
                token: null,
                isAdmin: false,
                isLocked: false,
                details: null
            };
        } else {
            applicationInitializer.loginRequired = false;
            applicationInitializer.user = {
                isPresent: true,
                isLoggedIn: true,
                token: applicationUser.token,
                isAdmin: applicationUser.isAdmin,
                isLocked: applicationUser.isLocked,
                details: applicationUser.details
            };
        }

        yield delay(1000);
        yield put(onInitializeApplication(applicationInitializer));
    }
}