import {createReducer} from '@reduxjs/toolkit';
import validator from 'validator';
import {
    EMOJI_REGEX,
    SUBMIT_FORM_AGE_TEXT_INPUT_KEY,
    SUBMIT_FORM_BREED_TEXT_INPUT_KEY,
    SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY,
    SUBMIT_FORM_COLOR_TEXT_INPUT_KEY,
    SUBMIT_FORM_CREATE_MODE,
    SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY,
    SUBMIT_FORM_EDIT_MODE,
    SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY,
    SUBMIT_FORM_NAME_TEXT_INPUT_KEY,
    SUBMIT_FORM_SEX_SELECT_INPUT_KEY,
    SUBMIT_FORM_STATUS_SELECT_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY
} from '../../../application.constants';
import {
    ON_RESET_SUBMIT_FORM,
    ON_SUBMIT_FORM_CHANGE_MODE,
    ON_SUBMIT_FORM_HIDE_ALERT,
    ON_SUBMIT_FORM_IMAGE_CLEARED,
    ON_SUBMIT_FORM_IMAGE_INVALID,
    ON_SUBMIT_FORM_IMAGE_SELECTED,
    ON_SUBMIT_FORM_INPUT_VALUE_CHANGED,
    ON_SUBMIT_FORM_LOADING,
    ON_SUBMIT_FORM_LOCATION_VALUE_CHANGED,
    ON_SUBMIT_FORM_PUBLISH_LOADING_PROGRESS,
    ON_SUBMIT_FORM_SET_DOG_ID,
    ON_SUBMIT_FORM_STOP_LOADING,
    ON_SUBMIT_FORM_SUBMIT_ERROR,
    ON_SUBMIT_FORM_VALIDATION_ERROR
} from '../../actions/submit-form/action-types/action-types';
import {Location} from '../../../service/search-lost-dogs-service';

export type SubmitFormType = 'SUBMIT_FORM_CREATE_MODE' | 'SUBMIT_FORM_EDIT_MODE';

export interface SubmitFormLoadingState {
    progress: number;
    stage: string;
}

export interface SubmitFormError {
    code: number;
    message: string;
    show: boolean;
}

export interface SubmitFormTextInput {
    labelKey: string;
    value: string;
    initialValue: string;
    isRequired: boolean;
    isValid: boolean;
    errorKey: string;
    labelTestID?: string;
    inputTestID?: string;
    errorTestID?: string;
    keyboardType?: string;
    autoCapitalize?: string;
    contextMenuHidden?: boolean;
    validator?: (value: string) => boolean;
}

export interface SubmitFormSelectInput {
    labelKey: string;
    value?: string;
    initialValue?: string;
    isRequired: boolean,
    options: string[],
    isValid: boolean,
    errorKey: string;
    labelTestID: string;
    inputTestID: string;
    errorTestID: string;
    validator: (value: string) => boolean;
}

export interface SubmitFormToggleInput {
    labelKey: string;
    value: boolean;
    initialValue: boolean;
    isValid: boolean;
    errorKey: string;
    labelTestID: string;
    inputTestID: string;
    errorTestID: string;
}

export type SubmitFormInput = SubmitFormTextInput | SubmitFormSelectInput | SubmitFormToggleInput;

export interface SubmitFormLocation extends Location {
    isPresent: boolean;
    hasChangedInEditMode: boolean;
}

export interface SubmitFormSelectedImage {
    isPresent: boolean,
    isValid: boolean,
    errorKey: string;
    uri: string,
    hasChangedInEditMode: boolean;
}

export interface SubmitFormState {
    mode: SubmitFormType;
    dogId: number;
    isValid: boolean;
    isLoading: boolean;
    loading: SubmitFormLoadingState;
    error: SubmitFormError;
    inputs: Map<string, SubmitFormInput>;
    location: SubmitFormLocation;
    selectedImage: SubmitFormSelectedImage;
}

export const initialState: SubmitFormState = {
    mode: SUBMIT_FORM_CREATE_MODE,
    dogId: -1,
    isValid: true,
    isLoading: false,
    loading: {
        progress: 0,
        stage: ''
    },
    error: {
        code: 0,
        message: '',
        show: false,
    },
    inputs: new Map<string, SubmitFormInput>([
       [
           SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY,
           {
               labelKey: '',
               value: '',
               initialValue: '',
               isRequired: true,
               isValid: true,
               errorKey: 'submitForm.validation.fieldEmpty',
               validator: (value: string) =>
                   !!value &&
                   !validator.isEmpty(value) &&
                   !EMOJI_REGEX.test(value)
           }
       ],
       [
           SUBMIT_FORM_NAME_TEXT_INPUT_KEY,
           {
               labelKey: 'general.name',
               value: '',
               initialValue: '',
               isRequired: true,
               isValid: true,
               errorKey: 'submitForm.validation.fieldEmpty',
               labelTestID: 'details-screen-dog-name-text-label',
               inputTestID: 'details-screen-dog-name-text-input',
               errorTestID: 'details-screen-dog-name-text-input-error',
               keyboardType: 'default',
               autoCapitalize: 'words',
               contextMenuHidden: false,
               validator: (value: string) =>
                   !!value &&
                   !validator.isEmpty(value) &&
                   !EMOJI_REGEX.test(value)
           }
       ],
       [
           SUBMIT_FORM_BREED_TEXT_INPUT_KEY,
           {
               labelKey: 'general.breed',
               value: '',
               initialValue: '',
               isRequired: true,
               isValid: true,
               errorKey: 'submitForm.validation.fieldEmpty',
               labelTestID: 'details-screen-dog-breed-text-label',
               inputTestID: 'details-screen-dog-breed-text-input',
               errorTestID: 'details-screen-dog-breed-text-input-error',
               keyboardType: 'default',
               autoCapitalize: 'none',
               contextMenuHidden: false,
               validator: (value: string) =>
                   !!value &&
                   !validator.isEmpty(value) &&
                   !EMOJI_REGEX.test(value)
           }
       ],
       [
           SUBMIT_FORM_SEX_SELECT_INPUT_KEY,
           {
               labelKey: 'general.sex',
               value: undefined,
               initialValue: undefined,
               isRequired: true,
               options: ['general.male', 'general.female'],
               isValid: true,
               errorKey: 'submitForm.validation.fieldEmpty',
               labelTestID: 'details-screen-dog-gender-text-label',
               inputTestID: 'details-screen-dog-gender-select-input',
               errorTestID: 'details-screen-dog-gender-select-input-error',
               validator: (value: string) =>
                   !!value &&
                   !validator.isEmpty(value) &&
                   !EMOJI_REGEX.test(value)
           }
       ],
       [
           SUBMIT_FORM_COLOR_TEXT_INPUT_KEY,
           {
               labelKey: 'general.color',
               value: '',
               initialValue: '',
               isRequired: true,
               isValid: true,
               errorKey: 'submitForm.validation.fieldEmpty',
               labelTestID: 'details-screen-dog-color-text-label',
               inputTestID: 'details-screen-dog-color-text-input',
               errorTestID: 'details-screen-dog-color-text-input-error',
               keyboardType: 'default',
               autoCapitalize: 'none',
               contextMenuHidden: false,
               validator: (value: string) =>
                   !!value &&
                   !validator.isEmpty(value) &&
                   !EMOJI_REGEX.test(value)
           }
       ],
       [
           SUBMIT_FORM_STATUS_SELECT_INPUT_KEY,
           {
               labelKey: 'general.status',
               value: undefined,
               initialValue: undefined,
               isRequired: true,
               options: ['general.lost', 'general.wandering', 'general.found'],
               isValid: true,
               errorKey: 'submitForm.validation.fieldEmpty',
               labelTestID: 'details-screen-dog-status-text-label',
               inputTestID: 'details-screen-dog-status-select-input',
               errorTestID: 'details-screen-dog-status-select-input-error',
               validator: (value: string) =>
                   !!value &&
                   !validator.isEmpty(value) &&
                   !EMOJI_REGEX.test(value)
           }
       ],
       [
           SUBMIT_FORM_AGE_TEXT_INPUT_KEY,
           {
               labelKey: 'general.age',
               value: '',
               initialValue: '',
               isRequired: true,
               isValid: true,
               errorKey: 'submitForm.validation.fieldEmpty',
               labelTestID: 'details-screen-dog-age-text-label',
               inputTestID: 'details-screen-dog-age-text-input',
               errorTestID: 'details-screen-dog-age-text-input-error',
               keyboardType: 'numeric',
               autoCapitalize: 'none',
               contextMenuHidden: true,
               validator: (value: string) =>
                   !!value &&
                   !validator.isEmpty(value) &&
                   !EMOJI_REGEX.test(value) &&
                   validator.isNumeric(value)
           }
       ],
       [
           SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY,
           {
               labelKey: 'general.hasChip',
               value: false,
               initialValue: false,
               isValid: true,
               errorKey: 'submitForm.validation.fieldEmpty',
               labelTestID: 'details-screen-dog-has-chip-toggle-label',
               inputTestID: 'details-screen-dog-has-chip-toggle-input',
               errorTestID: 'details-screen-dog-has-chip-toggle-input-error',
           }
       ],
       [
           SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY,
           {
               labelKey: 'general.chipNumber',
               value: '',
               initialValue: '',
               isRequired: false,
               isValid: true,
               errorKey: 'submitForm.validation.fieldEmpty',
               keyboardType: 'numeric',
               autoCapitalize: 'none',
               contextMenuHidden: false,
               labelTestID: 'details-screen-dog-chip-number-text-label',
               inputTestID: 'details-screen-dog-chip-number-text-input',
               errorTestID: 'details-screen-dog-chip-number-text-input-error',
           }
       ],
       [
           SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY,
           {
               labelKey: 'general.emailAddress',
               value: '',
               initialValue: '',
               isRequired: false,
               isValid: true,
               errorKey: 'general.emailInvalid',
               keyboardType: 'email-address',
               autoCapitalize: 'none',
               contextMenuHidden: false,
               labelTestID: 'details-screen-submitter-email-text-label',
               inputTestID: 'details-screen-submitter-email-text-input',
               errorTestID: 'details-screen-submitter-email-text-input-error',
               validator: (value) =>
                   !value ||
                   (
                       !validator.isEmpty(value) &&
                       !EMOJI_REGEX.test(value) &&
                       validator.isEmail(
                           value.replace(/\s/g, '')
                       )
                   )
           }
       ],
       [
           SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY,
           {
               labelKey: 'general.phoneNumber',
               value: '',
               initialValue: '',
               isRequired: false,
               isValid: true,
               errorKey: 'submitForm.validation.phoneNumberInvalid',
               keyboardType: 'phone-pad',
               autoCapitalize: 'none',
               contextMenuHidden: false,
               labelTestID: 'details-screen-submitter-phone-number-text-label',
               inputTestID: 'details-screen-submitter-phone-number-text-input',
               errorTestID: 'details-screen-submitter-phone-number-text-input-error',
               validator: (value) =>
                   !value ||
                   (
                       !validator.isEmpty(value) &&
                       !EMOJI_REGEX.test(value) &&
                       validator.isMobilePhone(
                           value.replace(/\s/g, '')
                               .replace('-', '')
                       )
                   )
           }
       ]
    ]),
    location: {
        isPresent: false,
        latitude: 0,
        longitude: 0,
        hasChangedInEditMode: false
    },
    selectedImage: {
        isPresent: false,
        isValid: true,
        errorKey: '',
        uri: '',
        hasChangedInEditMode: false
    },
};

export const reducer = createReducer(initialState, {
    [ON_SUBMIT_FORM_INPUT_VALUE_CHANGED]: (state, action) => {
        const { payload } = action;
        const { inputKey, value } = payload;
        const input = state.inputs.get(inputKey);

        if (input) {
            const newInput: SubmitFormInput = {
                ...input,
                value,
                isValid: true
            };
            state.inputs.set(inputKey, newInput);
        }
        state.isValid = true;
    },
    [ON_SUBMIT_FORM_LOCATION_VALUE_CHANGED]: (state, action) => {
        const { payload } = action;
        const { latitude, longitude } = payload;
        state.location = {
            isPresent: true,
            latitude,
            longitude,
            hasChangedInEditMode: state.mode === SUBMIT_FORM_EDIT_MODE
        };
    },
    [ON_SUBMIT_FORM_IMAGE_SELECTED]: (state, action) => {
        const { payload } = action;
        const { uri } = payload;

        state.selectedImage = {
            isPresent: true,
            isValid: true,
            errorKey: '',
            uri,
            hasChangedInEditMode: state.mode === SUBMIT_FORM_EDIT_MODE
        };

        state.isValid = true;
    },
    [ON_SUBMIT_FORM_IMAGE_CLEARED]: (state) => {
        state.selectedImage.isPresent = false;
        state.selectedImage.isValid = true;
        state.selectedImage.errorKey = '';
        state.selectedImage.uri = '';
    },
    [ON_SUBMIT_FORM_IMAGE_INVALID]: (state, action) => {
        const { payload } = action;
        const { errorKey } = payload;

        state.selectedImage.isValid = false;
        state.selectedImage.errorKey = errorKey;

        state.isValid = false;
    },
    [ON_SUBMIT_FORM_VALIDATION_ERROR]: (state, action) => {
        const { payload } = action;
        const { inputKey } = payload;
        const input = state.inputs.get(inputKey);

        if (input) {
            const newInput: SubmitFormInput = {
                ...input,
                isValid: false,
            };
            state.inputs.set(inputKey, newInput);
        }

        state.isValid = false;
    },
    [ON_SUBMIT_FORM_LOADING]: (state) => {
        state.isLoading = true;
    },
    [ON_SUBMIT_FORM_STOP_LOADING]: (state) => {
        state.isLoading = false;
        state.loading = {
            progress: 0,
            stage: ''
        };
    },
    [ON_SUBMIT_FORM_SUBMIT_ERROR]: (state, action) => {
        const { payload } = action;
        const { errorCode, errorMessage } = payload;

        state.isLoading = false;
        state.error = {
            show: true,
            code: errorCode,
            message: errorMessage
        };
    },
    [ON_RESET_SUBMIT_FORM]: (state) => {
        state.dogId = -1;
        state.isValid = true;
        state.isLoading = false;
        state.loading = {
            progress: 0,
            stage: ''
        };
        state.error = {
            code: 0,
            message: '',
            show: false,
        };


        Array.from(state.inputs.keys()).forEach((inputKey) => {
            const input = state.inputs.get(inputKey);
            if (input) {
                const newInput = {
                    ...input,
                    isValid: true
                };
                newInput.value = input.initialValue;
                state.inputs.set(inputKey, newInput);
            }
        });
        state.location = {
            isPresent: false,
            latitude: 0,
            longitude: 0,
            hasChangedInEditMode: false
        };
        state.selectedImage = {
            isPresent: false,
            isValid: true,
            errorKey: '',
            uri: '',
            hasChangedInEditMode: false
        };
    },
    [ON_SUBMIT_FORM_PUBLISH_LOADING_PROGRESS]: (state, action) => {
        const { payload } = action;
        const { progress, stage } = payload;

        state.loading = {
            progress,
            stage
        };
    },
    [ON_SUBMIT_FORM_HIDE_ALERT]: (state) => {
        state.error.show = false;
    },
    [ON_SUBMIT_FORM_CHANGE_MODE]: (state, action) => {
        const { payload } = action;
        const { mode } = payload;

        state.mode = mode;
    },
    [ON_SUBMIT_FORM_SET_DOG_ID]: (state, action) => {
        const { payload } = action;
        const { dogId } = payload;

        state.dogId = dogId;
    }
});