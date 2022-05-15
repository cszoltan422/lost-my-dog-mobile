import {call, put, select, takeLatest} from 'redux-saga/effects';
import {ON_SIGNUP_ATTEMPTED} from '../../actions/signup/action-types/action-types';
import {
    onSignupAttemptError,
    onSignupLoading,
    onSignupStopLoading, onSignupSuccess,
    onSignupValidationError
} from '../../actions/signup/action-creators/action-creators';
import {
    SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY,
    SIGNUP_EMAIL_TEXT_INPUT_KEY,
    SIGNUP_FIRST_NAME_TEXT_INPUT_KEY,
    SIGNUP_LAST_NAME_TEXT_INPUT_KEY,
    SIGNUP_PASSWORD_TEXT_INPUT_KEY,
    SIGNUP_USERNAME_TEXT_INPUT_KEY
} from '../../../application.constants';
import UserService, {SignupRequest, SignupResult} from '../../../service/user-service';
import {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {SignupInput} from '../../reducers/signup/signup-reducer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../components/navigation/lost-my-dog-navigator';

export function* signupAttemptWatcherSaga() {
    yield takeLatest([ON_SIGNUP_ATTEMPTED], signupAttemptSaga);
}

function* validateFormInputs(inputs: Map<string, SignupInput>) {
    let isValidForm = true;
    for (const inputKey of inputs.keys()) {
        const input = inputs.get(inputKey);
        if (input) {
            const { value, validator } = input;
            if (validator) {
                const isValid = validator(value);
                if (!isValid) {
                    isValidForm = false;
                    yield put(onSignupValidationError(inputKey));
                }
            }
        }
    }
    return isValidForm;
}

function validatePasswordMatch(inputs: Map<string, SignupInput>) {
    return inputs.get(SIGNUP_PASSWORD_TEXT_INPUT_KEY)?.value === inputs.get(SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY)?.value;
}

function* signupAttemptSaga(action: PayloadAction<NativeStackNavigationProp<RootStackParamList, 'SignupScreen'>>) {
    try {
        yield put(onSignupLoading());

        const navigation = action.payload;
        const inputs: Map<string, SignupInput> = yield select((state: RootState) => state.signup.inputs);
        const isValidForm = yield* validateFormInputs(inputs);

        if (isValidForm) {
            const passwordsMatch = validatePasswordMatch(inputs);
            if (passwordsMatch) {

                const signupRequest: SignupRequest = {
                    userName: inputs.get(SIGNUP_USERNAME_TEXT_INPUT_KEY)?.value.replace(/\s/g, '') || '',
                    password: inputs.get(SIGNUP_PASSWORD_TEXT_INPUT_KEY)?.value || '',
                    email: inputs.get(SIGNUP_EMAIL_TEXT_INPUT_KEY)?.value || '',
                    firstName: inputs.get(SIGNUP_FIRST_NAME_TEXT_INPUT_KEY)?.value || '',
                    middleName: '',
                    lastName: inputs.get(SIGNUP_LAST_NAME_TEXT_INPUT_KEY)?.value || '',
                };

                const signupResult: SignupResult = yield call(UserService.signup, signupRequest);

                if (signupResult.success) {
                    yield put(onSignupSuccess());
                    navigation.goBack();
                }
            } else {
                yield put(onSignupValidationError(SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY));
            }
        }

    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        yield put(onSignupAttemptError(error.response.data.errorMessage));
    } finally {
        yield put(onSignupStopLoading());
    }
}
