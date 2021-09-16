import {createReducer} from "@reduxjs/toolkit";
import {
    SUBMIT_FORM_AGE_TEXT_INPUT_KEY,
    SUBMIT_FORM_BREED_TEXT_INPUT_KEY,
    SUBMIT_FORM_COLOR_TEXT_INPUT_KEY,
    SUBMIT_FORM_HAS_CHIP_NUMBER_TEXT_INPUT_KEY,
    SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY,
    SUBMIT_FORM_NAME_TEXT_INPUT_KEY,
    SUBMIT_FORM_SEX_SELECT_INPUT_KEY,
    SUBMIT_FORM_STATUS_SELECT_INPUT_KEY
} from "../../../application.constants";
import {
    DASHBOARD_DOG_STATUS_FOUND,
    DASHBOARD_DOG_STATUS_LOST,
    DASHBOARD_DOG_STATUS_WANDERING,
    DETAILS_DOG_SEX_FEMALE,
    DETAILS_DOG_SEX_MALE
} from "../../../i18n/i18n.keys";
import {
    ON_SUBMIT_FORM_INPUT_VALUE_CHANGED,
    ON_SUBMIT_FORM_LOADING,
    ON_SUBMIT_FORM_STOP_LOADING,
    ON_SUBMIT_FORM_SUBMIT_ERROR,
    ON_SUBMIT_FORM_SUCCESS,
    ON_SUBMIT_FORM_VALIDATION_ERROR
} from "../../actions/submit-form/action-types/action.types";

export const initialState = {
    isValid: true,
    isLoading: false,
    error: '',
    inputs: {
        [SUBMIT_FORM_NAME_TEXT_INPUT_KEY]: {
            value: '',
            initialValue: '',
            isValid: true
        },
        [SUBMIT_FORM_BREED_TEXT_INPUT_KEY]: {
            value: '',
            initialValue: '',
            isValid: true
        },
        [SUBMIT_FORM_SEX_SELECT_INPUT_KEY]: {
            value: null,
            initialValue: null,
            options: [DETAILS_DOG_SEX_MALE, DETAILS_DOG_SEX_FEMALE],
            isValid: true
        },
        [SUBMIT_FORM_COLOR_TEXT_INPUT_KEY]: {
            value: '',
            initialValue: '',
            isValid: true
        },
        [SUBMIT_FORM_STATUS_SELECT_INPUT_KEY]: {
            value: null,
            initialValue: null,
            options: [DASHBOARD_DOG_STATUS_LOST, DASHBOARD_DOG_STATUS_WANDERING, DASHBOARD_DOG_STATUS_FOUND],
            isValid: true
        },
        [SUBMIT_FORM_AGE_TEXT_INPUT_KEY]: {
            value: '',
            initialValue: '',
            isValid: true
        },
        [SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY]: {
            value: false,
            initialValue: false,
            isValid: true
        },
        [SUBMIT_FORM_HAS_CHIP_NUMBER_TEXT_INPUT_KEY]: {
            value: '',
            initialValue: '',
            isValid: true
        }
    }
};

export const reducer = createReducer(initialState, {
    [ON_SUBMIT_FORM_INPUT_VALUE_CHANGED]: (state, action) => {
        state.inputs[action.payload.inputKey].value = action.payload.value;
        state.inputs[action.payload.inputKey].isValid = true;
        state.isValid = true;
    },
    [ON_SUBMIT_FORM_VALIDATION_ERROR]: (state, action) => {
        state.inputs[action.payload].isValid = false;
        state.isValid = false;
    },
    [ON_SUBMIT_FORM_SUCCESS]: (state) => {
        state.isValid = true;
        state.isLoading = false;
        state.error = '';
        Object.keys(state.inputs).forEach((inputKey) => {
            state.inputs[inputKey].value = state.inputs[inputKey].initialValue;
        });
    },
    [ON_SUBMIT_FORM_LOADING]: (state) => {
        state.isLoading = true;
    },
    [ON_SUBMIT_FORM_STOP_LOADING]: (state) => {
        state.isLoading = false;
    },
    [ON_SUBMIT_FORM_SUBMIT_ERROR]: (state, action) => {
        state.error = action.payload;
        state.isValid = false;
    }
});