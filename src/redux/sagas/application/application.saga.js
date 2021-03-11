import { takeLatest, select, call, put } from 'redux-saga/effects';
import { ON_APPLICATION_MOUNTED } from '../../actions/application/action-types/action.types';
import { USER_ASYNC_STORAGE_KEY } from '../../../application.constants';
import { onInitializeApplication } from '../../actions/application/action-creators/action.creators';
import { getItem } from '../../../util/async-storage/async.storage';

export function* applicationMountedWatcherSaga() {
    yield takeLatest([ON_APPLICATION_MOUNTED], applicationMountedSaga);
}

function* applicationMountedSaga() {
    const applicationInitialized = yield select((state) => state.application.applicationInitialized);

    if (!applicationInitialized) {
        const applicationInitializer = {};
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
                details: isapplicationUser.details
            };
        }

        yield put(onInitializeApplication(applicationInitializer));
    }
}