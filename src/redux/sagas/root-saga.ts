import { all } from 'redux-saga/effects';
import {
    applicationMountedWatcherSaga,
    onCheckLocationPermissionWatcherSaga,
    onWatchCurrentLocationWatcherSaga
} from './application/application-saga';
import { dashboardFetchActionWatcherSaga } from './dashboard/dashboard-saga';
import {loginAttemptWatcherSaga} from './login/login-saga';
import {signupAttemptWatcherSaga} from './signup/signup-saga';
import {submitFormSubmittedWatcherSaga} from './submit-form/submit-form-saga';

export default function* rootSaga() {
    yield all([
        applicationMountedWatcherSaga(),
        dashboardFetchActionWatcherSaga(),
        onCheckLocationPermissionWatcherSaga(),
        onWatchCurrentLocationWatcherSaga(),
        loginAttemptWatcherSaga(),
        signupAttemptWatcherSaga(),
        submitFormSubmittedWatcherSaga()
    ]);
}