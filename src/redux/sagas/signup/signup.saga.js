import {call, put, select, takeLatest} from 'redux-saga/effects';
import {ON_SIGNUP_ATTEMPTED} from '../../actions/signup/action-types/action.types';
import {
    onSignupAttemptError,
    onSignupLoading,
    onSignupStopLoading, onSignupSuccess,
    onSignupValidationError
} from '../../actions/signup/action-creators/action.creators';
import {
    SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY,
    SIGNUP_EMAIL_TEXT_INPUT_KEY,
    SIGNUP_FIRST_NAME_TEXT_INPUT_KEY,
    SIGNUP_LAST_NAME_TEXT_INPUT_KEY,
    SIGNUP_PASSWORD_TEXT_INPUT_KEY,
    SIGNUP_USERNAME_TEXT_INPUT_KEY
} from '../../../application.constants';
import UserService from '../../../service/UserService';

export function* signupAttemptWatcherSaga() {
    yield takeLatest([ON_SIGNUP_ATTEMPTED], signupAttemptSaga);
}

function* validateFormInputs(inputs) {
    let isValidForm = true;
    for (let inputKey of Object.keys(inputs)) {
        const validator = inputs[inputKey].validator;
        if (validator) {
            const value = inputs[inputKey].value;
            const isValid = validator(value);

            if (!isValid) {
                isValidForm = false;
                yield put(onSignupValidationError(inputKey));
            }
        }
    }
    return isValidForm;
}

function validatePasswordMatch(inputs) {
    return inputs[SIGNUP_PASSWORD_TEXT_INPUT_KEY].value === inputs[SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY].value;
}

function* signupAttemptSaga(action) {
    try {
        yield put(onSignupLoading());

        const inputs = yield select((state) => state.signup.inputs);
        let isValidForm = yield* validateFormInputs(inputs);

        if (isValidForm) {
            const passwordsMath = validatePasswordMatch(inputs);
            if (passwordsMath) {
                const signupResult = yield call(UserService.signup, {
                    userName: inputs[SIGNUP_USERNAME_TEXT_INPUT_KEY].value.replace(/\s/g, ''),
                    password: inputs[SIGNUP_PASSWORD_TEXT_INPUT_KEY].value,
                    email: inputs[SIGNUP_EMAIL_TEXT_INPUT_KEY].value,
                    firstName: inputs[SIGNUP_FIRST_NAME_TEXT_INPUT_KEY].value,
                    middleName: '',
                    lastName: inputs[SIGNUP_LAST_NAME_TEXT_INPUT_KEY].value,
                });

                if (signupResult.success) {
                    yield put(onSignupSuccess());

                    const navigation = action.payload;
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
