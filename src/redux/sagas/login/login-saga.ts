import { takeLatest, select, call, put } from 'redux-saga/effects';
import UserService, {LoginResult, UserDetails} from '../../../service/user-service';
import {onApplicationSuccessfulLoginPersistUser} from '../../actions/application/action-creators/action-creators';
import {USER_ASYNC_STORAGE_KEY, USER_ROLE_ADMIN_VALUE} from '../../../application.constants';
import {setItem} from '../../../util/async-storage/async.storage';
import {RootState} from '../../store/store';
import {ApplicationUser} from '../../reducers/application/application-reducer';
import {PayloadAction} from '@reduxjs/toolkit';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../components/navigation/lost-my-dog-navigator';
import {loginAttempt, loginError, loginSuccess, setLoginLoading} from '../../reducers/login/login-reducer';

export function* loginAttemptWatcherSaga() {
    yield takeLatest([loginAttempt.type], loginAttemptSaga);
}

function* loginAttemptSaga(action: PayloadAction<NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>>) {
    const username: string = yield select((state: RootState) => state.login.username);
    const password: string = yield select((state: RootState) => state.login.password);

    if (!username || !password) {
        yield put(loginError('login.emptyPasswordOrUsername'));
    } else {
        try {
            yield put(setLoginLoading(true));

            const loginResult: LoginResult = yield call(UserService.login, { userName: username, password: password });
            const userDetails: UserDetails = yield call(UserService.fetchUserDetails, loginResult.token);

            const user: ApplicationUser = {
                token: loginResult.token,
                username: username,
                password: password,
                isLoggedIn: true,
                isAdmin: userDetails.roles.includes(USER_ROLE_ADMIN_VALUE),
                isLocked: userDetails.locked,
                details: userDetails
            };

            yield call(setItem, USER_ASYNC_STORAGE_KEY, JSON.stringify(user));
            yield put(onApplicationSuccessfulLoginPersistUser(user));
            yield put(loginSuccess());

            const navigation = action.payload;
            navigation.goBack();
        } catch (error) {
            yield put(setLoginLoading(false));
            yield put(loginError('login.wrongLoginCredentials'));
        }
    }
}
