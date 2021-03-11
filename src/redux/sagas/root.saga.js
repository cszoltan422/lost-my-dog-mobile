import { all } from 'redux-saga/effects';
import { applicationMountedWatcherSaga } from './application/application.saga';

export default function* rootSaga() {
    yield all([
        applicationMountedWatcherSaga()
    ]);
}