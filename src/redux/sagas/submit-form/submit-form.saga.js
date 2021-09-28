import {takeLatest, select, put, call} from 'redux-saga/effects';
import {ON_SUBMIT_FORM_SUBMITTED} from '../../actions/submit-form/action-types/action.types';
import {
    onSubmitFormImageInvalid,
    onSubmitFormLoading, onSubmitFormPublishLoadingProgress, onSubmitFormStopLoading, onSubmitFormSubmitSuccess,
    onSubmitFormValidationError
} from '../../actions/submit-form/action-creators/action.creators';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import {
    DETAILS_IMAGE_NOT_SELECTED,
    DETAILS_IMAGE_SIZE_TOO_LARGE,
    DETAILS_SUBMITTED_IN_PROGRESS_COMPRESS_IMAGE,
    DETAILS_SUBMITTED_IN_PROGRESS_SENDING_REQUEST,
    DETAILS_SUBMITTED_IN_PROGRESS_VALIDATING_FORM
} from '../../../i18n/i18n.keys';
import {
    DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS,
    DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS,
    ONE_GIGABYTE_IN_BYTES,
    SUBMIT_FORM_AGE_TEXT_INPUT_KEY,
    SUBMIT_FORM_BREED_TEXT_INPUT_KEY,
    SUBMIT_FORM_COLOR_TEXT_INPUT_KEY,
    SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY,
    SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY,
    SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY,
    SUBMIT_FORM_NAME_TEXT_INPUT_KEY,
    SUBMIT_FORM_SEX_SELECT_INPUT_KEY,
    SUBMIT_FORM_STATUS_SELECT_INPUT_KEY,
    SUBMIT_DOG_NAVIGATION_SCREEN_NAME,
    SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY
} from '../../../application.constants';
import UserService from '../../../service/UserService';
import LostDogSubmissionService from '../../../service/LostDogSubmissionService';
import {getCurrentTimeWithTimezone} from '../../../util/date/date.utils';

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

function* validateImage(compressedImage) {
    let isImageValid = true;
    if (compressedImage) {
        let imageInfo = yield FileSystem.getInfoAsync(compressedImage.uri, { size: true });
        const imageSize = imageInfo.size;
        if (imageSize > ONE_GIGABYTE_IN_BYTES) {
            yield put(onSubmitFormImageInvalid(DETAILS_IMAGE_SIZE_TOO_LARGE));
            isImageValid = false;
        }
    } else {
        yield put(onSubmitFormImageInvalid(DETAILS_IMAGE_NOT_SELECTED));
        isImageValid = false;
    }
    return isImageValid;
}

function* getCompressedImage(selectedImage) {
    let compressedImage = null;
    if (selectedImage.isPresent) {
        compressedImage = yield ImageManipulator.manipulateAsync(
            selectedImage.uri,
            [],
            {compress: 0.5, format: ImageManipulator.SaveFormat.JPEG, base64: true}
        );
    }
    return compressedImage;
}

function* submitFormSubmittedSaga(action) {
    try {
        yield put(onSubmitFormLoading());

        const navigation = action.payload;
        const inputs = yield select((state) => state.submitForm.inputs);
        const location = yield select((state) => state.submitForm.location);
        const selectedImage = yield select((state) => state.submitForm.selectedImage);
        const user = yield select((state) => state.application.user);

        yield put(onSubmitFormPublishLoadingProgress(0.2, DETAILS_SUBMITTED_IN_PROGRESS_VALIDATING_FORM));
        const isValidForm = yield* validateFormInputs(inputs);

        if (isValidForm && user.isLoggedIn) {
            yield put(onSubmitFormPublishLoadingProgress(0.4, DETAILS_SUBMITTED_IN_PROGRESS_COMPRESS_IMAGE));
            let compressedImage = yield* getCompressedImage(selectedImage);
            const isImageValid = yield* validateImage(compressedImage);

            if (isImageValid) {
                yield put(onSubmitFormPublishLoadingProgress(0.8, DETAILS_SUBMITTED_IN_PROGRESS_SENDING_REQUEST));
                const loginResult = yield call(UserService.login, user.username, user.password); // todo only login again if token expired

                yield call(LostDogSubmissionService.submitLostDog, loginResult.token, {
                    dogName: inputs[SUBMIT_FORM_NAME_TEXT_INPUT_KEY].value,
                    description: inputs[SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY].value,
                    dogBreed: inputs[SUBMIT_FORM_BREED_TEXT_INPUT_KEY].value,
                    age: inputs[SUBMIT_FORM_AGE_TEXT_INPUT_KEY].value,
                    color: inputs[SUBMIT_FORM_COLOR_TEXT_INPUT_KEY].value,
                    chipNumber: inputs[SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY].value,
                    gender: Object.keys(DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS).find(key => DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS[key] === inputs[SUBMIT_FORM_SEX_SELECT_INPUT_KEY].value),
                    status: Object.keys(DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS).find(key => DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS[key] === inputs[SUBMIT_FORM_STATUS_SELECT_INPUT_KEY].value),
                    chippedStatus: inputs[SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY].value ? 'YES' : 'NO',
                    specialPeculiarities: '',
                    contactPhone: inputs[SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY].value,
                    contactEmail: inputs[SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY].value,
                    longitude: location.longitude,
                    latitude: location.latitude,
                    dateLost: getCurrentTimeWithTimezone(),
                    base64Content: compressedImage.base64,
                    avatarImageType: 'jpg'
                });

                if (navigation.state.routeName === SUBMIT_DOG_NAVIGATION_SCREEN_NAME) {
                    navigation.goBack();
                }
                yield put(onSubmitFormSubmitSuccess());
            }
        }
    } catch (e) {
        console.log('error: ', e); // eslint-disable-line no-console
    } finally {
        yield put(onSubmitFormStopLoading());
    }


}