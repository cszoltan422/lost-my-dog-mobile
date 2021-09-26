import {
    ON_RESET_SUBMIT_FORM, ON_SUBMIT_FORM_IMAGE_CLEARED, ON_SUBMIT_FORM_IMAGE_INVALID,
    ON_SUBMIT_FORM_IMAGE_SELECTED,
    ON_SUBMIT_FORM_INPUT_VALUE_CHANGED,
    ON_SUBMIT_FORM_LOADING, ON_SUBMIT_FORM_LOCATION_VALUE_CHANGED,
    ON_SUBMIT_FORM_STOP_LOADING,
    ON_SUBMIT_FORM_SUBMIT_ERROR,
    ON_SUBMIT_FORM_SUBMITTED,
    ON_SUBMIT_FORM_VALIDATION_ERROR
} from '../action-types/action.types';

export const onSubmitFormInputValueChanged = (inputKey, value) => {
    return {
        type: ON_SUBMIT_FORM_INPUT_VALUE_CHANGED,
        payload: {
            inputKey: inputKey,
            value: value
        }
    }
};

export const onSubmitFormLocationValueChanged = (coordinates) => {
    return {
        type: ON_SUBMIT_FORM_LOCATION_VALUE_CHANGED,
        payload: coordinates
    }
};

export const onSubmitFormImageSelected = (selectedImageUri) => {
    return {
        type: ON_SUBMIT_FORM_IMAGE_SELECTED,
        payload: selectedImageUri
    }
};

export const onSubmitFormImageCleared = () => {
    return {
        type: ON_SUBMIT_FORM_IMAGE_CLEARED
    }
};

export const onSubmitFormSubmitted = (navigation) => {
    return {
        type: ON_SUBMIT_FORM_SUBMITTED,
        payload: navigation
    }
};

export const onSubmitFormValidationError = (inputKey) => {
    return {
        type: ON_SUBMIT_FORM_VALIDATION_ERROR,
        payload: inputKey
    }
};

export const onSubmitFormLoading = () => {
    return {
        type: ON_SUBMIT_FORM_LOADING
    }
};

export const onSubmitFormStopLoading = () => {
    return {
        type: ON_SUBMIT_FORM_STOP_LOADING
    }
};

export const onSubmitFormSubmitError = (error) => {
    return {
        type: ON_SUBMIT_FORM_SUBMIT_ERROR,
        payload: error
    }
};

export const onResetSubmitForm = () => {
    return {
        type: ON_RESET_SUBMIT_FORM
    }
};

export const onSubmitFormImageInvalid = (errorKey) => {
    return {
        type: ON_SUBMIT_FORM_IMAGE_INVALID,
        payload: errorKey
    }
}