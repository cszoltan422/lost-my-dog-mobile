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
import UserService from '../../../service/user-service';

export function* signupAttemptWatcherSaga() {
    yield takeLatest([ON_SIGNUP_ATTEMPTED], signupAttemptSaga);
}

function* validateFormInputs(inputs) {
    let isValidForm = true;
    for (let inputKey of inputs.keys()) {
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

function validatePasswordMatch(inputs) {
    return inputs.get(SIGNUP_PASSWORD_TEXT_INPUT_KEY).value === inputs.get(SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY).value;
}

function* signupAttemptSaga(action) {
    try {
        const { payload } = action;
        const { navigation } = payload;
        yield put(onSignupLoading());

        const inputs = yield select((state) => state.signup.inputs);
        let isValidForm = yield* validateFormInputs(inputs);

        if (isValidForm) {
            const passwordsMath = validatePasswordMatch(inputs);
            if (passwordsMath) {
                const signupResult = yield call(UserService.signup, {
                    userName: inputs.get(SIGNUP_USERNAME_TEXT_INPUT_KEY).value.replace(/\s/g, ''),
                    password: inputs.get(SIGNUP_PASSWORD_TEXT_INPUT_KEY).value,
                    email: inputs.get(SIGNUP_EMAIL_TEXT_INPUT_KEY).value,
                    firstName: inputs.get(SIGNUP_FIRST_NAME_TEXT_INPUT_KEY).value,
                    middleName: '',
                    lastName: inputs.get(SIGNUP_LAST_NAME_TEXT_INPUT_KEY).value,
                });

                if (signupResult.success) {
                    yield put(onSignupSuccess());
                    navigation.goBack();
                } else {
                    yield put(onSignupAttemptError(signupResult.errorMessage));
                }
            } else {
                yield put(onSignupValidationError(SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY));
            }
        }

    } finally {
        yield put(onSignupStopLoading());
    }
}
