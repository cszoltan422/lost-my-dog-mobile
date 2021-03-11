import { all } from 'redux-saga/effects';
import { applicationMountedWatcherSaga } from './application/application.saga';
import { homepageMountedWatcherSaga } from './homepage/homepage.saga';

export default function* rootSaga() {
    yield all([
        applicationMountedWatcherSaga(),
        homepageMountedWatcherSaga()
    ]);
}