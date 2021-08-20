import { takeLatest, select, call, put } from 'redux-saga/effects';
import {ON_LOGIN_ATTEMPTED} from '../../actions/login/action-types/action.types';
import {
    onLoginAttemptError,
    onLoginLoading,
    onLoginStopLoading,
    onLoginSuccess
} from '../../actions/login/action-creators/action.creators';
import {LOGIN_EMPTY_PASSWORD_OR_USERNAME, LOGIN_WRONG_PASSWORD_OR_USERNAME} from '../../../i18n/i18n.keys';
import UserService from '../../../service/UserService';
import {onApplicationSuccessfulLoginPersistUser} from '../../actions/application/action-creators/action.creators';
import {USER_ASYNC_STORAGE_KEY, USER_ROLE_ADMIN_VALUE} from '../../../application.constants';
import {setItem} from '../../../util/async-storage/async.storage';

export function* loginAttemptWatcherSaga() {
    yield takeLatest([ON_LOGIN_ATTEMPTED], loginAttemptSaga);
}

function* loginAttemptSaga(action) {
    const username = yield select((state) => state.login.username);
    const password = yield select((state) => state.login.password);

    if (!username || !password) {
        yield put(onLoginAttemptError(LOGIN_EMPTY_PASSWORD_OR_USERNAME));
    } else {
        try {
            yield put(onLoginLoading());

            const loginResult = yield call(UserService.login, username, password);
            const userDetails = yield call(UserService.fetchUserDetails, loginResult.token);

            const user = {
                token: loginResult.token,
                isAdmin: userDetails.roles.includes(USER_ROLE_ADMIN_VALUE),
                isLocked: userDetails.locked,
                details: userDetails
            };

            yield call(setItem, USER_ASYNC_STORAGE_KEY, JSON.stringify(user));
            yield put(onApplicationSuccessfulLoginPersistUser(user));
            yield put(onLoginSuccess());

            const navigation = action.payload;
            navigation.goBack();
        } catch (error) {
            yield put(onLoginStopLoading());
            yield put(onLoginAttemptError(LOGIN_WRONG_PASSWORD_OR_USERNAME));
        }
    }
}
