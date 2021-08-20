import { all } from 'redux-saga/effects';
import {applicationMountedWatcherSaga, onCheckLocationPermissionWatcherSaga} from './application/application.saga';
import { dashboardFetchActionWatcherSaga } from './dashboard/dashboard.saga';
import {loginAttemptWatcherSaga} from './login/login.saga';

export default function* rootSaga() {
    yield all([
        applicationMountedWatcherSaga(),
        dashboardFetchActionWatcherSaga(),
        onCheckLocationPermissionWatcherSaga(),
        loginAttemptWatcherSaga()
    ]);
}