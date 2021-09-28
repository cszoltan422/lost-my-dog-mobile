import {
    DASHBOARD_DOG_STATUS_FOUND,
    DASHBOARD_DOG_STATUS_LOST,
    DASHBOARD_DOG_STATUS_WANDERING,
    DASHBOARD_LIST_END_REACHED,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_DAYS_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_HOURS_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_MINUTES_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_WEEKS_AGO, DASHBOARD_LIST_ITEM_DISAPPEARED_JUST_NOW,
    DASHBOARD_SEARCH_FOUND_TAB,
    DASHBOARD_SEARCH_LOST_WANDERING_TAB,
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE,
    DASHBOARD_TITLE, DETAILS_ASTERISK_EXPLANATION,
    DETAILS_CALL_OWNER,
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_AGE_YEARS,
    DETAILS_DOG_BREED_LABEL_TITLE,
    DETAILS_DOG_CHIP_NUMBER,
    DETAILS_DOG_CITY_LABEL_TITLE,
    DETAILS_DOG_COLOR_LABEL_TITLE,
    DETAILS_DOG_DATE_LOST_LABEL_TITLE,
    DETAILS_DOG_DESCRIPTION_LABEL_TITLE,
    DETAILS_DOG_HAS_CHIP,
    DETAILS_DOG_HAS_CHIP_NO,
    DETAILS_DOG_HAS_CHIP_UNKNOWN,
    DETAILS_DOG_HAS_CHIP_YES,
    DETAILS_DOG_NAME_LABEL_TITLE,
    DETAILS_DOG_SEX_FEMALE,
    DETAILS_DOG_SEX_LABEL_TITLE,
    DETAILS_DOG_SEX_MALE,
    DETAILS_DOG_STATUS_LABEL_TITLE, DETAILS_EMAIL_INVALID,
    DETAILS_IMAGE_NOT_SELECTED,
    DETAILS_IMAGE_SIZE_TOO_LARGE,
    DETAILS_INPUT_REQUIRED,
    DETAILS_MAP_VIEW_MARKER_TITLE, DETAILS_PHONE_NUMBER_INVALID,
    DETAILS_SEND_MESSAGE,
    DETAILS_SUBMIT_BUTTON_TITLE,
    DETAILS_SUBMITTED_IN_PROGRESS_COMPRESS_IMAGE,
    DETAILS_SUBMITTED_IN_PROGRESS_SENDING_REQUEST,
    DETAILS_SUBMITTED_IN_PROGRESS_VALIDATING_FORM,
    DETAILS_SUBMITTED_LOADING_TEXT, DETAILS_SUBMITTER_EMAIL_ADDRESS, DETAILS_SUBMITTER_PHONE_NUMBER,
    EMAIL_EXISTS,
    LOCATION_PERMISSION_ASK_DENIED_DESCRIPTION,
    LOCATION_PERMISSION_ASK_DESCRIPTION,
    LOCATION_PERMISSION_BUTTON_TITLE,
    LOCATION_PERMISSION_DENIED_BUTTON_TITLE,
    LOCATION_PERMISSION_DENIED_TITLE,
    LOCATION_PERMISSION_TITLE,
    LOCATION_PICKER_CURRENT_COORDINATES,
    LOCATION_PICKER_INFO_DESCRIPTION,
    LOGIN_EMPTY_PASSWORD_OR_USERNAME,
    LOGIN_FORGOT_PASSWORD_PLACEHOLDER,
    LOGIN_LOGIN_TEXT,
    LOGIN_PASSWORD_PLACEHOLDER,
    LOGIN_SIGN_UP_TEXT,
    LOGIN_USERNAME_PLACEHOLDER,
    LOGIN_WRONG_PASSWORD_OR_USERNAME,
    SIGN_UP_SCREEN_TITLE,
    SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER,
    SIGNUP_CONFIRM_PASSWORD_VALIDATION_ERROR,
    SIGNUP_EMAIL_PLACEHOLDER,
    SIGNUP_EMAIL_VALIDATION_ERROR,
    SIGNUP_FIRST_NAME_PLACEHOLDER,
    SIGNUP_FIRST_NAME_VALIDATION_ERROR,
    SIGNUP_LAST_NAME_PLACEHOLDER,
    SIGNUP_LAST_NAME_VALIDATION_ERROR,
    SIGNUP_NAME_ORDER,
    SIGNUP_PASSWORD_PLACEHOLDER,
    SIGNUP_PASSWORD_VALIDATION_ERROR,
    SIGNUP_USERNAME_PLACEHOLDER,
    SIGNUP_USERNAME_VALIDATION_ERROR,
    SUBMIT_DOG_TITLE,
    USER_NAME_EXISTS
} from '../i18n.keys';
import {SIGNUP_SCREEN_NAME_ORDER_FIRST} from '../../application.constants';

export default {
    [DASHBOARD_TITLE]: 'Dashboard',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_JUST_NOW]: 'Just now',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_MINUTES_AGO]: 'minute(s) ago',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_HOURS_AGO]: 'hour(s) ago',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_DAYS_AGO]: 'day(s) ago',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_WEEKS_AGO]: 'week(s) ago',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]: 'over a month ago',
    [DASHBOARD_LIST_END_REACHED]: 'You\'ve reached the end!',
    [DASHBOARD_SEARCH_PARAMETERS_DISTANCE]: 'Distance',
    [DASHBOARD_SEARCH_LOST_WANDERING_TAB]: 'Lost / Wandering',
    [DASHBOARD_SEARCH_FOUND_TAB]: 'Found',
    [DASHBOARD_DOG_STATUS_LOST]: 'Lost',
    [DASHBOARD_DOG_STATUS_WANDERING]: 'Wandering',
    [DASHBOARD_DOG_STATUS_FOUND]: 'Found',
    [DETAILS_DOG_DESCRIPTION_LABEL_TITLE]: 'Description',
    [DETAILS_DOG_NAME_LABEL_TITLE]: 'Name',
    [DETAILS_DOG_BREED_LABEL_TITLE]: 'Breed',
    [DETAILS_DOG_SEX_LABEL_TITLE]: 'Sex',
    [DETAILS_DOG_COLOR_LABEL_TITLE]: 'Color',
    [DETAILS_DOG_STATUS_LABEL_TITLE]: 'Status',
    [DETAILS_DOG_AGE_LABEL_TITLE]: 'Age',
    [DETAILS_DOG_AGE_YEARS]: 'years',
    [DETAILS_DOG_HAS_CHIP]: 'Has chip',
    [DETAILS_DOG_CHIP_NUMBER]: 'Chip #',
    [DETAILS_DOG_CITY_LABEL_TITLE]: 'City',
    [DETAILS_DOG_DATE_LOST_LABEL_TITLE]: 'Date lost',
    [DETAILS_DOG_SEX_MALE]: 'Male',
    [DETAILS_DOG_SEX_FEMALE]: 'Female',
    [DETAILS_DOG_HAS_CHIP_YES]: 'Yes',
    [DETAILS_DOG_HAS_CHIP_NO]: 'No',
    [DETAILS_DOG_HAS_CHIP_UNKNOWN]: 'Unknown',
    [DETAILS_SEND_MESSAGE]: 'Send message',
    [DETAILS_CALL_OWNER]: 'Call owner',
    [DETAILS_MAP_VIEW_MARKER_TITLE]: 'Last seen location',
    [DETAILS_SUBMITTER_EMAIL_ADDRESS]: 'Email address',
    [DETAILS_SUBMITTER_PHONE_NUMBER]: 'Phone number',
    [LOCATION_PERMISSION_TITLE]: 'Enable location',
    [LOCATION_PERMISSION_BUTTON_TITLE]: 'Allow location',
    [LOCATION_PERMISSION_ASK_DESCRIPTION]: 'Location is required in order to show posts nearby you and to let you post to your local area. Press „Allow location” to start using the app. If it doesn\'t work, please visit your device settings and allow access to location for this application.',
    [LOCATION_PERMISSION_DENIED_TITLE]: 'Ooops',
    [LOCATION_PERMISSION_DENIED_BUTTON_TITLE]: 'Open Settings',
    [LOCATION_PERMISSION_ASK_DENIED_DESCRIPTION]: 'Permission to use the Location is required for the application to function. Press „Open Settings” and allow Location permission for this application.',
    [LOGIN_USERNAME_PLACEHOLDER]: 'Username...',
    [LOGIN_PASSWORD_PLACEHOLDER]: 'Password...',
    [LOGIN_FORGOT_PASSWORD_PLACEHOLDER]: 'Forgot password?',
    [LOGIN_LOGIN_TEXT]: 'Login',
    [LOGIN_SIGN_UP_TEXT]: 'Sign up',
    [LOGIN_EMPTY_PASSWORD_OR_USERNAME]: 'The username or password is empty!',
    [LOGIN_WRONG_PASSWORD_OR_USERNAME]: 'Incorrect username or password!',
    [SUBMIT_DOG_TITLE]: 'Submit Lost Dog',
    [SIGN_UP_SCREEN_TITLE]: 'Sign up',
    [SIGNUP_USERNAME_PLACEHOLDER]: 'Username',
    [SIGNUP_PASSWORD_PLACEHOLDER]: 'Password',
    [SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER]: 'Confirm password',
    [SIGNUP_EMAIL_PLACEHOLDER]: 'Email',
    [SIGNUP_FIRST_NAME_PLACEHOLDER]: 'First Name',
    [SIGNUP_LAST_NAME_PLACEHOLDER]: 'Last Name',
    [SIGNUP_NAME_ORDER]: SIGNUP_SCREEN_NAME_ORDER_FIRST,
    [SIGNUP_USERNAME_VALIDATION_ERROR]: 'Please create a username with only alphanumeric characters and minimum length of 5 characters.',
    [SIGNUP_PASSWORD_VALIDATION_ERROR]: 'Please provide a valid password. Your password must have:\n\t* at least 8 characters\n\t* contain at least one number \n\t* have a mixture of uppercase and lowercase letters',
    [SIGNUP_CONFIRM_PASSWORD_VALIDATION_ERROR]: 'Passwords do not match.',
    [SIGNUP_EMAIL_VALIDATION_ERROR]: 'Please provide a valid email address',
    [SIGNUP_FIRST_NAME_VALIDATION_ERROR]: 'Please enter your first name.',
    [SIGNUP_LAST_NAME_VALIDATION_ERROR]: 'Please enter your last name.',
    [USER_NAME_EXISTS]: 'Username already taken',
    [EMAIL_EXISTS]: 'Email already taken',
    [LOCATION_PICKER_INFO_DESCRIPTION]: 'Tap on the map to change the dog\'s last seen location!',
    [LOCATION_PICKER_CURRENT_COORDINATES]: 'Current coordinates: ',
    [DETAILS_SUBMIT_BUTTON_TITLE]: 'Submit',
    [DETAILS_INPUT_REQUIRED]: 'This field can\'t be empty',
    [DETAILS_EMAIL_INVALID]: 'Please provide a valid email address',
    [DETAILS_PHONE_NUMBER_INVALID]: 'Please provide a valid phone number',
    [DETAILS_IMAGE_NOT_SELECTED]: 'Please select or take a picture of the dog!',
    [DETAILS_IMAGE_SIZE_TOO_LARGE]: 'The size of the image must not exceed 1 Gb!',
    [DETAILS_SUBMITTED_LOADING_TEXT]: 'Hold on, we are processing your request:',
    [DETAILS_SUBMITTED_IN_PROGRESS_VALIDATING_FORM]: 'Validating form',
    [DETAILS_SUBMITTED_IN_PROGRESS_COMPRESS_IMAGE]: 'Compressing image',
    [DETAILS_SUBMITTED_IN_PROGRESS_SENDING_REQUEST]: 'Sending the request',
    [DETAILS_ASTERISK_EXPLANATION]: '* required field'
};