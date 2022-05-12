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
    ON_SUBMIT_FORM_PUBLISH_LOADING_PROGRESS, ON_SUBMIT_FORM_SET_DOG_ID,
    ON_SUBMIT_FORM_STOP_LOADING,
    ON_SUBMIT_FORM_SUBMIT_ERROR,
    ON_SUBMIT_FORM_SUBMIT_SUCCESS,
    ON_SUBMIT_FORM_SUBMITTED,
    ON_SUBMIT_FORM_VALIDATION_ERROR
} from '../action-types/action-types';
import {Location} from '../../../../service/search-lost-dogs-service';

export type SubmitFormMode = 'SUBMIT_FORM_CREATE_MODE' | 'SUBMIT_FORM_EDIT_MODE';

export interface ErrorMessage {
    errorCode: number;
    errorMessage: string;
}

export const onSubmitFormInputValueChanged = (inputKey: string, value: string) => {
    return {
        type: ON_SUBMIT_FORM_INPUT_VALUE_CHANGED,
        payload: {
            inputKey: inputKey,
            value: value
        }
    };
};

export const onSubmitFormLocationValueChanged = (coordinates: Location) => {
    return {
        type: ON_SUBMIT_FORM_LOCATION_VALUE_CHANGED,
        payload: coordinates
    };
};

export const onSubmitFormImageSelected = (selectedImageUri: string) => {
    return {
        type: ON_SUBMIT_FORM_IMAGE_SELECTED,
        payload: selectedImageUri
    };
};

export const onSubmitFormImageCleared = () => {
    return {
        type: ON_SUBMIT_FORM_IMAGE_CLEARED
    };
};

export const onSubmitFormSubmitted = (route: any, navigation: any) => {
    return {
        type: ON_SUBMIT_FORM_SUBMITTED,
        payload: {
            navigation,
            route
        }
    };
};

export const onSubmitFormValidationError = (inputKey: string) => {
    return {
        type: ON_SUBMIT_FORM_VALIDATION_ERROR,
        payload: inputKey
    };
};

export const onSubmitFormLoading = () => {
    return {
        type: ON_SUBMIT_FORM_LOADING
    };
};

export const onSubmitFormStopLoading = () => {
    return {
        type: ON_SUBMIT_FORM_STOP_LOADING
    };
};

export const onSubmitFormSubmitError = (error: ErrorMessage) => {
    return {
        type: ON_SUBMIT_FORM_SUBMIT_ERROR,
        payload: error
    };
};

export const onSubmitFormSubmitSuccess = () => {
    return {
        type: ON_SUBMIT_FORM_SUBMIT_SUCCESS
    };
};

export const onResetSubmitForm = () => {
    return {
        type: ON_RESET_SUBMIT_FORM
    };
};

export const onSubmitFormImageInvalid = (errorKey: string) => {
    return {
        type: ON_SUBMIT_FORM_IMAGE_INVALID,
        payload: errorKey
    };
};

export const onSubmitFormPublishLoadingProgress = (progress: number, stage: string) => {
    return {
        type: ON_SUBMIT_FORM_PUBLISH_LOADING_PROGRESS,
        payload: {
            progress: progress,
            stage: stage
        }
    };
};

export const onSubmitFormHideAlert = () => {
    return {
        type: ON_SUBMIT_FORM_HIDE_ALERT
    };
};

export const onSubmitFormChangeMode = (mode: SubmitFormMode) => {
    return {
        type: ON_SUBMIT_FORM_CHANGE_MODE,
        payload: mode
    };
};

export const onSubmitFormSetDogId = (dogId: number) => {
    return {
        type: ON_SUBMIT_FORM_SET_DOG_ID,
        payload: dogId
    };
};