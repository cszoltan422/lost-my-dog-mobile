import { takeLatest, select, call, put } from 'redux-saga/effects';
import {ON_LOGIN_ATTEMPTED} from '../../actions/login/action-types/action.types';
import {
    onLoginAttemptError,
    onLoginLoading,
    onLoginStopLoading,
    onLoginSuccess
} from '../../actions/login/action-creators/action.creators';
import UserService from '../../../service/user-service';
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
        yield put(onLoginAttemptError('login.emptyPasswordOrUsername'));
    } else {
        try {
            yield put(onLoginLoading());

            const loginResult = yield call(UserService.login, { userName: username, password: password });
            const userDetails = yield call(UserService.fetchUserDetails, loginResult.token);

            const user = {
                token: loginResult.token,
                username: username,
                password: password,
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
            yield put(onLoginAttemptError('login.wrongLoginCredentials'));
        }
    }
}
