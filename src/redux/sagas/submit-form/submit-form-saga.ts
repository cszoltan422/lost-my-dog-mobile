import {takeLatest, select, put, call} from 'redux-saga/effects';
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
    SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY,
} from '../../../application.constants';
import UserService, {LoginResult} from '../../../service/user-service';
import LostDogSubmissionService, {
    LostDogSubmissionRequest,
} from '../../../service/lost-dog-submission-service';
import {getCurrentTimeWithTimezone} from '../../../util/date/date.utils';
import {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {
    setSubmitFormError,
    setSubmitFormIsLoading, setSubmitFormLoadingState, submitFormImageInvalid,
    SubmitFormInput,
    SubmitFormLocation,
    SubmitFormSelectedImage, submitFormSubmit, submitFormSubmitSuccess, SubmitFormType, submitFormValidationError
} from '../../reducers/submit-form/submit-form-reducer';
import {ApplicationUser} from '../../reducers/application/application-reducer';
import {ImageResult} from 'expo-image-manipulator/src/ImageManipulator.types';
import {FileInfo} from 'expo-file-system/src/FileSystem.types';
import {ChippedStatus, LostDogGender, LostDogStatus} from '../../../service/search-lost-dogs-service';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../components/navigation/lost-my-dog-navigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export function* submitFormSubmittedWatcherSaga() {
    yield takeLatest([submitFormSubmit.type], submitFormSubmittedSaga);
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
                        yield put(submitFormValidationError(inputKey));
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
            yield put(submitFormImageInvalid('submitForm.validation.imageTooLarge'));
            isImageValid = false;
        }
    } else {
        yield put(submitFormImageInvalid('submitForm.validation.noImage'));
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
    if (DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS.get('FOUND') === statusInput?.value) {
        status = 'FOUND';
    } else if (DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS.get('WANDERING') === statusInput?.value) {
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

function* submitFormSubmittedSaga(action: PayloadAction<
    {
        route: RouteProp<RootStackParamList, 'SubmitLostDogScreen'> | RouteProp<RootStackParamList, 'EditLostDogScreen'>,
        navigation: NativeStackNavigationProp<RootStackParamList, 'SubmitLostDogScreen'> | NativeStackNavigationProp<RootStackParamList, 'EditLostDogScreen'>
    }>) {
    yield put(setSubmitFormIsLoading(true));

    const { route, navigation } = action.payload;
    const inputs: Map<string, SubmitFormInput> = yield select((state: RootState) => state.submitForm.inputs);
    const mode: SubmitFormType = yield select((state: RootState) => state.submitForm.mode);
    const dogId: number = yield select((state: RootState) => state.submitForm.dogId);
    const location: SubmitFormLocation = yield select((state: RootState) => state.submitForm.location);
    const selectedImage: SubmitFormSelectedImage = yield select((state: RootState) => state.submitForm.selectedImage);
    const user: ApplicationUser = yield select((state: RootState) => state.application.user);

    yield put(setSubmitFormLoadingState({
        progress: 0.2,
        stage: 'submitForm.loading.validatingForm'
    }));
    const isValidForm = yield* validateFormInputs(inputs);

    if (isValidForm && user.isLoggedIn) {
        yield put(setSubmitFormLoadingState({
            progress: 0.4,
            stage: 'submitForm.loading.compressingImage'
        }));
        const compressedImage: ImageResult | undefined = yield* getCompressedImage(selectedImage);
        const isImageValid: boolean = yield* validateImage(compressedImage);

        if (isImageValid) {
            try {
                yield put(setSubmitFormLoadingState({
                    progress: 0.8,
                    stage: 'submitForm.loading.sendingRequest'
                }));
                const loginResult: LoginResult = yield call(UserService.login, { userName: user.username, password: user.password }); // todo only login again if token expired

                const payload: LostDogSubmissionRequest = getPayload(dogId, mode, inputs, location, compressedImage);
                if (mode === 'SUBMIT_FORM_CREATE_MODE') {
                    yield call(LostDogSubmissionService.submitLostDog, loginResult.token, payload);
                } else {
                    yield call(LostDogSubmissionService.updateLostDog, loginResult.token, payload);
                }

                yield put(submitFormSubmitSuccess());
                if (route.name === 'SubmitLostDogScreen' || route.name === 'EditLostDogScreen') {
                    navigation.goBack();
                }
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const errorCode = error.response.data.errorCode;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const errorMessage = error.response.data.errorMessage;
                yield put(setSubmitFormError({
                    show: true,
                    message: errorMessage,
                    code: errorCode
                }));
            }
        }
    }
    yield put(setSubmitFormIsLoading(false));
    yield put(setSubmitFormLoadingState({
        progress: 0,
        stage: ''
    }));
}