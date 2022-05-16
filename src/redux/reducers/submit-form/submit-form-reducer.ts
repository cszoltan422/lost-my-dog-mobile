import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import validator from 'validator';
import {
    EMOJI_REGEX,
    SUBMIT_FORM_AGE_TEXT_INPUT_KEY,
    SUBMIT_FORM_BREED_TEXT_INPUT_KEY,
    SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY,
    SUBMIT_FORM_COLOR_TEXT_INPUT_KEY,
    SUBMIT_FORM_CREATE_MODE,
    SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY,
    SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY,
    SUBMIT_FORM_NAME_TEXT_INPUT_KEY,
    SUBMIT_FORM_SEX_SELECT_INPUT_KEY,
    SUBMIT_FORM_STATUS_SELECT_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY
} from '../../../application.constants';
import {Location} from '../../../service/search-lost-dogs-service';
import {KeyboardTypeOptions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../components/navigation/lost-my-dog-navigator';

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
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
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
}

export interface SubmitFormSelectedImage {
    isPresent: boolean,
    isValid: boolean,
    errorKey: string;
    uri: string,
}

export type SubmitFormMode = 'SUBMIT_FORM_CREATE_MODE' | 'SUBMIT_FORM_EDIT_MODE';

export interface SubmitFormState {
    mode: SubmitFormType;
    dogId?: number;
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
    dogId: undefined,
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
    },
    selectedImage: {
        isPresent: false,
        isValid: true,
        errorKey: '',
        uri: '',
    },
};

export interface SubmitFormInputChangePayload {
    inputKey: string;
    value: string | boolean | undefined;
}

const submitFormSlice = createSlice({
    name: 'submitForm',
    initialState,
    reducers: {
        submitFormInputChange: (state, action: PayloadAction<SubmitFormInputChangePayload>) => {
            const { payload } = action;
            const { inputKey } = payload;
            const input = state.inputs.get(inputKey);

            if (input) {
                const newInput: SubmitFormInput = {
                    ...input
                };
                newInput.value = action.payload.value;
                newInput.isValid = true;
                state.inputs.set(inputKey, newInput);
            }
            state.isValid = true;
        },
        submitFormLocationChange: (state, action: PayloadAction<Location>) => {
            const { payload } = action;
            const { latitude, longitude } = payload;
            state.location = {
                isPresent: true,
                latitude,
                longitude
            };
        },
        submitFormImageChange: (state, action: PayloadAction<string>) => {
            state.selectedImage = {
                isPresent: true,
                isValid: true,
                errorKey: '',
                uri: action.payload
            };

            state.isValid = true;
        },
        submitFormClearImage: (state) => {
            state.selectedImage.isPresent = false;
            state.selectedImage.isValid = true;
            state.selectedImage.errorKey = '';
            state.selectedImage.uri = '';
        },
        submitFormImageInvalid: (state, action: PayloadAction<string>) => {
            state.selectedImage.isValid = false;
            state.selectedImage.errorKey = action.payload;
            state.isValid = false;
        },
        submitFormValidationError: (state, action: PayloadAction<string>) => {
            const input = state.inputs.get(action.payload);

            if (input) {
                const newInput: SubmitFormInput = {
                    ...input,
                    isValid: false,
                };
                state.inputs.set(action.payload, newInput);
            }

            state.isValid = false;
        },
        setSubmitFormIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setSubmitFormLoadingState: (state, action: PayloadAction<SubmitFormLoadingState>) => {
            state.loading.stage = action.payload.stage;
            state.loading.progress = action.payload.progress;
        },
        setSubmitFormError: (state, action: PayloadAction<SubmitFormError>) => {
            state.error.show = action.payload.show;
            state.error.code = action.payload.code;
            state.error.message = action.payload.message;
        },
        setSubmitFormMode: (state, action: PayloadAction<SubmitFormMode>) => {
            state.mode = action.payload;
        },
        setSubmitFormDogId: (state, action: PayloadAction<number | undefined>) => {
            state.dogId = action.payload;
        },
        resetSubmitForm: (state) => {
            state.dogId = undefined;
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
                longitude: 0
            };
            state.selectedImage = {
                isPresent: false,
                isValid: true,
                errorKey: '',
                uri: ''
            };
        }
    }
});

const submitFormReducer = submitFormSlice.reducer;

export const {
    submitFormInputChange,
    submitFormLocationChange,
    submitFormImageChange,
    submitFormClearImage,
    submitFormImageInvalid,
    submitFormValidationError,
    setSubmitFormIsLoading,
    setSubmitFormLoadingState,
    setSubmitFormError,
    setSubmitFormMode,
    setSubmitFormDogId,
    resetSubmitForm
} = submitFormSlice.actions;
export const submitFormSubmit = createAction<NativeStackScreenProps<RootStackParamList, 'SubmitLostDogScreen' | 'EditLostDogScreen'>>('submitForm/submitFormSubmit');
export const submitFormSubmitSuccess = createAction('submitForm/submitFormSubmitSuccess');
export default submitFormReducer;