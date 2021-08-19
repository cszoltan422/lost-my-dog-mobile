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
            yield call(UserService.fetchUserDetails, loginResult.token);
            yield put(onLoginSuccess());

            const navigation = action.payload;
            navigation.goBack();
        } catch (error) {
            yield put(onLoginStopLoading());
            yield put(onLoginAttemptError(LOGIN_WRONG_PASSWORD_OR_USERNAME));
        }
    }
}
