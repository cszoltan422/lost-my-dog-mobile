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
export const EMOJI_REGEX = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
