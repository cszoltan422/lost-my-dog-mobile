import {takeLatest, select, put, call} from 'redux-saga/effects';
import {ON_SUBMIT_FORM_SUBMITTED} from '../../actions/submit-form/action-types/action-types';
import {
    onSubmitFormImageInvalid,
    onSubmitFormLoading,
    onSubmitFormPublishLoadingProgress,
    onSubmitFormStopLoading,
    onSubmitFormSubmitError,
    onSubmitFormSubmitSuccess,
    onSubmitFormValidationError
} from '../../actions/submit-form/action-creators/action-creators';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
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
    SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY,
    SUBMIT_FORM_EDIT_MODE,
    EDIT_DOG_NAVIGATION_SCREEN_NAME
} from '../../../application.constants';
import UserService from '../../../service/user-service';
import LostDogSubmissionService from '../../../service/lost-dog-submission-service';
import {getCurrentTimeWithTimezone} from '../../../util/date/date.utils';

export function* submitFormSubmittedWatcherSaga() {
    yield takeLatest([ON_SUBMIT_FORM_SUBMITTED], submitFormSubmittedSaga);
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
                    yield put(onSubmitFormValidationError(inputKey));
                }
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
            yield put(onSubmitFormImageInvalid('submitForm.validation.imageTooLarge'));
            isImageValid = false;
        }
    } else {
        yield put(onSubmitFormImageInvalid('submitForm.validation.noImage'));
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

function getValueOptionally(value, hasChangedInEditMode, mode) {
    return mode === SUBMIT_FORM_EDIT_MODE && !hasChangedInEditMode ? undefined : value;
}

function* submitFormSubmittedSaga(action) {
    yield put(onSubmitFormLoading());

    const { route, navigation } = action.payload;
    const inputs = yield select((state) => state.submitForm.inputs);
    const location = yield select((state) => state.submitForm.location);
    const selectedImage = yield select((state) => state.submitForm.selectedImage);
    const mode = yield select((state) => state.submitForm.mode);
    const dogId = yield select((state) => state.submitForm.dogId);
    const user = yield select((state) => state.application.user);

    yield put(onSubmitFormPublishLoadingProgress(0.2, 'submitForm.loading.validatingForm'));
    const isValidForm = yield* validateFormInputs(inputs);

    if (isValidForm && user.isLoggedIn) {
        yield put(onSubmitFormPublishLoadingProgress(0.4, 'submitForm.loading.compressingImage'));
        let compressedImage = yield* getCompressedImage(selectedImage);
        const isImageValid = yield* validateImage(compressedImage);

        if (isImageValid) {
            yield put(onSubmitFormPublishLoadingProgress(0.8, 'submitForm.loading.sendingRequest'));
            const loginResult = yield call(UserService.login, { userName: user.username, password: user.password }); // todo only login again if token expired

            const payload = {
                id: mode === SUBMIT_FORM_EDIT_MODE ? dogId : undefined,
                dateLost: getCurrentTimeWithTimezone(),
                dogName: getValueOptionally(
                    inputs.get(SUBMIT_FORM_NAME_TEXT_INPUT_KEY).value,
                    inputs.get(SUBMIT_FORM_NAME_TEXT_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                description: getValueOptionally(
                    inputs.get(SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY).value,
                    inputs.get(SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                dogBreed: getValueOptionally(
                    inputs.get(SUBMIT_FORM_BREED_TEXT_INPUT_KEY).value,
                    inputs.get(SUBMIT_FORM_BREED_TEXT_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                age: getValueOptionally(
                    inputs.get(SUBMIT_FORM_AGE_TEXT_INPUT_KEY).value,
                    inputs.get(SUBMIT_FORM_AGE_TEXT_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                color: getValueOptionally(
                    inputs.get(SUBMIT_FORM_COLOR_TEXT_INPUT_KEY).value,
                    inputs.get(SUBMIT_FORM_COLOR_TEXT_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                chipNumber: getValueOptionally(
                    inputs.get(SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY).value,
                    inputs.get(SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                gender: getValueOptionally(
                    Object.keys(DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS).find(key => DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS[key] === inputs.get(SUBMIT_FORM_SEX_SELECT_INPUT_KEY).value),
                    inputs.get(SUBMIT_FORM_SEX_SELECT_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                status: getValueOptionally(
                    Object.keys(DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS).find(key => DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS[key] === inputs.get(SUBMIT_FORM_STATUS_SELECT_INPUT_KEY).value),
                    inputs.get(SUBMIT_FORM_STATUS_SELECT_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                chippedStatus: getValueOptionally(
                    inputs.get(SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY).value ? 'YES' : 'NO',
                    inputs.get(SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                specialPeculiarities: '',
                contactPhone: getValueOptionally(
                    inputs.get(SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY).value,
                    inputs.get(SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                contactEmail: getValueOptionally(
                    inputs.get(SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY).value,
                    inputs.get(SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY).hasChangedInEditMode,
                    mode
                ),
                longitude: getValueOptionally(
                    location.longitude,
                    location.hasChangedInEditMode,
                    mode
                ),
                latitude: getValueOptionally(
                    location.latitude,
                    location.hasChangedInEditMode,
                    mode
                ),
                base64Content: getValueOptionally(
                    compressedImage.base64,
                    selectedImage.hasChangedInEditMode,
                    mode
                ),
                avatarImageType: getValueOptionally(
                    'jpg',
                    selectedImage.hasChangedInEditMode,
                    mode
                )
            };

            const fn = mode === SUBMIT_FORM_EDIT_MODE ? LostDogSubmissionService.updateLostDog : LostDogSubmissionService.submitLostDog;
            const result = yield call(fn, loginResult.token, payload);

            if (!result.errorCode) {
                if (route.name === SUBMIT_DOG_NAVIGATION_SCREEN_NAME || route.name === EDIT_DOG_NAVIGATION_SCREEN_NAME) {
                    navigation.goBack();
                }
                yield put(onSubmitFormSubmitSuccess());
            } else {
                yield put(onSubmitFormSubmitError(result));
            }
        }
    }
    yield put(onSubmitFormStopLoading());
}