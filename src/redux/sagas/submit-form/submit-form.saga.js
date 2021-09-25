import { takeLatest, select, put } from 'redux-saga/effects';
import {ON_SUBMIT_FORM_SUBMITTED} from '../../actions/submit-form/action-types/action.types';
import {
    onSubmitFormLoading, onSubmitFormStopLoading,
    onSubmitFormValidationError
} from '../../actions/submit-form/action-creators/action.creators';

export function* submitFormSubmittedWatcherSaga() {
    yield takeLatest([ON_SUBMIT_FORM_SUBMITTED], submitFormSubmittedSaga);
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
                yield put(onSubmitFormValidationError(inputKey));
            }
        }
    }
    return isValidForm;
}

function* submitFormSubmittedSaga() {
    try {
        yield put(onSubmitFormLoading());

        const inputs = yield select((state) => state.submitForm.inputs);
        const location = yield select((state) => state.submitForm.location);
        const selectedImageUri = yield select((state) => state.submitForm.selectedImageUri);

        let isValidForm = yield* validateFormInputs(inputs);

        if (isValidForm) {
            console.log('form is valid!!');
            console.log(location);
            console.log(selectedImageUri);
        }
    } finally {
        yield put(onSubmitFormStopLoading());
    }


}