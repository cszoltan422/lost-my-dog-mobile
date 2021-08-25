import {
    DASHBOARD_DOG_STATUS_FOUND,
    DASHBOARD_DOG_STATUS_LOST,
    DASHBOARD_DOG_STATUS_WANDERING, DETAILS_DOG_SEX_FEMALE,
    DETAILS_DOG_SEX_MALE
} from './i18n/i18n.keys';

export const APPLICATION_NAME = 'LostMyDog';
export const USER_ASYNC_STORAGE_KEY = '@USER_ASYNC_STORAGE_KEY';
export const USER_ROLE_ADMIN_VALUE = 'ADMIN';
export const DASHBOARD_NAVIGATION_SCREEN_NAME = 'DASHBOARD_NAVIGATION_SCREEN_NAME';
export const DETAILS_NAVIGATION_SCREEN_NAME = 'DETAILS_NAVIGATION_SCREEN_NAME';
export const LOGIN_NAVIGATION_SCREEN_NAME = 'LOGIN_NAVIGATION_SCREEN_NAME';
export const DETAILS_NAVIGATION_PARAM_NAME = 'DETAILS_NAVIGATION_PARAM_NAME';
export const SUBMIT_DOG_NAVIGATION_PARAM_NAME = 'SUBMIT_DOG_NAVIGATION_PARAM_NAME';
export const SIGN_UP_NAVIGATION_PARAM_NAME = 'SIGN_UP_NAVIGATION_PARAM_NAME';
export const DASHBOARD_LIST_PAGE_SIZE = 10;
export const DASHBOARD_INITIAL_SEARCH_DISTANCE_IN_METERS = 30000;
export const DASHBOARD_MIN_SEARCH_DISTANCE_IN_METERS = 5000;
export const DASHBOARD_MAX_SEARCH_DISTANCE_IN_METERS = 100000;
export const DASHBOARD_STEP_SEARCH_DISTANCE_IN_METERS = 1000;
export const DASHBOARD_SEARCH_TYPE_LOST = 'LOST';
export const DASHBOARD_SEARCH_TYPE_FOUND = 'FOUND';
export const DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS = {
    'LOST': DASHBOARD_DOG_STATUS_LOST,
    'WANDERING': DASHBOARD_DOG_STATUS_WANDERING,
    'FOUND': DASHBOARD_DOG_STATUS_FOUND
};
export const DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS = {
    'MALE': DETAILS_DOG_SEX_MALE,
    'FEMALE': DETAILS_DOG_SEX_FEMALE
};
export const E2E_MOCK_LOCATION = {
    longitude: -122.406417,
    latitude: 37.785834

};
export const SIGNUP_SCREEN_NAME_ORDER_FIRST = 'FIRST';
export const SIGNUP_SCREEN_NAME_ORDER_LAST = 'LAST';
export const SIGNUP_USERNAME_TEXT_INPUT_KEY = 'SIGNUP_USERNAME_TEXT_INPUT_KEY';
export const SIGNUP_PASSWORD_TEXT_INPUT_KEY = 'SIGNUP_PASSWORD_TEXT_INPUT_KEY';
export const SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY = 'SIGNUP_CONFIRM_PASSWORD_TEXT_INPUT_KEY';
export const SIGNUP_EMAIL_TEXT_INPUT_KEY = 'SIGNUP_EMAIL_TEXT_INPUT_KEY';
export const SIGNUP_FIRST_NAME_TEXT_INPUT_KEY = 'SIGNUP_FIRST_NAME_TEXT_INPUT_KEY';
export const SIGNUP_LAST_NAME_TEXT_INPUT_KEY = 'SIGNUP_LAST_NAME_TEXT_INPUT_KEY';