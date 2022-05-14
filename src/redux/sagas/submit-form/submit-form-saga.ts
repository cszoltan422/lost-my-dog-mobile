import {takeLatest, select, put, call} from 'redux-saga/effects';
import {ON_SUBMIT_FORM_SUBMITTED} from '../../actions/submit-form/action-types/action-types';
import {
    ErrorMessage,
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
    SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY, EDIT_DOG_NAVIGATION_SCREEN_NAME,
} from '../../../application.constants';
import UserService, {LoginResult} from '../../../service/user-service';
import LostDogSubmissionService, {
    LostDogSubmissionRequest,
} from '../../../service/lost-dog-submission-service';
import {getCurrentTimeWithTimezone} from '../../../util/date/date.utils';
import {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {
    SubmitFormInput,
    SubmitFormLocation,
    SubmitFormSelectedImage, SubmitFormType
} from '../../reducers/submit-form/submit-form-reducer';
import {ApplicationUser} from '../../reducers/application/application-reducer';
import {ImageResult} from 'expo-image-manipulator/src/ImageManipulator.types';
import {FileInfo} from 'expo-file-system/src/FileSystem.types';
import {ChippedStatus, LostDogGender, LostDogStatus} from '../../../service/search-lost-dogs-service';

export function* submitFormSubmittedWatcherSaga() {
    yield takeLatest([ON_SUBMIT_FORM_SUBMITTED], submitFormSubmittedSaga);
}

function* validateFormInputs(inputs: Map<string, SubmitFormInput>) {
    let isValidForm = true;
    for (const inputKey of inputs.keys()) {
        const input = inputs.get(inputKey);
        if (input) {
            if ('validator' in input) {
                const { value, validator } = input;
                if (validator) {
                    const isValid = validator(value || '');
                    if (!isValid) {
                        isValidForm = false;
                        yield put(onSubmitFormValidationError(inputKey));
                    }
                }
            }
        }
    }
    return isValidForm;
}

function* validateImage(compressedImage: ImageResult | undefined) {
    let isImageValid = true;
    if (compressedImage) {
        const imageInfo: FileInfo = yield FileSystem.getInfoAsync(compressedImage.uri, { size: true });
        if (imageInfo.size === undefined || imageInfo.size > ONE_GIGABYTE_IN_BYTES) {
            yield put(onSubmitFormImageInvalid('submitForm.validation.imageTooLarge'));
            isImageValid = false;
        }
    } else {
        yield put(onSubmitFormImageInvalid('submitForm.validation.noImage'));
        isImageValid = false;
    }
    return isImageValid;
}

function* getCompressedImage(selectedImage: SubmitFormSelectedImage) {
    let compressedImage: ImageResult | undefined;
    if (selectedImage.isPresent) {
        compressedImage = yield ImageManipulator.manipulateAsync(
            selectedImage.uri,
            [],
            {compress: 0.5, format: ImageManipulator.SaveFormat.JPEG, base64: true}
        );
    }
    return compressedImage;
}

function getPayload(
    dogId: number,
    mode: SubmitFormType,
    inputs: Map<string, SubmitFormInput>,
    location: SubmitFormLocation,
    compressedImage: ImageResult | undefined
) {
    const descriptionInput = inputs.get(SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY);
    const dogNameInput = inputs.get(SUBMIT_FORM_NAME_TEXT_INPUT_KEY);
    const dogBreedInput = inputs.get(SUBMIT_FORM_BREED_TEXT_INPUT_KEY);
    const ageInput = inputs.get(SUBMIT_FORM_AGE_TEXT_INPUT_KEY);
    const colorInput = inputs.get(SUBMIT_FORM_COLOR_TEXT_INPUT_KEY);
    const genderInput = inputs.get(SUBMIT_FORM_SEX_SELECT_INPUT_KEY);
    const statusInput = inputs.get(SUBMIT_FORM_STATUS_SELECT_INPUT_KEY);
    const chippedStatusInput = inputs.get(SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY);
    const chipNumberInput = inputs.get(SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY);
    const contactPhoneInput = inputs.get(SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY);
    const contactEmailInput = inputs.get(SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY);

    let gender: LostDogGender = 'MALE';
    if (DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS.get('FEMALE') === genderInput?.value) {
        gender = 'FEMALE';
    }

    let status: LostDogStatus = 'LOST';
    if (DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS['FOUND'] === statusInput?.value) {
        status = 'FOUND';
    } else if (DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS['WANDERING'] === statusInput?.value) {
        status = 'WANDERING';
    }

    let chippedStatus: ChippedStatus = 'NO';
    if (chippedStatusInput?.value) {
        chippedStatus = 'YES';
    }

    return {
        id: mode === 'SUBMIT_FORM_EDIT_MODE' ? dogId : undefined,
        dateLost: mode === 'SUBMIT_FORM_CREATE_MODE' ? getCurrentTimeWithTimezone() : undefined,
        description: descriptionInput?.value?.toString() || '',
        dogName: dogNameInput?.value?.toString() || '',
        dogBreed: dogBreedInput?.value?.toString() || '',
        age: ageInput?.value?.toString() || '',
        color: colorInput?.value?.toString() || '',
        gender: gender,
        status: status,
        chippedStatus: chippedStatus,
        chipNumber: chipNumberInput?.value?.toString() || '',
        contactPhone: contactPhoneInput?.value?.toString() || '',
        contactEmail: contactEmailInput?.value?.toString() || '',
        longitude: location.longitude,
        latitude: location.latitude,
        base64Content: compressedImage?.base64 || '',
        avatarImageType: 'jpg',
        specialPeculiarities: '',

    };
}

function* submitFormSubmittedSaga(action: PayloadAction<any>) {
    yield put(onSubmitFormLoading());

    const { route, navigation } = action.payload;
    const inputs: Map<string, SubmitFormInput> = yield select((state: RootState) => state.submitForm.inputs);
    const mode: SubmitFormType = yield select((state: RootState) => state.submitForm.mode);
    const dogId: number = yield select((state: RootState) => state.submitForm.dogId);
    const location: SubmitFormLocation = yield select((state: RootState) => state.submitForm.location);
    const selectedImage: SubmitFormSelectedImage = yield select((state: RootState) => state.submitForm.selectedImage);
    const user: ApplicationUser = yield select((state: RootState) => state.application.user);

    yield put(onSubmitFormPublishLoadingProgress(0.2, 'submitForm.loading.validatingForm'));
    const isValidForm = yield* validateFormInputs(inputs);

    if (isValidForm && user.isLoggedIn) {
        yield put(onSubmitFormPublishLoadingProgress(0.4, 'submitForm.loading.compressingImage'));
        const compressedImage: ImageResult | undefined = yield* getCompressedImage(selectedImage);
        const isImageValid: boolean = yield* validateImage(compressedImage);

        if (isImageValid) {
            try {
                yield put(onSubmitFormPublishLoadingProgress(0.8, 'submitForm.loading.sendingRequest'));
                const loginResult: LoginResult = yield call(UserService.login, { userName: user.username, password: user.password }); // todo only login again if token expired

                const payload: LostDogSubmissionRequest = getPayload(dogId, mode, inputs, location, compressedImage);
                if (mode === 'SUBMIT_FORM_CREATE_MODE') {
                    yield call(LostDogSubmissionService.submitLostDog, loginResult.token, payload);
                } else {
                    yield call(LostDogSubmissionService.updateLostDog, loginResult.token, payload);
                }

                yield put(onSubmitFormSubmitSuccess());
                if (route.name === SUBMIT_DOG_NAVIGATION_SCREEN_NAME || route.name === EDIT_DOG_NAVIGATION_SCREEN_NAME) {
                    navigation.goBack();
                }
            } catch (error) {
                const apiError: ErrorMessage = {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    errorCode: error.response.data.errorCode,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    errorMessage: error.response.data.errorMessage
                };
                yield put(onSubmitFormSubmitError(apiError));
            }
        }
    }
    yield put(onSubmitFormStopLoading());
}