import {createReducer} from '@reduxjs/toolkit';
import validator from 'validator';
import {
    EMOJI_REGEX,
    SUBMIT_FORM_AGE_TEXT_INPUT_KEY,
    SUBMIT_FORM_BREED_TEXT_INPUT_KEY,
    SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY,
    SUBMIT_FORM_COLOR_TEXT_INPUT_KEY,
    SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY,
    SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY,
    SUBMIT_FORM_NAME_TEXT_INPUT_KEY,
    SUBMIT_FORM_SEX_SELECT_INPUT_KEY,
    SUBMIT_FORM_STATUS_SELECT_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY
} from '../../../application.constants';
import {
    DASHBOARD_DOG_STATUS_FOUND,
    DASHBOARD_DOG_STATUS_LOST,
    DASHBOARD_DOG_STATUS_WANDERING,
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_BREED_LABEL_TITLE,
    DETAILS_DOG_CHIP_NUMBER,
    DETAILS_DOG_COLOR_LABEL_TITLE,
    DETAILS_DOG_HAS_CHIP,
    DETAILS_DOG_NAME_LABEL_TITLE,
    DETAILS_DOG_SEX_FEMALE,
    DETAILS_DOG_SEX_LABEL_TITLE,
    DETAILS_DOG_SEX_MALE,
    DETAILS_DOG_STATUS_LABEL_TITLE,
    DETAILS_EMAIL_INVALID,
    DETAILS_INPUT_REQUIRED,
    DETAILS_PHONE_NUMBER_INVALID, DETAILS_SUBMITTER_EMAIL_ADDRESS, DETAILS_SUBMITTER_PHONE_NUMBER
} from '../../../i18n/i18n.keys';
import {
    ON_RESET_SUBMIT_FORM,
    ON_SUBMIT_FORM_IMAGE_CLEARED,
    ON_SUBMIT_FORM_IMAGE_INVALID,
    ON_SUBMIT_FORM_IMAGE_SELECTED,
    ON_SUBMIT_FORM_INPUT_VALUE_CHANGED,
    ON_SUBMIT_FORM_LOADING,
    ON_SUBMIT_FORM_LOCATION_VALUE_CHANGED, ON_SUBMIT_FORM_PUBLISH_LOADING_PROGRESS,
    ON_SUBMIT_FORM_STOP_LOADING,
    ON_SUBMIT_FORM_SUBMIT_ERROR,
    ON_SUBMIT_FORM_VALIDATION_ERROR
} from '../../actions/submit-form/action-types/action.types';

export const initialState = {
    isValid: true,
    isLoading: false,
    loading: {
        progress: 0,
        stage: ''
    },
    error: '',
    inputs: {
        [SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY]: {
            labelKey: '',
            value: '',
            initialValue: '',
            isRequired: true,
            isValid: true,
            errorKey: DETAILS_INPUT_REQUIRED,
            validator: (value) =>
                !!value &&
                !validator.isEmpty(value) &&
                !EMOJI_REGEX.test(value)
        },
        [SUBMIT_FORM_NAME_TEXT_INPUT_KEY]: {
            labelKey: DETAILS_DOG_NAME_LABEL_TITLE,
            value: '',
            initialValue: '',
            isRequired: true,
            isValid: true,
            errorKey: DETAILS_INPUT_REQUIRED,
            labelTestID: 'details-screen-dog-name-text-label',
            inputTestID: 'details-screen-dog-name-text-input',
            errorTestID: 'details-screen-dog-name-text-input-error',
            keyboardType: 'default',
            autoCapitalize: 'words',
            contextMenuHidden: false,
            validator: (value) =>
                !!value &&
                !validator.isEmpty(value) &&
                !EMOJI_REGEX.test(value)
        },
        [SUBMIT_FORM_BREED_TEXT_INPUT_KEY]: {
            labelKey: DETAILS_DOG_BREED_LABEL_TITLE,
            value: '',
            initialValue: '',
            isRequired: true,
            isValid: true,
            errorKey: DETAILS_INPUT_REQUIRED,
            labelTestID: 'details-screen-dog-breed-text-label',
            inputTestID: 'details-screen-dog-breed-text-input',
            errorTestID: 'details-screen-dog-breed-text-input-error',
            keyboardType: 'default',
            autoCapitalize: 'none',
            contextMenuHidden: false,
            validator: (value) =>
                !!value &&
                !validator.isEmpty(value) &&
                !EMOJI_REGEX.test(value)
        },
        [SUBMIT_FORM_SEX_SELECT_INPUT_KEY]: {
            labelKey: DETAILS_DOG_SEX_LABEL_TITLE,
            value: null,
            initialValue: null,
            isRequired: true,
            options: [DETAILS_DOG_SEX_MALE, DETAILS_DOG_SEX_FEMALE],
            isValid: true,
            errorKey: DETAILS_INPUT_REQUIRED,
            labelTestID: 'details-screen-dog-gender-text-label',
            inputTestID: 'details-screen-dog-gender-select-input',
            errorTestID: 'details-screen-dog-gender-select-input-error',
            validator: (value) =>
                !!value &&
                !validator.isEmpty(value) &&
                !EMOJI_REGEX.test(value)
        },
        [SUBMIT_FORM_COLOR_TEXT_INPUT_KEY]: {
            labelKey: DETAILS_DOG_COLOR_LABEL_TITLE,
            value: '',
            initialValue: '',
            isRequired: true,
            isValid: true,
            errorKey: DETAILS_INPUT_REQUIRED,
            labelTestID: 'details-screen-dog-color-text-label',
            inputTestID: 'details-screen-dog-color-text-input',
            errorTestID: 'details-screen-dog-color-text-input-error',
            keyboardType: 'default',
            autoCapitalize: 'none',
            contextMenuHidden: false,
            validator: (value) =>
                !!value &&
                !validator.isEmpty(value) &&
                !EMOJI_REGEX.test(value)
        },
        [SUBMIT_FORM_STATUS_SELECT_INPUT_KEY]: {
            labelKey: DETAILS_DOG_STATUS_LABEL_TITLE,
            value: null,
            initialValue: null,
            isRequired: true,
            options: [DASHBOARD_DOG_STATUS_LOST, DASHBOARD_DOG_STATUS_WANDERING, DASHBOARD_DOG_STATUS_FOUND],
            isValid: true,
            errorKey: DETAILS_INPUT_REQUIRED,
            labelTestID: 'details-screen-dog-status-text-label',
            inputTestID: 'details-screen-dog-status-select-input',
            errorTestID: 'details-screen-dog-status-select-input-error',
            validator: (value) =>
                !!value &&
                !validator.isEmpty(value) &&
                !EMOJI_REGEX.test(value)
        },
        [SUBMIT_FORM_AGE_TEXT_INPUT_KEY]: {
            labelKey: DETAILS_DOG_AGE_LABEL_TITLE,
            value: '',
            initialValue: '',
            isRequired: true,
            isValid: true,
            errorKey: DETAILS_INPUT_REQUIRED,
            labelTestID: 'details-screen-dog-age-text-label',
            inputTestID: 'details-screen-dog-age-text-input',
            errorTestID: 'details-screen-dog-age-text-input-error',
            keyboardType: 'numeric',
            autoCapitalize: 'none',
            contextMenuHidden: true,
            validator: (value) =>
                !!value &&
                !validator.isEmpty(value) &&
                !EMOJI_REGEX.test(value) &&
                validator.isNumeric(value)
        },
        [SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY]: {
            labelKey: DETAILS_DOG_HAS_CHIP,
            value: false,
            initialValue: false,
            isValid: true,
            errorKey: DETAILS_INPUT_REQUIRED,
            labelTestID: 'details-screen-dog-has-chip-toggle-label',
            inputTestID: 'details-screen-dog-has-chip-toggle-input',
            errorTestID: 'details-screen-dog-has-chip-toggle-input-error',
        },
        [SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY]: {
            labelKey: DETAILS_DOG_CHIP_NUMBER,
            value: '',
            initialValue: '',
            isRequired: false,
            isValid: true,
            errorKey: DETAILS_INPUT_REQUIRED,
            keyboardType: 'numeric',
            autoCapitalize: 'none',
            contextMenuHidden: false,
            labelTestID: 'details-screen-dog-chip-number-text-label',
            inputTestID: 'details-screen-dog-chip-number-text-input',
            errorTestID: 'details-screen-dog-chip-number-text-input-error',
        },
        [SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY]: {
            labelKey: DETAILS_SUBMITTER_EMAIL_ADDRESS,
            value: '',
            initialValue: '',
            isRequired: false,
            isValid: true,
            errorKey: DETAILS_EMAIL_INVALID,
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
        },
        [SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY]: {
            labelKey: DETAILS_SUBMITTER_PHONE_NUMBER,
            value: '',
            initialValue: '',
            isRequired: false,
            isValid: true,
            errorKey: DETAILS_PHONE_NUMBER_INVALID,
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
    },
    location: {
        isPresent: false,
        latitude: 0,
        longitude: 0
    },
    selectedImage: {
        isPresent: false,
        isValid: true,
        errorKey: '',
        uri: ''
    },
};

export const reducer = createReducer(initialState, {
    [ON_SUBMIT_FORM_INPUT_VALUE_CHANGED]: (state, action) => {
        state.inputs[action.payload.inputKey].value = action.payload.value;
        state.inputs[action.payload.inputKey].isValid = true;
        state.isValid = true;

        if (action.payload.inputKey === SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY && action.payload.value === false) {
            state.inputs[SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY].value = state.inputs[SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY].initialValue;
        }
    },
    [ON_SUBMIT_FORM_LOCATION_VALUE_CHANGED]: (state, action) => {
        state.location = {
            isPresent: true,
            latitude: action.payload.latitude,
            longitude: action.payload.longitude
        };
    },
    [ON_SUBMIT_FORM_IMAGE_SELECTED]: (state, action) => {
        state.selectedImage.isPresent = true;
        state.selectedImage.isValid = true;
        state.selectedImage.errorKey = '';
        state.selectedImage.uri = action.payload;

        state.isValid = true;
    },
    [ON_SUBMIT_FORM_IMAGE_CLEARED]: (state) => {
        state.selectedImage.isPresent = false;
        state.selectedImage.isValid = true;
        state.selectedImage.errorKey = '';
        state.selectedImage.uri = '';
    },
    [ON_SUBMIT_FORM_IMAGE_INVALID]: (state, action) => {
        state.selectedImage.isValid = false;
        state.selectedImage.errorKey = action.payload;

        state.isValid = false;
    },
    [ON_SUBMIT_FORM_VALIDATION_ERROR]: (state, action) => {
        state.inputs[action.payload].isValid = false;
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
        state.error = action.payload;
        state.isValid = false;
    },
    [ON_RESET_SUBMIT_FORM]: (state) => {
        state.isValid = true;
        state.isLoading = false;
        state.loading = {
            progress: 0,
            stage: ''
        };
        state.error = '';
        Object.keys(state.inputs).forEach((inputKey) => {
            state.inputs[inputKey].value = state.inputs[inputKey].initialValue;
            state.inputs[inputKey].isValid = true;
        });
        state.location = {
            isPresent: false,
            latitude: 0,
            longitude: 0
        };
        state.selectedImage = {
            isPresent: false,
            isValid: true,
            errorKey: '',
            uri: ''
        };
    },
    [ON_SUBMIT_FORM_PUBLISH_LOADING_PROGRESS]: (state, action) => {
        state.loading = {
            progress: action.payload.progress,
            stage: action.payload.stage
        };
    }
});